/**
 * MP4 to GIF Converter
 * Converts MP4 videos to animated GIF format using gif.js
 */

let selectedFiles = [];
let convertedFiles = [];
let gifJsLoaded = false;

export async function init() {
    console.log('🚧 MP4 to GIF Converter - MAINTENANCE MODE');
    
    // Show maintenance message
    const mainContent = document.querySelector('.converter-content');
    if (mainContent) {
        mainContent.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 80px; margin-bottom: 20px;">🚧</div>
                <h2 style="color: var(--text); font-size: 32px; margin-bottom: 16px;">Under Maintenance</h2>
                <p style="color: var(--text-secondary); font-size: 18px; line-height: 1.6; margin-bottom: 24px;">
                    We're currently upgrading this converter to provide you with better performance and reliability.
                </p>
                <div style="background: var(--bg-dark); border-radius: 12px; padding: 24px; margin-top: 32px;">
                    <p style="color: var(--text-tertiary); font-size: 14px; margin: 0;">
                        💡 <strong>Coming Soon:</strong> Improved GIF quality and faster conversion
                    </p>
                </div>
                <a href="/" style="display: inline-block; margin-top: 32px; padding: 12px 32px; background: var(--primary); color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
                    ← Back to Home
                </a>
            </div>
        `;
    }
    return;
    
    // Get UI elements (disabled during maintenance)
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
            <label for="fps">Frame Rate</label>
            <select id="fps" class="select-box">
                <option value="10">10 FPS (Smaller File)</option>
                <option value="15" selected>15 FPS (Balanced)</option>
                <option value="24">24 FPS (Smoother)</option>
                <option value="30">30 FPS (Smoothest)</option>
            </select>
        </div>
        <div class="option">
            <label for="width">Width (px)</label>
            <input type="number" id="width" placeholder="e.g. 480" value="480">
        </div>
        <div class="option">
            <label for="duration">Max Duration (seconds)</label>
            <input type="number" id="duration" placeholder="e.g. 5" value="5" min="1" max="10">
        </div>
        <div class="info-box">
            <strong>Note:</strong> GIF files are much larger than MP4. Keep duration short and resolution low for best results.
        </div>
    `;
    
    // File input handling
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
    
    // Drop zone handling
    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary)';
        dropZone.style.background = 'rgba(99, 102, 241, 0.05)';
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'var(--border)';
        dropZone.style.background = 'transparent';
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        dropZone.style.background = 'transparent';
        handleFiles(e.dataTransfer.files);
    });
    
    // Convert button
    convertBtn.addEventListener('click', convertFiles);
    
    // Reset button
    resetBtn.addEventListener('click', reset);
}

function handleFiles(files) {
    const validFiles = Array.from(files).filter(file => {
        if (!file.type.includes('video/mp4')) {
            showError(`${file.name} is not an MP4 file`);
            return false;
        }
        if (file.size > 100 * 1024 * 1024) {
            showError(`${file.name} is too large (max 100MB)`);
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
    
    fileList.innerHTML = '';
    selectedFiles.forEach((file, index) => {
        const fileCard = document.createElement('div');
        fileCard.className = 'file-item';
        
        // Create video preview
        const url = URL.createObjectURL(file);
        const video = document.createElement('video');
        video.src = url;
        video.className = 'file-preview';
        video.controls = true;
        video.muted = true;
        
        fileCard.innerHTML = `
            <div class="file-icon">🎬</div>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${formatFileSize(file.size)}</div>
            </div>
            <button class="remove-btn" onclick="window.removeFile(${index})">&times;</button>
        `;
        fileList.appendChild(fileCard);
    });
    
    fileCount.textContent = selectedFiles.length;
    previewArea.style.display = 'block';
    optionsArea.style.display = 'block';
}

async function convertFiles() {
    const fps = parseInt(document.getElementById('fps').value);
    const width = parseInt(document.getElementById('width').value) || 480;
    const maxDuration = parseInt(document.getElementById('duration').value) || 5;
    
    const optionsArea = document.getElementById('optionsArea');
    const progressArea = document.getElementById('progressArea');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    optionsArea.style.display = 'none';
    progressArea.style.display = 'block';
    convertedFiles = [];
    
    // Load gif.js if not loaded
    if (!gifJsLoaded) {
        progressText.textContent = 'Loading GIF library...';
        try {
            await loadGifJs();
        } catch (error) {
            alert('Failed to load GIF library: ' + error.message);
            progressArea.style.display = 'none';
            optionsArea.style.display = 'block';
            return;
        }
    }
    
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        progressText.textContent = `Converting ${i + 1} of ${selectedFiles.length}...`;
        progressFill.style.width = ((i / selectedFiles.length) * 100) + '%';
        
        try {
            const blob = await convertToGIF(file, fps, width, maxDuration, (progress) => {
                progressText.textContent = `Converting ${i + 1} of ${selectedFiles.length}... ${Math.round(progress * 100)}%`;
            });
            const fileName = file.name.replace(/\.[^/.]+$/, '') + '.gif';
            convertedFiles.push({ blob, fileName });
        } catch (error) {
            console.error('Conversion error:', error);
            showError(`Failed to convert ${file.name}: ${error.message}`);
        }
    }
    
    progressFill.style.width = '100%';
    progressText.textContent = 'Conversion complete!';
    
    setTimeout(() => {
        progressArea.style.display = 'none';
        showDownloads();
    }, 500);
}

async function loadGifJs() {
    if (gifJsLoaded) return;
    
    // Load gif.js locally (fixes CORS issues with worker)
    const script = document.createElement('script');
    script.src = '/assets/libs/gif.js';
    
    await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
    
    gifJsLoaded = true;
    console.log('✓ gif.js loaded');
}

async function convertToGIF(file, fps, targetWidth, maxDuration, progressCallback) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        const url = URL.createObjectURL(file);
        video.src = url;
        video.preload = 'metadata';
        
        video.onloadedmetadata = async () => {
            try {
                // Calculate dimensions maintaining aspect ratio
                const aspectRatio = video.videoWidth / video.videoHeight;
                const width = targetWidth;
                const height = Math.round(width / aspectRatio);
                
                // Limit duration
                const duration = Math.min(video.duration, maxDuration);
                const frameCount = Math.floor(duration * fps);
                const frameInterval = duration / frameCount;
                const delay = 1000 / fps; // delay in ms
                
                // Create canvas for frame capture
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                
                // Initialize GIF encoder
                const gif = new GIF({
                    workers: 2,
                    quality: 10,
                    width: width,
                    height: height,
                    workerScript: '/assets/libs/gif.worker.js'  // Local worker - no CORS issues
                });
                
                // Capture and add frames
                for (let i = 0; i < frameCount; i++) {
                    video.currentTime = i * frameInterval;
                    await new Promise(resolve => video.onseeked = resolve);
                    
                    ctx.drawImage(video, 0, 0, width, height);
                    gif.addFrame(ctx, { copy: true, delay: delay });
                    
                    if (progressCallback) {
                        progressCallback(i / frameCount);
                    }
                }
                
                // Render GIF
                gif.on('finished', (blob) => {
                    URL.revokeObjectURL(url);
                    resolve(blob);
                });
                
                gif.on('progress', (progress) => {
                    if (progressCallback) {
                        progressCallback(progress);
                    }
                });
                
                gif.render();
                
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
    
    // Add warning about GIF size
    const warning = document.createElement('div');
    warning.className = 'info-box';
    warning.style.marginBottom = '20px';
    warning.innerHTML = `
        <strong>⚠️ Note:</strong> GIF files are typically much larger than MP4. 
        Consider keeping the file for web use only.
    `;
    downloadButtons.appendChild(warning);
    
    convertedFiles.forEach((file, index) => {
        const btn = window.createDownloadButton?.(file.blob, file.fileName);
        if (btn) {
            downloadButtons.appendChild(btn);
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
        // Insert after warning
        const warning = downloadButtons.querySelector('.info-box');
        if (warning) {
            downloadButtons.insertBefore(downloadAllBtn, warning.nextSibling);
        } else {
            downloadButtons.insertBefore(downloadAllBtn, downloadButtons.firstChild);
        }
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
    document.getElementById('postConversionAd').style.display = 'none';
    document.getElementById('fileInput').value = '';
}

// Utility functions
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

function showError(message) {
    alert(message); // TODO: Better error UI
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
