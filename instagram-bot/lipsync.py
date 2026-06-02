"""
lipsync.py — Lippenbewegung fuer Pixar-Bilder via Wav2Lip (HuggingFace, gratis).

Wav2Lip bekommt das volle Bild, findet das Gesicht selbst und animiert nur den
Mund-Bereich -> kein Crop, kein Composite, keine sichtbaren Kanten.

Das HF-Space ist unzuverlaessig: es liefert manchmal ein Demo-Bild statt unseres
Inputs. Darum verifiziert lipsync.py jedes Ergebnis (erstes Frame vs. Input-Bild)
und wiederholt bei Bedarf mit frischem Client.

Batch-Modus (von generate-lipsync-video.mjs genutzt):
  python lipsync.py <jobs_json> <out_dir>
  jobs_json = [{"id":"0","image":"pfad.jpg","audio":"pfad.mp3"}, ...]
  -> schreibt <out_dir>/<id>.mp4 je Job und <out_dir>/lipsync_result.json

Token kommt aus HF_TOKEN (Umgebung oder .env).
"""
import sys
import os
import json
import time
import shutil
from pathlib import Path

SPACE = "pragnakalp/Wav2lip-ZeroGPU"
DIFF_THRESHOLD = 25     # erstes-Frame-Differenz: <25 = korrekt, sonst falsches Bild
MAX_ATTEMPTS = 4


def load_token():
    tok = os.environ.get("HF_TOKEN")
    if tok:
        return tok
    env = Path(__file__).parent / ".env"
    if env.exists():
        for line in env.read_text(encoding="utf-8").splitlines():
            if line.startswith("HF_TOKEN="):
                return line.split("=", 1)[1].strip()
    raise RuntimeError("HF_TOKEN nicht gefunden (Umgebung oder .env)")


def first_frame_diff(video_path, image_path):
    """Mittlere Pixel-Differenz zwischen Video-1.-Frame und Input-Bild (0..255).
    Klein (~3-6) = Wav2Lip hat unser Bild benutzt. Gross (>40) = falsches Bild."""
    import cv2
    import numpy as np
    cap = cv2.VideoCapture(video_path)
    ok, frame = cap.read()
    cap.release()
    if not ok or frame is None:
        return 999.0
    img = cv2.imread(image_path)
    if img is None:
        return 999.0
    a = cv2.resize(img, (256, 256)).astype(int)
    b = cv2.resize(frame, (256, 256)).astype(int)
    return float(abs(a - b).mean())


def lipsync_one(job, out_dir, token):
    """Ein Job mit Verifikation + Retry. Gibt True/False zurueck."""
    from gradio_client import Client, handle_file
    jid = str(job["id"])
    out_mp4 = out_dir / f"{jid}.mp4"

    # Cache: existiert der Clip schon und ist er korrekt? -> ueberspringen
    if out_mp4.exists():
        d = first_frame_diff(str(out_mp4), job["image"])
        if d < DIFF_THRESHOLD:
            print(f"[lipsync]   Job {jid}: gecacht (diff={d:.1f})")
            return True

    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            # Frischer Client pro Versuch (Space cacht sonst falsche Bilder)
            client = Client(SPACE, token=token, verbose=False)
            res = client.predict(
                input_image=handle_file(job["image"]),
                input_audio=handle_file(job["audio"]),
                api_name="/run_infrence",
            )
            vid = res["video"] if isinstance(res, dict) else res
            if isinstance(vid, dict):
                vid = vid.get("video") or vid.get("path")
            if not vid or not os.path.exists(vid):
                raise RuntimeError("kein Video zurueckgekommen")
            shutil.copy(vid, out_mp4)

            d = first_frame_diff(str(out_mp4), job["image"])
            if d < DIFF_THRESHOLD:
                print(f"[lipsync]   Job {jid}: OK (diff={d:.1f}, Versuch {attempt})")
                return True
            print(f"[lipsync]   Job {jid}: falsches Bild (diff={d:.1f}), "
                  f"Versuch {attempt}/{MAX_ATTEMPTS} — neuer Versuch...", file=sys.stderr)
        except Exception as e:
            print(f"[lipsync]   Job {jid}: Fehler Versuch {attempt}: {str(e)[:120]}",
                  file=sys.stderr)
        time.sleep(5)  # kurz warten, Space erholen lassen

    # alle Versuche gescheitert
    if out_mp4.exists():
        out_mp4.unlink()  # falsches Video nicht liegen lassen
    return False


def main():
    if len(sys.argv) < 3:
        print("Usage: python lipsync.py <jobs_json> <out_dir>", file=sys.stderr)
        sys.exit(2)

    jobs = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    out_dir = Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)
    token = load_token()

    print(f"[lipsync] {len(jobs)} Jobs via {SPACE}")
    results = {}
    for i, job in enumerate(jobs):
        jid = str(job["id"])
        print(f"[lipsync] [{i+1}/{len(jobs)}] Job {jid}...")
        results[jid] = lipsync_one(job, out_dir, token)

    (out_dir / "lipsync_result.json").write_text(
        json.dumps(results, indent=2), encoding="utf-8")
    ok = sum(1 for v in results.values() if v)
    print(f"[lipsync] Fertig: {ok}/{len(jobs)} Clips mit Lippenbewegung")


if __name__ == "__main__":
    main()
