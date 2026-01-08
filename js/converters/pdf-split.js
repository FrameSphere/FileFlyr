/**
 * PDF Split Module
 * Requires pdf-lib library
 */

let selectedFiles = [];

export async function init() {
    console.log('✂️ PDF Split initialized');
    
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const fileList = document.getElementById('fileList');
    const fileCount = document.getElementById('fileCount');
    const optionsArea = document.getElementById('optionsArea');
    const optionsContent = document.getElementById('optionsContent');
    const convertBtn = document.getElementById('convertBtn');
    const progressArea = document.getElementById('progressArea');
    const progressText = document.getElementById('progressText');
    const downloadArea = document.getElementById('downloadArea');
    const downloadButtons = document.getElementById('downloadButtons');
    const resetBtn = document.getElementById('resetBtn');
    const postConversionAd = document.getElementById('postConversionAd');

    optionsContent.innerHTML = `
        <div class="option">
            <label>Split Mode</label>
            <select id="splitMode">
                <option value="all">All Pages (One PDF per page)</option>
                <option value="range">Page Range</option>
            </select>
        </div>
        <div class="option" id="rangeOption" style="display: none;">
            <label for="pageRange">Pages (e.g., 1-3, 5, 7-9)</label>
            <input type="text" id="pageRange" placeholder="1-3, 5, 7-9">
        </div>
    `;

    document.getElementById('splitMode').addEventListener('change', function() {
        document.getElementById('rangeOption').style.display = 
            this.value === 'range' ? 'block' : 'none';
    });

    convertBtn.textContent = 'Split PDF';

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
            if (file.type !== 'application/pdf') {
                alert('Please select PDF files only.');
                continue;
            }

            if (!window.checkFileSize?.(file)) continue;

            selectedFiles.push(file);

            const preview = document.createElement('div');
            preview.className = 'image-preview-item';
            preview.innerHTML = `
                <div style="width: 100%; height: 140px; background: var(--bg-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 48px; margin-bottom: 10px;">
                    📄
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

        if (typeof PDFLib === 'undefined') {
            alert('PDF library not loaded. Please refresh the page.');
            return;
        }

        optionsArea.style.display = 'none';
        progressArea.style.display = 'block';
        progressText.textContent = 'Splitting PDF...';

        const splitMode = document.getElementById('splitMode').value;
        const convertedFiles = [];

        try {
            for (const file of selectedFiles) {
                const arrayBuffer = await file.arrayBuffer();
                const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
                const pageCount = pdfDoc.getPageCount();

                if (splitMode === 'all') {
                    for (let i = 0; i < pageCount; i++) {
                        const newPdf = await PDFLib.PDFDocument.create();
                        const [page] = await newPdf.copyPages(pdfDoc, [i]);
                        newPdf.addPage(page);
                        const pdfBytes = await newPdf.save();
                        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                        const filename = file.name.replace('.pdf', `-page${i + 1}.pdf`);
                        convertedFiles.push({ blob, filename });
                    }
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
                } else {
                    // Fallback
                    const fallbackBtn = document.createElement('button');
                    fallbackBtn.className = 'download-btn';
                    fallbackBtn.textContent = `Download ${filename}`;
                    fallbackBtn.onclick = () => window.downloadFile?.(blob, filename);
                    downloadButtons.appendChild(fallbackBtn);
                }
            });

            if (convertedFiles.length > 1) {
                const downloadAllBtn = document.createElement('button');
                downloadAllBtn.className = 'download-btn';
                downloadAllBtn.textContent = `Download All (${convertedFiles.length} files)`;
                downloadAllBtn.style.background = 'var(--success)';
                downloadAllBtn.onclick = () => {
                    convertedFiles.forEach(({ blob, filename }) => {
                        setTimeout(() => window.downloadFile?.(blob, filename), 100);
                    });
                };
                downloadButtons.insertBefore(downloadAllBtn, downloadButtons.firstChild);
            }
        } catch (error) {
            console.error('Split error:', error);
            alert('Failed to split PDF. Please try again.');
            resetBtn.click();
        }
    });

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
        downloadButtons.innerHTML = '';
    });
}
