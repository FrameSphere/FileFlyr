/**
 * ICO to PNG Converter Module
 */

let selectedFiles = [];

export async function init() {
    console.log('⭐ ICO to PNG converter initialized');
    
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
            <label>Output Size</label>
            <select id="outputSize">
                <option value="original">Keep Original</option>
                <option value="16">16x16</option>
                <option value="32">32x32</option>
                <option value="48">48x48</option>
                <option value="64">64x64</option>
                <option value="128">128x128</option>
                <option value="256">256x256</option>
            </select>
        </div>
    `;

    convertBtn.textContent = 'Convert to PNG';

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
            const isICO = file.name.toLowerCase().endsWith('.ico') || file.type === 'image/x-icon';
            
            if (!isICO) {
                alert('Please select ICO files only.');
                continue;
            }

            if (!window.checkFileSize?.(file)) continue;

            selectedFiles.push(file);

            const preview = document.createElement('div');
            preview.className = 'image-preview-item';
            preview.innerHTML = `
                <div style="width: 100%; height: 140px; background: var(--bg-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 48px; margin-bottom: 10px;">
                    ⭐
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

        optionsArea.style.display = 'none';
        progressArea.style.display = 'block';

        const outputSize = document.getElementById('outputSize').value;
        const convertedFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const progress = ((i + 1) / selectedFiles.length) * 100;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = `Converting ${i + 1} of ${selectedFiles.length}...`;

            try {
                const blob = await convertICOtoPNG(file, outputSize);
                const filename = file.name.replace(/\.ico$/i, '.png');
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

    async function convertICOtoPNG(file, outputSize) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    let width, height;
                    
                    if (outputSize === 'original') {
                        width = img.width;
                        height = img.height;
                    } else {
                        width = height = parseInt(outputSize);
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');

                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        blob ? resolve(blob) : reject(new Error('Failed to create blob'));
                    }, 'image/png');
                };
                img.onerror = () => reject(new Error('Failed to load icon'));
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
