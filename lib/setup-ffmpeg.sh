#!/bin/bash

# FFmpeg Setup Script für Fileflyr
# Lädt alle benötigten FFmpeg-Dateien in den lib/ Ordner herunter

set -e  # Bei Fehler abbrechen

echo "🎬 FFmpeg Setup für Fileflyr"
echo "================================"
echo ""

# Prüfe ob curl verfügbar ist
if ! command -v curl &> /dev/null; then
    echo "❌ Error: curl ist nicht installiert"
    echo "Bitte installiere curl und versuche es erneut"
    exit 1
fi

# Erstelle lib Ordner falls nicht vorhanden
if [ ! -d "lib" ]; then
    echo "📁 Erstelle lib/ Ordner..."
    mkdir -p lib
fi

cd lib

echo "📦 Lade FFmpeg Core (0.12.6)..."
curl -s -o ffmpeg-core.js https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js
echo "   ✓ ffmpeg-core.js"

curl -s -o ffmpeg-core.wasm https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm
echo "   ✓ ffmpeg-core.wasm"

curl -s -o ffmpeg-core.worker.js https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.worker.js
echo "   ✓ ffmpeg-core.worker.js"

echo ""
echo "📦 Lade FFmpeg Main (0.12.10)..."
curl -s https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js -o ffmpeg.js
echo "   ✓ ffmpeg.js"

echo ""
echo "📦 Lade FFmpeg Util (0.12.1)..."
curl -s https://unpkg.com/@ffmpeg/util@0.12.1/dist/esm/index.js -o util.js
echo "   ✓ util.js"

cd ..

echo ""
echo "✅ FFmpeg Setup erfolgreich abgeschlossen!"
echo ""
echo "Installierte Dateien:"
echo "  lib/ffmpeg-core.js"
echo "  lib/ffmpeg-core.wasm"
echo "  lib/ffmpeg-core.worker.js"
echo "  lib/ffmpeg.js"
echo "  lib/util.js"
echo ""
echo "Der MOV to MP4 Converter sollte jetzt funktionieren! 🎉"
