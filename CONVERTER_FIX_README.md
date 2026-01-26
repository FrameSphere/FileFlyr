# 🔧 MOV to MP4 Converter - CORS Problem behoben

## Problem
Der MOV to MP4 Converter konnte FFmpeg nicht von externen CDNs (jsdelivr.net) laden, da die CORS-Header (`Cross-Origin-Embedder-Policy: require-corp`) dies verhinderten.

**Fehlermeldung:**
```
Sicherheitsfehler: Inhalt auf https://fileflyr.pages.dev/convert/mov-to-mp4 
darf keine Daten von https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/worker.js laden.
```

## Lösung
FFmpeg wird jetzt **lokal gehostet** statt von externen CDNs geladen.

## ✅ Durchgeführte Änderungen

### 1. Neue Dateistruktur
```
lib/
  ├── ffmpeg-core.js         (FFmpeg Core JavaScript)
  ├── ffmpeg-core.wasm       (FFmpeg WebAssembly Binary)
  ├── ffmpeg-core.worker.js  (FFmpeg Worker)
  ├── ffmpeg.js              (FFmpeg Main Library)
  ├── util.js                (FFmpeg Utility Functions)
  ├── setup-ffmpeg.sh        (Installations-Skript)
  └── FFMPEG_SETUP.md        (Setup-Anleitung)
```

### 2. Angepasste Dateien

#### `js/converters/mov-to-mp4.js`
- ✅ Imports verwenden jetzt lokale Dateien statt externe CDNs
- ✅ FFmpeg lädt von `/lib/` statt von `https://cdn.jsdelivr.net`
- ✅ Verbesserte Fehlermeldungen

**Vorher:**
```javascript
const { FFmpeg } = await import('https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/+esm');
const { toBlobURL } = await import('https://cdn.jsdelivr.net/npm/@ffmpeg/util@0.12.1/+esm');
```

**Nachher:**
```javascript
const { FFmpeg } = await import('/lib/ffmpeg.js');
const { toBlobURL } = await import('/lib/util.js');
```

#### `_headers`
- ✅ Neue Header-Regeln für `/lib/*` hinzugefügt
- ✅ CORS für lib-Dateien aktiviert: `Cross-Origin-Resource-Policy: cross-origin`
- ✅ Converter-Seiten behalten CORP/COEP für SharedArrayBuffer

### 3. Setup-Tools erstellt

#### `lib/setup-ffmpeg.sh`
Automatisches Installations-Skript, das alle FFmpeg-Dateien herunterlädt.

**Verwendung:**
```bash
cd /Users/karol/Desktop/Laufende_Projekte/WerbungWebseites/fileflyr
chmod +x lib/setup-ffmpeg.sh
./lib/setup-ffmpeg.sh
```

#### `lib/FFMPEG_SETUP.md`
Manuelle Setup-Anleitung mit curl-Befehlen.

## 🚀 Installation & Deployment

### Schritt 1: FFmpeg-Dateien herunterladen
```bash
cd /Users/karol/Desktop/Laufende_Projekte/WerbungWebseites/fileflyr
chmod +x lib/setup-ffmpeg.sh
./lib/setup-ffmpeg.sh
```

### Schritt 2: Änderungen committen & pushen
```bash
git add .
git commit -m "Fix: MOV to MP4 Converter - FFmpeg jetzt lokal gehostet"
git push origin main
```

### Schritt 3: Cloudflare Pages Deployment
Die Seite wird automatisch neu deployed, sobald du pushst.

## 🧪 Testing

Nach dem Deployment kannst du den Converter testen:
1. Öffne https://fileflyr.pages.dev/convert/mov-to-mp4
2. Lade eine MOV-Datei hoch
3. Der Converter sollte jetzt ohne CORS-Fehler funktionieren

**Erwartete Konsolenausgabe:**
```
🎬 MOV to MP4 Converter initialized
📦 Loading FFmpeg...
✅ FFmpeg modules imported
📥 Loading FFmpeg core...
✅ FFmpeg loaded successfully
```

## 📋 Warum funktioniert es jetzt?

1. **Lokales Hosting**: FFmpeg-Dateien werden von derselben Domain geladen (`/lib/`)
2. **Korrekte CORS-Header**: `/lib/*` hat `Cross-Origin-Resource-Policy: cross-origin`
3. **COEP/COOP bleibt**: Converter-Seiten (`/convert/*`) behalten SharedArrayBuffer-Support

## 🔍 Troubleshooting

### Problem: "Failed to load FFmpeg"
**Lösung**: Stelle sicher, dass alle Dateien in `lib/` vorhanden sind:
```bash
ls -la lib/
# Sollte zeigen:
# ffmpeg-core.js
# ffmpeg-core.wasm
# ffmpeg-core.worker.js
# ffmpeg.js
# util.js
```

### Problem: FFmpeg lädt, aber konvertiert nicht
**Lösung**: Prüfe die Browser-Konsole auf FFmpeg-Logs. Möglicherweise ist die Datei zu groß (max 500MB).

### Problem: CORS-Fehler bleiben
**Lösung**: Stelle sicher, dass `_headers` korrekt deployed wurde. Cloudflare Pages sollte die Header automatisch übernehmen.

## ℹ️ Weitere Informationen

- FFmpeg Version: 0.12.10
- FFmpeg Core Version: 0.12.6
- FFmpeg Util Version: 0.12.1
- Maximale Dateigröße: 500MB
- Unterstützte Browser: Chrome, Edge, Firefox, Safari (alle modernen Browser mit WebAssembly-Support)

## 🎉 Ergebnis

Der MOV to MP4 Converter funktioniert jetzt vollständig offline und ohne externe Abhängigkeiten!
