/**
 * Video Trim - Mobile-friendly, wider layout, vertical design
 */

let selectedFile = null;
let currentVideo = null;
let trimmedBlob = null;

let trimState = {
    startTime: 0,
    endTime: 10,
    isDragging: false,
    dragHandle: null
};

export async function init() {
    console.log('✂️ Video Trim initialized');
    
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const fileList = document.getElementById('fileList');
    const fileCount = document.getElementById('fileCount');
    const optionsArea = document.getElementById('optionsArea');
    const optionsContent = document.getElementById('optionsContent');
    const convertBtn = document.getElementById('convertBtn');
    const progressArea = document.getElementById('progressArea');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const downloadArea = document.getElementById('downloadArea');
    const downloadButtons = document.getElementById('downloadButtons');
    const resetBtn = document.getElementById('resetBtn');
    const postConversionAd = document.getElementById('postConversionAd');

    // Override grid layout from .image-list CSS
    fileList.style.display = 'block';
    fileList.style.gridTemplateColumns = 'none';
    
    fileList.innerHTML = `
        <h3 style="margin-bottom: 16px; font-size: 20px; text-align: center;">Video Preview - Drag Handles to Trim</h3>
        <video id="videoPlayer" controls style="width: 100%; border-radius: 8px; margin: 20px 0;"></video>
        <p id="duration" style="color: var(--text-secondary); margin-bottom: 16px; text-align: center;"></p>
        
        <!-- Timeline Display -->
        <div id="timelineContainer" style="position: relative; width: 100%; height: 120px; background: var(--bg-dark); border-radius: 8px; overflow: hidden; user-select: none;">
            <!-- Timeline Background -->
            <div style="position: absolute; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); font-size: 13px;">
                <span id="timelineInfo">Video Timeline</span>
            </div>
            
            <!-- Trim Region -->
            <div id="trimRegion" style="position: absolute; top: 0; height: 100%; background: rgba(99, 102, 241, 0.2); border-left: 3px solid #6366f1; border-right: 3px solid #6366f1; pointer-events: none;"></div>
            
            <!-- Start Handle -->
            <div id="startHandle" style="position: absolute; top: 0; width: 20px; height: 100%; background: #6366f1; cursor: ew-resize; display: flex; align-items: center; justify-content: center;">
                <div style="width: 3px; height: 40px; background: white; border-radius: 2px;"></div>
            </div>
            
            <!-- End Handle -->
            <div id="endHandle" style="position: absolute; top: 0; width: 20px; height: 100%; background: #6366f1; cursor: ew-resize; display: flex; align-items: center; justify-content: center;">
                <div style="width: 3px; height: 40px; background: white; border-radius: 2px;"></div>
            </div>
            
            <!-- Time Display -->
            <div id="trimInfo" style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; pointer-events: none;">
                <span id="trimDuration">0:00 - 0:00</span>
            </div>
        </div>
        
        <!-- Quick Action Buttons -->
        <div style="display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap; justify-content: center;">
            <button id="previewStartBtn" style="padding: 10px 16px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary); cursor: pointer; font-size: 14px; font-weight: 500;">Preview Start</button>
            <button id="previewEndBtn" style="padding: 10px 16px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary); cursor: pointer; font-size: 14px; font-weight: 500;">Preview End</button>
            <button id="setCurrentStartBtn" style="padding: 10px 16px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary); cursor: pointer; font-size: 14px; font-weight: 500;">Use Current as Start</button>
            <button id="setCurrentEndBtn" style="padding: 10px 16px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary); cursor: pointer; font-size: 14px; font-weight: 500;">Use Current as End</button>
        </div>
    `;

    optionsContent.innerHTML = `
        <div class="option">
            <label for="startTime">Start Time (seconds)</label>
            <input type="number" id="startTime" value="0" min="0" step="0.1">
        </div>
        <div class="option">
            <label for="endTime">End Time (seconds)</label>
            <input type="number" id="endTime" value="10" min="0" step="0.1">
        </div>
    `;

    convertBtn.textContent = 'Trim Video';

    // Event listeners
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => { dropZone.classList.remove('drag-over'); });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleFile(e.target.files[0]);
    });
    convertBtn.addEventListener('click', trimVideo);
    resetBtn.addEventListener('click', reset);

    // Input synchronization
    document.addEventListener('input', (e) => {
        if (e.target.id === 'startTime' && currentVideo) {
            const value = parseFloat(e.target.value) || 0;
            trimState.startTime = Math.max(0, Math.min(value, trimState.endTime - 0.1));
            updateTrimUI();
        } else if (e.target.id === 'endTime' && currentVideo) {
            const value = parseFloat(e.target.value) || 0;
            trimState.endTime = Math.max(trimState.startTime + 0.1, Math.min(value, currentVideo.duration));
            updateTrimUI();
        }
    });

    // Preview buttons
    document.addEventListener('click', (e) => {
        if (e.target.id === 'previewStartBtn' && currentVideo) {
            currentVideo.currentTime = trimState.startTime;
            currentVideo.play();
        } else if (e.target.id === 'previewEndBtn' && currentVideo) {
            currentVideo.currentTime = Math.max(0, trimState.endTime - 2);
            currentVideo.play();
        } else if (e.target.id === 'setCurrentStartBtn' && currentVideo) {
            trimState.startTime = currentVideo.currentTime;
            updateTrimUI();
        } else if (e.target.id === 'setCurrentEndBtn' && currentVideo) {
            trimState.endTime = currentVideo.currentTime;
            updateTrimUI();
        }
    });

    async function handleFile(file) {
        if (!file.type.startsWith('video/')) {
            alert('Please select a video file.');
            return;
        }

        if (file.size > 500 * 1024 * 1024) {
            alert('File too large (max 500MB)');
            return;
        }

        selectedFile = file;
        currentVideo = document.getElementById('videoPlayer');
        
        const url = URL.createObjectURL(file);
        currentVideo.src = url;
        currentVideo.load();

        currentVideo.addEventListener('loadedmetadata', () => {
            const durationSec = currentVideo.duration;
            document.getElementById('duration').textContent = `Duration: ${formatTime(durationSec)}`;

            trimState.startTime = 0;
            trimState.endTime = durationSec;

            const endTimeInput = document.getElementById('endTime');
            const startTimeInput = document.getElementById('startTime');
            endTimeInput.value = durationSec.toFixed(2);
            endTimeInput.max = durationSec;
            startTimeInput.max = durationSec;
            startTimeInput.value = '0';

            dropZone.style.display = 'none';
            previewArea.style.display = 'block';
            optionsArea.style.display = 'block';
            fileCount.textContent = '1';

            setTimeout(() => {
                updateTrimUI();
                initDragEvents();
            }, 100);
        });
    }

    function updateTrimUI() {
        if (!currentVideo) return;

        const timelineContainer = document.getElementById('timelineContainer');
        const startHandle = document.getElementById('startHandle');
        const endHandle = document.getElementById('endHandle');
        const trimRegion = document.getElementById('trimRegion');
        const trimDuration = document.getElementById('trimDuration');

        if (!timelineContainer) return;

        const duration = currentVideo.duration;
        const startPercent = (trimState.startTime / duration) * 100;
        const endPercent = (trimState.endTime / duration) * 100;

        if (startHandle) startHandle.style.left = startPercent + '%';
        if (endHandle) endHandle.style.left = `calc(${endPercent}% - 20px)`;
        if (trimRegion) {
            trimRegion.style.left = startPercent + '%';
            trimRegion.style.width = (endPercent - startPercent) + '%';
        }

        const trimLength = trimState.endTime - trimState.startTime;
        if (trimDuration) {
            trimDuration.textContent = `${formatTime(trimState.startTime)} - ${formatTime(trimState.endTime)} (${formatTime(trimLength)})`;
        }

        document.getElementById('startTime').value = trimState.startTime.toFixed(2);
        document.getElementById('endTime').value = trimState.endTime.toFixed(2);
    }

    function initDragEvents() {
        const startHandle = document.getElementById('startHandle');
        const endHandle = document.getElementById('endHandle');

        if (!startHandle || !endHandle) return;

        // Mouse events
        startHandle.addEventListener('mousedown', (e) => startDrag(e, 'start'));
        endHandle.addEventListener('mousedown', (e) => startDrag(e, 'end'));

        // Touch events for mobile
        startHandle.addEventListener('touchstart', (e) => startDrag(e, 'start'), { passive: false });
        endHandle.addEventListener('touchstart', (e) => startDrag(e, 'end'), { passive: false });

        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('touchmove', onDragMove, { passive: false });

        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
    }

    function startDrag(e, handle) {
        e.preventDefault();
        e.stopPropagation();
        trimState.isDragging = true;
        trimState.dragHandle = handle;
    }

    function onDragMove(e) {
        if (!trimState.isDragging || !currentVideo) return;
        e.preventDefault();

        const timelineContainer = document.getElementById('timelineContainer');
        if (!timelineContainer) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const containerRect = timelineContainer.getBoundingClientRect();
        const offsetX = clientX - containerRect.left;
        const percent = Math.max(0, Math.min(1, offsetX / containerRect.width));
        const newTime = percent * currentVideo.duration;

        if (trimState.dragHandle === 'start') {
            trimState.startTime = Math.max(0, Math.min(newTime, trimState.endTime - 0.1));
        } else {
            trimState.endTime = Math.max(trimState.startTime + 0.1, Math.min(newTime, currentVideo.duration));
        }

        updateTrimUI();
    }

    function endDrag() {
        trimState.isDragging = false;
        trimState.dragHandle = null;
    }

    async function trimVideo() {
        if (!currentVideo || !selectedFile) return;

        const startTime = trimState.startTime;
        const endTime = trimState.endTime;

        if (startTime >= endTime) {
            alert('Invalid time range.');
            return;
        }

        optionsArea.style.display = 'none';
        progressArea.style.display = 'block';
        progressText.textContent = 'Trimming video...';
        progressFill.style.width = '0%';

        try {
            const blob = await performTrim(startTime, endTime, (progress) => {
                progressFill.style.width = (progress * 100) + '%';
            });

            trimmedBlob = blob;
            const filename = selectedFile.name.replace(/\.[^/.]+$/, '_trimmed.webm');

            progressFill.style.width = '100%';
            progressText.textContent = 'Trim complete!';

            setTimeout(() => {
                progressArea.style.display = 'none';
                showDownload(filename);
            }, 500);
        } catch (error) {
            console.error('Trim error:', error);
            alert('Failed to trim video: ' + error.message);
            progressArea.style.display = 'none';
            optionsArea.style.display = 'block';
        }
    }

    async function performTrim(startTime, endTime, onProgress) {
        return new Promise((resolve, reject) => {
            const video = currentVideo;
            video.currentTime = startTime;

            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');

            const stream = canvas.captureStream(30);
            
            // Detect supported codec
            let recorderOptions = { videoBitsPerSecond: 2500000 };
            if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
                recorderOptions.mimeType = 'video/webm;codecs=vp8';
            } else if (MediaRecorder.isTypeSupported('video/webm')) {
                recorderOptions.mimeType = 'video/webm';
            }
            
            const recorder = new MediaRecorder(stream, recorderOptions);

            const chunks = [];
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                resolve(blob);
                video.pause();
            };

            recorder.onerror = (e) => reject(new Error('Recording failed'));

            const drawFrame = () => {
                if (video.currentTime < endTime && !video.ended) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const progress = (video.currentTime - startTime) / (endTime - startTime);
                    onProgress(progress);
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

            video.onerror = () => reject(new Error('Video playback error'));
        });
    }

    function showDownload(filename) {
        downloadArea.style.display = 'block';
        if (postConversionAd) postConversionAd.style.display = 'block';

        const url = URL.createObjectURL(trimmedBlob);
        downloadButtons.innerHTML = `
            <video controls style="width: 100%; max-width: 600px; border-radius: 8px; margin: 20px auto; display: block;">
                <source src="${url}" type="video/webm">
            </video>
        `;

        const btn = window.createDownloadButton?.(trimmedBlob, filename);
        if (btn) {
            downloadButtons.appendChild(btn);
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 10);
        return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
    }

    function reset() {
        selectedFile = null;
        currentVideo = null;
        trimmedBlob = null;
        trimState = { startTime: 0, endTime: 10, isDragging: false, dragHandle: null };

        fileInput.value = '';
        dropZone.style.display = 'flex';
        previewArea.style.display = 'none';
        optionsArea.style.display = 'none';
        progressArea.style.display = 'none';
        downloadArea.style.display = 'none';
        if (postConversionAd) postConversionAd.style.display = 'none';
    }
}
