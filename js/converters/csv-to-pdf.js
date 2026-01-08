/**
 * CSV to PDF Converter
 * Based on working alt/converters/csv-to-pdf.html
 */

let selectedFile = null;
let convertedBlob = null;

export async function init() {
    console.log('📊 CSV to PDF converter initialized');
    
    // Load libraries first
    await ensureLibrariesLoaded();
    
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

    // Setup options
    optionsContent.innerHTML = `
        <div class="option">
            <label for="orientation">Page Orientation</label>
            <select id="orientation">
                <option value="portrait">Portrait</option>
                <option value="landscape" selected>Landscape (Recommended)</option>
            </select>
        </div>
        <div class="option">
            <label for="fontSize">Font Size</label>
            <select id="fontSize">
                <option value="7">Small (7pt)</option>
                <option value="8" selected>Normal (8pt)</option>
                <option value="10">Large (10pt)</option>
            </select>
        </div>
    `;

    convertBtn.textContent = 'Convert to PDF';

    // Event listeners
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => { dropZone.classList.remove('drag-over'); });
    dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('drag-over'); handleFiles(e.dataTransfer.files); });
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
    convertBtn.addEventListener('click', createPDF);
    resetBtn.addEventListener('click', reset);

    function handleFiles(files) {
        const file = files[0];
        
        const isCSV = file.type === 'text/csv' || 
                     file.type === 'application/csv' ||
                     file.name.toLowerCase().endsWith('.csv');
        
        if (!isCSV) {
            alert('Please select a CSV file');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert('File too large (max 10MB)');
            return;
        }

        selectedFile = file;
        
        // Show preview
        fileList.innerHTML = `
            <div class="image-preview-item">
                <div style="width: 100%; height: 140px; background: var(--bg-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 48px; margin-bottom: 10px;">📊</div>
                <p>${file.name}</p>
                <p style="color: var(--text-tertiary); font-size: 11px;">${window.formatFileSize?.(file.size)}</p>
            </div>
        `;

        fileCount.textContent = '1';
        previewArea.style.display = 'block';
        optionsArea.style.display = 'block';
        dropZone.style.display = 'none';
    }

    async function createPDF() {
        if (!selectedFile) return;

        optionsArea.style.display = 'none';
        progressArea.style.display = 'block';
        progressText.textContent = 'Converting CSV to PDF...';

        try {
            // Ensure libraries are loaded
            if (typeof window.jspdf === 'undefined') {
                throw new Error('jsPDF library not loaded');
            }

            const { jsPDF } = window.jspdf;
            
            // Check if autoTable is available
            const testDoc = new jsPDF();
            if (typeof testDoc.autoTable !== 'function') {
                throw new Error('autoTable plugin not loaded');
            }

            const orientation = document.getElementById('orientation').value;
            const fontSize = parseInt(document.getElementById('fontSize').value);

            // Read CSV
            const csvText = await selectedFile.text();
            const rows = parseCSV(csvText);

            if (rows.length === 0) {
                throw new Error('CSV file is empty');
            }

            // Create PDF
            const pdf = new jsPDF({
                orientation: orientation,
                unit: 'mm',
                format: 'a4'
            });

            const headers = rows[0];
            const data = rows.slice(1);

            pdf.autoTable({
                head: [headers],
                body: data,
                theme: 'grid',
                styles: {
                    fontSize: fontSize,
                    cellPadding: 2
                },
                headStyles: {
                    fillColor: [99, 102, 241],
                    fontStyle: 'bold'
                },
                margin: { top: 10 }
            });

            convertedBlob = pdf.output('blob');

            progressArea.style.display = 'none';
            showDownload();

        } catch (error) {
            console.error('Conversion error:', error);
            alert(`Failed to convert CSV: ${error.message}`);
            progressArea.style.display = 'none';
            optionsArea.style.display = 'block';
        }
    }

    function parseCSV(text) {
        const lines = text.split(/\r?\n/);
        const rows = [];

        for (let line of lines) {
            if (line.trim() === '') continue;

            const row = [];
            let cell = '';
            let insideQuotes = false;

            for (let i = 0; i < line.length; i++) {
                const char = line[i];

                if (char === '"') {
                    if (insideQuotes && line[i + 1] === '"') {
                        cell += '"';
                        i++;
                    } else {
                        insideQuotes = !insideQuotes;
                    }
                } else if (char === ',' && !insideQuotes) {
                    row.push(cell.trim());
                    cell = '';
                } else {
                    cell += char;
                }
            }

            row.push(cell.trim());
            rows.push(row);
        }

        return rows.filter(row => row.some(cell => cell));
    }

    function showDownload() {
        downloadArea.style.display = 'block';
        if (postConversionAd) postConversionAd.style.display = 'block';

        const fileName = selectedFile.name.replace(/\.csv$/i, '.pdf');
        downloadButtons.innerHTML = '';

        const btn = window.createDownloadButton?.(convertedBlob, fileName);
        if (btn) {
            downloadButtons.appendChild(btn);
        } else {
            // Fallback
            const fallbackBtn = document.createElement('button');
            fallbackBtn.className = 'download-btn';
            fallbackBtn.textContent = `Download ${fileName}`;
            fallbackBtn.onclick = () => window.downloadFile?.(convertedBlob, fileName);
            downloadButtons.appendChild(fallbackBtn);
        }
    }

    function reset() {
        selectedFile = null;
        convertedBlob = null;

        fileInput.value = '';
        fileList.innerHTML = '';
        dropZone.style.display = 'flex';
        previewArea.style.display = 'none';
        optionsArea.style.display = 'none';
        progressArea.style.display = 'none';
        downloadArea.style.display = 'none';
        if (postConversionAd) postConversionAd.style.display = 'none';
    }
}

// Ensure jsPDF and autoTable are loaded
async function ensureLibrariesLoaded() {
    // Load jsPDF if not present
    if (typeof window.jspdf === 'undefined') {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
        console.log('✅ jsPDF loaded');
    }

    // Load autoTable plugin if not present
    if (window.jspdf) {
        const testDoc = new window.jspdf.jsPDF();
        if (typeof testDoc.autoTable !== 'function') {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js');
            console.log('✅ autoTable plugin loaded');
            
            // Wait a bit for plugin to initialize
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}

function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load ${url}`));
        document.head.appendChild(script);
    });
}
