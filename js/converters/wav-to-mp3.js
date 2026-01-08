/**
 * WAV to MP3 Converter
 * Converts WAV audio files to MP3 format using lamejs
 */

let selectedFiles = [];
let convertedFiles = [];

export async function init() {
    console.log('🎵 WAV to MP3 Converter initialized');
    
    // Get UI elements
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
            <label for="bitrate">Audio Bitrate</label>
            <select id="bitrate" class="select-box">
                <option value="128">128 kbps (Good)</option>
                <option value="192" selected>192 kbps (Better)</option>
                <option value="256">256 kbps (Best)</option>
                <option value="320">320 kbps (Maximum)</option>
            </select>
        </div>
        <div class="option">
            <label for="sampleRate">Sample Rate</label>
            <select id="sampleRate" class="select-box">
                <option value="44100" selected>44.1 kHz (Standard)</option>
                <option value="48000">48 kHz (High Quality)</option>
            </select>
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
        // Check MIME type or file extension
        const isWAV = file.type.includes('audio/wav') || 
                     file.type.includes('audio/wave') || 
                     file.type.includes('audio/x-wav') ||
                     file.type.includes('audio/vnd.wave') ||
                     file.name.toLowerCase().endsWith('.wav');
        
        if (!isWAV) {
            showError(`${file.name} is not a WAV file`);
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
    const dropZone = document.getElementById('dropZone');
    
    fileList.innerHTML = '';
    
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
                        <div class="file-size" style="color: var(--text-tertiary); font-size: 12px;">${formatFileSize(file.size)}</div>
                    </div>
                    <button class="remove-btn" onclick="window.removeFile(0)">Remove</button>
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
            const fileCard = document.createElement('div');
            fileCard.className = 'file-item';
            fileCard.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 60px; height: 60px; background: var(--bg-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                        🎵
                    </div>
                    <div style="flex: 1;">
                        <div class="file-name" style="margin-bottom: 4px;">${file.name}</div>
                        <div class="file-size" style="color: var(--text-tertiary); font-size: 11px;">${formatFileSize(file.size)}</div>
                        <audio src="${url}" controls style="width: 100%; margin-top: 8px; height: 32px;"></audio>
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

async function drawWaveform(file) {
    const canvas = document.getElementById('waveformCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    try {
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
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

async function convertFiles() {
    const bitrate = parseInt(document.getElementById('bitrate').value);
    const sampleRate = parseInt(document.getElementById('sampleRate').value);
    
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
            const blob = await convertToMP3(file, bitrate, sampleRate);
            const fileName = file.name.replace(/\.[^/.]+$/, '') + '.mp3';
            convertedFiles.push({ blob, fileName });
        } catch (error) {
            console.error('Conversion error:', error);
            showError(`Failed to convert ${file.name}`);
        }
    }
    
    progressFill.style.width = '100%';
    progressText.textContent = 'Conversion complete!';
    
    setTimeout(() => {
        progressArea.style.display = 'none';
        showDownloads();
    }, 500);
}

async function convertToMP3(file, bitrate, sampleRate) {
    return new Promise((resolve, reject) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            try {
                const audioBuffer = await audioContext.decodeAudioData(e.target.result);
                
                // Get audio data
                const channels = audioBuffer.numberOfChannels;
                const samples = audioBuffer.length;
                const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, bitrate);
                
                const mp3Data = [];
                const sampleBlockSize = 1152;
                
                // Get channel data
                const left = audioBuffer.getChannelData(0);
                const right = channels > 1 ? audioBuffer.getChannelData(1) : left;
                
                // Convert to 16-bit PCM
                const leftPCM = new Int16Array(left.length);
                const rightPCM = new Int16Array(right.length);
                
                for (let i = 0; i < left.length; i++) {
                    leftPCM[i] = Math.max(-32768, Math.min(32767, left[i] * 32768));
                    rightPCM[i] = Math.max(-32768, Math.min(32767, right[i] * 32768));
                }
                
                // Encode to MP3
                for (let i = 0; i < samples; i += sampleBlockSize) {
                    const leftChunk = leftPCM.subarray(i, i + sampleBlockSize);
                    const rightChunk = rightPCM.subarray(i, i + sampleBlockSize);
                    const mp3buf = mp3enc.encodeBuffer(leftChunk, rightChunk);
                    if (mp3buf.length > 0) {
                        mp3Data.push(mp3buf);
                    }
                }
                
                // Flush remaining data
                const mp3buf = mp3enc.flush();
                if (mp3buf.length > 0) {
                    mp3Data.push(mp3buf);
                }
                
                // Create blob
                const blob = new Blob(mp3Data, { type: 'audio/mp3' });
                resolve(blob);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

function showDownloads() {
    const downloadArea = document.getElementById('downloadArea');
    const downloadButtons = document.getElementById('downloadButtons');
    const postConversionAd = document.getElementById('postConversionAd');
    
    downloadButtons.innerHTML = '';
    
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
    document.getElementById('postConversionAd').style.display = 'none';
    document.getElementById('fileInput').value = '';
    document.getElementById('fileList').innerHTML = '';
    document.getElementById('dropZone').style.display = 'flex';
    
    // Cleanup
    const audioPreview = document.getElementById('audioPreview');
    if (audioPreview && audioPreview.src) {
        URL.revokeObjectURL(audioPreview.src);
    }
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
