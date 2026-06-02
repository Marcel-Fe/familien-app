"""
TTS-Wrapper: nutzt Microsoft Edge-TTS (kostenlos, keine API-Key).
Sehr natürliche deutsche Stimmen.

Usage:
  python tts.py <output_dir> <segments_json>

segments_json beispiel:
  [
    {"id": "0", "text": "Hallo Familie!", "voice": "de-DE-KatjaNeural"},
    {"id": "1", "text": "Heute zeigen wir euch...", "voice": "de-DE-ConradNeural"}
  ]

Speichert: <output_dir>/<id>.mp3 und <output_dir>/durations.json
"""
import asyncio
import json
import sys
import os
from pathlib import Path

try:
    import edge_tts
except ImportError:
    print("ERROR: edge-tts ist nicht installiert.", file=sys.stderr)
    print("Installation: pip install edge-tts mutagen", file=sys.stderr)
    sys.exit(1)

try:
    from mutagen.mp3 import MP3
    HAS_MUTAGEN = True
except ImportError:
    HAS_MUTAGEN = False


async def synth(text: str, voice: str, out_path: str, rate: str = "+0%", pitch: str = "+0Hz"):
    """Synthese + Wort-Timings. Gibt Liste [{word, start, end}] in Sekunden zurueck."""
    communicate = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
    words = []
    with open(out_path, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                # offset/duration sind in 100-Nanosekunden-Einheiten
                start = chunk["offset"] / 1e7
                dur = chunk["duration"] / 1e7
                words.append({"word": chunk["text"], "start": start, "end": start + dur})
    return words


def estimate_words(text: str, duration: float):
    """Schaetzt Wort-Timings wenn die Stimme keine WordBoundary-Events liefert
    (z.B. Multilingual-Stimmen). Verteilt Woerter proportional zur Laenge."""
    raw = text.split()
    if not raw:
        return []
    total = sum(len(w) + 1 for w in raw)  # +1 ~ Pause/Leerzeichen
    speak = duration * 0.97
    out, t = [], duration * 0.015
    for w in raw:
        wd = speak * ((len(w) + 1) / total)
        out.append({"word": w, "start": round(t, 3), "end": round(t + wd, 3)})
        t += wd
    return out


def get_duration(mp3_path: str) -> float:
    if HAS_MUTAGEN:
        try:
            return float(MP3(mp3_path).info.length)
        except Exception:
            pass
    size = os.path.getsize(mp3_path)
    return max(0.5, size / 16000.0)


async def main():
    if len(sys.argv) < 3:
        print("Usage: python tts.py <output_dir> <segments_json>", file=sys.stderr)
        sys.exit(2)
    out_dir = Path(sys.argv[1])
    segments_json = sys.argv[2]
    out_dir.mkdir(parents=True, exist_ok=True)

    with open(segments_json, "r", encoding="utf-8") as f:
        segments = json.load(f)

    durations = {}
    word_timings = {}
    for seg in segments:
        seg_id = str(seg["id"])
        text = seg["text"]
        voice = seg.get("voice", "de-DE-KatjaNeural")
        rate = seg.get("rate", "+0%")
        pitch = seg.get("pitch", "+0Hz")
        out_path = out_dir / f"{seg_id}.mp3"
        print(f"[TTS] {seg_id}: {voice} rate={rate} pitch={pitch} -> {out_path.name}")
        words = await synth(text, voice, str(out_path), rate=rate, pitch=pitch)
        dur = get_duration(str(out_path))
        durations[seg_id] = dur
        # Fallback: keine WordBoundary-Events -> Timings schaetzen
        if not words:
            words = estimate_words(text, dur)
            print(f"[TTS] {seg_id}: Wort-Timings geschaetzt ({len(words)} Woerter)")
        word_timings[seg_id] = words

    with open(out_dir / "durations.json", "w", encoding="utf-8") as f:
        json.dump(durations, f, indent=2)
    with open(out_dir / "words.json", "w", encoding="utf-8") as f:
        json.dump(word_timings, f, indent=2, ensure_ascii=False)
    print(f"[TTS] Done. Durations: {durations}")


if __name__ == "__main__":
    asyncio.run(main())
