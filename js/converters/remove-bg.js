/**
 * Background Remover Module
 * Simple alpha-based background removal
 */

let selectedFiles = [];

export async function init() {
    console.log('🎭 Background Remover initialized');
    
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
            <p style="margin-bottom: 10px;">⚠️ Note: This is a simple color-based background removal. For better results, use professional tools.</p>
        </div>
        <div class="option">
            <label for="tolerance">Color Tolerance</label>
            <input type="range" id="tolerance" min="0" max="100" value="30">
            <span id="toleranceValue">30</span>
        </div>
        <div class="option">
            <label>
                <input type="checkbox" id="useWhite" checked>
                Remove white background
            </label>
        </div>
    `;

    const toleranceSlider = document.getElementById('tolerance');
    const toleranceValue = document.getElementById('toleranceValue');
    toleranceSlider.addEventListener('input', () => {
        toleranceValue.textContent = toleranceSlider.value;
    });

    convertBtn.textContent = 'Remove Background';

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
            if (!file.type.startsWith('image/')) {
                alert('Please select image files only.');
                continue;
            }

            if (!window.checkFileSize?.(file)) continue;

            selectedFiles.push(file);

            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.createElement('div');
                preview.className = 'image-preview-item';
                preview.innerHTML = `
                    <img src="${e.target.result}" alt="${file.name}">
                    <p>${file.name}</p>
                    <p style="color: var(--text-tertiary); font-size: 11px;">${window.formatFileSize?.(file.size)}</p>
                `;
                fileList.appendChild(preview);
            };
            reader.readAsDataURL(file);
        }

        if (selectedFiles.length > 0) {
            previewArea.style.display = 'block';
            optionsArea.style.display = 'block';
            fileCount.textContent = selectedFiles.length;
            dropZone.style.display = 'none';
        }
    }

    convertBtn.addEventListener('click', async function() {
        if (selectedFiles.length === 0) return;

        optionsArea.style.display = 'none';
        progressArea.style.display = 'block';

        const tolerance = parseInt(toleranceSlider.value);
        const useWhite = document.getElementById('useWhite').checked;
        const convertedFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const progress = ((i + 1) / selectedFiles.length) * 100;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = `Processing ${i + 1} of ${selectedFiles.length}...`;

            try {
                const blob = await removeBackground(file, tolerance, useWhite);
                const filename = file.name.replace(/\.[^.]+$/, '-nobg.png');
                convertedFiles.push({ blob, filename });
            } catch (error) {
                console.error('Processing error:', error);
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

    async function removeBackground(file, tolerance, useWhite) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');

                    ctx.drawImage(img, 0, 0);
                    
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;

                    const targetR = useWhite ? 255 : 0;
                    const targetG = useWhite ? 255 : 0;
                    const targetB = useWhite ? 255 : 0;

                    // Remove pixels similar to target color
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];

                        const diff = Math.abs(r - targetR) + Math.abs(g - targetG) + Math.abs(b - targetB);
                        
                        if (diff < tolerance * 7.65) { // Scale tolerance to 0-765 range
                            data[i + 3] = 0; // Set alpha to 0 (transparent)
                        }
                    }

                    ctx.putImageData(imageData, 0, 0);

                    canvas.toBlob((blob) => {
                        blob ? resolve(blob) : reject(new Error('Failed to process'));
                    }, 'image/png');
                };
                img.onerror = () => reject(new Error('Failed to load image'));
                img.src = e.target.result;
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
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
    });
}
