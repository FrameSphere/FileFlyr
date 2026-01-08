/**
 * Audio Trim - Mobile-friendly, wider layout
 */

let audioContext;
let audioBuffer;
let selectedFile = null;

let trimState = {
    startTime: 0,
    endTime: 10,
    isDragging: false,
    dragHandle: null
};

export async function init() {
    console.log('✂️ Audio Trim initialized');
    
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const fileList = document.getElementById('fileList');
    const fileCount = document.getElementById('fileCount');
    const optionsArea = document.getElementById('optionsArea');
    const optionsContent = document.getElementById('optionsContent');
    const convertBtn = document.getElementById('convertBtn');
    const progressArea = document.getElementById('progressArea');
    const progressText = document.getElementById('progressText');
    const downloadArea = document.getElementById('downloadArea');
    const downloadButtons = document.getElementById('downloadButtons');
    const resetBtn = document.getElementById('resetBtn');
    const postConversionAd = document.getElementById('postConversionAd');

    // Override grid layout from .image-list CSS
    fileList.style.display = 'block';
    fileList.style.gridTemplateColumns = 'none';
    
    fileList.innerHTML = `
        <h3 style="margin-bottom: 16px; font-size: 20px; text-align: center;">Audio Preview - Ziehen Sie die Handles zum Trimmen</h3>
        <audio id="audioPlayer" controls style="width: 100%; margin: 20px 0; border-radius: 8px;"></audio>
        <p id="duration" style="color: var(--text-secondary); margin-bottom: 16px; text-align: center;"></p>
        
        <!-- Waveform Display -->
        <div id="waveformContainer" style="position: relative; width: 100%; height: 120px; background: var(--bg-dark); border-radius: 8px; overflow: hidden; user-select: none;">
            <canvas id="waveformCanvas" style="width: 100%; height: 100%; display: block;"></canvas>
            
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
                <span id="trimDuration">0.0s</span>
            </div>
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

    convertBtn.textContent = 'Trim Audio';

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
    convertBtn.addEventListener('click', trimAudio);
    resetBtn.addEventListener('click', reset);

    // Input synchronization
    document.addEventListener('input', (e) => {
        if (e.target.id === 'startTime' && audioBuffer) {
            const value = parseFloat(e.target.value) || 0;
            trimState.startTime = Math.max(0, Math.min(value, trimState.endTime - 0.1));
            updateTrimUI();
        } else if (e.target.id === 'endTime' && audioBuffer) {
            const value = parseFloat(e.target.value) || 0;
            trimState.endTime = Math.max(trimState.startTime + 0.1, Math.min(value, audioBuffer.duration));
            updateTrimUI();
        }
    });

    async function handleFile(file) {
        if (!file.type.startsWith('audio/')) {
            alert('Please select an audio file.');
            return;
        }

        if (file.size > 100 * 1024 * 1024) {
            alert('File too large (max 100MB)');
            return;
        }

        selectedFile = file;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        const url = URL.createObjectURL(file);
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = url;

        try {
            const arrayBuffer = await file.arrayBuffer();
            audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            const durationSec = audioBuffer.duration;
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
                drawWaveform();
                updateTrimUI();
                initDragEvents();
            }, 100);
        } catch (error) {
            console.error('Error loading audio:', error);
            alert('Failed to load audio file.');
            reset();
        }
    }

    function drawWaveform() {
        if (!audioBuffer) return;

        const canvas = document.getElementById('waveformCanvas');
        const container = document.getElementById('waveformContainer');
        if (!canvas || !container) return;

        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext('2d');
        const data = audioBuffer.getChannelData(0);
        const step = Math.ceil(data.length / canvas.width);
        const amp = canvas.height / 2;

        ctx.fillStyle = '#1a1c24';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        for (let i = 0; i < canvas.width; i++) {
            let min = 1.0, max = -1.0;
            for (let j = 0; j < step; j++) {
                const datum = data[(i * step) + j];
                if (datum < min) min = datum;
                if (datum > max) max = datum;
            }

            const yMin = (1 + min) * amp;
            const yMax = (1 + max) * amp;

            if (i === 0) {
                ctx.moveTo(i, yMin);
            } else {
                ctx.lineTo(i, yMin);
            }
            ctx.lineTo(i, yMax);
        }

        ctx.stroke();
    }

    function updateTrimUI() {
        if (!audioBuffer) return;

        const waveformContainer = document.getElementById('waveformContainer');
        const startHandle = document.getElementById('startHandle');
        const endHandle = document.getElementById('endHandle');
        const trimRegion = document.getElementById('trimRegion');
        const trimDuration = document.getElementById('trimDuration');

        if (!waveformContainer) return;

        const duration = audioBuffer.duration;
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
        if (!trimState.isDragging || !audioBuffer) return;
        e.preventDefault();

        const waveformContainer = document.getElementById('waveformContainer');
        if (!waveformContainer) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const containerRect = waveformContainer.getBoundingClientRect();
        const offsetX = clientX - containerRect.left;
        const percent = Math.max(0, Math.min(1, offsetX / containerRect.width));
        const newTime = percent * audioBuffer.duration;

        if (trimState.dragHandle === 'start') {
            trimState.startTime = Math.max(0, Math.min(newTime, trimState.endTime - 0.1));
        } else {
            trimState.endTime = Math.max(trimState.startTime + 0.1, Math.min(newTime, audioBuffer.duration));
        }

        updateTrimUI();
    }

    function endDrag() {
        trimState.isDragging = false;
        trimState.dragHandle = null;
    }

    async function trimAudio() {
        if (!audioBuffer || !selectedFile) return;

        optionsArea.style.display = 'none';
        progressArea.style.display = 'block';
        progressText.textContent = 'Trimming audio...';

        const startTime = trimState.startTime;
        const endTime = trimState.endTime;

        if (startTime >= endTime) {
            alert('Invalid time range.');
            optionsArea.style.display = 'block';
            progressArea.style.display = 'none';
            return;
        }

        try {
            const startSample = Math.floor(startTime * audioBuffer.sampleRate);
            const endSample = Math.floor(endTime * audioBuffer.sampleRate);
            const newLength = endSample - startSample;

            const trimmedBuffer = audioContext.createBuffer(
                audioBuffer.numberOfChannels,
                newLength,
                audioBuffer.sampleRate
            );

            for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
                const originalData = audioBuffer.getChannelData(channel);
                const trimmedData = trimmedBuffer.getChannelData(channel);
                for (let i = 0; i < newLength; i++) {
                    trimmedData[i] = originalData[startSample + i];
                }
            }

            const wavBlob = audioBufferToWav(trimmedBuffer);
            const filename = selectedFile.name.replace(/\.[^.]+$/, '_trimmed.wav');

            progressArea.style.display = 'none';
            downloadArea.style.display = 'block';
            if (postConversionAd) postConversionAd.style.display = 'block';

            const url = URL.createObjectURL(wavBlob);
            downloadButtons.innerHTML = `
                <audio controls style="width: 100%; margin: 20px 0;">
                    <source src="${url}" type="audio/wav">
                </audio>
            `;

            const btn = window.createDownloadButton?.(wavBlob, filename);
            if (btn) {
                downloadButtons.appendChild(btn);
            }
        } catch (error) {
            console.error('Trim error:', error);
            alert('Failed to trim audio.');
            progressArea.style.display = 'none';
            optionsArea.style.display = 'block';
        }
    }

    function audioBufferToWav(buffer) {
        const numChannels = buffer.numberOfChannels;
        const sampleRate = buffer.sampleRate;
        const format = 1;
        const bitDepth = 16;

        const bytesPerSample = bitDepth / 8;
        const blockAlign = numChannels * bytesPerSample;

        const data = [];
        for (let i = 0; i < buffer.length; i++) {
            for (let channel = 0; channel < numChannels; channel++) {
                const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
                data.push(sample < 0 ? sample * 0x8000 : sample * 0x7FFF);
            }
        }

        const dataLength = data.length * bytesPerSample;
        const bufferLength = 44 + dataLength;
        const arrayBuffer = new ArrayBuffer(bufferLength);
        const view = new DataView(arrayBuffer);

        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };

        writeString(0, 'RIFF');
        view.setUint32(4, bufferLength - 8, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, format, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * blockAlign, true);
        view.setUint16(32, blockAlign, true);
        view.setUint16(34, bitDepth, true);
        writeString(36, 'data');
        view.setUint32(40, dataLength, true);

        let offset = 44;
        for (let i = 0; i < data.length; i++) {
            view.setInt16(offset, data[i], true);
            offset += 2;
        }

        return new Blob([arrayBuffer], { type: 'audio/wav' });
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = (seconds % 60).toFixed(1);
        return `${mins}:${secs.padStart(4, '0')}`;
    }

    function reset() {
        selectedFile = null;
        audioBuffer = null;
        if (audioContext) {
            audioContext.close().catch(() => {});
            audioContext = null;
        }

        trimState = { startTime: 0, endTime: 10, isDragging: false, dragHandle: null };

        fileInput.value = '';
        dropZone.style.display = 'flex';
        previewArea.style.display = 'none';
        optionsArea.style.display = 'none';
        progressArea.style.display = 'none';
        downloadArea.style.display = 'none';
        if (postConversionAd) postConversionAd.style.display = 'none';

        const audioPlayer = document.getElementById('audioPlayer');
        if (audioPlayer) audioPlayer.src = '';
    }
}
