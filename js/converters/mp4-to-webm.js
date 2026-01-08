/**
 * MP4 to WEBM Converter
 * Converts MP4 videos to WEBM format with automatic codec detection
 */

let selectedFiles = [];
let convertedFiles = [];

export async function init() {
    console.log('🎬 MP4 to WEBM Converter initialized');
    
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
    
    // Detect supported codecs
    const supportedCodecs = [];
    if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
        supportedCodecs.push({ value: 'vp9', label: 'VP9 (Better Compression)' });
    }
    if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
        supportedCodecs.push({ value: 'vp8', label: 'VP8 (Wider Support)' });
    }
    if (MediaRecorder.isTypeSupported('video/webm')) {
        supportedCodecs.push({ value: 'default', label: 'Browser Default' });
    }
    
    // Setup options
    const codecOptions = supportedCodecs.length > 0
        ? supportedCodecs.map((c, i) => `<option value="${c.value}" ${i === 0 ? 'selected' : ''}>${c.label}</option>`).join('')
        : '<option value="default">Browser Default</option>';
    
    optionsContent.innerHTML = `
        <div class="option">
            <label for="quality">Video Quality</label>
            <select id="quality" class="select-box">
                <option value="2500000">High (2.5 Mbps)</option>
                <option value="1500000" selected>Medium (1.5 Mbps)</option>
                <option value="800000">Low (800 Kbps)</option>
            </select>
        </div>
        <div class="option">
            <label for="codec">Video Codec</label>
            <select id="codec" class="select-box">
                ${codecOptions}
            </select>
        </div>
        <div class="info-box" style="margin-top: 12px; padding: 12px; background: var(--bg-dark); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">
            <strong>Note:</strong> WEBM is a modern web video format. Codec selected based on your browser's capabilities.
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
        if (!file.type.includes('video/mp4')) {
            alert(`${file.name} is not an MP4 file`);
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

async function convertFiles() {
    const bitrate = parseInt(document.getElementById('quality').value);
    const codecChoice = document.getElementById('codec').value;
    
    const optionsArea = document.getElementById('optionsArea');
    const progressArea = document.getElementById('progressArea');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    optionsArea.style.display = 'none';
    progressArea.style.display = 'block';
    convertedFiles = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        progressText.textContent = `Converting ${i + 1} of ${selectedFiles.length}...`;
        progressFill.style.width = ((i / selectedFiles.length) * 100) + '%';
        
        try {
            const blob = await convertToWEBM(file, bitrate, codecChoice);
            const fileName = file.name.replace(/\.[^/.]+$/, '') + '.webm';
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

async function convertToWEBM(file, bitrate, codecChoice) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        const url = URL.createObjectURL(file);
        video.src = url;
        video.preload = 'metadata';
        video.muted = true;
        
        video.onloadedmetadata = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                
                const stream = canvas.captureStream(30);
                
                // Determine MIME type based on codec choice and support
                let mimeType;
                let recorderOptions = { videoBitsPerSecond: bitrate };
                
                if (codecChoice === 'vp9' && MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
                    mimeType = 'video/webm;codecs=vp9';
                } else if (codecChoice === 'vp8' && MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
                    mimeType = 'video/webm;codecs=vp8';
                } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
                    // Fallback to VP8
                    mimeType = 'video/webm;codecs=vp8';
                } else if (MediaRecorder.isTypeSupported('video/webm')) {
                    // Fallback to default WEBM
                    mimeType = 'video/webm';
                } else {
                    // Last resort - no MIME type specified
                    mimeType = null;
                }
                
                if (mimeType) {
                    recorderOptions.mimeType = mimeType;
                }
                
                console.log('Using codec:', mimeType || 'browser default');
                
                const recorder = new MediaRecorder(stream, recorderOptions);
                
                const chunks = [];
                recorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };
                
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'video/webm' });
                    URL.revokeObjectURL(url);
                    resolve(blob);
                };
                
                recorder.onerror = (e) => {
                    URL.revokeObjectURL(url);
                    reject(new Error('Recording failed: ' + e.message));
                };
                
                let frameCount = 0;
                const maxFrames = Math.floor(video.duration * 30);
                
                const drawFrame = () => {
                    if (!video.ended && !video.paused && frameCount < maxFrames) {
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        frameCount++;
                        requestAnimationFrame(drawFrame);
                    } else {
                        recorder.stop();
                    }
                };
                
                video.onseeked = () => {
                    recorder.start();
                    video.play();
                    drawFrame();
                };
                
                video.currentTime = 0;
                
            } catch (error) {
                URL.revokeObjectURL(url);
                reject(error);
            }
        };
        
        video.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load video'));
        };
    });
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
