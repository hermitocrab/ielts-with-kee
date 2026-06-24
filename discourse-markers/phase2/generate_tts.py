#!/usr/bin/env python3
"""Generate Edge TTS audio for Stalling markers (Phase 2.2 preview)."""
import asyncio, json, os, sys

sys.path.insert(0, '/Users/agentii/dev/ielts-with-kee/discourse-markers')

with open('/Users/agentii/dev/ielts-with-kee/discourse-markers/markers.json') as f:
    markers = json.load(f)
with open('/Users/agentii/dev/ielts-with-kee/discourse-markers/subfunctions.json') as f:
    subs = json.load(f)

# Find stalling subfunction IDs
stall_sf_ids = set()
for s in subs:
    if s.get('categorySlug') == 'stalling-fillers':
        stall_sf_ids.add(s['id'])

# Find stalling markers
stall_markers = [m for m in markers if stall_sf_ids & set(m.get('subfunctionIds', []))]
print(f"Generating TTS for {len(stall_markers)} stalling markers...")

voice = "en-US-JennyNeural"
outdir = "/Users/agentii/dev/ielts-with-kee/discourse-markers/phase2/audio/tts"

async def gen_tts(text, outpath, label):
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(outpath)
    print(f"  ✅ {label}: {os.path.basename(outpath)}")

import edge_tts

async def main():
    
    tasks = []
    for m in stall_markers:
        mid = m['id']
        expr = m['expression']
        ex = m['example']['en']
        
        # Phrase TTS
        phrase_path = os.path.join(outdir, f"tts_phrase_{mid}.mp3")
        if not os.path.exists(phrase_path):
            tasks.append(gen_tts(expr, phrase_path, expr))
        else:
            print(f"  ⏭️ Phrase exists: {expr}")
        
        # Example TTS  
        example_path = os.path.join(outdir, f"tts_example_{mid}.mp3")
        if not os.path.exists(example_path):
            tasks.append(gen_tts(ex, example_path, expr + " (ex)"))
        else:
            print(f"  ⏭️ Example exists: {expr}")
    
    if tasks:
        print(f"\nGenerating {len(tasks)} audio files...")
        await asyncio.gather(*tasks)
        print(f"\n✅ Done! {len(tasks)} files generated.")
    else:
        print("\nAll files already exist.")

asyncio.run(main())
