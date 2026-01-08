/**
 * Image Rotate Module
 */

let selectedFiles = [];

export async function init() {
    console.log('🔄 Image Rotator initialized');
    
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
            <label>Rotation Angle</label>
            <select id="anglePreset" onchange="document.getElementById('customAngle').value = this.value; document.getElementById('angleDisplay').textContent = this.value + '°';">
                <option value="90">90° Clockwise</option>
                <option value="180">180°</option>
                <option value="270">270° Clockwise (90° Counter-clockwise)</option>
                <option value="custom">Custom Angle</option>
            </select>
        </div>
        <div class="option">
            <label for="customAngle">Custom Angle (degrees) <span id="angleDisplay">90°</span></label>
            <input type="number" id="customAngle" min="0" max="360" step="1" value="90" oninput="document.getElementById('angleDisplay').textContent = this.value + '°'; document.getElementById('anglePreset').value = 'custom';">
        </div>
    `;

    convertBtn.textContent = 'Rotate Images';

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

        const angle = parseInt(document.getElementById('customAngle').value);
        const convertedFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const progress = ((i + 1) / selectedFiles.length) * 100;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = `Rotating ${i + 1} of ${selectedFiles.length}...`;

            try {
                const blob = await rotateImage(file, angle);
                const ext = file.name.split('.').pop();
                const filename = file.name.replace(/\.[^.]+$/, `-rotated.${ext}`);
                convertedFiles.push({ blob, filename });
            } catch (error) {
                console.error('Rotation error:', error);
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

    async function rotateImage(file, angle) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Swap dimensions for 90 and 270 degrees
                    if (angle === 90 || angle === 270) {
                        canvas.width = img.height;
                        canvas.height = img.width;
                    } else {
                        canvas.width = img.width;
                        canvas.height = img.height;
                    }

                    // Translate and rotate
                    ctx.translate(canvas.width / 2, canvas.height / 2);
                    ctx.rotate((angle * Math.PI) / 180);
                    ctx.drawImage(img, -img.width / 2, -img.height / 2);

                    const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                    canvas.toBlob((blob) => {
                        blob ? resolve(blob) : reject(new Error('Failed to rotate'));
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
