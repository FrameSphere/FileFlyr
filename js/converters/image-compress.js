/**
 * Image Compressor Module
 */

let selectedFiles = [];

export async function init() {
    console.log('🗜️ Image Compressor initialized');
    
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
            <label for="quality">Compression Quality (%)</label>
            <input type="range" id="quality" min="10" max="100" value="80">
            <span id="qualityValue">80%</span>
        </div>
        <div class="option">
            <label for="maxWidth">Max Width (px)</label>
            <input type="number" id="maxWidth" value="1920" min="100" max="10000">
        </div>
        <div class="option">
            <label for="maxHeight">Max Height (px)</label>
            <input type="number" id="maxHeight" value="1080" min="100" max="10000">
        </div>
        <div class="option">
            <label>
                <input type="checkbox" id="keepAspect" checked>
                Keep aspect ratio
            </label>
        </div>
    `;

    const qualitySlider = document.getElementById('quality');
    const qualityValue = document.getElementById('qualityValue');
    qualitySlider.addEventListener('input', () => {
        qualityValue.textContent = qualitySlider.value + '%';
    });

    convertBtn.textContent = 'Compress Images';

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

        const quality = parseInt(qualitySlider.value) / 100;
        const maxWidth = parseInt(document.getElementById('maxWidth').value);
        const maxHeight = parseInt(document.getElementById('maxHeight').value);
        const keepAspect = document.getElementById('keepAspect').checked;
        
        const convertedFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const progress = ((i + 1) / selectedFiles.length) * 100;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = `Compressing ${i + 1} of ${selectedFiles.length}...`;

            try {
                const blob = await compressImage(file, quality, maxWidth, maxHeight, keepAspect);
                const ext = file.name.split('.').pop();
                const filename = file.name.replace(/\.[^.]+$/, `-compressed.${ext}`);
                convertedFiles.push({ blob, filename, originalSize: file.size });
            } catch (error) {
                console.error('Compression error:', error);
            }
        }

        progressArea.style.display = 'none';
        downloadArea.style.display = 'block';
        postConversionAd.style.display = 'block';

        downloadButtons.innerHTML = '';
        convertedFiles.forEach(({ blob, filename, originalSize }) => {
            const savings = ((1 - blob.size / originalSize) * 100).toFixed(1);
            const btn = window.createDownloadButton?.(blob, filename);
            if (btn) {
                // Add savings info
                const savingsSpan = document.createElement('span');
                savingsSpan.style.cssText = 'font-size: 11px; opacity: 0.8; display: block;';
                savingsSpan.textContent = `${savings}% smaller`;
                btn.querySelector('div').appendChild(savingsSpan);
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

    async function compressImage(file, quality, maxWidth, maxHeight, keepAspect) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth || height > maxHeight) {
                        if (keepAspect) {
                            const ratio = Math.min(maxWidth / width, maxHeight / height);
                            width = Math.round(width * ratio);
                            height = Math.round(height * ratio);
                        } else {
                            width = Math.min(width, maxWidth);
                            height = Math.min(height, maxHeight);
                        }
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');

                    ctx.drawImage(img, 0, 0, width, height);

                    const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                    canvas.toBlob((blob) => {
                        blob ? resolve(blob) : reject(new Error('Failed to compress'));
                    }, mimeType, quality);
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
