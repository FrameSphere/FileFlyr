/**
 * Fileflyr - Converter Registry
 * Zentrale Definition aller Converter mit SEO-Metadaten
 */

export const CONVERTER_REGISTRY = {
    // ========================================
    // IMAGE CONVERTERS
    // ========================================
    'png-to-jpg': {
        title: 'PNG to JPG Converter - Free & Fast | Fileflyr',
        description: 'Convert PNG to JPG instantly in your browser. Adjust quality, resize images. 100% free, no upload required.',
        h1: 'PNG to JPG Converter',
        subtitle: 'Convert PNG images to JPG format',
        category: 'image',
        icon: 'image',
        badges: ['popular'],
        acceptFormats: ['image/png'],
        module: 'png-to-jpg'
    },
    
    'jpg-to-png': {
        title: 'JPG to PNG Converter - Add Transparency | Fileflyr',
        description: 'Convert JPG to PNG to add transparency support. Free, fast, and completely private.',
        h1: 'JPG to PNG Converter',
        subtitle: 'Add transparency with PNG format',
        category: 'image',
        icon: 'image',
        badges: ['popular'],
        acceptFormats: ['image/jpeg', 'image/jpg'],
        module: 'jpg-to-png'
    },
    
    'webp-to-jpg': {
        title: 'WEBP to JPG Converter - Universal Format | Fileflyr',
        description: 'Convert modern WEBP images to universal JPG format. No upload, 100% private processing.',
        h1: 'WEBP to JPG Converter',
        subtitle: 'Convert modern WEBP to universal JPG',
        category: 'image',
        icon: 'globe',
        badges: [],
        acceptFormats: ['image/webp'],
        module: 'webp-to-jpg'
    },
    
    'webp-to-png': {
        title: 'WEBP to PNG Converter - With Transparency | Fileflyr',
        description: 'Convert WEBP to PNG format with transparency support. Free and private.',
        h1: 'WEBP to PNG Converter',
        subtitle: 'Convert WEBP to PNG with transparency',
        category: 'image',
        icon: 'globe',
        badges: [],
        acceptFormats: ['image/webp'],
        module: 'webp-to-png'
    },
    
    'heic-to-jpg': {
        title: 'HEIC to JPG Converter - Convert iPhone Photos | Fileflyr',
        description: 'Convert iPhone HEIC photos to JPG instantly. No upload, works in browser.',
        h1: 'HEIC to JPG Converter',
        subtitle: 'Convert iPhone photos to JPG',
        category: 'image',
        icon: 'smartphone',
        badges: ['hot'],
        acceptFormats: ['.heic', '.heif', 'image/heic', 'image/heif'],
        module: 'heic-to-jpg',
        libraries: ['heic2any']
    },
    
    'avif-to-jpg': {
        title: 'AVIF to JPG Converter | Fileflyr',
        description: 'Convert AVIF images to JPG format. Fast and private.',
        h1: 'AVIF to JPG Converter',
        subtitle: 'Convert next-gen AVIF format to JPG',
        category: 'image',
        icon: 'box',
        badges: [],
        acceptFormats: ['image/avif'],
        module: 'avif-to-jpg'
    },
    
    'bmp-to-png': {
        title: 'BMP to PNG Converter | Fileflyr',
        description: 'Convert BMP images to PNG format with transparency.',
        h1: 'BMP to PNG Converter',
        subtitle: 'Convert BMP bitmap images to PNG format.',
        category: 'image',
        icon: 'image',
        badges: [],
        acceptFormats: ['image/bmp'],
        module: 'bmp-to-png'
    },
    
    'ico-to-png': {
        title: 'ICO to PNG Converter - Extract Icons | Fileflyr',
        description: 'Convert ICO icon files to PNG format.',
        h1: 'ICO to PNG Converter',
        subtitle: 'Convert icon files (ICO) to PNG images.',
        category: 'image',
        icon: 'tag',
        badges: [],
        acceptFormats: ['image/x-icon', '.ico'],
        module: 'ico-to-png'
    },
    
    'svg-to-png': {
        title: 'SVG to PNG Converter - Rasterize Vector Graphics | Fileflyr',
        description: 'Convert SVG vector graphics to PNG raster images.',
        h1: 'SVG to PNG Converter',
        subtitle: 'Convert SVG vector images to PNG format with custom dimensions.',
        category: 'image',
        icon: 'droplet',
        badges: [],
        acceptFormats: ['image/svg+xml', '.svg'],
        module: 'svg-to-png'
    },
    
    'tiff-to-jpg': {
        title: 'TIFF to JPG Converter | Fileflyr',
        description: 'Convert TIFF images to JPG format.',
        h1: 'TIFF to JPG Converter',
        subtitle: 'Convert TIFF/TIF images to JPG format.',
        category: 'image',
        icon: 'camera',
        badges: [],
        acceptFormats: ['image/tiff', 'image/tif'],
        module: 'tiff-to-jpg'
    },
    
    'image-compress': {
        title: 'Image Compressor - Reduce File Size | Fileflyr',
        description: 'Compress images to reduce file size without losing quality. Supports JPG, PNG, WEBP.',
        h1: 'Image Compressor',
        subtitle: 'Reduce image file size while maintaining quality. Perfect for web optimization.',
        category: 'image',
        icon: 'compress',
        badges: ['hot'],
        acceptFormats: ['image/jpeg', 'image/png', 'image/webp'],
        module: 'image-compress'
    },
    
    'image-resize': {
        title: 'Image Resizer - Change Image Dimensions | Fileflyr',
        description: 'Resize images to custom dimensions. Fast, free, and no upload required.',
        h1: 'Image Resizer',
        subtitle: 'Resize images to custom dimensions while maintaining aspect ratio.',
        category: 'image',
        icon: 'resize',
        badges: ['popular'],
        acceptFormats: ['image/*'],
        module: 'image-resize'
    },
    
    'image-crop': {
        title: 'Image Cropper - Crop Images Online | Fileflyr',
        description: 'Crop images to custom dimensions. Interactive cropping tool.',
        h1: 'Image Cropper',
        subtitle: 'Crop images with interactive selection tool.',
        category: 'image',
        icon: 'scissors',
        badges: [],
        acceptFormats: ['image/*'],
        module: 'image-crop'
    },
    
    'image-rotate': {
        title: 'Image Rotator - Rotate Images | Fileflyr',
        description: 'Rotate images by 90°, 180°, or 270°.',
        h1: 'Image Rotator',
        subtitle: 'Rotate images in 90-degree increments.',
        category: 'image',
        icon: 'rotate',
        badges: [],
        acceptFormats: ['image/*'],
        module: 'image-rotate'
    },
    
    'image-grayscale': {
        title: 'Convert Image to Grayscale | Fileflyr',
        description: 'Convert color images to black and white grayscale.',
        h1: 'Grayscale Converter',
        subtitle: 'Convert images to black and white grayscale.',
        category: 'image',
        icon: 'circle',
        badges: [],
        acceptFormats: ['image/*'],
        module: 'image-grayscale'
    },
    
    'remove-bg': {
        title: 'Remove Background from Image | Fileflyr',
        description: 'Remove background from images automatically.',
        h1: 'Background Remover',
        subtitle: 'Remove image backgrounds automatically (alpha matting).',
        category: 'image',
        icon: 'xSquare',
        badges: ['hot'],
        acceptFormats: ['image/*'],
        module: 'remove-bg'
    },
    
    // ========================================
    // PDF CONVERTERS
    // ========================================
    'img-to-pdf': {
        title: 'Image to PDF Converter - Free & Fast | Fileflyr',
        description: 'Convert images to PDF instantly. Supports JPG, PNG, WEBP. Multiple images to one PDF.',
        h1: 'Image to PDF Converter',
        subtitle: 'Convert images to PDF format. Combine multiple images into a single PDF.',
        category: 'pdf',
        icon: 'fileText',
        badges: ['popular'],
        acceptFormats: ['image/*'],
        module: 'img-to-pdf',
        libraries: ['jspdf']
    },
    
    'jpg-to-pdf': {
        title: 'JPG to PDF Converter | Fileflyr',
        description: 'Convert JPG images to PDF format. Batch conversion supported.',
        h1: 'JPG to PDF Converter',
        subtitle: 'Convert JPG images to PDF documents.',
        category: 'pdf',
        icon: 'fileText',
        badges: [],
        acceptFormats: ['image/jpeg', 'image/jpg'],
        module: 'img-to-pdf',
        libraries: ['jspdf']
    },
    
    'png-to-pdf': {
        title: 'PNG to PDF Converter | Fileflyr',
        description: 'Convert PNG images to PDF format instantly.',
        h1: 'PNG to PDF Converter',
        subtitle: 'Convert PNG images to PDF documents.',
        category: 'pdf',
        icon: 'fileText',
        badges: [],
        acceptFormats: ['image/png'],
        module: 'img-to-pdf',
        libraries: ['jspdf']
    },
    
    'pdf-to-jpg': {
        title: 'PDF to JPG Converter - Extract Images | Fileflyr',
        description: 'Convert PDF pages to JPG images. High quality extraction.',
        h1: 'PDF to JPG Converter',
        subtitle: 'Convert PDF pages to JPG images. Extract each page as a separate image.',
        category: 'pdf',
        icon: 'image',
        badges: ['popular'],
        acceptFormats: ['application/pdf'],
        module: 'pdf-to-jpg',
        libraries: ['pdf.js']
    },
    
    'pdf-to-png': {
        title: 'PDF to PNG Converter | Fileflyr',
        description: 'Convert PDF pages to PNG images with transparency support.',
        h1: 'PDF to PNG Converter',
        subtitle: 'Convert PDF pages to PNG images.',
        category: 'pdf',
        icon: 'image',
        badges: [],
        acceptFormats: ['application/pdf'],
        module: 'pdf-to-png',
        libraries: ['pdf.js']
    },
    
    'pdf-merge': {
        title: 'Merge PDF Files - Combine PDFs | Fileflyr',
        description: 'Merge multiple PDF files into one. Free and secure.',
        h1: 'Merge PDF Files',
        subtitle: 'Combine multiple PDF files into a single document.',
        category: 'pdf',
        icon: 'layers',
        badges: [],
        acceptFormats: ['application/pdf'],
        module: 'pdf-merge',
        libraries: ['pdf-lib']
    },
    
    'pdf-split': {
        title: 'Split PDF - Extract Pages | Fileflyr',
        description: 'Split PDF into separate pages or extract specific pages.',
        h1: 'Split PDF',
        subtitle: 'Extract pages from PDF or split into multiple files.',
        category: 'pdf',
        icon: 'scissors',
        badges: [],
        acceptFormats: ['application/pdf'],
        module: 'pdf-split',
        libraries: ['pdf-lib']
    },
    
    'pdf-compress': {
        title: 'Compress PDF - Reduce File Size | Fileflyr',
        description: 'Compress PDF files to reduce size while maintaining quality.',
        h1: 'PDF Compressor',
        subtitle: 'Reduce PDF file size by optimizing images and content.',
        category: 'pdf',
        icon: 'compress',
        badges: ['popular'],
        acceptFormats: ['application/pdf'],
        module: 'pdf-compress',
        libraries: ['pdf-lib']
    },
    
    'txt-to-pdf': {
        title: 'Text to PDF Converter | Fileflyr',
        description: 'Convert plain text files to PDF documents.',
        h1: 'Text to PDF Converter',
        subtitle: 'Convert plain text files to PDF format.',
        category: 'document',
        icon: 'fileText',
        badges: [],
        acceptFormats: ['text/plain'],
        module: 'txt-to-pdf',
        libraries: ['jspdf']
    },
    
    'html-to-pdf': {
        title: 'HTML to PDF Converter | Fileflyr',
        description: 'Convert HTML documents to PDF format.',
        h1: 'HTML to PDF Converter',
        subtitle: 'Convert HTML files to PDF documents.',
        category: 'document',
        icon: 'code',
        badges: [],
        acceptFormats: ['text/html'],
        module: 'html-to-pdf',
        libraries: ['jspdf']
    },
    
    'markdown-to-pdf': {
        title: 'Markdown to PDF Converter | Fileflyr',
        description: 'Convert Markdown files to formatted PDF documents.',
        h1: 'Markdown to PDF Converter',
        subtitle: 'Convert Markdown (.md) files to PDF with formatting.',
        category: 'document',
        icon: 'fileText',
        badges: [],
        acceptFormats: ['text/markdown', '.md'],
        module: 'markdown-to-pdf',
        libraries: ['jspdf', 'marked']
    },
    
    'csv-to-pdf': {
        title: 'CSV to PDF Converter - Table to PDF | Fileflyr',
        description: 'Convert CSV spreadsheets to PDF tables.',
        h1: 'CSV to PDF Converter',
        subtitle: 'Convert CSV files to formatted PDF tables.',
        category: 'document',
        icon: 'grid',
        badges: [],
        acceptFormats: ['text/csv', '.csv'],
        module: 'csv-to-pdf',
        libraries: ['jspdf']
    },
    
    // ========================================
    // AUDIO CONVERTERS
    // ========================================
    'mp3-to-wav': {
        title: 'MP3 to WAV Converter | Fileflyr',
        description: 'Convert MP3 to uncompressed WAV format.',
        h1: 'MP3 to WAV Converter',
        subtitle: 'Convert MP3 audio to WAV format.',
        category: 'audio',
        icon: 'music',
        badges: [],
        acceptFormats: ['audio/mpeg', 'audio/mp3'],
        module: 'mp3-to-wav'
    },
    
    'wav-to-mp3': {
        title: 'WAV to MP3 Converter - Compress Audio | Fileflyr',
        description: 'Convert WAV to compressed MP3 format. Reduce file size.',
        h1: 'WAV to MP3 Converter',
        subtitle: 'Convert WAV audio to compressed MP3 format.',
        category: 'audio',
        icon: 'music',
        badges: ['popular'],
        acceptFormats: ['audio/wav', 'audio/wave'],
        module: 'wav-to-mp3',
        libraries: ['lamejs']
    },
    
    'audio-trim': {
        title: 'Audio Trimmer - Cut Audio Files | Fileflyr',
        description: 'Trim and cut audio files. Remove unwanted parts.',
        h1: 'Audio Trimmer',
        subtitle: 'Trim audio files by selecting start and end time.',
        category: 'audio',
        icon: 'scissors',
        badges: [],
        acceptFormats: ['audio/*'],
        module: 'audio-trim'
    },
    
    'audio-normalize': {
        title: 'Audio Normalizer - Adjust Volume | Fileflyr',
        description: 'Normalize audio volume levels automatically.',
        h1: 'Audio Normalizer',
        subtitle: 'Normalize audio volume to optimal levels.',
        category: 'audio',
        icon: 'barChart',
        badges: [],
        acceptFormats: ['audio/*'],
        module: 'audio-normalize'
    },
    
    // ========================================
    // VIDEO CONVERTERS
    // ========================================
    'mp4-to-webm': {
        title: 'MP4 to WEBM Converter | Fileflyr',
        description: 'Convert MP4 videos to WEBM format.',
        h1: 'MP4 to WEBM Converter',
        subtitle: 'Convert MP4 videos to WEBM format.',
        category: 'video',
        icon: 'video',
        badges: [],
        acceptFormats: ['video/mp4'],
        module: 'mp4-to-webm'
    },
    
    'gif-to-mp4': {
        title: 'GIF to MP4 Converter - Reduce Size | Fileflyr',
        description: 'Convert GIF animations to MP4 video. Smaller file size.',
        h1: 'GIF to MP4 Converter',
        subtitle: 'Convert animated GIFs to MP4 video format.',
        category: 'video',
        icon: 'film',
        badges: ['hot'],
        acceptFormats: ['image/gif'],
        module: 'gif-to-mp4'
    },
    
    'mp4-to-gif': {
        title: 'MP4 to GIF Converter | Fileflyr',
        description: 'Convert MP4 videos to animated GIF.',
        h1: 'MP4 to GIF Converter',
        subtitle: 'Convert MP4 videos to animated GIF images.',
        category: 'video',
        icon: 'film',
        badges: [],
        acceptFormats: ['video/mp4'],
        module: 'mp4-to-gif'
    },
    
    'video-trim': {
        title: 'Video Trimmer - Cut Videos | Fileflyr',
        description: 'Trim and cut video files. Extract specific parts.',
        h1: 'Video Trimmer',
        subtitle: 'Trim videos by selecting start and end time.',
        category: 'video',
        icon: 'scissors',
        badges: [],
        acceptFormats: ['video/*'],
        module: 'video-trim'
    },
    
    'video-to-audio': {
        title: 'Video to Audio Converter - Extract Audio from Video | Fileflyr',
        description: 'Extract audio from video files. Convert MP4, MOV, AVI to MP3, WAV, OGG. Fast and free.',
        h1: 'Video to Audio Converter',
        subtitle: 'Extract audio from video files and save as MP3, WAV, or OGG.',
        category: 'video',
        icon: 'music',
        badges: ['hot'],
        acceptFormats: ['video/*'],
        module: 'video-to-audio'
    }
};

/**
 * Get converter by slug
 */
export function getConverter(slug) {
    return CONVERTER_REGISTRY[slug] || null;
}

/**
 * Get all converters by category
 */
export function getConvertersByCategory(category) {
    if (category === 'all') {
        return Object.entries(CONVERTER_REGISTRY).map(([slug, config]) => ({
            slug,
            ...config
        }));
    }
    
    return Object.entries(CONVERTER_REGISTRY)
        .filter(([, config]) => config.category === category)
        .map(([slug, config]) => ({ slug, ...config }));
}

/**
 * Get all categories
 */
export function getCategories() {
    const categories = new Set();
    Object.values(CONVERTER_REGISTRY).forEach(converter => {
        categories.add(converter.category);
    });
    return Array.from(categories);
}

/**
 * Search converters
 */
export function searchConverters(query) {
    query = query.toLowerCase();
    return Object.entries(CONVERTER_REGISTRY)
        .filter(([slug, config]) => {
            return slug.includes(query) ||
                   config.title.toLowerCase().includes(query) ||
                   config.description.toLowerCase().includes(query);
        })
        .map(([slug, config]) => ({ slug, ...config }));
}
