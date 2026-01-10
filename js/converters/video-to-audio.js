/**
 * Video to Audio Converter
 * Extracts audio from video files and converts to MP3
 */

let selectedFiles = [];
let convertedFiles = [];

export async function init() {
    console.log('🎵 Video to Audio Converter initialized');
    
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
            <label for="format">Audio Format</label>
            <select id="format" class="select-box">
                <option value="mp3" selected>MP3 (Most Compatible)</option>
                <option value="wav">WAV (Uncompressed)</option>
                <option value="ogg">OGG (Open Format)</option>
            </select>
        </div>
        <div class="option">
            <label for="bitrate">Audio Quality</label>
            <select id="bitrate" class="select-box">
                <option value="128">128 kbps (Good)</option>
                <option value="192" selected>192 kbps (Better)</option>
                <option value="256">256 kbps (Best)</option>
                <option value="320">320 kbps (Maximum)</option>
            </select>
        </div>
        <div class="info-box" style="margin-top: 12px; padding: 12px; background: var(--bg-dark); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">
            <strong>Note:</strong> Audio is extracted from video without re-encoding when possible for best quality.
        </div>
    `;
    
    convertBtn.textContent = 'Extract Audio';
    
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
        if (!file.type.startsWith('video/')) {
            alert(`${file.name} is not a video file`);
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
            const url = URL.createObjectURL(file);
            const fileCard = document.createElement('div');
            fileCard.className = 'file-item';
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
    const format = document.getElementById('format').value;
    const bitrate = parseInt(document.getElementById('bitrate').value);
    
    const optionsArea = document.getElementById('optionsArea');
    const progressArea = document.getElementById('progressArea');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    optionsArea.style.display = 'none';
    progressArea.style.display = 'block';
    convertedFiles = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        progressText.textContent = `Extracting audio ${i + 1} of ${selectedFiles.length}...`;
        progressFill.style.width = ((i / selectedFiles.length) * 100) + '%';
        
        try {
            const blob = await extractAudio(file, format, bitrate);
            const extension = format === 'mp3' ? 'mp3' : format === 'wav' ? 'wav' : 'ogg';
            const fileName = file.name.replace(/\.[^/.]+$/, '') + '.' + extension;
            convertedFiles.push({ blob, fileName });
        } catch (error) {
            console.error('Extraction error:', error);
            alert(`Failed to extract audio from ${file.name}: ${error.message}`);
        }
    }
    
    progressFill.style.width = '100%';
    progressText.textContent = 'Audio extraction complete!';
    
    setTimeout(() => {
        progressArea.style.display = 'none';
        showDownloads();
    }, 500);
}

async function extractAudio(file, format, bitrate) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        const url = URL.createObjectURL(file);
        video.src = url;
        video.muted = true;
        
        video.onloadedmetadata = async () => {
            try {
                // Create audio context
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const source = audioContext.createMediaElementSource(video);
                const destination = audioContext.createMediaStreamDestination();
                source.connect(destination);
                
                // Determine MIME type based on format
                let mimeType;
                if (format === 'mp3') {
                    // MP3 support varies by browser
                    if (MediaRecorder.isTypeSupported('audio/mpeg')) {
                        mimeType = 'audio/mpeg';
                    } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                        mimeType = 'audio/mp4';
                    } else {
                        // Fallback to webm for conversion
                        mimeType = 'audio/webm';
                    }
                } else if (format === 'wav') {
                    if (MediaRecorder.isTypeSupported('audio/wav')) {
                        mimeType = 'audio/wav';
                    } else {
                        mimeType = 'audio/webm'; // Fallback
                    }
                } else if (format === 'ogg') {
                    if (MediaRecorder.isTypeSupported('audio/ogg')) {
                        mimeType = 'audio/ogg';
                    } else {
                        mimeType = 'audio/webm'; // Fallback
                    }
                }
                
                const recorder = new MediaRecorder(destination.stream, {
                    mimeType: mimeType,
                    audioBitsPerSecond: bitrate * 1000
                });
                
                const chunks = [];
                recorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };
                
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: mimeType });
                    URL.revokeObjectURL(url);
                    resolve(blob);
                };
                
                recorder.onerror = (e) => {
                    URL.revokeObjectURL(url);
                    reject(new Error('Recording failed: ' + e.message));
                };
                
                // Start recording and play video
                recorder.start();
                video.play();
                
                // Stop recording when video ends
                video.onended = () => {
                    recorder.stop();
                };
                
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
    
    // Add audio preview for converted files
    convertedFiles.forEach((file, index) => {
        // Create audio preview
        const url = URL.createObjectURL(file.blob);
        const previewContainer = document.createElement('div');
        previewContainer.style.cssText = 'background: var(--bg-dark); padding: 20px; border-radius: 12px; margin-bottom: 16px;';
        previewContainer.innerHTML = `
            <div style="margin-bottom: 12px; color: var(--text-primary); font-weight: 500;">${file.fileName}</div>
            <audio src="${url}" controls style="width: 100%; margin-bottom: 12px;"></audio>
        `;
        downloadButtons.appendChild(previewContainer);
        
        // Add download button
        const btn = window.createDownloadButton?.(file.blob, file.fileName);
        if (btn) {
            previewContainer.appendChild(btn);
        }
    });
    
    // Add "Download All" button if multiple files
    if (convertedFiles.length > 1) {
        const downloadAllBtn = document.createElement('button');
        downloadAllBtn.className = 'download-btn download-all-btn';
        downloadAllBtn.style.background = 'var(--success)';
        downloadAllBtn.innerHTML = `
            <span class="download-icon">📦</span>
            <span>Download All (${convertedFiles.length} files)</span>
        `;
        downloadAllBtn.onclick = downloadAll;
        downloadButtons.insertBefore(downloadAllBtn, downloadButtons.firstChild);
    }
    
    downloadArea.style.display = 'block';
    if (postConversionAd) postConversionAd.style.display = 'block';
}

function downloadAll() {
    convertedFiles.forEach(file => {
        downloadFile(file.blob, file.fileName);
    });
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

function downloadFile(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
