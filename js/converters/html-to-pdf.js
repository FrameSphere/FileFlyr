/**
 * HTML to PDF Converter Module
 * Converts HTML files to PDF using html2pdf.js
 */

let selectedFiles = [];
let convertedFiles = [];
let html2pdfLoaded = false;

export async function init() {
    console.log('🌐 HTML to PDF converter initialized');
    
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const fileList = document.getElementById('fileList');
    const fileCount = document.getElementById('fileCount');
    const optionsArea = document.getElementById('optionsArea');
    const optionsContent = document.getElementById('optionsContent');
    const convertBtn = document.getElementById('convertBtn');
    const progressArea = document.getElementById('progressArea');
    const downloadArea = document.getElementById('downloadArea');
    const resetBtn = document.getElementById('resetBtn');

    optionsContent.innerHTML = `
        <div class="option">
            <label for="pageSize">Page Size</label>
            <select id="pageSize" class="select-box">
                <option value="a4" selected>A4</option>
                <option value="letter">Letter</option>
                <option value="legal">Legal</option>
            </select>
        </div>
        <div class="option">
            <label for="orientation">Orientation</label>
            <select id="orientation" class="select-box">
                <option value="portrait" selected>Portrait</option>
                <option value="landscape">Landscape</option>
            </select>
        </div>
        <div class="option">
            <label for="margin">Margins</label>
            <select id="margin" class="select-box">
                <option value="10">Small (10mm)</option>
                <option value="15" selected>Medium (15mm)</option>
                <option value="20">Large (20mm)</option>
            </select>
        </div>
        <div class="info-box" style="margin-top: 12px; padding: 12px; background: var(--bg-dark); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">
            <strong>✓</strong> Converts HTML to PDF with proper styling
        </div>
    `;

    convertBtn.textContent = 'Convert to PDF';
    convertBtn.disabled = false;

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
            if (!file.type.includes('html') && !file.name.endsWith('.html') && !file.name.endsWith('.htm')) {
                alert('Please select HTML files only.');
                continue;
            }

            selectedFiles.push(file);

            const preview = document.createElement('div');
            preview.className = 'image-preview-item';
            preview.innerHTML = `
                <div style="width: 100%; height: 140px; background: var(--bg-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 48px; margin-bottom: 10px;">
                    🌐
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
    
    convertBtn.addEventListener('click', convertFiles);

    resetBtn.addEventListener('click', reset);
}

async function loadHtml2Pdf() {
    if (html2pdfLoaded) return;
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    
    await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
    
    html2pdfLoaded = true;
    console.log('✓ html2pdf.js loaded');
}

async function convertFiles() {
    const pageSize = document.getElementById('pageSize').value;
    const orientation = document.getElementById('orientation').value;
    const margin = parseInt(document.getElementById('margin').value);
    
    const optionsArea = document.getElementById('optionsArea');
    const progressArea = document.getElementById('progressArea');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    optionsArea.style.display = 'none';
    progressArea.style.display = 'block';
    convertedFiles = [];
    
    // Load html2pdf if not loaded
    if (!html2pdfLoaded) {
        progressText.textContent = 'Loading PDF library...';
        try {
            await loadHtml2Pdf();
        } catch (error) {
            alert('Failed to load PDF library: ' + error.message);
            progressArea.style.display = 'none';
            optionsArea.style.display = 'block';
            return;
        }
    }
    
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        progressText.textContent = `Converting ${i + 1} of ${selectedFiles.length}...`;
        progressFill.style.width = ((i / selectedFiles.length) * 100) + '%';
        
        try {
            const blob = await convertHtmlToPdf(file, { pageSize, orientation, margin });
            const fileName = file.name.replace(/\.(html|htm)$/i, '') + '.pdf';
            convertedFiles.push({ blob, fileName });
        } catch (error) {
            console.error('Conversion error:', error);
            alert(`Failed to convert ${file.name}: ${error.message}`);
        }
    }
    
    progressFill.style.width = '100%';
    progressText.textContent = 'Conversion complete!';
    
    setTimeout(() => {
        progressArea.style.display = 'none';
        showDownloads();
    }, 500);
}

async function convertHtmlToPdf(file, options) {
    // Read HTML content
    const htmlContent = await file.text();
    
    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    container.style.width = '100%';
    container.style.padding = '20px';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.fontSize = '14px';
    container.style.lineHeight = '1.6';
    container.style.color = '#000';
    container.style.whiteSpace = 'pre-wrap';
    container.style.wordWrap = 'break-word';
    document.body.appendChild(container);
    
    // Configure html2pdf options with improved settings for text rendering
    const opt = {
        margin: options.margin,
        filename: 'temp.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            letterRendering: true,
            allowTaint: true,
            logging: false,
            removeContainer: false,
            imageTimeout: 0
        },
        jsPDF: { unit: 'mm', format: options.pageSize, orientation: options.orientation }
    };
    
    // Convert to PDF
    const pdfBlob = await html2pdf().set(opt).from(container).output('blob');
    
    // Clean up
    document.body.removeChild(container);
    
    return pdfBlob;
}

function showDownloads() {
    const downloadArea = document.getElementById('downloadArea');
    const downloadButtons = document.getElementById('downloadButtons');
    const postConversionAd = document.getElementById('postConversionAd');
    
    downloadButtons.innerHTML = '';
    
    convertedFiles.forEach((file) => {
        const btn = window.createDownloadButton?.(file.blob, file.fileName);
        if (btn) {
            downloadButtons.appendChild(btn);
        } else {
            const fallbackBtn = document.createElement('button');
            fallbackBtn.className = 'download-btn';
            fallbackBtn.textContent = `Download ${file.fileName}`;
            fallbackBtn.onclick = () => window.downloadFile?.(file.blob, file.fileName);
            downloadButtons.appendChild(fallbackBtn);
        }
    });
    
    if (convertedFiles.length > 1) {
        const downloadAllBtn = document.createElement('button');
        downloadAllBtn.className = 'download-btn';
        downloadAllBtn.style.background = 'var(--success)';
        downloadAllBtn.textContent = `Download All (${convertedFiles.length} files)`;
        downloadAllBtn.onclick = () => {
            convertedFiles.forEach(({ blob, fileName }) => {
                setTimeout(() => window.downloadFile?.(blob, fileName), 100);
            });
        };
        downloadButtons.insertBefore(downloadAllBtn, downloadButtons.firstChild);
    }
    
    downloadArea.style.display = 'block';
    if (postConversionAd) postConversionAd.style.display = 'block';
}

function reset() {
    selectedFiles = [];
    convertedFiles = [];
    
    const fileInput = document.getElementById('fileInput');
    const dropZone = document.getElementById('dropZone');
    const previewArea = document.getElementById('previewArea');
    const optionsArea = document.getElementById('optionsArea');
    const progressArea = document.getElementById('progressArea');
    const downloadArea = document.getElementById('downloadArea');
    const postConversionAd = document.getElementById('postConversionAd');
    
    fileInput.value = '';
    dropZone.style.display = 'flex';
    previewArea.style.display = 'none';
    optionsArea.style.display = 'none';
    progressArea.style.display = 'none';
    downloadArea.style.display = 'none';
    if (postConversionAd) postConversionAd.style.display = 'none';
}
