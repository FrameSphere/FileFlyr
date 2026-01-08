// Core utilities for Fileflyr

// File size formatter
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Check file size limit (50MB default)
function checkFileSize(file, maxSizeMB = 50) {
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
        alert(`File too large: ${formatFileSize(file.size)}. Maximum size is ${maxSizeMB}MB.`);
        return false;
    }
    return true;
}

// Validate file type
function validateFileType(file, allowedTypes) {
    if (!allowedTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.type}. Please select a valid file.`);
        return false;
    }
    return true;
}

// Download file with custom name dialog
function downloadWithCustomName(buttonElement, defaultFilename) {
    // Get the blob from button or global storage
    const blob = buttonElement._fileBlob || window._currentBlob || window._convertedBlobs?.[defaultFilename];
    
    if (!blob) {
        console.error('No blob found for download');
        alert('Error: File not ready for download');
        return;
    }
    
    // Prevent event bubbling
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    // Create modal for filename input
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    const dialog = document.createElement('div');
    dialog.style.cssText = `
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    
    // Extract name and extension
    const lastDot = defaultFilename.lastIndexOf('.');
    const nameWithoutExt = lastDot > 0 ? defaultFilename.substring(0, lastDot) : defaultFilename;
    const extension = lastDot > 0 ? defaultFilename.substring(lastDot) : '';
    
    dialog.innerHTML = `
        <h3 style="margin-bottom: 20px; font-size: 24px; color: var(--text-primary);">Save File As</h3>
        
        <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; color: var(--text-secondary); font-size: 14px; font-weight: 600;">File Name</label>
            <div style="display: flex; gap: 5px; align-items: center;">
                <input 
                    type="text" 
                    id="customFilename" 
                    value="${nameWithoutExt}" 
                    style="flex: 1; padding: 12px; background: var(--bg-dark); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary); font-size: 16px;"
                    autofocus
                >
                <span style="color: var(--text-secondary); font-weight: 600; font-size: 16px;">${extension}</span>
            </div>
            <p style="margin-top: 8px; font-size: 12px; color: var(--text-tertiary);">
                File size: ${formatFileSize(blob.size)}
            </p>
        </div>
        
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="cancelBtn" style="padding: 12px 24px; background: var(--bg-hover); color: var(--text-secondary); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-weight: 600;">
                Cancel
            </button>
            <button id="downloadBtn" style="padding: 12px 24px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                Download
            </button>
        </div>
    `;
    
    modal.appendChild(dialog);
    document.body.appendChild(modal);
    
    // Focus input and select text
    setTimeout(() => {
        const input = document.getElementById('customFilename');
        input.focus();
        input.select();
    }, 50);
    
    // Event listeners
    document.getElementById('cancelBtn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    const performDownload = () => {
        const customName = document.getElementById('customFilename').value.trim();
        if (!customName) {
            alert('Please enter a filename');
            return;
        }
        
        const finalFilename = customName + extension;
        document.body.removeChild(modal);
        
        // Small delay to ensure modal is removed before download
        setTimeout(() => {
            downloadFile(blob, finalFilename);
        }, 100);
    };
    
    document.getElementById('downloadBtn').addEventListener('click', performDownload);
    
    // Enter key to download
    document.getElementById('customFilename').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performDownload();
        }
    });
    
    // ESC key to cancel
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape' && document.body.contains(modal)) {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    // Click outside to cancel
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Create download link (direct download without dialog)
function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Show error message
function showError(message) {
    alert(message);
}

// Memory cleanup
function cleanupMemory() {
    if (window.gc) {
        window.gc();
    }
}

// Helper function to create download buttons with custom naming
function createDownloadButton(blob, filename, options = {}) {
    const btn = document.createElement('button');
    btn.className = options.className || 'download-btn';
    
    const sizeStr = formatFileSize(blob.size);
    btn.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <span style="font-size: 16px;">⬇️ ${filename}</span>
            <span style="font-size: 12px; opacity: 0.7;">${sizeStr}</span>
        </div>
    `;
    
    // Store blob reference in button
    btn._fileBlob = blob;
    btn._fileName = filename;
    
    btn.onclick = () => {
        downloadWithCustomName(btn, filename);
    };
    
    return btn;
}

// Make functions globally available
window.formatFileSize = formatFileSize;
window.checkFileSize = checkFileSize;
window.validateFileType = validateFileType;
window.downloadFile = downloadFile;
window.downloadWithCustomName = downloadWithCustomName;
window.createDownloadButton = createDownloadButton;
window.showError = showError;
window.cleanupMemory = cleanupMemory;

console.log('✅ Fileflyr Core loaded');
