#!/usr/bin/env python3
"""
IELTS with Kee — Auth Server
Replaces python3 -m http.server 9091 with Flask session-based auth.
Passcodes stored in SQLite (bcrypt hashed). Session cookies for access control.
"""

from flask import Flask, request, session, redirect, send_from_directory, jsonify
from functools import wraps, partial
import os, bcrypt, sqlite3, secrets, glob, time, string, random

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'auth.db')

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY') or secrets.token_hex(32)
app.config['SESSION_COOKIE_PATH'] = '/'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
# Session expires after 24h (or 30 days if "remember me")
app.config['PERMANENT_SESSION_LIFETIME'] = 86400 * 30  # 30 days (used when session.permanent=True)

# ── Database ──────────────────────────────────────────────

def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS passcodes (
            code_hash TEXT PRIMARY KEY,
            tier TEXT NOT NULL,
            label TEXT NOT NULL
        )''')
        count = conn.execute('SELECT COUNT(*) FROM passcodes').fetchone()[0]
        if count == 0:
            defaults = [
                ('masterkee2024', 'Teacher', 'Teacher Access'),
                ('ielts55', 'Student', 'IELTS 5.5 Student'),
                ('ielts65', 'Student', 'IELTS 6.5 Student'),
            ]
            for code, tier, label in defaults:
                h = bcrypt.hashpw(code.encode(), bcrypt.gensalt()).decode()
                conn.execute('INSERT INTO passcodes VALUES (?, ?, ?)', (h, tier, label))
        
        # Temp codes table (30-min trial access)
        conn.execute('''CREATE TABLE IF NOT EXISTS temp_codes (
            code_hash TEXT PRIMARY KEY,
            created_at REAL NOT NULL,
            expires_at REAL NOT NULL
        )''')

# ── Helpers ───────────────────────────────────────────────

def get_html_files():
    """Discover all .html files in BASE_DIR."""
    files = []
    for f in glob.glob(os.path.join(BASE_DIR, '*.html')):
        name = os.path.basename(f)
        # Skip hidden
        if not name.startswith('.'):
            files.append(name)
    return sorted(files)

# ── Auth Decorator ────────────────────────────────────────

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('user'):
            if request.path.startswith('/api/'):
                return jsonify({'error': 'Unauthorized'}), 401
            return redirect('/auth.html?redirect=' + request.path)
        return f(*args, **kwargs)
    return decorated

# ── API Routes ────────────────────────────────────────────

@app.route('/api/auth/login', methods=['POST'])
def api_login():
    data = request.get_json(silent=True) or {}
    code = (data.get('code') or '').strip().lower()
    if not code:
        return jsonify({'ok': False, 'error': 'Enter access code'})

    now = time.time()
    with sqlite3.connect(DB_PATH) as conn:
        # Clean up expired temp codes
        conn.execute('DELETE FROM temp_codes WHERE expires_at < ?', (now,))
        
        # Check permanent passcodes
        rows = conn.execute('SELECT code_hash, tier, label FROM passcodes').fetchall()
        for code_hash, tier, label in rows:
            if bcrypt.checkpw(code.encode(), code_hash.encode()):
                session['user'] = {'tier': tier, 'label': label}
                if data.get('remember'):
                    session.permanent = True
                return jsonify({'ok': True, 'tier': tier})
        
        # Check temp codes
        temp_rows = conn.execute(
            'SELECT code_hash, expires_at FROM temp_codes WHERE expires_at > ?', (now,)
        ).fetchall()
        for code_hash, expires_at in temp_rows:
            if bcrypt.checkpw(code.encode(), code_hash.encode()):
                session['user'] = {'tier': 'Temp', 'label': 'Trial Access'}
                session['temp_expires'] = expires_at
                # Temp codes: no permanent session
                session.permanent = False
                return jsonify({'ok': True, 'tier': 'Temp', 'temp_expires_at': expires_at})

    return jsonify({'ok': False, 'error': 'Invalid access code'})

@app.route('/api/auth/logout', methods=['POST'])
def api_logout():
    session.clear()
    return jsonify({'ok': True})

@app.route('/api/auth/status')
def api_status():
    if session.get('user'):
        result = {'logged_in': True, 'tier': session['user']['tier']}
        if session.get('temp_expires'):
            result['temp_expires_at'] = session['temp_expires']
        return jsonify(result)
    return jsonify({'logged_in': False})

@app.route('/api/auth/temp-code', methods=['GET', 'POST'])
def api_temp_code():
    """Generate a trial access code valid for 30 minutes."""
    now = time.time()
    expires_at = now + 1800  # 30 minutes
    
    # Generate random 8-char code
    chars = string.ascii_lowercase + string.digits
    raw_code = 'trial-' + ''.join(random.choices(chars, k=6))
    code_hash = bcrypt.hashpw(raw_code.encode(), bcrypt.gensalt()).decode()
    
    with sqlite3.connect(DB_PATH) as conn:
        # Clean up expired
        conn.execute('DELETE FROM temp_codes WHERE expires_at < ?', (now,))
        # Store new temp code
        conn.execute('INSERT INTO temp_codes VALUES (?, ?, ?)',
                    (code_hash, now, expires_at))
    
    return jsonify({
        'ok': True,
        'code': raw_code,
        'expires_at': expires_at,
        'expires_in': 1800
    })

# ── Public pages (no auth required) ───────────────────────

@app.route('/auth.html')
def serve_auth():
    return send_from_directory(BASE_DIR, 'auth.html')

@app.route('/debug-auth.html')
def serve_debug_auth():
    return send_from_directory(BASE_DIR, 'debug-auth.html')

# ── Protected HTML pages (auto-discovered) ────────────────

def _serve_html(filename):
    return send_from_directory(BASE_DIR, filename)

# Register all .html files as protected routes
_unprotected = {'auth.html', 'debug-auth.html'}
for _filename in get_html_files():
    if _filename not in _unprotected:
        _handler = require_auth(partial(_serve_html, _filename))
        _handler.__name__ = f'serve_{_filename.replace(".","_").replace("-","_")}'
        app.add_url_rule(f'/{_filename}', view_func=_handler)
        # Also allow without .html extension?
        # app.add_url_rule(f'/{_filename[:-5]}', view_func=_handler)

# ── Root ──────────────────────────────────────────────────

@app.route('/')
@require_auth
def serve_root():
    return send_from_directory(BASE_DIR, 'index.html')

# ── Static files (CSS, JS, audio, images, pdfs) ───────────

@app.route('/<path:filename>')
def serve_static(filename):
    # Don't serve .html through the catch-all (they have explicit routes above)
    if filename.endswith('.html'):
        # If it fell through to here, it's an unknown .html → 404
        return 'Not Found', 404
    return send_from_directory(BASE_DIR, filename)

# ── Main ──────────────────────────────────────────────────

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 9092))
    print(f'🦄 IELTS with Kee auth server — http://0.0.0.0:{port}')
    app.run(host='0.0.0.0', port=port, debug=False)
