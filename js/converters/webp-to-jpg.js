/**
 * WEBP to JPG/PNG Converter Module (Universal)
 * Can be used for both webp-to-jpg and webp-to-png
 */

let selectedFiles = [];
let targetFormat = 'jpeg'; // or 'png'

export async function init() {
    // Detect which format we're converting to based on URL
    const path = window.location.pathname;
    if (path.includes('webp-to-png')) {
        targetFormat = 'png';
    } else {
        targetFormat = 'jpeg';
    }

    console.log(`🌐 WEBP to ${targetFormat.toUpperCase()} converter initialized`);
    
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

    // Setup options based on target format
    if (targetFormat === 'jpeg') {
        optionsContent.innerHTML = `
            <div class="option">
                <label for="quality">Quality (%)</label>
                <input type="range" id="quality" min="1" max="100" value="90">
                <span id="qualityValue">90%</span>
            </div>
            <div class="option">
                <label for="resize">Resize</label>
                <select id="resize">
                    <option value="none">Keep Original</option>
                    <option value="50">50%</option>
                    <option value="75">75%</option>
                </select>
            </div>
        `;

        const qualitySlider = document.getElementById('quality');
        const qualityValue = document.getElementById('qualityValue');
        qualitySlider.addEventListener('input', () => {
            qualityValue.textContent = qualitySlider.value + '%';
        });
    } else {
        optionsContent.innerHTML = `
            <div class="option">
                <label for="resize">Resize</label>
                <select id="resize">
                    <option value="none">Keep Original</option>
                    <option value="50">50%</option>
                    <option value="75">75%</option>
                </select>
            </div>
        `;
    }

    convertBtn.textContent = `Convert to ${targetFormat.toUpperCase()}`;

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
            if (!file.type.startsWith('image/webp')) {
                alert('Please select WEBP files only.');
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

        const quality = targetFormat === 'jpeg' ? parseInt(document.getElementById('quality')?.value || '90') / 100 : 1;
        const resizeValue = document.getElementById('resize').value;
        const convertedFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const progress = ((i + 1) / selectedFiles.length) * 100;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = `Converting ${i + 1} of ${selectedFiles.length}...`;

            try {
                const blob = await convertWEBP(file, quality, resizeValue);
                const ext = targetFormat === 'jpeg' ? '.jpg' : '.png';
                const filename = file.name.replace(/\.webp$/i, ext);
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
                    window.downloadFile?.(blob, filename);
                });
            };
            downloadButtons.insertBefore(downloadAllBtn, downloadButtons.firstChild);
        }
    });

    async function convertWEBP(file, quality, resizeValue) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    let width = img.width;
                    let height = img.height;

                    if (resizeValue !== 'none') {
                        const scale = parseInt(resizeValue) / 100;
                        width = Math.round(img.width * scale);
                        height = Math.round(img.height * scale);
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');

                    // For JPEG, fill background
                    if (targetFormat === 'jpeg') {
                        ctx.fillStyle = '#ffffff';
                        ctx.fillRect(0, 0, width, height);
                    }

                    ctx.drawImage(img, 0, 0, width, height);

                    const mimeType = targetFormat === 'jpeg' ? 'image/jpeg' : 'image/png';
                    canvas.toBlob((blob) => {
                        blob ? resolve(blob) : reject(new Error('Failed to create blob'));
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
