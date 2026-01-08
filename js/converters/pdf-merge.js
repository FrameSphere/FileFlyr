/**
 * PDF Merge Module
 * Requires pdf-lib library
 */

let selectedFiles = [];

export async function init() {
    console.log('📚 PDF Merge initialized');
    
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
            <p>Drag files to reorder them before merging</p>
        </div>
    `;

    convertBtn.textContent = 'Merge PDFs';

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
        if (selectedFiles.length < 2) {
            alert('Please select at least 2 PDF files to merge.');
            return;
        }

        if (typeof PDFLib === 'undefined') {
            alert('PDF library not loaded. Please refresh the page.');
            return;
        }

        optionsArea.style.display = 'none';
        progressArea.style.display = 'block';
        progressText.textContent = 'Merging PDFs...';

        try {
            const blob = await mergePDFs(selectedFiles);
            
            progressArea.style.display = 'none';
            downloadArea.style.display = 'block';
            postConversionAd.style.display = 'block';

            downloadButtons.innerHTML = '';
            
            // Generate better filename
            const baseName = selectedFiles[0].name.replace('.pdf', '');
            const suggestedName = `${baseName}_merged.pdf`;
            
            const btn = window.createDownloadButton?.(blob, suggestedName);
            if (btn) {
                downloadButtons.appendChild(btn);
            } else {
                // Fallback
                const fallbackBtn = document.createElement('button');
                fallbackBtn.className = 'download-btn';
                fallbackBtn.style.background = 'var(--success)';
                fallbackBtn.textContent = `Download ${suggestedName}`;
                fallbackBtn.onclick = () => window.downloadFile?.(blob, suggestedName);
                downloadButtons.appendChild(fallbackBtn);
            }
        } catch (error) {
            console.error('Merge error:', error);
            alert('Failed to merge PDFs. Please try again.');
            resetBtn.click();
        }
    });

    async function mergePDFs(files) {
        const mergedPdf = await PDFLib.PDFDocument.create();

        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach(page => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        return new Blob([mergedPdfBytes], { type: 'application/pdf' });
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
        downloadButtons.innerHTML = '';
    });
}
