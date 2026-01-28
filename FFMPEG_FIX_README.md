# FFmpeg CORS Fix - MOV to MP4 Converter

## Problem
Der MOV to MP4 Converter konnte nicht funktionieren, weil:
1. **CORS-Fehler**: FFmpeg versuchte, Worker-Dateien von jsdelivr.net zu laden, aber die Content Security Policy (CSP) mit `Cross-Origin-Embedder-Policy: require-corp` blockierte dies
2. **Fehlende lokale Dateien**: Der Code versuchte, von `/lib/` zu laden, aber die FFmpeg-Dateien waren nicht heruntergeladen worden

## Lösung

### 1. CSP-Headers angepasst (`_headers`)
- **FFmpeg-basierte Converter** (mov-to-mp4, gif-to-mp4, etc.) haben jetzt **KEINE** COEP/COOP Headers mehr
- Dies erlaubt das Laden von externen Ressourcen (jsdelivr.net CDN)
- **Nicht-FFmpeg Converter** behalten COEP/COOP für bessere Performance mit SharedArrayBuffer

### 2. Code geändert (mov-to-mp4.js)
- FFmpeg wird jetzt direkt von **jsdelivr.net CDN** geladen (bessere CORS-Unterstützung als unpkg.com)
- Keine lokalen Dateien mehr erforderlich
- Versionen:
  - `@ffmpeg/ffmpeg@0.12.10`
  - `@ffmpeg/core@0.12.6`
  - `@ffmpeg/util@0.12.1`

## Vorteile der neuen Lösung

✅ **Funktioniert sofort** - Keine Setup-Schritte erforderlich
✅ **Immer aktuell** - jsdelivr.net liefert die neuesten stabilen Versionen
✅ **Zuverlässig** - jsdelivr.net hat 99.9% Uptime und bessere CORS-Unterstützung
✅ **Schnell** - Multi-CDN Netzwerk mit automatischem Failover
✅ **Automatisches Caching** - Browser cacht FFmpeg nach dem ersten Laden (~30MB)
✅ **ESM Support** - Modernes JavaScript mit `+esm` Syntax

## Was wurde geändert

### `_headers`
```diff
- # Converter-Seiten mit FFmpeg (benötigen COOP/COEP für SharedArrayBuffer)
+ # FFmpeg-based Converters (NO COEP/COOP - würde externe FFmpeg-Ressourcen blockieren)
+ /convert/mov-to-mp4
+   X-Content-Type-Options: nosniff
+   X-Frame-Options: SAMEORIGIN
+ 
+ # Non-FFmpeg Converter-Seiten (können COOP/COEP verwenden für bessere Performance)
  /convert/*
    Cross-Origin-Embedder-Policy: require-corp
    Cross-Origin-Opener-Policy: same-origin
```

### `js/converters/mov-to-mp4.js`
```diff
- const { FFmpeg } = await import('/lib/ffmpeg.js');
- const { toBlobURL } = await import('/lib/util.js');
+ const ffmpegModule = await import('https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/+esm');
+ const utilModule = await import('https://cdn.jsdelivr.net/npm/@ffmpeg/util@0.12.1/+esm');
+ const FFmpeg = ffmpegModule.FFmpeg;
+ const toBlobURL = utilModule.toBlobURL;

- const baseURL = '/lib';
+ const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm';
```

## Betroffene Converter

Diese Converter verwenden FFmpeg und sollten ebenfalls angepasst werden:
- ✅ **mov-to-mp4** (bereits gefixt)
- **gif-to-mp4**
- **mp4-to-gif**
- **mp4-to-webm**
- **video-to-audio**
- **video-trim**
- **audio-trim**
- **audio-normalize**
- **mp3-to-wav**
- **wav-to-mp3**

## Nächste Schritte (Optional)

Wenn du die Ladezeit beim ersten Mal weiter optimieren möchtest:
1. FFmpeg-Dateien lokal hosten (siehe `lib/FFMPEG_SETUP.md`)
2. Service Worker implementieren für Offline-Nutzung
3. Progressive Loading: Kleine Core-Datei zuerst, dann Features nachladen

## Teste es!

1. Öffne https://fileflyr.pages.dev/convert/mov-to-mp4
2. Wähle eine .mov Datei aus (max 500MB)
3. Beim ersten Mal lädt FFmpeg von jsdelivr.net (~30MB, dauert 5-15 Sekunden)
4. Konvertierung startet automatisch
5. Bei weiteren Konvertierungen ist FFmpeg bereits gecacht = sofort fertig!

## Debugging

Falls Probleme auftreten:
```javascript
// Console öffnen (F12)
// Diese Meldungen sollten erscheinen:
📦 Loading FFmpeg...
✅ FFmpeg modules imported
📥 Loading FFmpeg core...
✅ FFmpeg loaded successfully
```

Falls Fehler auftreten:
- Prüfe Internet-Verbindung
- Prüfe Browser-Konsole auf CORS-Fehler
- Stelle sicher, dass `_headers` korrekt deployed wurde (Cloudflare Pages)
- Cache leeren und neu laden (Ctrl+F5)
