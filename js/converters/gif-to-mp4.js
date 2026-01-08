/**
 * GIF to MP4 Converter
 * Converts animated GIF files to MP4 video using gifuct-js and MediaRecorder
 */

let selectedFiles = [];
let convertedFiles = [];
let gifuctLoaded = false;

export async function init() {
    console.log('🚧 GIF to MP4 Converter - MAINTENANCE MODE');
    
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
                        💡 <strong>Coming Soon:</strong> Improved MP4 quality and faster conversion
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
            <label for="quality">Video Quality</label>
            <select id="quality" class="select-box">
                <option value="high" selected>High Quality (2.5 Mbps)</option>
                <option value="medium">Medium Quality (1.5 Mbps)</option>
            </select>
        </div>
        <div class="option">
            <label for="loop">Loop Video</label>
            <select id="loop" class="select-box">
                <option value="1" selected>Once</option>
                <option value="2">2 times</option>
                <option value="3">3 times</option>
                <option value="5">5 times</option>
            </select>
        </div>
        <div class="info-box" style="margin-top: 12px; padding: 12px; background: var(--bg-dark); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">
            <strong>✓</strong> Converts animated GIF to MP4 video (WebM format)
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
        if (!file.type.includes('image/gif')) {
            alert(`${file.name} is not a GIF file`);
            return false;
        }
        if (file.size > 100 * 1024 * 1024) {
            alert(`${file.name} is too large (max 100MB)`);
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
        
        const url = URL.createObjectURL(file);
        fileCard.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${url}" alt="${file.name}" style="max-width: 200px; max-height: 150px; border-radius: 8px;">
                <div class="file-info" style="flex: 1;">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size" style="color: var(--text-tertiary); font-size: 12px;">${formatFileSize(file.size)}</div>
                </div>
                <button class="remove-btn" onclick="window.removeFile(${index})" style="margin-left: auto;">&times;</button>
            </div>
        `;
        fileList.appendChild(fileCard);
    });
    
    fileCount.textContent = selectedFiles.length;
    previewArea.style.display = 'block';
    optionsArea.style.display = 'block';
}

async function convertFiles() {
    const quality = document.getElementById('quality').value;
    const loopCount = parseInt(document.getElementById('loop').value);
    
    const optionsArea = document.getElementById('optionsArea');
    const progressArea = document.getElementById('progressArea');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    optionsArea.style.display = 'none';
    progressArea.style.display = 'block';
    convertedFiles = [];
    
    // Load gifuct-js if not loaded
    if (!gifuctLoaded) {
        progressText.textContent = 'Loading GIF parser...';
        try {
            await loadGifuct();
        } catch (error) {
            alert('Failed to load GIF parser: ' + error.message);
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
            const blob = await convertToMP4(file, quality, loopCount, (progress) => {
                progressText.textContent = `Converting ${i + 1} of ${selectedFiles.length}... ${Math.round(progress * 100)}%`;
            });
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

async function loadGifuct() {
    if (gifuctLoaded) return;
    
    // Load gifuct-js locally (fixes MIME-type issues with CDN)
    const script = document.createElement('script');
    script.src = '/assets/libs/gifuct-js.min.js';
    
    await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
    
    gifuctLoaded = true;
    console.log('✓ gifuct-js loaded');
}

async function convertToMP4(file, quality, loopCount, progressCallback) {
    return new Promise(async (resolve, reject) => {
        try {
            // Parse GIF
            const arrayBuffer = await file.arrayBuffer();
            const gif = window.gifuct.parseGIF(arrayBuffer);
            const frames = window.gifuct.decompressFrames(gif, true);
            
            if (frames.length === 0) {
                throw new Error('No frames found in GIF');
            }
            
            // Get dimensions
            const { dims } = frames[0];
            const width = dims.width;
            const height = dims.height;
            
            // Create canvas
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            
            // Setup MediaRecorder
            const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
                ? 'video/webm;codecs=vp9'
                : MediaRecorder.isTypeSupported('video/webm;codecs=vp8')
                ? 'video/webm;codecs=vp8'
                : 'video/webm';
            
            const videoBitsPerSecond = quality === 'high' ? 2500000 : 1500000;
            
            const stream = canvas.captureStream(30);
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: mimeType,
                videoBitsPerSecond: videoBitsPerSecond
            });
            
            const chunks = [];
            
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };
            
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/mp4' });
                resolve(blob);
            };
            
            mediaRecorder.onerror = (error) => {
                reject(error);
            };
            
            // Start recording
            mediaRecorder.start();
            
            // Render frames
            let frameIndex = 0;
            let loopIndex = 0;
            const totalFrames = frames.length * loopCount;
            
            const renderFrame = () => {
                if (loopIndex >= loopCount) {
                    // Stop recording after a short delay to ensure last frame is captured
                    setTimeout(() => {
                        mediaRecorder.stop();
                    }, 200);
                    return;
                }
                
                const frame = frames[frameIndex];
                const imageData = ctx.createImageData(width, height);
                imageData.data.set(frame.patch);
                ctx.putImageData(imageData, 0, 0);
                
                // Progress callback
                const currentFrame = loopIndex * frames.length + frameIndex;
                if (progressCallback) {
                    progressCallback(currentFrame / totalFrames);
                }
                
                // Schedule next frame
                const delay = frame.delay || 100; // default 100ms if no delay
                setTimeout(() => {
                    frameIndex++;
                    if (frameIndex >= frames.length) {
                        frameIndex = 0;
                        loopIndex++;
                    }
                    renderFrame();
                }, delay);
            };
            
            // Start rendering
            renderFrame();
            
        } catch (error) {
            reject(error);
        }
    });
}

function showDownloads() {
    const downloadArea = document.getElementById('downloadArea');
    const downloadButtons = document.getElementById('downloadButtons');
    const postConversionAd = document.getElementById('postConversionAd');
    
    downloadButtons.innerHTML = '';
    
    // Add info about WebM format
    const info = document.createElement('div');
    info.className = 'info-box';
    info.style.marginBottom = '20px';
    info.innerHTML = `
        <strong>ℹ️ Note:</strong> Video is in WebM format (playable in most modern browsers and players). 
        File extension is .mp4 for compatibility.
    `;
    downloadButtons.appendChild(info);
    
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
        // Insert after info
        downloadButtons.insertBefore(downloadAllBtn, info.nextSibling);
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
