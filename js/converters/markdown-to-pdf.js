/**
 * Markdown to PDF Converter Module
 * Converts Markdown files to PDF using marked.js and jsPDF
 */

let selectedFiles = [];
let convertedFiles = [];
let librariesLoaded = false;

export async function init() {
    console.log('📝 Markdown to PDF converter initialized');
    
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const fileList = document.getElementById('fileList');
    const fileCount = document.getElementById('fileCount');
    const optionsArea = document.getElementById('optionsArea');
    const optionsContent = document.getElementById('optionsContent');
    const convertBtn = document.getElementById('convertBtn');
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
            <label for="fontSize">Font Size</label>
            <select id="fontSize" class="select-box">
                <option value="10">Small (10pt)</option>
                <option value="12" selected>Medium (12pt)</option>
                <option value="14">Large (14pt)</option>
            </select>
        </div>
        <div class="option">
            <label>
                <input type="checkbox" id="includeCodeBlocks" checked>
                Include code blocks with syntax highlighting
            </label>
        </div>
        <div class="info-box" style="margin-top: 12px; padding: 12px; background: var(--bg-dark); border-radius: 8px; font-size: 13px; color: var(--text-secondary);">
            <strong>✓</strong> Converts Markdown to formatted PDF
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
            if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) {
                alert('Please select Markdown files only.');
                continue;
            }

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
    
    convertBtn.addEventListener('click', convertFiles);

    resetBtn.addEventListener('click', reset);
}

async function loadLibraries() {
    if (librariesLoaded) return;
    
    // Load marked.js
    const markedScript = document.createElement('script');
    markedScript.src = 'https://cdn.jsdelivr.net/npm/marked@11.1.1/marked.min.js';
    await new Promise((resolve, reject) => {
        markedScript.onload = resolve;
        markedScript.onerror = reject;
        document.head.appendChild(markedScript);
    });
    
    // Load jsPDF
    const jsPDFScript = document.createElement('script');
    jsPDFScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    await new Promise((resolve, reject) => {
        jsPDFScript.onload = resolve;
        jsPDFScript.onerror = reject;
        document.head.appendChild(jsPDFScript);
    });
    
    librariesLoaded = true;
    console.log('✓ Markdown libraries loaded');
}

async function convertFiles() {
    const pageSize = document.getElementById('pageSize').value;
    const fontSize = parseInt(document.getElementById('fontSize').value);
    const includeCodeBlocks = document.getElementById('includeCodeBlocks').checked;
    
    const optionsArea = document.getElementById('optionsArea');
    const progressArea = document.getElementById('progressArea');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    optionsArea.style.display = 'none';
    progressArea.style.display = 'block';
    convertedFiles = [];
    
    // Load libraries if not loaded
    if (!librariesLoaded) {
        progressText.textContent = 'Loading libraries...';
        try {
            await loadLibraries();
        } catch (error) {
            alert('Failed to load libraries: ' + error.message);
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
            const blob = await convertMarkdownToPdf(file, { pageSize, fontSize, includeCodeBlocks });
            const fileName = file.name.replace(/\.(md|markdown)$/i, '') + '.pdf';
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

async function convertMarkdownToPdf(file, options) {
    // Read markdown content
    const markdownContent = await file.text();
    
    // Convert markdown to HTML
    const html = marked.parse(markdownContent);
    
    // Create PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: options.pageSize
    });
    
    // Set font
    doc.setFontSize(options.fontSize);
    
    // Convert HTML to plain text with basic formatting
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const textContent = tempDiv.textContent || tempDiv.innerText;
    
    // Split text into lines
    const lines = doc.splitTextToSize(textContent, 170);
    
    // Add text to PDF
    let y = 20;
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = options.fontSize * 0.5;
    
    lines.forEach(line => {
        if (y + lineHeight > pageHeight - 20) {
            doc.addPage();
            y = 20;
        }
        doc.text(line, 20, y);
        y += lineHeight;
    });
    
    // Return as blob
    return doc.output('blob');
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
