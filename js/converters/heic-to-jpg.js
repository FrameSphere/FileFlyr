/**
 * HEIC to JPG Converter Module
 * Requires heic2any library
 */

let selectedFiles = [];

export async function init() {
    console.log('📱 HEIC to JPG converter initialized');
    
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

    // Setup options
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
                <option value="50">50% Smaller</option>
                <option value="75">75% Size</option>
            </select>
        </div>
    `;

    const qualitySlider = document.getElementById('quality');
    const qualityValue = document.getElementById('qualityValue');
    qualitySlider.addEventListener('input', () => {
        qualityValue.textContent = qualitySlider.value + '%';
    });

    convertBtn.textContent = 'Convert to JPG';

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
            const isHEIC = file.type === 'image/heic' || 
                          file.type === 'image/heif' || 
                          file.name.toLowerCase().endsWith('.heic') || 
                          file.name.toLowerCase().endsWith('.heif');

            if (!isHEIC) {
                alert('Please select HEIC/HEIF files only.');
                continue;
            }

            if (!window.checkFileSize?.(file)) continue;

            selectedFiles.push(file);

            const preview = document.createElement('div');
            preview.className = 'image-preview-item';
            preview.innerHTML = `
                <div style="width: 100%; height: 140px; background: var(--bg-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 48px; margin-bottom: 10px;">
                    📱
                </div>
                <p>${file.name}</p>
                <p style="color: var(--text-tertiary); font-size: 11px;">${window.formatFileSize?.(file.size)}</p>
            `;
            fileList.appendChild(preview);
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

        // Check if heic2any is loaded
        if (typeof window.heic2any === 'undefined') {
            alert('HEIC converter library not loaded. Please refresh the page.');
            return;
        }

        optionsArea.style.display = 'none';
        progressArea.style.display = 'block';

        const quality = parseInt(qualitySlider.value) / 100;
        const resizeValue = document.getElementById('resize').value;
        const convertedFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const progress = ((i + 1) / selectedFiles.length) * 100;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = `Converting ${i + 1} of ${selectedFiles.length}...`;

            try {
                const blob = await convertHEICtoJPG(file, quality, resizeValue);
                const filename = file.name.replace(/\.(heic|heif)$/i, '.jpg');
                convertedFiles.push({ blob, filename });
            } catch (error) {
                console.error('Conversion error:', error);
                alert(`Failed to convert ${file.name}. Make sure it's a valid HEIC file.`);
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

    async function convertHEICtoJPG(file, quality, resizeValue) {
        try {
            const convertedBlob = await heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: quality
            });

            const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;

            if (resizeValue !== 'none') {
                return await resizeJPG(blob, resizeValue, quality);
            }

            return blob;
        } catch (error) {
            throw new Error('HEIC conversion failed: ' + error.message);
        }
    }

    async function resizeJPG(blob, resizeValue, quality) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = function() {
                const scale = parseInt(resizeValue) / 100;
                const canvas = document.createElement('canvas');
                canvas.width = Math.round(img.width * scale);
                canvas.height = Math.round(img.height * scale);
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                canvas.toBlob(resolve, 'image/jpeg', quality);
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(blob);
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
