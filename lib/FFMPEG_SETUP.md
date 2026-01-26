# FFmpeg Setup für Fileflyr

## Benötigte Dateien

Lade die folgenden Dateien in den `lib/` Ordner herunter:

### 1. FFmpeg Core (Version 0.12.6)
Von: https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/

Benötigte Dateien:
- `ffmpeg-core.js`
- `ffmpeg-core.wasm`
- `ffmpeg-core.worker.js`

### 2. FFmpeg Main (Version 0.12.10)
Von: https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/esm/

Benötigte Dateien:
- `index.js` (umbenennen zu `ffmpeg.js`)

### 3. FFmpeg Util (Version 0.12.1)
Von: https://unpkg.com/@ffmpeg/util@0.12.1/dist/esm/

Benötigte Dateien:
- `index.js` (umbenennen zu `util.js`)

## Automatischer Download (mit curl)

```bash
cd lib

# FFmpeg Core
curl -O https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js
curl -O https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm
curl -O https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.worker.js

# FFmpeg Main
curl https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js -o ffmpeg.js

# FFmpeg Util
curl https://unpkg.com/@ffmpeg/util@0.12.1/dist/esm/index.js -o util.js
```

## Struktur nach Setup

```
lib/
  ├── ffmpeg-core.js
  ├── ffmpeg-core.wasm
  ├── ffmpeg-core.worker.js
  ├── ffmpeg.js
  ├── util.js
  └── FFMPEG_SETUP.md (diese Datei)
```
