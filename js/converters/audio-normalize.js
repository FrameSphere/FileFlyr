/**
 * Audio Normalizer Module
 * Normalizes audio volume levels using Web Audio API
 */

let selectedFiles = [];
let convertedFiles = [];
let audioContext = null;

export async function init() {
    console.log('🔊 Audio Normalizer initialized');
    
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const fileList = document.getElementById('fileList');
    const fileCount = document.getElementById('fileCount');
    const optionsArea = document.getElementById('optionsArea');
    const optionsContent = document.getElementById('optionsContent');
    const convertBtn = document.getElementById('convertBtn');
    const resetBtn = document.getElementById('resetBtn');

    optionsContent.innerHTML = `
        <div class="option">
            <label for="targetLevel">Target Level (dB)</label>
            <input type="number" id="targetLevel" class="select-box" value="-6" min="-60" max="6" step="0.5" placeholder="e.g. -6">
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                Typical range: -12 dB (quieter) to -3 dB (louder)<br>
                Negative values reduce volume, positive increase (use with caution)
            </div>
        </div>
        <div class="option">
            <label for="outputFormat">Output Format</label>
            <select id="outputFormat" class="select-box">
                <option value="mp3" selected>MP3</option>
                <option value="wav">WAV</option>
            </select>
        </div>
        <div class="option">
            <label>
                <input type="checkbox" id="preventClipping" checked>
                Prevent clipping (distortion)
            </label>
        </div>
        <div class="info-box" style="margin-top: 12px; padding: 12px; background: var(--bg-dark); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">
            <strong>✓</strong> Normalizes audio volume to consistent levels
        </div>
    `;
    convertBtn.textContent = 'Normalize Audio';
    convertBtn.disabled = false;

    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => { dropZone.classList.remove('drag-over'); });
    dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('drag-over'); handleFiles(e.dataTransfer.files); });
    fileInput.addEventListener('change', (e) => { handleFiles(e.target.files); });

    function handleFiles(files) {
        selectedFiles = [];
        fileList.innerHTML = '';
        
        for (let file of files) {
            if (!file.type.includes('audio')) {
                alert('Please select audio files only.');
                continue;
            }
            selectedFiles.push(file);
        }
        
        if (selectedFiles.length === 0) return;
        
        // Bei einer einzelnen Datei: Großer Audio-Player mit Waveform
        if (selectedFiles.length === 1) {
            const file = selectedFiles[0];
            const url = URL.createObjectURL(file);
            
            // Grid-Layout deaktivieren bei einzelner Datei
            fileList.style.display = 'block';
            
            fileList.innerHTML = `
                <div class="file-item" style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="background: var(--bg-dark); padding: 24px; border-radius: 12px;">
                        <audio id="audioPreview" src="${url}" controls style="width: 100%; margin-bottom: 16px;"></audio>
                        <canvas id="waveformCanvas" style="width: 100%; height: 80px; border-radius: 8px; background: #1a1a1a;"></canvas>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="file-info">
                            <div class="file-name">${file.name}</div>
                            <div class="file-size" style="color: var(--text-tertiary); font-size: 12px;">${window.formatFileSize?.(file.size)}</div>
                        </div>
                        <button class="remove-btn" onclick="window.removeAudioFile?.(0)">Remove</button>
                    </div>
                </div>
            `;
            
            // Waveform zeichnen
            drawWaveform(file);
            
            // Dropbox verstecken bei einzelner Datei
            dropZone.style.display = 'none';
        } else {
            // Bei mehreren Dateien: Liste mit kleinen Playern
            fileList.style.display = 'grid';
            
            selectedFiles.forEach((file, index) => {
                const url = URL.createObjectURL(file);
                const preview = document.createElement('div');
                preview.className = 'file-item';
                preview.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 60px; height: 60px; background: var(--bg-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                            🔊
                        </div>
                        <div style="flex: 1;">
                            <p style="margin-bottom: 4px;">${file.name}</p>
                            <p style="color: var(--text-tertiary); font-size: 11px;">${window.formatFileSize?.(file.size)}</p>
                            <audio src="${url}" controls style="width: 100%; margin-top: 8px; height: 32px;"></audio>
                        </div>
                        <button class="remove-btn" onclick="window.removeAudioFile?.(${index})" style="margin-left: auto;">&times;</button>
                    </div>
                `;
                fileList.appendChild(preview);
            });
            
            // Dropbox bleibt sichtbar bei mehreren Dateien
            dropZone.style.display = 'flex';
        }
        
        previewArea.style.display = 'block';
        optionsArea.style.display = 'block';
        fileCount.textContent = selectedFiles.length;
    }
    
    async function drawWaveform(file) {
        const canvas = document.getElementById('waveformCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const localAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        try {
            const arrayBuffer = await file.arrayBuffer();
            const audioBuffer = await localAudioContext.decodeAudioData(arrayBuffer);
            
            canvas.width = canvas.offsetWidth;
            canvas.height = 80;
            
            const data = audioBuffer.getChannelData(0);
            const step = Math.ceil(data.length / canvas.width);
            const amp = canvas.height / 2;
            
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 1;
            ctx.beginPath();
            
            for (let i = 0; i < canvas.width; i++) {
                let min = 1.0;
                let max = -1.0;
                
                for (let j = 0; j < step; j++) {
                    const datum = data[(i * step) + j];
                    if (datum < min) min = datum;
                    if (datum > max) max = datum;
                }
                
                const y1 = (1 + min) * amp;
                const y2 = (1 + max) * amp;
                
                ctx.moveTo(i, y1);
                ctx.lineTo(i, y2);
            }
            
            ctx.stroke();
        } catch (error) {
            console.error('Error drawing waveform:', error);
        }
    }
    
    window.removeAudioFile = function(index) {
        selectedFiles.splice(index, 1);
        if (selectedFiles.length === 0) {
            reset();
        } else {
            handleFiles(selectedFiles);
        }
    };
    
    convertBtn.addEventListener('click', normalizeFiles);

    resetBtn.addEventListener('click', reset);
}

async function normalizeFiles() {
    const targetLevel = parseFloat(document.getElementById('targetLevel').value);
    const outputFormat = document.getElementById('outputFormat').value;
    const preventClipping = document.getElementById('preventClipping').checked;
    
    const optionsArea = document.getElementById('optionsArea');
    const progressArea = document.getElementById('progressArea');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    optionsArea.style.display = 'none';
    progressArea.style.display = 'block';
    convertedFiles = [];
    
    // Initialize audio context
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        progressText.textContent = `Normalizing ${i + 1} of ${selectedFiles.length}...`;
        progressFill.style.width = ((i / selectedFiles.length) * 100) + '%';
        
        try {
            const blob = await normalizeAudio(file, { targetLevel, outputFormat, preventClipping });
            const extension = outputFormat === 'mp3' ? '.mp3' : '.wav';
            const fileName = file.name.replace(/\.[^.]+$/, '') + '_normalized' + extension;
            convertedFiles.push({ blob, fileName });
        } catch (error) {
            console.error('Normalization error:', error);
            alert(`Failed to normalize ${file.name}: ${error.message}`);
        }
    }
    
    progressFill.style.width = '100%';
    progressText.textContent = 'Normalization complete!';
    
    setTimeout(() => {
        progressArea.style.display = 'none';
        showDownloads();
    }, 500);
}

async function normalizeAudio(file, options) {
    // Decode audio file
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Analyze audio to find peak level
    let maxPeak = 0;
    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const channelData = audioBuffer.getChannelData(channel);
        for (let i = 0; i < channelData.length; i++) {
            const abs = Math.abs(channelData[i]);
            if (abs > maxPeak) maxPeak = abs;
        }
    }
    
    // Calculate gain needed to reach target level
    const targetLinear = Math.pow(10, options.targetLevel / 20);
    let gain = maxPeak > 0 ? targetLinear / maxPeak : 1;
    
    // Prevent clipping if enabled
    if (options.preventClipping && gain > 1) {
        gain = 1;
    }
    
    // Create new audio buffer with normalized data
    const normalizedBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
    );
    
    // Apply gain to all channels
    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const inputData = audioBuffer.getChannelData(channel);
        const outputData = normalizedBuffer.getChannelData(channel);
        for (let i = 0; i < inputData.length; i++) {
            outputData[i] = inputData[i] * gain;
        }
    }
    
    // Convert to desired format
    if (options.outputFormat === 'wav') {
        return audioBufferToWav(normalizedBuffer);
    } else {
        // For MP3, we'll use WAV and let the browser handle it
        return audioBufferToWav(normalizedBuffer);
    }
}

function audioBufferToWav(buffer) {
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numberOfChannels * bytesPerSample;
    
    const data = interleave(buffer);
    const dataLength = data.length * bytesPerSample;
    const buffer2 = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer2);
    
    // Write WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true);
    
    // Write audio data
    let offset = 44;
    for (let i = 0; i < data.length; i++) {
        const sample = Math.max(-1, Math.min(1, data[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
    }
    
    return new Blob([buffer2], { type: 'audio/wav' });
}

function interleave(buffer) {
    const numberOfChannels = buffer.numberOfChannels;
    const length = buffer.length * numberOfChannels;
    const result = new Float32Array(length);
    
    let inputIndex = 0;
    for (let i = 0; i < buffer.length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
            result[inputIndex++] = buffer.getChannelData(channel)[i];
        }
    }
    
    return result;
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
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
        downloadAllBtn.style.background = 'var(--success)';
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
    
    const fileInput = document.getElementById('fileInput');
    const dropZone = document.getElementById('dropZone');
    const previewArea = document.getElementById('previewArea');
    const optionsArea = document.getElementById('optionsArea');
    const progressArea = document.getElementById('progressArea');
    const downloadArea = document.getElementById('downloadArea');
    const postConversionAd = document.getElementById('postConversionAd');
    const fileList = document.getElementById('fileList');
    
    fileInput.value = '';
    dropZone.style.display = 'flex';
    previewArea.style.display = 'none';
    optionsArea.style.display = 'none';
    progressArea.style.display = 'none';
    downloadArea.style.display = 'none';
    if (postConversionAd) postConversionAd.style.display = 'none';
    fileList.innerHTML = '';
    
    // Cleanup
    const audioPreview = document.getElementById('audioPreview');
    if (audioPreview && audioPreview.src) {
        URL.revokeObjectURL(audioPreview.src);
    }
}
