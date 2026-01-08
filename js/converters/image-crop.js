/**
 * Image Crop Module - Based on working alt version
 */

let currentImage = null;
let currentFileName = '';
let convertedBlob = null;

// Crop Box State
let cropBox = {
    x: 0,
    y: 0,
    width: 500,
    height: 500,
    isDragging: false,
    isResizing: false,
    resizeHandle: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startBoxX: 0,
    startBoxY: 0
};

export async function init() {
    console.log('✂️ Image Cropper initialized');
    
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const fileList = document.getElementById('fileList');
    const optionsArea = document.getElementById('optionsArea');
    const optionsContent = document.getElementById('optionsContent');
    const convertBtn = document.getElementById('convertBtn');
    const downloadArea = document.getElementById('downloadArea');
    const downloadButtons = document.getElementById('downloadButtons');
    const resetBtn = document.getElementById('resetBtn');

    // Create canvas for image display
    optionsContent.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 15px; color: var(--text-primary);">Drag the box to crop your image</h3>
            <div id="cropContainer" style="position: relative; display: inline-block; max-width: 100%; user-select: none;">
                <canvas id="cropCanvas" style="max-width: 100%; max-height: 600px; display: block; border-radius: 8px;"></canvas>
                <!-- Crop Box -->
                <div id="cropBox" style="position: absolute; border: 3px solid #22c55e; background: rgba(34, 197, 94, 0.1); cursor: move; display: none; box-shadow: 0 0 0 9999px rgba(0,0,0,0.5);">
                    <!-- Resize Handles -->
                    <div class="crop-handle" data-handle="nw" style="position: absolute; top: -6px; left: -6px; width: 12px; height: 12px; background: #22c55e; border: 2px solid white; border-radius: 50%; cursor: nw-resize; z-index: 10;"></div>
                    <div class="crop-handle" data-handle="ne" style="position: absolute; top: -6px; right: -6px; width: 12px; height: 12px; background: #22c55e; border: 2px solid white; border-radius: 50%; cursor: ne-resize; z-index: 10;"></div>
                    <div class="crop-handle" data-handle="sw" style="position: absolute; bottom: -6px; left: -6px; width: 12px; height: 12px; background: #22c55e; border: 2px solid white; border-radius: 50%; cursor: sw-resize; z-index: 10;"></div>
                    <div class="crop-handle" data-handle="se" style="position: absolute; bottom: -6px; right: -6px; width: 12px; height: 12px; background: #22c55e; border: 2px solid white; border-radius: 50%; cursor: se-resize; z-index: 10;"></div>
                    <!-- Dimensions Display -->
                    <div style="position: absolute; top: -35px; left: 50%; transform: translateX(-50%); background: #22c55e; color: white; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
                        <span id="cropDimensions">500 x 500</span>
                    </div>
                </div>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; margin-top: 20px;">
            <div class="option">
                <label for="cropX">X Position</label>
                <input type="number" id="cropX" value="0" min="0" style="width: 100%;">
            </div>
            <div class="option">
                <label for="cropY">Y Position</label>
                <input type="number" id="cropY" value="0" min="0" style="width: 100%;">
            </div>
            <div class="option">
                <label for="cropWidth">Width</label>
                <input type="number" id="cropWidth" value="500" min="50" style="width: 100%;">
            </div>
            <div class="option">
                <label for="cropHeight">Height</label>
                <input type="number" id="cropHeight" value="500" min="50" style="width: 100%;">
            </div>
        </div>
    `;

    convertBtn.textContent = 'Crop Image';

    // Event listeners
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => { dropZone.classList.remove('drag-over'); });
    dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('drag-over'); if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]); });
    fileInput.addEventListener('change', (e) => { if (e.target.files.length) handleFile(e.target.files[0]); });
    convertBtn.addEventListener('click', cropImage);
    resetBtn.addEventListener('click', reset);

    // Sync input fields with crop box
    ['cropX', 'cropY', 'cropWidth', 'cropHeight'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', (e) => {
                const value = parseInt(e.target.value) || 0;
                const canvas = document.getElementById('cropCanvas');
                if (!canvas) return;
                
                if (id === 'cropX') cropBox.x = Math.max(0, Math.min(value, canvas.width - cropBox.width));
                if (id === 'cropY') cropBox.y = Math.max(0, Math.min(value, canvas.height - cropBox.height));
                if (id === 'cropWidth') cropBox.width = Math.max(50, Math.min(value, canvas.width - cropBox.x));
                if (id === 'cropHeight') cropBox.height = Math.max(50, Math.min(value, canvas.height - cropBox.y));
                updateCropBox();
            });
        }
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }
        
        if (file.size > 50 * 1024 * 1024) {
            alert('File too large (max 50MB)');
            return;
        }
        
        currentFileName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                currentImage = img;
                const canvas = document.getElementById('cropCanvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                // Initialize Crop Box to center
                const initialWidth = Math.min(500, img.width * 0.8);
                const initialHeight = Math.min(500, img.height * 0.8);
                cropBox.x = (img.width - initialWidth) / 2;
                cropBox.y = (img.height - initialHeight) / 2;
                cropBox.width = initialWidth;
                cropBox.height = initialHeight;
                
                // Update input constraints
                document.getElementById('cropWidth').value = Math.round(initialWidth);
                document.getElementById('cropHeight').value = Math.round(initialHeight);
                document.getElementById('cropWidth').max = img.width;
                document.getElementById('cropHeight').max = img.height;
                document.getElementById('cropX').max = img.width;
                document.getElementById('cropY').max = img.height;
                
                dropZone.style.display = 'none';
                previewArea.style.display = 'block';
                optionsArea.style.display = 'block';
                document.getElementById('fileCount').textContent = '1';
                
                // Show and position crop box
                setTimeout(() => {
                    updateCropBox();
                    initCropBoxEvents();
                }, 100);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function updateCropBox() {
        const canvas = document.getElementById('cropCanvas');
        const cropBoxEl = document.getElementById('cropBox');
        const cropDimensions = document.getElementById('cropDimensions');
        
        if (!canvas || !cropBoxEl) return;
        
        const canvasRect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / canvasRect.width;
        const scaleY = canvas.height / canvasRect.height;
        
        // Position on display
        const displayX = cropBox.x / scaleX;
        const displayY = cropBox.y / scaleY;
        const displayWidth = cropBox.width / scaleX;
        const displayHeight = cropBox.height / scaleY;
        
        cropBoxEl.style.left = displayX + 'px';
        cropBoxEl.style.top = displayY + 'px';
        cropBoxEl.style.width = displayWidth + 'px';
        cropBoxEl.style.height = displayHeight + 'px';
        cropBoxEl.style.display = 'block';
        
        // Update Dimensions Display
        if (cropDimensions) {
            cropDimensions.textContent = Math.round(cropBox.width) + ' × ' + Math.round(cropBox.height);
        }
        
        // Update Input Fields
        document.getElementById('cropX').value = Math.round(cropBox.x);
        document.getElementById('cropY').value = Math.round(cropBox.y);
        document.getElementById('cropWidth').value = Math.round(cropBox.width);
        document.getElementById('cropHeight').value = Math.round(cropBox.height);
    }

    function initCropBoxEvents() {
        const cropBoxEl = document.getElementById('cropBox');
        const cropHandles = document.querySelectorAll('.crop-handle');
        
        if (!cropBoxEl) return;
        
        // Drag functionality
        cropBoxEl.addEventListener('mousedown', startDrag);
        cropBoxEl.addEventListener('touchstart', startDrag, { passive: false });
        
        // Resize handles
        cropHandles.forEach(handle => {
            handle.addEventListener('mousedown', startResize);
            handle.addEventListener('touchstart', startResize, { passive: false });
        });
        
        // Global move and end events
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', endDragResize);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', endDragResize);
    }

    function startDrag(e) {
        if (e.target.classList.contains('crop-handle')) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const canvas = document.getElementById('cropCanvas');
        const canvasRect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / canvasRect.width;
        const scaleY = canvas.height / canvasRect.height;
        
        cropBox.isDragging = true;
        cropBox.startX = clientX;
        cropBox.startY = clientY;
        cropBox.startBoxX = cropBox.x;
        cropBox.startBoxY = cropBox.y;
        
        document.getElementById('cropBox').style.cursor = 'grabbing';
    }

    function startResize(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        cropBox.isResizing = true;
        cropBox.resizeHandle = e.target.dataset.handle;
        cropBox.startX = clientX;
        cropBox.startY = clientY;
        cropBox.startWidth = cropBox.width;
        cropBox.startHeight = cropBox.height;
        cropBox.startBoxX = cropBox.x;
        cropBox.startBoxY = cropBox.y;
    }

    function onMove(e) {
        if (!cropBox.isDragging && !cropBox.isResizing) return;
        
        e.preventDefault();
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const canvas = document.getElementById('cropCanvas');
        if (!canvas) return;
        
        const canvasRect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / canvasRect.width;
        const scaleY = canvas.height / canvasRect.height;
        
        const deltaX = (clientX - cropBox.startX) * scaleX;
        const deltaY = (clientY - cropBox.startY) * scaleY;
        
        if (cropBox.isDragging) {
            let newX = cropBox.startBoxX + deltaX;
            let newY = cropBox.startBoxY + deltaY;
            
            newX = Math.max(0, Math.min(newX, canvas.width - cropBox.width));
            newY = Math.max(0, Math.min(newY, canvas.height - cropBox.height));
            
            cropBox.x = newX;
            cropBox.y = newY;
        } else if (cropBox.isResizing) {
            const handle = cropBox.resizeHandle;
            let newX = cropBox.startBoxX;
            let newY = cropBox.startBoxY;
            let newWidth = cropBox.startWidth;
            let newHeight = cropBox.startHeight;
            
            if (handle.includes('e')) newWidth = cropBox.startWidth + deltaX;
            if (handle.includes('w')) { newX = cropBox.startBoxX + deltaX; newWidth = cropBox.startWidth - deltaX; }
            if (handle.includes('s')) newHeight = cropBox.startHeight + deltaY;
            if (handle.includes('n')) { newY = cropBox.startBoxY + deltaY; newHeight = cropBox.startHeight - deltaY; }
            
            newWidth = Math.max(50, Math.min(newWidth, canvas.width - newX));
            newHeight = Math.max(50, Math.min(newHeight, canvas.height - newY));
            newX = Math.max(0, Math.min(newX, canvas.width - 50));
            newY = Math.max(0, Math.min(newY, canvas.height - 50));
            
            cropBox.x = newX;
            cropBox.y = newY;
            cropBox.width = newWidth;
            cropBox.height = newHeight;
        }
        
        updateCropBox();
    }

    function endDragResize() {
        if (cropBox.isDragging || cropBox.isResizing) {
            cropBox.isDragging = false;
            cropBox.isResizing = false;
            cropBox.resizeHandle = null;
            const cropBoxEl = document.getElementById('cropBox');
            if (cropBoxEl) cropBoxEl.style.cursor = 'move';
        }
    }

    function cropImage() {
        if (!currentImage) return;
        
        const x = Math.round(cropBox.x);
        const y = Math.round(cropBox.y);
        const width = Math.round(cropBox.width);
        const height = Math.round(cropBox.height);

        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = width;
        cropCanvas.height = height;
        const cropCtx = cropCanvas.getContext('2d');
        cropCtx.drawImage(currentImage, x, y, width, height, 0, 0, width, height);

        cropCanvas.toBlob((blob) => {
            convertedBlob = blob;
            optionsArea.style.display = 'none';
            downloadArea.style.display = 'block';
            document.getElementById('postConversionAd').style.display = 'block';
            
            const filename = currentFileName.replace(/(\.[^.]+)$/, '_cropped$1');
            downloadButtons.innerHTML = '';
            
            const btn = window.createDownloadButton?.(blob, filename);
            if (btn) {
                downloadButtons.appendChild(btn);
            }
        }, 'image/png');
    }

    function reset() {
        currentImage = null;
        convertedBlob = null;
        cropBox.isDragging = false;
        cropBox.isResizing = false;
        
        const cropBoxEl = document.getElementById('cropBox');
        if (cropBoxEl) cropBoxEl.style.display = 'none';
        
        dropZone.style.display = 'flex';
        previewArea.style.display = 'none';
        optionsArea.style.display = 'none';
        downloadArea.style.display = 'none';
        document.getElementById('postConversionAd').style.display = 'none';
        fileInput.value = '';
    }
}
