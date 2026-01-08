/**
 * Image Resize Module
 */

let selectedFiles = [];

export async function init() {
    console.log('↔️ Image Resizer initialized');
    
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
            <label for="width">Width (px)</label>
            <input type="number" id="width" value="1920" min="1" max="10000">
        </div>
        <div class="option">
            <label for="height">Height (px)</label>
            <input type="number" id="height" value="1080" min="1" max="10000">
        </div>
        <div class="option">
            <label>
                <input type="checkbox" id="keepAspect" checked>
                Keep aspect ratio
            </label>
        </div>
        <div class="option">
            <label>Preset Sizes</label>
            <select id="preset">
                <option value="">Custom</option>
                <option value="1920,1080">Full HD (1920x1080)</option>
                <option value="1280,720">HD (1280x720)</option>
                <option value="800,600">SVGA (800x600)</option>
                <option value="640,480">VGA (640x480)</option>
                <option value="1080,1080">Instagram Square</option>
                <option value="1080,1920">Instagram Story</option>
            </select>
        </div>
    `;

    const preset = document.getElementById('preset');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');

    preset.addEventListener('change', () => {
        const value = preset.value;
        if (value) {
            const [w, h] = value.split(',');
            widthInput.value = w;
            heightInput.value = h;
        }
    });

    convertBtn.textContent = 'Resize Images';

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

        const targetWidth = parseInt(widthInput.value);
        const targetHeight = parseInt(heightInput.value);
        const keepAspect = document.getElementById('keepAspect').checked;
        
        const convertedFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const progress = ((i + 1) / selectedFiles.length) * 100;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = `Resizing ${i + 1} of ${selectedFiles.length}...`;

            try {
                const blob = await resizeImage(file, targetWidth, targetHeight, keepAspect);
                const ext = file.name.split('.').pop();
                const filename = file.name.replace(/\.[^.]+$/, `-resized.${ext}`);
                convertedFiles.push({ blob, filename });
            } catch (error) {
                console.error('Resize error:', error);
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

    async function resizeImage(file, targetWidth, targetHeight, keepAspect) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    let width = targetWidth;
                    let height = targetHeight;

                    if (keepAspect) {
                        const ratio = Math.min(targetWidth / img.width, targetHeight / img.height);
                        width = Math.round(img.width * ratio);
                        height = Math.round(img.height * ratio);
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');

                    ctx.drawImage(img, 0, 0, width, height);

                    const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                    canvas.toBlob((blob) => {
                        blob ? resolve(blob) : reject(new Error('Failed to resize'));
                    }, mimeType, 0.95);
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
