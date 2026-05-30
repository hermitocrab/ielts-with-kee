-- ============================================
-- KeeBot Tables — AI Chat Widget for ielts.rkrk.io
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

-- KeeBot messages table
CREATE TABLE IF NOT EXISTS public.keebot_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    page TEXT DEFAULT '',
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'done', 'error')),
    is_bug BOOLEAN DEFAULT false,
    bug_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KeeBot bug reports table
CREATE TABLE IF NOT EXISTS public.keebot_bugs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID REFERENCES public.keebot_messages(id) ON DELETE SET NULL,
    session_id TEXT NOT NULL,
    description TEXT NOT NULL,
    page TEXT DEFAULT '',
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'fixed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.keebot_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keebot_bugs ENABLE ROW LEVEL SECURITY;

-- Allow anon inserts (public chat widget)
CREATE POLICY "anon_insert_messages" ON public.keebot_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_messages" ON public.keebot_messages FOR SELECT TO anon USING (true);
CREATE POLICY "anon_update_messages" ON public.keebot_messages FOR UPDATE TO anon USING (true);

CREATE POLICY "anon_insert_bugs" ON public.keebot_bugs FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_bugs" ON public.keebot_bugs FOR SELECT TO anon USING (true);

-- Index for polling
CREATE INDEX IF NOT EXISTS idx_keebot_session ON public.keebot_messages(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_keebot_pending ON public.keebot_messages(status, created_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_keebot_bugs_date ON public.keebot_bugs(created_at DESC);
