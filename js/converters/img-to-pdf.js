/**
 * Image to PDF Converter Module
 * Requires jsPDF library
 */

let selectedFiles = [];

export async function init() {
    console.log('📄 Image to PDF converter initialized');
    
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
            <label>Page Size</label>
            <select id="pageSize">
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="fit">Fit to Image</option>
            </select>
        </div>
        <div class="option">
            <label>Orientation</label>
            <select id="orientation">
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
            </select>
        </div>
        <div class="option">
            <label>
                <input type="checkbox" id="mergeAll" checked>
                Merge all images into one PDF
            </label>
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

        if (typeof window.jspdf === 'undefined') {
            alert('PDF library not loaded. Please refresh the page.');
            return;
        }

        optionsArea.style.display = 'none';
        progressArea.style.display = 'block';

        const pageSize = document.getElementById('pageSize').value;
        const orientation = document.getElementById('orientation').value;
        const mergeAll = document.getElementById('mergeAll').checked;

        try {
            if (mergeAll) {
                progressText.textContent = 'Creating PDF...';
                const blob = await createMergedPDF(selectedFiles, pageSize, orientation);
                
                progressArea.style.display = 'none';
                downloadArea.style.display = 'block';
                postConversionAd.style.display = 'block';

                // Generate better filename
                const baseName = selectedFiles[0].name.replace(/\.[^.]+$/, '');
                const suggestedName = selectedFiles.length > 1 ? `${baseName}_combined.pdf` : `${baseName}.pdf`;

                downloadButtons.innerHTML = '';
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
            } else {
                const convertedFiles = [];
                
                for (let i = 0; i < selectedFiles.length; i++) {
                    const file = selectedFiles[i];
                    const progress = ((i + 1) / selectedFiles.length) * 100;
                    
                    progressFill.style.width = progress + '%';
                    progressText.textContent = `Converting ${i + 1} of ${selectedFiles.length}...`;

                    const blob = await createPDFFromImage(file, pageSize, orientation);
                    const filename = file.name.replace(/\.[^.]+$/, '.pdf');
                    convertedFiles.push({ blob, filename });
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
            console.error('Conversion error:', error);
            alert('Failed to create PDF. Please try again.');
            resetBtn.click();
        }
    });

    async function createMergedPDF(files, pageSize, orientation) {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF(orientation, 'mm', pageSize);
        
        for (let i = 0; i < files.length; i++) {
            if (i > 0) pdf.addPage();
            await addImageToPDF(pdf, files[i], pageSize, orientation);
        }

        return pdf.output('blob');
    }

    async function createPDFFromImage(file, pageSize, orientation) {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF(orientation, 'mm', pageSize);
        await addImageToPDF(pdf, file, pageSize, orientation);
        return pdf.output('blob');
    }

    async function addImageToPDF(pdf, file, pageSize, orientation) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    let pdfWidth, pdfHeight;
                    
                    if (pageSize === 'fit') {
                        pdfWidth = img.width * 0.264583;
                        pdfHeight = img.height * 0.264583;
                    } else {
                        const pageWidth = orientation === 'portrait' ? 210 : 297;
                        const pageHeight = orientation === 'portrait' ? 297 : 210;
                        
                        const ratio = Math.min(
                            (pageWidth - 20) / img.width,
                            (pageHeight - 20) / img.height
                        );
                        
                        pdfWidth = img.width * ratio * 0.264583;
                        pdfHeight = img.height * ratio * 0.264583;
                    }

                    pdf.addImage(e.target.result, 'JPEG', 10, 10, pdfWidth, pdfHeight);
                    resolve();
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
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
