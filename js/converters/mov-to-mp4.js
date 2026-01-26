/**
 * MOV to MP4 Converter
 * Converts MOV videos to MP4 format using FFmpeg.wasm (loaded from unpkg.com CDN)
 */

let selectedFiles = [];
let convertedFiles = [];
let ffmpeg = null;
let ffmpegLoaded = false;

export async function init() {
    console.log('🎬 MOV to MP4 Converter initialized');
    
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const fileList = document.getElementById('fileList');
    const optionsArea = document.getElementById('optionsArea');
    const optionsContent = document.getElementById('optionsContent');
    const convertBtn = document.getElementById('convertBtn');
    const progressArea = document.getElementById('progressArea');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const downloadArea = document.getElementById('downloadArea');
    const downloadButtons = document.getElementById('downloadButtons');
    const resetBtn = document.getElementById('resetBtn');
    
    // Setup options
    optionsContent.innerHTML = `
        <div class="option">
            <label for="quality">Video Quality</label>
            <select id="quality" class="select-box">
                <option value="high">High Quality (Original)</option>
                <option value="medium" selected>Medium Quality (Balanced)</option>
                <option value="low">Low Quality (Smaller File)</option>
            </select>
        </div>
        <div class="option">
            <label for="codec">Video Codec</label>
            <select id="codec" class="select-box">
                <option value="h264" selected>H.264 (Most Compatible)</option>
                <option value="h265">H.265/HEVC (Better Compression)</option>
            </select>
        </div>
        <div class="info-box" style="margin-top: 12px; padding: 12px; background: var(--bg-dark); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">
            <strong>Note:</strong> MP4 with H.264 codec is the most compatible video format for web and mobile devices. First conversion loads FFmpeg (~30MB) from CDN - subsequent conversions are instant.
        </div>
    `;
    
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => { dropZone.classList.remove('drag-over'); });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });
    
    convertBtn.addEventListener('click', convertFiles);
    resetBtn.addEventListener('click', reset);
}

function handleFiles(files) {
    const validFiles = Array.from(files).filter(file => {
        // Check for MOV files (video/quicktime or .mov extension)
        const isMov = file.type.includes('video/quicktime') || 
                     file.type.includes('video/mov') || 
                     file.name.toLowerCase().endsWith('.mov');
        
        if (!isMov) {
            alert(`${file.name} is not a MOV file`);
            return false;
        }
        if (file.size > 500 * 1024 * 1024) {
            alert(`${file.name} is too large (max 500MB)`);
            return false;
        }
        return true;
    });
    
    if (validFiles.length === 0) return;
    
    selectedFiles = validFiles;
    displayFiles();
}

function displayFiles() {
    const fileList = document.getElementById('fileList');
    const previewArea = document.getElementById('previewArea');
    const fileCount = document.getElementById('fileCount');
    const optionsArea = document.getElementById('optionsArea');
    const dropZone = document.getElementById('dropZone');
    
    fileList.innerHTML = '';
    
    // Bei einer einzelnen Datei: Großes Video-Preview
    if (selectedFiles.length === 1) {
        const file = selectedFiles[0];
        const url = URL.createObjectURL(file);
        
        // Grid-Layout deaktivieren bei einzelner Datei
        fileList.style.display = 'block';
        
        fileList.innerHTML = `
            <div class="file-item" style="display: flex; flex-direction: column; gap: 16px;">
                <video src="${url}" controls style="width: 100%; max-height: 500px; border-radius: 12px; background: #000;"></video>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="file-info">
                        <div class="file-name">${file.name}</div>
                        <div class="file-size" style="color: var(--text-tertiary); font-size: 12px;">${formatFileSize(file.size)}</div>
                    </div>
                    <button class="remove-btn" onclick="window.removeFile(0)">Remove</button>
                </div>
            </div>
        `;
        
        // Dropbox verstecken bei einzelner Datei
        dropZone.style.display = 'none';
    } else {
        // Bei mehreren Dateien: Grid-Liste
        fileList.style.display = 'grid';
        
        selectedFiles.forEach((file, index) => {
            const fileCard = document.createElement('div');
            fileCard.className = 'file-item';
            
            const url = URL.createObjectURL(file);
            fileCard.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <video src="${url}" controls muted style="max-width: 200px; max-height: 150px; border-radius: 8px;"></video>
                    <div class="file-info" style="flex: 1;">
                        <div class="file-name">${file.name}</div>
                        <div class="file-size" style="color: var(--text-tertiary); font-size: 12px;">${formatFileSize(file.size)}</div>
                    </div>
                    <button class="remove-btn" onclick="window.removeFile(${index})" style="margin-left: auto;">&times;</button>
                </div>
            `;
            fileList.appendChild(fileCard);
        });
        
        // Dropbox bleibt sichtbar bei mehreren Dateien
        dropZone.style.display = 'flex';
    }
    
    fileCount.textContent = selectedFiles.length;
    previewArea.style.display = 'block';
    optionsArea.style.display = 'block';
}

async function loadFFmpeg() {
    if (ffmpegLoaded) return;
    
    console.log('📦 Loading FFmpeg...');
    
    try {
        // Lade FFmpeg direkt von unpkg.com (funktioniert ohne COEP/COOP)
        const { FFmpeg } = await import('https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js');
        const { toBlobURL, fetchFile } = await import('https://unpkg.com/@ffmpeg/util@0.12.1/dist/esm/index.js');
        
        console.log('✅ FFmpeg modules imported');
        
        ffmpeg = new FFmpeg();
        
        ffmpeg.on('log', ({ message }) => {
            console.log('[FFmpeg]', message);
        });
        
        ffmpeg.on('progress', ({ progress }) => {
            const progressFill = document.getElementById('progressFill');
            const progressText = document.getElementById('progressText');
            if (progressFill && progressText) {
                const percent = Math.min(Math.round(progress * 100), 100);
                progressFill.style.width = `${percent}%`;
                progressText.textContent = `Converting... ${percent}%`;
            }
        });
        
        // Load FFmpeg core von unpkg.com
        console.log('📥 Loading FFmpeg core...');
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
        
        await ffmpeg.load({
            coreURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.js`,
                'text/javascript'
            ),
            wasmURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.wasm`,
                'application/wasm'
            ),
            workerURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.worker.js`,
                'text/javascript'
            ),
        });
        
        ffmpegLoaded = true;
        console.log('✅ FFmpeg loaded successfully');
        
    } catch (error) {
        console.error('❌ FFmpeg loading failed:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        throw new Error(`Failed to load FFmpeg: ${error.message}`);
    }
}

async function convertFiles() {
    const quality = document.getElementById('quality').value;
    const codec = document.getElementById('codec').value;
    
    const optionsArea = document.getElementById('optionsArea');
    const progressArea = document.getElementById('progressArea');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    optionsArea.style.display = 'none';
    progressArea.style.display = 'block';
    convertedFiles = [];
    
    // Load FFmpeg if not loaded
    if (!ffmpegLoaded) {
        progressText.textContent = 'Loading FFmpeg (first time only)...';
        progressFill.style.width = '0%';
        try {
            await loadFFmpeg();
        } catch (error) {
            console.error('FFmpeg loading error:', error);
            alert(`Failed to load FFmpeg: ${error.message}\n\nPlease check your internet connection and try again.`);
            progressArea.style.display = 'none';
            optionsArea.style.display = 'block';
            return;
        }
    }
    
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        progressText.textContent = `Converting ${i + 1} of ${selectedFiles.length}...`;
        progressFill.style.width = '0%';
        
        try {
            const blob = await convertToMP4(file, quality, codec);
            const fileName = file.name.replace(/\.[^/.]+$/, '') + '.mp4';
            convertedFiles.push({ blob, fileName });
        } catch (error) {
            console.error('Conversion error:', error);
            alert(`Failed to convert ${file.name}: ${error.message}`);
        }
    }
    
    progressFill.style.width = '100%';
    progressText.textContent = 'Conversion complete!';
    
    setTimeout(() => {
        progressArea.style.display = 'none';
        showDownloads();
    }, 500);
}

async function convertToMP4(file, quality, codec) {
    const inputName = 'input.mov';
    const outputName = 'output.mp4';
    
    console.log(`🎬 Converting ${file.name}...`);
    
    // Write input file to FFmpeg virtual file system
    const arrayBuffer = await file.arrayBuffer();
    await ffmpeg.writeFile(inputName, new Uint8Array(arrayBuffer));
    
    // Build FFmpeg command based on quality and codec
    const args = ['-i', inputName];
    
    // Video codec
    if (codec === 'h265') {
        args.push('-c:v', 'libx265');
    } else {
        args.push('-c:v', 'libx264');
    }
    
    // Quality settings (CRF: lower = better quality, higher = smaller file)
    if (quality === 'high') {
        args.push('-crf', '18');  // Near-lossless
    } else if (quality === 'medium') {
        args.push('-crf', '23');  // Good balance
    } else {
        args.push('-crf', '28');  // Smaller files
    }
    
    // Additional settings for web compatibility
    args.push(
        '-preset', 'medium',       // Encoding speed vs compression
        '-movflags', '+faststart',  // Enable fast start for web playback
        '-c:a', 'aac',              // Audio codec (AAC is standard for MP4)
        '-b:a', '128k',             // Audio bitrate
        '-pix_fmt', 'yuv420p',      // Pixel format for compatibility
        outputName
    );
    
    console.log('FFmpeg command:', args.join(' '));
    
    // Execute FFmpeg command
    await ffmpeg.exec(args);
    
    // Read output file
    const data = await ffmpeg.readFile(outputName);
    
    // Clean up
    await ffmpeg.deleteFile(inputName);
    await ffmpeg.deleteFile(outputName);
    
    console.log('✅ Conversion complete');
    
    // Return as Blob
    return new Blob([data.buffer], { type: 'video/mp4' });
}

function showDownloads() {
    const downloadArea = document.getElementById('downloadArea');
    const downloadButtons = document.getElementById('downloadButtons');
    const postConversionAd = document.getElementById('postConversionAd');
    
    downloadButtons.innerHTML = '';
    
    convertedFiles.forEach((file) => {
        const btn = window.createDownloadButton?.(file.blob, file.fileName);
        if (btn) {
            downloadButtons.appendChild(btn);
        } else {
            // Fallback
            const fallbackBtn = document.createElement('button');
            fallbackBtn.className = 'download-btn';
            fallbackBtn.textContent = `Download ${file.fileName}`;
            fallbackBtn.onclick = () => window.downloadFile?.(file.blob, file.fileName);
            downloadButtons.appendChild(fallbackBtn);
        }
    });
    
    if (convertedFiles.length > 1) {
        const downloadAllBtn = document.createElement('button');
        downloadAllBtn.className = 'download-btn';
        downloadAllBtn.style.background = 'var(--primary)';
        downloadAllBtn.textContent = `Download All (${convertedFiles.length} files)`;
        downloadAllBtn.onclick = () => {
            convertedFiles.forEach(({ blob, fileName }) => {
                setTimeout(() => window.downloadFile?.(blob, fileName), 100);
            });
        };
        downloadButtons.insertBefore(downloadAllBtn, downloadButtons.firstChild);
    }
    
    downloadArea.style.display = 'block';
    if (postConversionAd) postConversionAd.style.display = 'block';
}

function reset() {
    selectedFiles = [];
    convertedFiles = [];
    
    document.getElementById('previewArea').style.display = 'none';
    document.getElementById('optionsArea').style.display = 'none';
    document.getElementById('progressArea').style.display = 'none';
    document.getElementById('downloadArea').style.display = 'none';
    const postConversionAd = document.getElementById('postConversionAd');
    if (postConversionAd) postConversionAd.style.display = 'none';
    document.getElementById('fileInput').value = '';
    document.getElementById('fileList').innerHTML = '';
    document.getElementById('dropZone').style.display = 'flex';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Make removeFile globally accessible
window.removeFile = function(index) {
    selectedFiles.splice(index, 1);
    if (selectedFiles.length === 0) {
        reset();
    } else {
        displayFiles();
    }
};
