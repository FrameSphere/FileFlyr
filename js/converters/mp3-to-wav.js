/**
 * MP3 to WAV Converter Module
 */

let selectedFiles = [];

export async function init() {
    console.log('🎵 MP3 to WAV converter initialized');
    
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

    optionsContent.innerHTML = `
        <div class="option">
            <p>Convert compressed MP3 to uncompressed WAV format</p>
        </div>
    `;

    convertBtn.textContent = 'Convert to WAV';

    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        selectedFiles = [];
        fileList.innerHTML = '';

        for (let file of files) {
            const isMP3 = file.type.includes('audio/mpeg') || 
                         file.type.includes('audio/mp3') ||
                         file.name.toLowerCase().endsWith('.mp3');
            
            if (!isMP3) {
                alert('Please select MP3 files only.');
                continue;
            }

            if (!window.checkFileSize?.(file)) continue;

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
                            🎵
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

    window.removeAudioFile = function(index) {
        selectedFiles.splice(index, 1);
        if (selectedFiles.length === 0) {
            resetBtn.click();
        } else {
            handleFiles(selectedFiles);
        }
    };

    convertBtn.addEventListener('click', async function() {
        if (selectedFiles.length === 0) return;

        optionsArea.style.display = 'none';
        progressArea.style.display = 'block';

        const convertedFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const progress = ((i + 1) / selectedFiles.length) * 100;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = `Converting ${i + 1} of ${selectedFiles.length}...`;

            try {
                const blob = await convertMP3toWAV(file);
                const filename = file.name.replace(/\.mp3$/i, '.wav');
                convertedFiles.push({ blob, filename });
            } catch (error) {
                console.error('Conversion error:', error);
            }
        }

        progressArea.style.display = 'none';
        downloadArea.style.display = 'block';
        postConversionAd.style.display = 'block';

        downloadButtons.innerHTML = '';
        convertedFiles.forEach(({ blob, filename }) => {
            const btn = window.createDownloadButton?.(blob, filename);
            if (btn) {
                downloadButtons.appendChild(btn);
            }
        });

        if (convertedFiles.length > 1) {
            const downloadAllBtn = document.createElement('button');
            downloadAllBtn.className = 'download-btn';
            downloadAllBtn.textContent = `Download All (${convertedFiles.length} files)`;
            downloadAllBtn.style.background = 'var(--primary)';
            downloadAllBtn.onclick = () => {
                convertedFiles.forEach(({ blob, filename }) => {
                    setTimeout(() => window.downloadFile?.(blob, filename), 100);
                });
            };
            downloadButtons.insertBefore(downloadAllBtn, downloadButtons.firstChild);
        }
    });

    async function convertMP3toWAV(file) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const numberOfChannels = audioBuffer.numberOfChannels;
        const sampleRate = audioBuffer.sampleRate;
        const format = 1; // PCM
        const bitDepth = 16;

        const bytesPerSample = bitDepth / 8;
        const blockAlign = numberOfChannels * bytesPerSample;

        const data = [];
        for (let i = 0; i < audioBuffer.length; i++) {
            for (let channel = 0; channel < numberOfChannels; channel++) {
                const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
                data.push(sample < 0 ? sample * 0x8000 : sample * 0x7FFF);
            }
        }

        const dataLength = data.length * bytesPerSample;
        const buffer = new ArrayBuffer(44 + dataLength);
        const view = new DataView(buffer);

        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };

        writeString(0, 'RIFF');
        view.setUint32(4, 36 + dataLength, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, format, true);
        view.setUint16(22, numberOfChannels, true);
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

        return new Blob([buffer], { type: 'audio/wav' });
    }

    resetBtn.addEventListener('click', function() {
        selectedFiles = [];
        fileList.innerHTML = '';
        fileInput.value = '';
        dropZone.style.display = 'flex';
        previewArea.style.display = 'none';
        optionsArea.style.display = 'none';
        progressArea.style.display = 'none';
        downloadArea.style.display = 'none';
        postConversionAd.style.display = 'none';
        progressFill.style.width = '0%';
        downloadButtons.innerHTML = '';
        
        // Cleanup
        const audioPreview = document.getElementById('audioPreview');
        if (audioPreview && audioPreview.src) {
            URL.revokeObjectURL(audioPreview.src);
        }
    });
}
