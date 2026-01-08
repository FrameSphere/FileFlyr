/**
 * Text to PDF Converter Module
 * Requires jsPDF library
 */

let selectedFiles = [];

export async function init() {
    console.log('📝 Text to PDF converter initialized');
    
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
            <label for="fontSize">Font Size</label>
            <select id="fontSize">
                <option value="10">10pt</option>
                <option value="12" selected>12pt</option>
                <option value="14">14pt</option>
                <option value="16">16pt</option>
            </select>
        </div>
    `;

    convertBtn.textContent = 'Convert to PDF';

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
            if (!file.type.includes('text')) {
                alert('Please select text files only.');
                continue;
            }

            if (!window.checkFileSize?.(file)) continue;

            selectedFiles.push(file);

            const preview = document.createElement('div');
            preview.className = 'image-preview-item';
            preview.innerHTML = `
                <div style="width: 100%; height: 140px; background: var(--bg-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 48px; margin-bottom: 10px;">
                    📝
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

        if (typeof window.jspdf === 'undefined') {
            alert('PDF library not loaded. Please refresh the page.');
            return;
        }

        optionsArea.style.display = 'none';
        progressArea.style.display = 'block';

        const fontSize = parseInt(document.getElementById('fontSize').value);
        const convertedFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const progress = ((i + 1) / selectedFiles.length) * 100;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = `Converting ${i + 1} of ${selectedFiles.length}...`;

            try {
                const blob = await convertTextToPDF(file, fontSize);
                const filename = file.name.replace(/\.[^.]+$/, '.pdf');
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

    async function convertTextToPDF(file, fontSize) {
        const text = await file.text();
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('portrait', 'mm', 'a4');
        
        pdf.setFontSize(fontSize);
        
        const lines = pdf.splitTextToSize(text, 180);
        let y = 20;
        
        lines.forEach((line, index) => {
            if (y > 280) {
                pdf.addPage();
                y = 20;
            }
            pdf.text(line, 15, y);
            y += fontSize * 0.5;
        });

        return pdf.output('blob');
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
