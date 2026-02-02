/**
 * Fileflyr - Converter Content Registry
 * Educational content for each converter page
 */

export const CONVERTER_CONTENT = {
    'png-to-jpg': {
        sections: [
            {
                id: 'what-is-png',
                title: 'What is a PNG file?',
                content: `
                    <p>PNG (Portable Network Graphics) is a lossless image format, mainly used for graphics, logos, and images with transparent backgrounds. PNG files store every pixel exactly, without quality loss when saving.</p>
                    
                    <p>A major advantage of PNG is its support for transparency (alpha channel), making it ideal for web design, icons, and UI elements.</p>
                    
                    <p>The downside of PNG files is their relatively large file size, especially for photos or complex images.</p>
                `
            },
            {
                id: 'what-is-jpg',
                title: 'What is a JPG file?',
                content: `
                    <p>JPG (or JPEG – Joint Photographic Experts Group) is one of the most widely used image formats in the world. It uses lossy compression to significantly reduce file size, making JPG files ideal for photos, social media, websites, and emails.</p>
                    
                    <p>JPG does not support transparency, but offers a very good balance between image quality and file size.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert PNG to JPG?',
                content: `
                    <p>Converting PNG to JPG makes sense when:</p>
                    <ul>
                        <li>you want to reduce file size</li>
                        <li>images need to load faster (e.g., websites)</li>
                        <li>sending photos via email or messenger</li>
                        <li>PNG transparency is not required</li>
                        <li>you want to save storage space</li>
                    </ul>
                    <p class="info-note">When converting, a transparent background is automatically replaced with a solid color.</p>
                `
            },
            {
                id: 'comparison',
                title: 'PNG vs JPG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>PNG:</strong> Lossless, supports transparency, larger files
                        </div>
                        <div class="comparison-item">
                            <strong>JPG:</strong> Lossy, no transparency, smaller files
                        </div>
                        <div class="comparison-item">
                            <strong>PNG is suitable for:</strong> Graphics & logos
                        </div>
                        <div class="comparison-item">
                            <strong>JPG is suitable for:</strong> Photos & web content
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does PNG to JPG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your PNG image</li>
                        <li>The image is processed and converted to JPG format</li>
                        <li>Compression is applied to reduce file size</li>
                        <li>Download the converted JPG file instantly</li>
                    </ol>
                    <p>The entire process takes only a few seconds, depending on the file size.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Optimize images for websites</li>
                        <li>Prepare photos for social media</li>
                        <li>Share or upload images faster</li>
                        <li>Save storage space</li>
                        <li>Convert PNG photos to compatible formats</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Since JPG uses lossy compression, there may be slight quality loss. For photos, this difference is usually hardly noticeable. For graphics with text or sharp edges, PNG is often the better choice.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I convert multiple PNG files at once?',
                answer: 'Yes! Our converter supports batch conversion. You can upload multiple PNG files at once and convert them to JPG.'
            },
            {
                question: 'Are my images uploaded to a server?',
                answer: 'No. All conversions are done 100% locally in your browser. Your files never leave your computer.'
            },
            {
                question: 'What quality should I choose?',
                answer: 'For most photos, we recommend 85-90% quality. This offers a good balance between file size and image quality.'
            },
            {
                question: 'What happens to transparent backgrounds?',
                answer: 'Since JPG does not support transparency, the transparent background is replaced with a solid color. You can choose the background color before conversion.'
            }
        ]
    },

    'jpg-to-png': {
        sections: [
            {
                id: 'what-is-jpg',
                title: 'What is a JPG file?',
                content: `
                    <p>JPG (JPEG – Joint Photographic Experts Group) is a widely used image format, primarily for photos. It uses lossy compression to keep file sizes as small as possible, making JPG ideal for websites, social media, camera photos, and emails.</p>
                    
                    <p>A disadvantage of JPG is that image information can be lost each time the file is saved. Additionally, JPG does not support transparency.</p>
                `
            },
            {
                id: 'what-is-png',
                title: 'What is a PNG file?',
                content: `
                    <p>PNG (Portable Network Graphics) is a lossless image format that stores images without quality loss. PNG supports transparency (alpha channel) and is particularly suitable for graphics, logos, icons, screenshots, and images with sharp edges or text.</p>
                    
                    <p>PNG files are generally larger than JPG files, but provide higher and stable image quality.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert JPG to PNG?',
                content: `
                    <p>Converting JPG to PNG makes sense when:</p>
                    <ul>
                        <li>higher image quality is required</li>
                        <li>images will be further edited</li>
                        <li>graphics or text need to be displayed clearly</li>
                        <li>a transparent background needs to be prepared</li>
                        <li>repeated saving without further quality loss is important</li>
                    </ul>
                    <p class="info-note">Even though the original JPG quality cannot be improved, PNG prevents further loss during editing.</p>
                `
            },
            {
                id: 'comparison',
                title: 'JPG vs PNG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>JPG:</strong> Lossy, small file size, no transparency
                        </div>
                        <div class="comparison-item">
                            <strong>PNG:</strong> Lossless, larger files, supports transparency
                        </div>
                        <div class="comparison-item">
                            <strong>JPG is ideal for:</strong> Photos
                        </div>
                        <div class="comparison-item">
                            <strong>PNG is ideal for:</strong> Graphics, logos, and screenshots
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does JPG to PNG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your JPG image</li>
                        <li>The image is converted to PNG format</li>
                        <li>No additional compression is applied</li>
                        <li>Download the PNG file instantly</li>
                    </ol>
                    <p>The conversion process is quick and requires no manual settings.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Prepare JPG images for design projects</li>
                        <li>Convert screenshots to a lossless format</li>
                        <li>Use images for logos or overlays</li>
                        <li>Edit further without quality loss</li>
                        <li>Prepare for transparency or masks</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Converting JPG to PNG does not restore lost image data. However, it ensures that further editing does not cause additional quality degradation.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does converting to PNG improve image quality?',
                answer: 'No, conversion cannot restore already lost JPG data. However, it prevents further quality loss during future editing.'
            },
            {
                question: 'Can I add a transparent background after conversion?',
                answer: 'The conversion itself does not make the background transparent. It creates a PNG file that can then be edited in image software to make areas transparent.'
            },
            {
                question: 'Are my files uploaded to a server?',
                answer: 'No. All conversions are done 100% locally in your browser. Your files never leave your computer.'
            },
            {
                question: 'Why is the PNG file larger than the original JPG?',
                answer: 'PNG is a lossless format that stores all image information without compression. This results in larger files, which are better suited for further editing.'
            }
        ]
    },

    'webp-to-jpg': {
        sections: [
            {
                id: 'what-is-webp',
                title: 'What is a WEBP file?',
                content: `
                    <p>WEBP is a modern image format developed by Google to compress images more efficiently for the web. It supports both lossy and lossless compression and can also provide transparency. WEBP files are usually significantly smaller than JPG or PNG files while maintaining similar image quality.</p>
                    
                    <p>The downside: Not all programs, older devices, or workflows fully support WEBP, especially outside of web browsers.</p>
                `
            },
            {
                id: 'what-is-jpg',
                title: 'What is a JPG file?',
                content: `
                    <p>JPG (JPEG – Joint Photographic Experts Group) is one of the most widely used image formats. It uses lossy compression to reduce file size and is compatible almost everywhere – from operating systems to image editing software to social media platforms.</p>
                    
                    <p>JPG does not support transparency but offers a very good balance between quality and file size for photos.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert WEBP to JPG?',
                content: `
                    <p>Converting WEBP to JPG makes sense when:</p>
                    <ul>
                        <li>maximum compatibility is required</li>
                        <li>images need to be used in programs without WEBP support</li>
                        <li>files are sent via email or messenger</li>
                        <li>uploads are made to platforms that do not accept WEBP</li>
                        <li>offline editing is needed</li>
                    </ul>
                    <p class="info-note">During conversion, any existing transparency is automatically replaced with a background.</p>
                `
            },
            {
                id: 'comparison',
                title: 'WEBP vs JPG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>WEBP:</strong> Modern, highly efficient compression, limited support
                        </div>
                        <div class="comparison-item">
                            <strong>JPG:</strong> Classic, universally supported, no transparency
                        </div>
                        <div class="comparison-item">
                            <strong>WEBP is ideal for:</strong> Websites
                        </div>
                        <div class="comparison-item">
                            <strong>JPG is ideal for:</strong> Maximum compatibility
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does WEBP to JPG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your WEBP image</li>
                        <li>The image is decoded and converted to JPG format</li>
                        <li>Compression is applied to balance quality and file size</li>
                        <li>Download the converted JPG file instantly</li>
                    </ol>
                    <p>The entire process takes just a few seconds.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Make WEBP images usable in older software</li>
                        <li>Prepare photos for social media or email</li>
                        <li>Use images in presentations or documents</li>
                        <li>Ensure platform compatibility</li>
                        <li>Enable offline editing</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>When converting from WEBP to JPG, a small quality loss may occur depending on the original WEBP compression. For most photos, this difference is hardly noticeable.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Why is WEBP not supported everywhere?',
                answer: 'WEBP is a relatively new format (2010). While modern browsers and apps support it, older programs and operating systems often lack native WEBP support.'
            },
            {
                question: 'Is image quality lost during conversion?',
                answer: 'Minimal. Both formats use lossy compression. Conversion may introduce a slight additional quality loss, which is usually not noticeable in photos.'
            },
            {
                question: 'What happens to transparent areas in WEBP?',
                answer: 'Since JPG does not support transparency, transparent areas are replaced with a solid color (usually white). You can choose the background color before conversion.'
            },
            {
                question: 'Are my files safe during conversion?',
                answer: 'Yes, absolutely! All conversions are 100% local in your browser. Your images are never uploaded to a server.'
            }
        ]
    },

    'webp-to-png': {
        sections: [
            {
                id: 'what-is-webp',
                title: 'What is a WEBP file?',
                content: `
                    <p>WEBP is a modern image format developed by Google specifically for use on the web. It supports both lossy and lossless compression and can include transparency (alpha channel). This allows high-quality images with relatively small file sizes.</p>
                    
                    <p>One downside of WEBP is its limited support in older software, desktop programs, and certain workflows.</p>
                `
            },
            {
                id: 'what-is-png',
                title: 'What is a PNG file?',
                content: `
                    <p>PNG (Portable Network Graphics) is a widely used, lossless image format. It stores image data without quality loss and supports transparency. PNG is particularly suitable for graphics, logos, icons, screenshots, and images with text or sharp edges.</p>
                    
                    <p>PNG files are usually larger than WEBP files but provide maximum compatibility and stable quality.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert WEBP to PNG?',
                content: `
                    <p>Converting WEBP to PNG makes sense when:</p>
                    <ul>
                        <li>lossless quality is required</li>
                        <li>transparency needs to be preserved</li>
                        <li>images will be further edited</li>
                        <li>older software or design tools are used</li>
                        <li>screenshots or graphics need to be exported</li>
                    </ul>
                    <p class="info-note">PNG is often the better choice for editing and archiving.</p>
                `
            },
            {
                id: 'comparison',
                title: 'WEBP vs PNG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>WEBP:</strong> Modern web-optimized, smaller files, limited support
                        </div>
                        <div class="comparison-item">
                            <strong>PNG:</strong> Lossless, supports transparency, widely supported
                        </div>
                        <div class="comparison-item">
                            <strong>WEBP is ideal for:</strong> Websites
                        </div>
                        <div class="comparison-item">
                            <strong>PNG is ideal for:</strong> Design, editing, and archiving
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does WEBP to PNG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your WEBP image</li>
                        <li>The image is decoded and converted to PNG format</li>
                        <li>Transparency is preserved if present</li>
                        <li>Download the PNG file instantly</li>
                    </ol>
                    <p>The conversion process is automatic and takes only a few seconds.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Open WEBP graphics in design software</li>
                        <li>Edit images further without loss</li>
                        <li>Preserve transparent backgrounds</li>
                        <li>Save screenshots or UI elements</li>
                        <li>Ensure compatibility with older programs</li>
                    </ul>
                `
            },
            {
                id: 'filesize-note',
                title: 'Important note about file size',
                content: `
                    <p>PNG files are usually larger than WEBP files because PNG does not use lossy compression. However, image quality is fully preserved.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Is transparency preserved during conversion?',
                answer: 'Yes! Both WEBP and PNG support transparency (alpha channel). Transparent areas are fully preserved during conversion.'
            },
            {
                question: 'Why is the PNG file larger than the original WEBP?',
                answer: 'PNG is a lossless format without compression. WEBP uses highly efficient compression. The larger PNG file provides maximum quality and compatibility.'
            },
            {
                question: 'Can I convert multiple WEBP files at once?',
                answer: 'Yes! Our converter supports batch conversion. You can upload multiple WEBP files at once and convert them to PNG.'
            },
            {
                question: 'Are my images uploaded during conversion?',
                answer: 'No. All conversions are 100% local in your browser. Your files never leave your computer – complete privacy guaranteed.'
            }
        ]
    },

    'heic-to-jpg': {
        sections: [
            {
                id: 'what-is-heic',
                title: 'What is a HEIC file?',
                content: `
                    <p>HEIC (High Efficiency Image Container) is a modern image format introduced by Apple and based on the HEIF standard. It is mainly used on iPhones and iPads to store photos in high quality while keeping file sizes small. HEIC uses advanced compression techniques that can provide better results than traditional JPG files.</p>
                    
                    <p>The downside of HEIC is its limited support outside the Apple ecosystem. Many Windows programs, older devices, and online platforms cannot open HEIC files directly.</p>
                `
            },
            {
                id: 'what-is-jpg',
                title: 'What is a JPG file?',
                content: `
                    <p>JPG (JPEG – Joint Photographic Experts Group) is one of the most widely used image formats worldwide. It offers very high compatibility with nearly all operating systems, programs, websites, and social media platforms. JPG uses lossy compression to achieve a good balance between image quality and file size.</p>
                    
                    <p>JPG does not support transparency but is ideal for photos and everyday use.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert HEIC to JPG?',
                content: `
                    <p>Converting HEIC to JPG makes sense when:</p>
                    <ul>
                        <li>Photos need to be used on Windows PCs or older devices</li>
                        <li>Images are uploaded to websites or social media</li>
                        <li>Files are sent via email or messenger</li>
                        <li>Maximum compatibility is required</li>
                        <li>HEIC is not supported by programs or platforms</li>
                    </ul>
                    <p class="info-note">Conversion makes iPhone photos universally usable.</p>
                `
            },
            {
                id: 'comparison',
                title: 'HEIC vs JPG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>HEIC:</strong> Modern compression, high quality, limited support
                        </div>
                        <div class="comparison-item">
                            <strong>JPG:</strong> High compatibility, smaller files, no transparency
                        </div>
                        <div class="comparison-item">
                            <strong>HEIC is ideal for:</strong> Apple devices
                        </div>
                        <div class="comparison-item">
                            <strong>JPG is ideal for:</strong> Cross-platform use
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does HEIC to JPG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your HEIC image</li>
                        <li>The image is decoded and converted to JPG format</li>
                        <li>Compression is applied to ensure compatibility</li>
                        <li>Download the converted JPG file instantly</li>
                    </ol>
                    <p>The entire process is automated and takes only a few seconds.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Use iPhone photos on Windows or Android</li>
                        <li>Prepare images for social media or websites</li>
                        <li>Insert HEIC files into presentations or documents</li>
                        <li>Send photos via email</li>
                        <li>Avoid compatibility issues</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Converting HEIC to JPG may result in slight quality loss because JPG uses lossy compression. For most photos, this difference is hardly noticeable.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Why does Apple use HEIC instead of JPG?',
                answer: 'HEIC provides better compression than JPG at the same or higher image quality. This allows iPhones to save storage space while maintaining photo quality.'
            },
            {
                question: 'Can I open HEIC files directly on Windows?',
                answer: 'Windows 10/11 can open HEIC if the "HEIF Image Extensions" are installed from the Microsoft Store. Alternatively, you can simply convert HEIC to JPG for immediate compatibility.'
            },
            {
                question: 'Is quality lost during conversion?',
                answer: 'Minimal. Both formats use compression. For typical iPhone photos, the quality difference after conversion is not noticeable to the human eye.'
            },
            {
                question: 'Are my iPhone photos uploaded during conversion?',
                answer: 'No! All conversions are 100% local in your browser. Your personal photos never leave your device – maximum privacy guaranteed.'
            }
        ]
    },

    'avif-to-jpg': {
        sections: [
            {
                id: 'what-is-avif',
                title: 'What is an AVIF file?',
                content: `
                    <p>AVIF (AV1 Image File Format) is a modern image format based on the AV1 video codec. It offers highly efficient compression, allowing smaller file sizes while maintaining excellent image quality. AVIF supports both lossy and lossless compression, as well as HDR and transparency.</p>
                    
                    <p>The downside is limited support in older software, web browsers, and some operating systems.</p>
                `
            },
            {
                id: 'what-is-jpg',
                title: 'What is a JPG file?',
                content: `
                    <p>JPG (JPEG – Joint Photographic Experts Group) is one of the most widely used image formats worldwide. It provides high compatibility with nearly all operating systems, programs, websites, and social media platforms. JPG uses lossy compression to balance image quality and file size.</p>
                    
                    <p>JPG does not support transparency but is ideal for photos and everyday use.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert AVIF to JPG?',
                content: `
                    <p>Converting AVIF to JPG is useful when:</p>
                    <ul>
                        <li>maximum compatibility is required across platforms and software</li>
                        <li>AVIF is not supported in a program or website</li>
                        <li>images need to be shared via email or messenger</li>
                        <li>photos need to be quickly viewed or edited without extra software</li>
                    </ul>
                    <p class="info-note">Conversion ensures your AVIF images can be used anywhere JPG is supported.</p>
                `
            },
            {
                id: 'comparison',
                title: 'AVIF vs JPG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>AVIF:</strong> Modern, highly efficient compression, supports HDR & transparency
                        </div>
                        <div class="comparison-item">
                            <strong>JPG:</strong> Universally supported, smaller compatibility barriers, no transparency
                        </div>
                        <div class="comparison-item">
                            <strong>AVIF is ideal for:</strong> Web optimization and high-quality storage
                        </div>
                        <div class="comparison-item">
                            <strong>JPG is ideal for:</strong> Maximum compatibility and sharing
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does AVIF to JPG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your AVIF image</li>
                        <li>The image is decoded and converted to JPG format</li>
                        <li>Compression is applied to balance quality and file size</li>
                        <li>Download the converted JPG file instantly</li>
                    </ol>
                    <p>The conversion process is fast and fully automatic.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Make AVIF images compatible with older software</li>
                        <li>Prepare photos for social media or websites</li>
                        <li>Share images via email or messenger without compatibility issues</li>
                        <li>Quickly edit images in programs that do not support AVIF</li>
                        <li>Use AVIF images where JPG is required</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Converting AVIF to JPG may result in slight quality loss due to JPG’s lossy compression. For most photos, this difference is hardly noticeable.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Why is AVIF not supported everywhere?',
                answer: 'AVIF is a relatively new format (based on AV1). While modern browsers and software support it, older programs and devices often do not.'
            },
            {
                question: 'Is image quality lost during conversion?',
                answer: 'Minimal. AVIF offers high compression efficiency, but converting to JPG applies lossy compression which may slightly reduce quality, usually imperceptible in photos.'
            },
            {
                question: 'What happens to transparency in AVIF?',
                answer: 'Since JPG does not support transparency, any transparent areas are replaced with a solid color (typically white).'
            },
            {
                question: 'Are my files uploaded during conversion?',
                answer: 'No. All conversions happen 100% locally in your browser. Your files never leave your computer.'
            }
        ]
    },

    'bmp-to-png': {
        sections: [
            {
                id: 'what-is-bmp',
                title: 'What is a BMP file?',
                content: `
                    <p>BMP (Bitmap Image File) is an older, uncompressed image format that stores images pixel by pixel. It was widely used in early Windows systems and applications. BMP files retain all image details but are usually very large compared to modern formats.</p>
                    
                    <p>The downside of BMP is its large file size and limited support for features like transparency and advanced compression.</p>
                `
            },
            {
                id: 'what-is-png',
                title: 'What is a PNG file?',
                content: `
                    <p>PNG (Portable Network Graphics) is a lossless image format that stores images without quality loss. It supports transparency (alpha channel) and is widely used for graphics, logos, icons, screenshots, and images with sharp edges or text.</p>
                    
                    <p>PNG files are generally smaller than BMP files, provide better compatibility, and preserve full image quality.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert BMP to PNG?',
                content: `
                    <p>Converting BMP to PNG makes sense when:</p>
                    <ul>
                        <li>You want to reduce file size without losing quality</li>
                        <li>You need transparency support</li>
                        <li>Images will be edited further</li>
                        <li>You want better compatibility with modern software and web platforms</li>
                        <li>You are archiving graphics or screenshots efficiently</li>
                    </ul>
                    <p class="info-note">PNG offers smaller files and lossless compression compared to BMP.</p>
                `
            },
            {
                id: 'comparison',
                title: 'BMP vs PNG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>BMP:</strong> Uncompressed, large files, no transparency
                        </div>
                        <div class="comparison-item">
                            <strong>PNG:</strong> Lossless, smaller files, supports transparency
                        </div>
                        <div class="comparison-item">
                            <strong>BMP is ideal for:</strong> Legacy Windows graphics and uncompressed images
                        </div>
                        <div class="comparison-item">
                            <strong>PNG is ideal for:</strong> Editing, design, and web use
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does BMP to PNG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your BMP image</li>
                        <li>The image is decoded and converted to PNG format</li>
                        <li>Lossless compression is applied</li>
                        <li>Download the converted PNG file instantly</li>
                    </ol>
                    <p>The process is fast, automatic, and preserves full image quality.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Convert legacy BMP graphics for modern software</li>
                        <li>Edit images without losing quality</li>
                        <li>Preserve transparency for logos or UI elements</li>
                        <li>Reduce file size for web or email use</li>
                        <li>Archive images efficiently</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Converting BMP to PNG preserves all original image details. No quality is lost during the conversion because both formats are lossless.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does converting BMP to PNG reduce quality?',
                answer: 'No. Both BMP and PNG are lossless formats. The conversion preserves all original image details.'
            },
            {
                question: 'Why is PNG preferred over BMP?',
                answer: 'PNG files are smaller, support transparency, and are compatible with modern software, web platforms, and editing tools.'
            },
            {
                question: 'Can I convert multiple BMP files at once?',
                answer: 'Yes! Our converter supports batch conversion. You can upload multiple BMP files and convert them to PNG simultaneously.'
            },
            {
                question: 'Are my BMP files uploaded during conversion?',
                answer: 'No. All conversions are performed 100% locally in your browser. Your files never leave your computer.'
            }
        ]
    },

    'ico-to-png': {
        sections: [
            {
                id: 'what-is-ico',
                title: 'What is an ICO file?',
                content: `
                    <p>ICO (Icon) is a file format used primarily for icons in Windows applications and websites. It can contain multiple images at different sizes and color depths to ensure that icons display correctly in different contexts, such as desktop shortcuts, taskbars, and favicons.</p>
                    
                    <p>The downside of ICO is that it is specialized for icons, lacks wide support in image editing software, and does not efficiently compress larger images.</p>
                `
            },
            {
                id: 'what-is-png',
                title: 'What is a PNG file?',
                content: `
                    <p>PNG (Portable Network Graphics) is a lossless image format that stores images without quality loss. It supports transparency (alpha channel) and is widely used for graphics, logos, icons, screenshots, and images with sharp edges or text.</p>
                    
                    <p>PNG files are compatible with almost all modern software and web platforms and provide stable, high-quality images.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert ICO to PNG?',
                content: `
                    <p>Converting ICO to PNG makes sense when:</p>
                    <ul>
                        <li>You want to use icons in modern design software</li>
                        <li>Transparency needs to be preserved</li>
                        <li>You need a standard, widely supported image format</li>
                        <li>Icons are required for web, presentations, or UI projects</li>
                        <li>You want higher quality and easier editing</li>
                    </ul>
                    <p class="info-note">PNG is more versatile than ICO for most modern applications and design workflows.</p>
                `
            },
            {
                id: 'comparison',
                title: 'ICO vs PNG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>ICO:</strong> Specialized for icons, multiple sizes, limited editing support
                        </div>
                        <div class="comparison-item">
                            <strong>PNG:</strong> Lossless, widely supported, editable, supports transparency
                        </div>
                        <div class="comparison-item">
                            <strong>ICO is ideal for:</strong> Windows icons, favicons
                        </div>
                        <div class="comparison-item">
                            <strong>PNG is ideal for:</strong> Design, editing, web graphics, and UI projects
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does ICO to PNG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your ICO file</li>
                        <li>The image is decoded and converted to PNG format</li>
                        <li>Transparency is preserved if present</li>
                        <li>Download the converted PNG file instantly</li>
                    </ol>
                    <p>The process is fast, automatic, and maintains full image quality.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Convert Windows icons for design software</li>
                        <li>Preserve transparent backgrounds</li>
                        <li>Use icons in web projects or presentations</li>
                        <li>Edit or resize icons easily</li>
                        <li>Archive icons in a versatile, modern format</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Converting ICO to PNG preserves the original image details. Transparency is maintained if it exists in the ICO file.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does converting ICO to PNG preserve transparency?',
                answer: 'Yes! If the ICO contains transparent areas, they are fully preserved in the PNG file.'
            },
            {
                question: 'Why should I convert ICO to PNG?',
                answer: 'PNG is widely supported, editable, and suitable for web, design, and UI projects, whereas ICO is limited to icons.'
            },
            {
                question: 'Can I convert multiple ICO files at once?',
                answer: 'Yes! Our converter supports batch conversion. You can upload multiple ICO files and convert them to PNG simultaneously.'
            },
            {
                question: 'Are my ICO files uploaded during conversion?',
                answer: 'No. All conversions are performed 100% locally in your browser. Your files never leave your computer.'
            }
        ]
    },

    'svg-to-png': {
        sections: [
            {
                id: 'what-is-svg',
                title: 'What is an SVG file?',
                content: `
                    <p>SVG (Scalable Vector Graphics) is a vector image format based on XML. Unlike raster formats, SVG stores images as mathematical shapes, paths, and text, allowing them to scale infinitely without losing quality. It is widely used for logos, icons, illustrations, and web graphics.</p>
                    
                    <p>The downside is that some older software or image editors may not fully support SVG, and complex vector graphics may not render correctly everywhere.</p>
                `
            },
            {
                id: 'what-is-png',
                title: 'What is a PNG file?',
                content: `
                    <p>PNG (Portable Network Graphics) is a lossless raster image format. It stores images pixel by pixel without quality loss, supports transparency (alpha channel), and is widely used for graphics, screenshots, and web images.</p>
                    
                    <p>PNG is compatible with almost all modern software and platforms, but unlike SVG, it cannot be scaled indefinitely without losing quality.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert SVG to PNG?',
                content: `
                    <p>Converting SVG to PNG is useful when:</p>
                    <ul>
                        <li>You need a widely supported raster image format</li>
                        <li>You want to use vector graphics in programs that do not support SVG</li>
                        <li>Images need to be shared via email, social media, or websites</li>
                        <li>You want a fixed-size image for presentations or documents</li>
                        <li>Transparency in the image should be preserved</li>
                    </ul>
                    <p class="info-note">PNG provides a versatile raster version of vector graphics that can be edited or displayed anywhere.</p>
                `
            },
            {
                id: 'comparison',
                title: 'SVG vs PNG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>SVG:</strong> Vector format, infinitely scalable, smaller for graphics, may require special software
                        </div>
                        <div class="comparison-item">
                            <strong>PNG:</strong> Raster format, fixed size, widely supported, lossless
                        </div>
                        <div class="comparison-item">
                            <strong>SVG is ideal for:</strong> Logos, icons, illustrations, web graphics
                        </div>
                        <div class="comparison-item">
                            <strong>PNG is ideal for:</strong> Sharing, editing in raster programs, presentations, web images
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does SVG to PNG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your SVG file</li>
                        <li>The vector graphics are rendered and converted into PNG format</li>
                        <li>Transparency is preserved if present</li>
                        <li>Download the PNG file instantly</li>
                    </ol>
                    <p>The process is quick, automatic, and preserves the appearance of the original vector image.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Convert logos or icons for use in raster-based programs</li>
                        <li>Export vector graphics for web or social media</li>
                        <li>Create images for presentations or documents</li>
                        <li>Preserve transparency in images</li>
                        <li>Ensure compatibility with platforms that do not support SVG</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Converting SVG to PNG does not reduce quality for the chosen image size. However, scaling the resulting PNG beyond its dimensions may cause pixelation since PNG is a raster format.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does converting SVG to PNG preserve transparency?',
                answer: 'Yes! If the SVG contains transparent areas, they are fully preserved in the PNG file.'
            },
            {
                question: 'Why should I convert SVG to PNG?',
                answer: 'PNG is widely supported, editable in raster-based programs, and suitable for web, presentations, and sharing where SVG is not supported.'
            },
            {
                question: 'Can I convert multiple SVG files at once?',
                answer: 'Yes! Our converter supports batch conversion. You can upload multiple SVG files and convert them to PNG simultaneously.'
            },
            {
                question: 'Are my SVG files uploaded during conversion?',
                answer: 'No. All conversions are performed 100% locally in your browser. Your files never leave your computer.'
            }
        ]
    },

    'tiff-to-jpg': {
        sections: [
            {
                id: 'what-is-tiff',
                title: 'What is a TIFF file?',
                content: `
                    <p>TIFF (Tagged Image File Format) is a high-quality raster image format widely used in professional photography, scanning, and publishing. TIFF files can be lossless or use minimal compression, preserving maximum image detail and color information.</p>
                    
                    <p>The downside is that TIFF files are usually very large and not always supported in web browsers or everyday applications.</p>
                `
            },
            {
                id: 'what-is-jpg',
                title: 'What is a JPG file?',
                content: `
                    <p>JPG (JPEG – Joint Photographic Experts Group) is one of the most widely used image formats. It uses lossy compression to reduce file size while maintaining good image quality. JPG is highly compatible across operating systems, software, websites, and social media platforms.</p>
                    
                    <p>JPG does not support transparency, but it is ideal for photos and everyday use where smaller file size is important.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert TIFF to JPG?',
                content: `
                    <p>Converting TIFF to JPG is useful when:</p>
                    <ul>
                        <li>You need smaller file sizes for storage or sharing</li>
                        <li>Images need to be uploaded to websites or social media</li>
                        <li>Files need to be sent via email or messenger</li>
                        <li>Maximum compatibility with most software is required</li>
                        <li>You want faster loading and display without specialized software</li>
                    </ul>
                    <p class="info-note">Conversion ensures high-quality images in a widely supported format.</p>
                `
            },
            {
                id: 'comparison',
                title: 'TIFF vs JPG – Key Differences',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>TIFF:</strong> Lossless or lightly compressed, very large files, professional use
                        </div>
                        <div class="comparison-item">
                            <strong>JPG:</strong> Lossy compression, smaller files, widely supported
                        </div>
                        <div class="comparison-item">
                            <strong>TIFF is ideal for:</strong> Professional photography, scanning, archiving
                        </div>
                        <div class="comparison-item">
                            <strong>JPG is ideal for:</strong> Sharing, web use, social media, everyday photos
                        </div>
                    </div>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does TIFF to JPG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your TIFF image</li>
                        <li>The image is decoded and converted to JPG format</li>
                        <li>Lossy compression is applied to reduce file size</li>
                        <li>Download the converted JPG file instantly</li>
                    </ol>
                    <p>The process is fast and automatic, providing a smaller file suitable for most applications.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Convert high-resolution TIFF photos for web or social media</li>
                        <li>Share scanned documents and images easily</li>
                        <li>Reduce file size for storage or email</li>
                        <li>Prepare images for presentations or everyday use</li>
                        <li>Ensure compatibility across all platforms and software</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Converting TIFF to JPG applies lossy compression, which may slightly reduce quality. For most photos, this loss is minimal and often unnoticeable.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does converting TIFF to JPG reduce quality?',
                answer: 'Yes, JPG uses lossy compression, so a minimal amount of quality may be lost. For most images, this difference is hardly noticeable.'
            },
            {
                question: 'Why should I convert TIFF to JPG?',
                answer: 'JPG files are smaller, widely supported, and easier to share, upload, or display compared to large TIFF files.'
            },
            {
                question: 'Can I convert multiple TIFF files at once?',
                answer: 'Yes! Our converter supports batch conversion. You can upload multiple TIFF files and convert them to JPG simultaneously.'
            },
            {
                question: 'Are my TIFF files uploaded during conversion?',
                answer: 'No. All conversions are performed 100% locally in your browser. Your files never leave your computer.'
            }
        ]
    },

    'image-compress': {
        sections: [
            {
                id: 'what-is-image-compression',
                title: 'What is image compression?',
                content: `
                    <p>Image compression is the process of reducing the file size of an image while maintaining acceptable visual quality. It can be either <strong>lossless</strong>, which preserves all original image data, or <strong>lossy</strong>, which removes some data to reduce size further.</p>
                    
                    <p>Compression helps save storage space, speed up website loading, and make sharing images via email or messaging faster.</p>
                `
            },
            {
                id: 'why-compress',
                title: 'Why compress images?',
                content: `
                    <p>Compressing images is useful when:</p>
                    <ul>
                        <li>You want faster website loading times</li>
                        <li>You need to save storage space on your device or server</li>
                        <li>Images are shared via email, social media, or messaging apps</li>
                        <li>Optimizing multiple images for a project or presentation</li>
                        <li>Maintaining acceptable visual quality while reducing file size</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does image compression work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your image (JPG, PNG, or other supported formats)</li>
                        <li>Choose the desired compression level (lossless or lossy)</li>
                        <li>The image is processed and compressed</li>
                        <li>Download the compressed image instantly</li>
                    </ol>
                    <p>The process is fast and maintains visual quality based on your selected compression level.</p>
                `
            },
            {
                id: 'comparison',
                title: 'Lossless vs Lossy Compression',
                content: `
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <strong>Lossless:</strong> Preserves all image data, no quality loss, slightly larger files
                        </div>
                        <div class="comparison-item">
                            <strong>Lossy:</strong> Reduces file size further, minor quality loss, smaller files
                        </div>
                        <div class="comparison-item">
                            <strong>Lossless ideal for:</strong> Graphics, logos, screenshots, images with text
                        </div>
                        <div class="comparison-item">
                            <strong>Lossy ideal for:</strong> Photos, web images, social media
                        </div>
                    </div>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Optimize images for websites to improve load times</li>
                        <li>Reduce file size for email or messenger sharing</li>
                        <li>Compress photos or screenshots without losing visible quality</li>
                        <li>Save storage space on your device or cloud storage</li>
                        <li>Prepare images for social media or online platforms</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>While compression reduces file size, excessive lossy compression can visibly degrade image quality. Always check the compressed image to ensure it meets your needs.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does image compression reduce quality?',
                answer: 'It depends on the type of compression. Lossless compression preserves all quality, while lossy compression may slightly reduce quality to achieve smaller file sizes.'
            },
            {
                question: 'Can I compress multiple images at once?',
                answer: 'Yes! Our tool supports batch compression. You can upload multiple images and compress them simultaneously.'
            },
            {
                question: 'Are my images uploaded during compression?',
                answer: 'No. All compression is performed 100% locally in your browser. Your files never leave your computer.'
            },
            {
                question: 'Which compression type should I use?',
                answer: 'For graphics, logos, or screenshots, use lossless. For photos or web images where smaller size is a priority, lossy compression is suitable.'
            }
        ]
    },

    'image-resize': {
        sections: [
            {
                id: 'what-is-image-resize',
                title: 'What is image resizing?',
                content: `
                    <p>Image resizing is the process of changing the dimensions (width and height) of an image. This can be done to make images larger or smaller while keeping the original file format intact.</p>
                    
                    <p>Resizing is commonly used to optimize images for websites, social media, emails, and specific device or platform requirements.</p>
                `
            },
            {
                id: 'why-resize',
                title: 'Why resize images?',
                content: `
                    <p>Resizing images is useful when:</p>
                    <ul>
                        <li>Images are too large for websites or apps</li>
                        <li>Specific dimensions are required (e.g. profile pictures, thumbnails)</li>
                        <li>You want faster loading times</li>
                        <li>Images need to fit into documents or presentations</li>
                        <li>Storage space should be reduced</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does image resizing work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your image</li>
                        <li>Choose a new width and height or a preset size</li>
                        <li>Optionally keep the aspect ratio</li>
                        <li>Download the resized image instantly</li>
                    </ol>
                    <p>The resizing process is automatic and does not require technical knowledge.</p>
                `
            },
            {
                id: 'aspect-ratio',
                title: 'Aspect ratio explained',
                content: `
                    <p>The aspect ratio describes the proportional relationship between an image’s width and height. Keeping the aspect ratio ensures that the image does not appear stretched or distorted.</p>
                    
                    <p class="info-note">It is recommended to keep the aspect ratio enabled unless you intentionally want to change the image shape.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Resize photos for websites or blogs</li>
                        <li>Create thumbnails or previews</li>
                        <li>Adjust images for social media platforms</li>
                        <li>Prepare images for email or messaging</li>
                        <li>Fit images into documents or slides</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Reducing image size usually does not cause visible quality loss. However, enlarging an image beyond its original resolution may result in blurriness or reduced sharpness.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does resizing change the file format?',
                answer: 'No. Image resizing only changes the dimensions of the image. The original file format remains the same unless you convert it separately.'
            },
            {
                question: 'Will resizing reduce image quality?',
                answer: 'Downscaling usually preserves quality. Upscaling can reduce sharpness because new pixels must be generated.'
            },
            {
                question: 'Can I resize multiple images at once?',
                answer: 'Yes! The tool supports batch resizing, allowing you to resize multiple images simultaneously.'
            },
            {
                question: 'Are my images uploaded to a server?',
                answer: 'No. All resizing is done 100% locally in your browser. Your images never leave your device.'
            }
        ]
    },

    'image-crop': {
        sections: [
            {
                id: 'what-is-image-crop',
                title: 'What is image cropping?',
                content: `
                    <p>Image cropping is the process of removing unwanted outer areas of an image to focus on a specific part. Unlike resizing, cropping changes the visible content of the image by cutting away pixels.</p>
                    
                    <p>Cropping is commonly used to improve composition, remove distractions, or adjust images to required dimensions.</p>
                `
            },
            {
                id: 'why-crop',
                title: 'Why crop images?',
                content: `
                    <p>Cropping images is useful when:</p>
                    <ul>
                        <li>Unwanted objects or backgrounds need to be removed</li>
                        <li>You want to focus on a specific subject</li>
                        <li>Images must match specific aspect ratios</li>
                        <li>Photos need better framing or composition</li>
                        <li>Images are prepared for social media or design layouts</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does image cropping work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your image</li>
                        <li>Select the area you want to keep</li>
                        <li>Adjust the crop frame manually or choose a preset ratio</li>
                        <li>Download the cropped image instantly</li>
                    </ol>
                    <p>The cropping process is intuitive and works directly in your browser.</p>
                `
            },
            {
                id: 'aspect-ratios',
                title: 'Aspect ratios and presets',
                content: `
                    <p>Aspect ratios define the proportional relationship between width and height. Common presets include 1:1, 4:3, 16:9, and social media–specific formats.</p>
                    
                    <p class="info-note">Using aspect ratio presets ensures your images fit perfectly on different platforms.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Crop profile pictures or avatars</li>
                        <li>Prepare images for social media posts</li>
                        <li>Remove unwanted background areas</li>
                        <li>Improve photo composition</li>
                        <li>Fit images into design templates</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Cropping does not reduce image quality, as no compression is applied. However, the resulting image will have a smaller resolution because parts of the original image are removed.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does cropping change the image quality?',
                answer: 'No. Cropping only removes parts of the image and does not apply compression or reduce quality.'
            },
            {
                question: 'Can I crop images to exact dimensions?',
                answer: 'Yes. You can crop freely or use preset aspect ratios and exact pixel dimensions.'
            },
            {
                question: 'Can I crop multiple images at once?',
                answer: 'Batch cropping is supported, allowing you to apply the same crop settings to multiple images.'
            },
            {
                question: 'Are my images uploaded to a server?',
                answer: 'No. All image cropping is done 100% locally in your browser. Your images never leave your device.'
            }
        ]
    },

    'image-rotate': {
        sections: [
            {
                id: 'what-is-image-rotate',
                title: 'What is image rotation?',
                content: `
                    <p>Image rotation is the process of turning an image around its center by a specific angle. Common rotations include 90°, 180°, and 270°, but images can also be rotated freely.</p>
                    
                    <p>Rotation is often used to correct image orientation or adjust visuals for better presentation.</p>
                `
            },
            {
                id: 'why-rotate',
                title: 'Why rotate images?',
                content: `
                    <p>Rotating images is useful when:</p>
                    <ul>
                        <li>Photos appear sideways or upside down</li>
                        <li>Images need to match a specific orientation</li>
                        <li>Camera orientation metadata was ignored</li>
                        <li>Design or layout adjustments are required</li>
                        <li>Images need visual correction</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does image rotation work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your image</li>
                        <li>Select a rotation angle (90°, 180°, 270° or custom)</li>
                        <li>The image is rotated around its center</li>
                        <li>Download the rotated image instantly</li>
                    </ol>
                    <p>The rotation process is fast and works entirely in your browser.</p>
                `
            },
            {
                id: 'clockwise-counter',
                title: 'Clockwise vs counterclockwise',
                content: `
                    <p>Images can be rotated clockwise (to the right) or counterclockwise (to the left). This allows precise control over image orientation.</p>
                    
                    <p class="info-note">90° clockwise rotation is the most common fix for incorrectly oriented photos.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Fix camera orientation issues</li>
                        <li>Rotate scanned documents</li>
                        <li>Adjust images for presentations</li>
                        <li>Correct sideways photos</li>
                        <li>Prepare images for printing or display</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Rotating an image does not reduce image quality. No compression is applied during rotation, and the original image clarity is preserved.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does rotating an image reduce quality?',
                answer: 'No. Image rotation does not apply compression and keeps the original image quality intact.'
            },
            {
                question: 'Can I rotate images by custom angles?',
                answer: 'Yes. In addition to standard 90° steps, you can rotate images by any custom angle.'
            },
            {
                question: 'Can I rotate multiple images at once?',
                answer: 'Yes. Batch rotation is supported, allowing you to rotate multiple images simultaneously.'
            },
            {
                question: 'Are my images uploaded to a server?',
                answer: 'No. All image rotations are performed 100% locally in your browser. Your images never leave your device.'
            }
        ]
    },

    'grayscale-converter': {
        sections: [
            {
                id: 'what-is-grayscale',
                title: 'What is grayscale conversion?',
                content: `
                    <p>Grayscale conversion is the process of transforming a color image into shades of gray. All colors are converted into different brightness levels, ranging from black to white.</p>
                    
                    <p>This technique removes color information while preserving contrast, shapes, and details of the original image.</p>
                `
            },
            {
                id: 'why-grayscale',
                title: 'Why convert images to grayscale?',
                content: `
                    <p>Converting images to grayscale is useful when:</p>
                    <ul>
                        <li>You want a classic black-and-white look</li>
                        <li>Images are prepared for printing or scanning</li>
                        <li>Color information is not needed</li>
                        <li>Photos should look more artistic or minimal</li>
                        <li>Images are used for analysis or documentation</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does grayscale conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your image</li>
                        <li>Color values are converted into brightness values</li>
                        <li>The image is transformed into grayscale</li>
                        <li>Download the grayscale image instantly</li>
                    </ol>
                    <p>The conversion process is automatic and takes only a few seconds.</p>
                `
            },
            {
                id: 'color-to-gray',
                title: 'How colors are converted',
                content: `
                    <p>During grayscale conversion, each pixel’s red, green, and blue values are combined into a single brightness value. This ensures that contrast and details remain clearly visible.</p>
                    
                    <p class="info-note">Modern grayscale conversion preserves image depth better than simple desaturation.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Create black-and-white photos</li>
                        <li>Prepare images for printing</li>
                        <li>Remove color distractions</li>
                        <li>Stylize images for design projects</li>
                        <li>Convert images for documents or reports</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Grayscale conversion does not reduce image resolution or sharpness. Only color information is removed, while image details remain intact.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does grayscale conversion reduce image quality?',
                answer: 'No. The image resolution and sharpness remain unchanged. Only color information is removed.'
            },
            {
                question: 'Can I convert multiple images at once?',
                answer: 'Yes! Batch conversion is supported, allowing you to convert multiple images to grayscale simultaneously.'
            },
            {
                question: 'Can I restore colors after conversion?',
                answer: 'No. Once an image is converted to grayscale and saved, the original color information cannot be restored.'
            },
            {
                question: 'Are my images uploaded to a server?',
                answer: 'No. All grayscale conversions are done 100% locally in your browser. Your images never leave your device.'
            }
        ]
    },

    'background-remover': {
        sections: [
            {
                id: 'what-is-background-removal',
                title: 'What is background removal?',
                content: `
                    <p>Background removal is the process of separating the main subject of an image from its background and removing the background entirely. The result is usually an image with a transparent background.</p>
                    
                    <p>This technique is commonly used for product photos, portraits, logos, and design assets.</p>
                `
            },
            {
                id: 'why-remove-background',
                title: 'Why remove image backgrounds?',
                content: `
                    <p>Removing backgrounds is useful when:</p>
                    <ul>
                        <li>You want to isolate a subject or object</li>
                        <li>Product images need a clean, transparent background</li>
                        <li>Images are prepared for design or marketing</li>
                        <li>Background distractions should be removed</li>
                        <li>Images need to be placed on different backgrounds</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does background removal work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your image</li>
                        <li>The main subject is detected automatically</li>
                        <li>The background is removed from the image</li>
                        <li>Download the image with a transparent background</li>
                    </ol>
                    <p>The process is fully automated and takes only a few seconds.</p>
                `
            },
            {
                id: 'transparency',
                title: 'Transparent backgrounds explained',
                content: `
                    <p>After background removal, the image is usually exported with a transparent background (alpha channel), allowing it to be placed on any background color or image.</p>
                    
                    <p class="info-note">Transparent backgrounds work best with PNG or WEBP formats.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Product photos for e-commerce</li>
                        <li>Profile pictures and portraits</li>
                        <li>Logos and branding assets</li>
                        <li>Marketing and promotional materials</li>
                        <li>Design compositions and mockups</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>Background removal does not reduce image resolution. However, very complex backgrounds or fine details like hair may require manual refinement for best results.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Will the background be completely transparent?',
                answer: 'Yes. The background is removed and replaced with transparency, allowing you to use the image on any background.'
            },
            {
                question: 'Which image formats support transparency?',
                answer: 'PNG and WEBP support transparency. JPG does not support transparent backgrounds.'
            },
            {
                question: 'Can I remove backgrounds from multiple images?',
                answer: 'Yes! Batch processing is supported, allowing you to remove backgrounds from multiple images at once.'
            },
            {
                question: 'Are my images uploaded to a server?',
                answer: 'No. All background removal is performed 100% locally in your browser. Your images never leave your device.'
            }
        ]
    },

    /*--------------

        PDF

    --------------*/



    'image-to-pdf': {
        sections: [
            {
                id: 'what-is-image-to-pdf',
                title: 'What is image to PDF conversion?',
                content: `
                    <p>Image to PDF conversion is the process of combining one or multiple images into a single PDF document. Each image is placed on its own page or arranged according to the selected layout.</p>
                    
                    <p>This is commonly used for documents, scans, presentations, and archiving images in a universally supported format.</p>
                `
            },
            {
                id: 'why-convert-to-pdf',
                title: 'Why convert images to PDF?',
                content: `
                    <p>Converting images to PDF is useful when:</p>
                    <ul>
                        <li>Images need to be shared as a single document</li>
                        <li>Scanned pages should be combined into one file</li>
                        <li>Files must be easy to print or archive</li>
                        <li>Images should be protected from easy modification</li>
                        <li>Maximum compatibility is required</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does image to PDF conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload one or multiple images</li>
                        <li>Choose page order and layout options</li>
                        <li>The images are combined into a PDF document</li>
                        <li>Download the generated PDF instantly</li>
                    </ol>
                    <p>The conversion process is fast and works entirely in your browser.</p>
                `
            },
            {
                id: 'layout-options',
                title: 'Layout and page options',
                content: `
                    <p>You can control how images are placed in the PDF, including page size, orientation, margins, and image scaling.</p>
                    
                    <p class="info-note">Each image is typically placed on its own page for best readability.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Convert scanned documents to PDF</li>
                        <li>Create printable photo documents</li>
                        <li>Combine multiple images into one file</li>
                        <li>Prepare documents for sharing or archiving</li>
                        <li>Send images as a single attachment</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about output quality',
                content: `
                    <p>The image quality inside the PDF depends on the original images. No additional compression is applied unless explicitly selected.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I convert multiple images into one PDF?',
                answer: 'Yes! You can upload multiple images and combine them into a single PDF document.'
            },
            {
                question: 'Does the order of images matter?',
                answer: 'Yes. You can arrange the images in your preferred order before creating the PDF.'
            },
            {
                question: 'Are my images uploaded to a server?',
                answer: 'No. All image-to-PDF conversions are performed 100% locally in your browser. Your files never leave your device.'
            },
            {
                question: 'Can I print the generated PDF?',
                answer: 'Yes. The generated PDF is fully compatible with standard PDF viewers and can be printed without issues.'
            }
        ]
    },

    'jpg-to-pdf': {
        sections: [
            {
                id: 'what-is-jpg-to-pdf',
                title: 'What is JPG to PDF conversion?',
                content: `
                    <p>JPG to PDF conversion is the process of converting one or multiple JPG images into a single PDF document. Each JPG image is placed on its own page or arranged according to the selected layout.</p>
                    
                    <p>This is ideal for creating documents from photos, scans, or image-based content that should be shared or printed easily.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert JPG to PDF?',
                content: `
                    <p>Converting JPG images to PDF is useful when:</p>
                    <ul>
                        <li>Multiple photos should be combined into one document</li>
                        <li>Images need to be printed in a clean layout</li>
                        <li>Files must be easy to share and archive</li>
                        <li>JPG images should be protected from easy editing</li>
                        <li>Maximum compatibility across devices is required</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does JPG to PDF conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload one or multiple JPG images</li>
                        <li>Arrange the order of the images</li>
                        <li>The JPG files are converted into a PDF document</li>
                        <li>Download the PDF file instantly</li>
                    </ol>
                    <p>The conversion process is fast and fully browser-based.</p>
                `
            },
            {
                id: 'layout-options',
                title: 'Layout and page options',
                content: `
                    <p>You can control page size, orientation, margins, and image scaling when converting JPG to PDF.</p>
                    
                    <p class="info-note">Each JPG image is typically placed on its own PDF page for best readability.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Create PDFs from scanned JPG documents</li>
                        <li>Combine photos into a printable file</li>
                        <li>Prepare image-based reports or presentations</li>
                        <li>Archive JPG images in a single document</li>
                        <li>Send multiple images as one attachment</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>The image quality inside the PDF depends on the original JPG files. No additional compression is applied unless explicitly selected.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I convert multiple JPG images into one PDF?',
                answer: 'Yes! You can upload multiple JPG images and combine them into a single PDF document.'
            },
            {
                question: 'Can I change the order of images?',
                answer: 'Yes. You can easily reorder JPG images before creating the PDF.'
            },
            {
                question: 'Are my JPG files uploaded to a server?',
                answer: 'No. All JPG to PDF conversions are performed 100% locally in your browser. Your files never leave your device.'
            },
            {
                question: 'Is the generated PDF suitable for printing?',
                answer: 'Yes. The PDF is compatible with all standard PDF viewers and can be printed without any issues.'
            }
        ]
    },

    'png-to-pdf': {
        sections: [
            {
                id: 'what-is-png-to-pdf',
                title: 'What is PNG to PDF conversion?',
                content: `
                    <p>PNG to PDF conversion is the process of converting one or multiple PNG images into a single PDF document. Each PNG image is placed on its own page or arranged according to the selected layout.</p>
                    
                    <p>This is especially useful for graphics, screenshots, and images with transparency that need to be shared or printed in a standardized format.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert PNG to PDF?',
                content: `
                    <p>Converting PNG images to PDF is useful when:</p>
                    <ul>
                        <li>Multiple PNG files should be combined into one document</li>
                        <li>Images need to be printed or archived</li>
                        <li>Graphics or screenshots should be shared professionally</li>
                        <li>Files must be easy to open on any device</li>
                        <li>Transparency needs to be preserved visually</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does PNG to PDF conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload one or multiple PNG images</li>
                        <li>Arrange the order of the images</li>
                        <li>The PNG files are converted into a PDF document</li>
                        <li>Download the PDF file instantly</li>
                    </ol>
                    <p>The conversion process is fast and works directly in your browser.</p>
                `
            },
            {
                id: 'transparency-note',
                title: 'What happens to transparency?',
                content: `
                    <p>PNG images with transparency are rendered correctly in the PDF. Transparent areas are usually displayed on a white background unless otherwise specified.</p>
                    
                    <p class="info-note">PDF does not support true transparency in the same way as PNG, but visual appearance is preserved.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Convert screenshots to PDF documents</li>
                        <li>Prepare graphics for printing</li>
                        <li>Combine design assets into one file</li>
                        <li>Archive PNG images in a single document</li>
                        <li>Share images in a professional format</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about output quality',
                content: `
                    <p>The image quality inside the PDF depends on the original PNG files. No quality loss occurs during conversion unless optional compression is enabled.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I convert multiple PNG images into one PDF?',
                answer: 'Yes! You can upload multiple PNG files and combine them into a single PDF document.'
            },
            {
                question: 'Is transparency preserved in the PDF?',
                answer: 'Visually yes. Transparent areas are rendered correctly, usually on a white background.'
            },
            {
                question: 'Are my PNG files uploaded to a server?',
                answer: 'No. All PNG to PDF conversions are done 100% locally in your browser. Your files never leave your device.'
            },
            {
                question: 'Can I print the generated PDF?',
                answer: 'Yes. The PDF is fully compatible with standard PDF viewers and printers.'
            }
        ]
    },

    'pdf-to-jpg': {
        sections: [
            {
                id: 'what-is-pdf-to-jpg',
                title: 'What is PDF to JPG conversion?',
                content: `
                    <p>PDF to JPG conversion is the process of extracting pages from a PDF document and converting them into JPG image files. Each PDF page is converted into a separate JPG image.</p>
                    
                    <p>This makes PDF content easy to view, share, or edit as standard image files.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert PDF to JPG?',
                content: `
                    <p>Converting PDF files to JPG is useful when:</p>
                    <ul>
                        <li>PDF pages need to be shared as images</li>
                        <li>Images are required for websites or social media</li>
                        <li>PDF content should be edited in image editors</li>
                        <li>Individual pages need to be extracted</li>
                        <li>Compatibility with image-based platforms is required</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does PDF to JPG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your PDF file</li>
                        <li>Select the pages to convert</li>
                        <li>Each page is converted into a JPG image</li>
                        <li>Download the JPG files instantly</li>
                    </ol>
                    <p>The conversion process is fast and fully browser-based.</p>
                `
            },
            {
                id: 'page-handling',
                title: 'Page handling and output',
                content: `
                    <p>Each page of the PDF is converted into a separate JPG image. You can usually choose the image resolution to balance quality and file size.</p>
                    
                    <p class="info-note">Higher resolution results in larger JPG files but better readability.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Extract PDF pages as images</li>
                        <li>Share document pages on social media</li>
                        <li>Edit PDF content using image editors</li>
                        <li>Create previews or thumbnails</li>
                        <li>Reuse PDF content in presentations</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>PDF to JPG conversion uses rasterization. Text and vector graphics become pixel-based images, so choosing an appropriate resolution is important for clarity.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does each PDF page become a separate JPG?',
                answer: 'Yes. Each page of the PDF is converted into its own JPG image.'
            },
            {
                question: 'Can I choose the image resolution?',
                answer: 'Yes. You can usually select the output resolution to control image quality and file size.'
            },
            {
                question: 'Are my PDF files uploaded to a server?',
                answer: 'No. All PDF to JPG conversions are performed 100% locally in your browser. Your files never leave your device.'
            },
            {
                question: 'Is text still selectable after conversion?',
                answer: 'No. After conversion, text becomes part of the image and is no longer selectable or searchable.'
            }
        ]
    },

    'pdf-to-png': {
        sections: [
            {
                id: 'what-is-pdf-to-png',
                title: 'What is PDF to PNG conversion?',
                content: `
                    <p>PDF to PNG conversion transforms pages of a PDF document into PNG image files. Each page is rendered as a separate PNG image.</p>
                    
                    <p>PNG is a lossless image format, making it ideal for preserving sharp text, graphics, and transparency.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert PDF to PNG?',
                content: `
                    <p>Converting PDF files to PNG is useful when:</p>
                    <ul>
                        <li>High image quality is required</li>
                        <li>Text and graphics must remain sharp</li>
                        <li>Images are used for websites or design work</li>
                        <li>Transparency is needed</li>
                        <li>PDF pages need to be extracted as images</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does PDF to PNG conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your PDF file</li>
                        <li>Select the pages to convert</li>
                        <li>Each page is rendered and converted to PNG</li>
                        <li>Download the PNG images instantly</li>
                    </ol>
                    <p>The entire process runs directly in your browser.</p>
                `
            },
            {
                id: 'page-handling',
                title: 'Page handling and output',
                content: `
                    <p>Each PDF page is converted into an individual PNG image. You can typically adjust the output resolution for the best balance between quality and file size.</p>
                    
                    <p class="info-note">PNG files are larger than JPG but offer superior clarity.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Extract high-quality images from PDFs</li>
                        <li>Prepare PDF pages for web or design projects</li>
                        <li>Create screenshots or previews of documents</li>
                        <li>Edit PDF content in image editors</li>
                        <li>Preserve transparency and sharp edges</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about image quality',
                content: `
                    <p>PDF to PNG conversion is lossless, but the output quality depends on the chosen resolution. Higher resolution ensures sharper text and graphics.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does each PDF page become a separate PNG?',
                answer: 'Yes. Every page of the PDF is converted into its own PNG image.'
            },
            {
                question: 'Is PNG better than JPG for PDF conversion?',
                answer: 'PNG is lossless and preserves sharp text and graphics better than JPG, but results in larger file sizes.'
            },
            {
                question: 'Are my files uploaded during conversion?',
                answer: 'No. All PDF to PNG conversions happen entirely in your browser. Your files remain private and never leave your device.'
            },
            {
                question: 'Can PNG images have transparent backgrounds?',
                answer: 'Yes. PNG supports transparency, which is useful for graphics and design workflows.'
            }
        ]
    },

    'pdf-merge': {
        sections: [
            {
                id: 'what-is-merge-pdf',
                title: 'What is PDF merge?',
                content: `
                    <p>PDF merge is the process of combining two or more PDF documents into a single PDF file. Each original PDF retains its pages in the order you choose, creating one consolidated document.</p>
                    
                    <p>This is useful for reports, contracts, e-books, and any workflow that requires combining multiple PDFs.</p>
                `
            },
            {
                id: 'why-merge-pdf',
                title: 'Why merge PDF files?',
                content: `
                    <p>Merging PDFs is useful when:</p>
                    <ul>
                        <li>You want to combine multiple documents into one file</li>
                        <li>Reports or forms are split across several PDFs</li>
                        <li>PDFs need to be shared as a single attachment</li>
                        <li>Organization and archiving of files is required</li>
                        <li>Printing multiple documents together is needed</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does PDF merge work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload the PDF files you want to merge</li>
                        <li>Arrange the order of the PDFs</li>
                        <li>The files are combined into a single PDF document</li>
                        <li>Download the merged PDF instantly</li>
                    </ol>
                    <p>The process is quick and runs entirely in your browser.</p>
                `
            },
            {
                id: 'page-handling',
                title: 'Page handling and order',
                content: `
                    <p>You can reorder the uploaded PDFs before merging. All pages from each PDF are preserved in their original layout and quality.</p>
                    
                    <p class="info-note">This ensures the final document is organized exactly as you need it.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Combine multiple contracts into one PDF</li>
                        <li>Merge scanned pages into a single document</li>
                        <li>Create unified reports from several PDFs</li>
                        <li>Prepare e-books or training materials</li>
                        <li>Organize multiple forms for archiving</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about output quality',
                content: `
                    <p>All pages retain their original quality and formatting. No additional compression is applied unless specifically chosen.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I merge multiple PDFs at once?',
                answer: 'Yes. You can upload and merge as many PDFs as you need into a single document.'
            },
            {
                question: 'Can I reorder the PDFs before merging?',
                answer: 'Yes. You can drag and drop to arrange the order of uploaded PDFs before creating the final file.'
            },
            {
                question: 'Are my PDFs uploaded to a server?',
                answer: 'No. All merging operations happen 100% locally in your browser. Your files never leave your device.'
            },
            {
                question: 'Will the merged PDF maintain original quality?',
                answer: 'Yes. All pages are preserved in their original quality and layout.'
            }
        ]
    },

    'split-pdf': {
        sections: [
            {
                id: 'what-is-split-pdf',
                title: 'What is PDF split?',
                content: `
                    <p>PDF split is the process of dividing a single PDF document into multiple smaller PDFs. You can extract individual pages or ranges of pages to create separate files.</p>
                    
                    <p>This is useful for sharing specific sections, separating large documents, or organizing content efficiently.</p>
                `
            },
            {
                id: 'why-split-pdf',
                title: 'Why split PDF files?',
                content: `
                    <p>Splitting PDFs is useful when:</p>
                    <ul>
                        <li>You only need to share certain pages</li>
                        <li>Large documents need to be divided into smaller files</li>
                        <li>Specific sections are required for printing</li>
                        <li>Archiving or organizing content page by page</li>
                        <li>You want to extract individual chapters or forms</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does PDF split work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload the PDF you want to split</li>
                        <li>Select the pages or ranges to extract</li>
                        <li>The selected pages are saved as separate PDF files</li>
                        <li>Download the split PDFs instantly</li>
                    </ol>
                    <p>The process runs completely in your browser and is very fast.</p>
                `
            },
            {
                id: 'page-selection',
                title: 'Page selection and options',
                content: `
                    <p>You can choose individual pages, continuous ranges, or custom sets of pages to split. Each resulting PDF retains the original formatting and quality.</p>
                    
                    <p class="info-note">This allows maximum flexibility in dividing your document as needed.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Extract specific pages for sharing or emailing</li>
                        <li>Divide large PDF reports into smaller sections</li>
                        <li>Separate forms, invoices, or receipts</li>
                        <li>Create single-page PDFs from multi-page documents</li>
                        <li>Organize content for printing or archiving</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about output quality',
                content: `
                    <p>All split PDFs retain the original layout and quality. No compression is applied unless explicitly selected.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I split multiple pages at once?',
                answer: 'Yes. You can select ranges of pages or multiple individual pages to create separate PDFs in one operation.'
            },
            {
                question: 'Does splitting affect the original PDF?',
                answer: 'No. The original PDF remains unchanged. Split PDFs are created as new files.'
            },
            {
                question: 'Are my PDF files uploaded during splitting?',
                answer: 'No. All PDF split operations happen entirely in your browser. Your files never leave your device.'
            },
            {
                question: 'Will the split PDFs maintain quality?',
                answer: 'Yes. All pages retain their original formatting and image quality.'
            }
        ]
    },

    /*--------------

        Documents

    --------------*/

    'pdf-compress': {
        sections: [
            {
                id: 'what-is-pdf-compress',
                title: 'What is PDF compression?',
                content: `
                    <p>PDF compression is the process of reducing the file size of a PDF document without significantly affecting its quality. This is achieved by optimizing images, removing redundant data, and applying efficient encoding techniques.</p>
                    
                    <p>Compressed PDFs are easier to share, upload, and store, especially for large documents containing many images.</p>
                `
            },
            {
                id: 'why-compress',
                title: 'Why compress PDF files?',
                content: `
                    <p>Compressing PDFs is useful when:</p>
                    <ul>
                        <li>You need to reduce file size for email attachments</li>
                        <li>Upload limits on websites or platforms must be met</li>
                        <li>Storage space needs to be saved</li>
                        <li>Large PDF reports or presentations need faster sharing</li>
                        <li>You want to optimize PDFs for mobile devices</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does PDF compression work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your PDF file</li>
                        <li>Compression is applied to images, fonts, and other content</li>
                        <li>Redundant or unnecessary data is removed</li>
                        <li>Download the compressed PDF instantly</li>
                    </ol>
                    <p>The process is fast and runs entirely in your browser.</p>
                `
            },
            {
                id: 'compression-options',
                title: 'Compression options',
                content: `
                    <p>You can often choose between different compression levels:</p>
                    <ul>
                        <li><strong>High quality:</strong> Slight size reduction, minimal quality loss</li>
                        <li><strong>Balanced:</strong> Good trade-off between size and quality</li>
                        <li><strong>Maximum compression:</strong> Smallest file size, may reduce image quality</li>
                    </ul>
                    <p class="info-note">Selecting the right level depends on your needs for file size vs. quality.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Reduce PDF file size for email or cloud sharing</li>
                        <li>Optimize reports or e-books for online distribution</li>
                        <li>Save storage space on your device</li>
                        <li>Prepare PDFs for faster download on websites</li>
                        <li>Compress image-heavy PDFs without losing readability</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about output quality',
                content: `
                    <p>Compression may slightly reduce image quality depending on the chosen level. Text and vector content are usually preserved without noticeable degradation.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I choose the compression level?',
                answer: 'Yes. You can select high quality, balanced, or maximum compression depending on your needs.'
            },
            {
                question: 'Will text quality be affected?',
                answer: 'No. Compression mainly affects images. Text and vector elements typically remain sharp.'
            },
            {
                question: 'Are my PDF files uploaded during compression?',
                answer: 'No. All PDF compress operations happen 100% locally in your browser. Your files never leave your device.'
            },
            {
                question: 'How much can the file size be reduced?',
                answer: 'The reduction depends on the original PDF content. Image-heavy PDFs see the largest decrease, while text-only PDFs may reduce only slightly.'
            }
        ]
    },

    'text-to-pdf': {
        sections: [
            {
                id: 'what-is-text-to-pdf',
                title: 'What is Text to PDF conversion?',
                content: `
                    <p>Text to PDF conversion allows you to transform plain text or formatted text files into a PDF document. This makes your text easily shareable, printable, and professional-looking.</p>
                    
                    <p>PDFs are widely supported on all devices and platforms, making this conversion ideal for documents, notes, scripts, or reports.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert text to PDF?',
                content: `
                    <p>Converting text files to PDF is useful when:</p>
                    <ul>
                        <li>You want to preserve formatting across devices</li>
                        <li>Documents need to be shared professionally</li>
                        <li>Text must be printed or archived</li>
                        <li>Multiple text files are combined into one document</li>
                        <li>PDF compatibility is required for work or school</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does Text to PDF conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload or paste your text</li>
                        <li>Choose formatting options (font, size, page layout)</li>
                        <li>The text is rendered into a PDF document</li>
                        <li>Download the PDF instantly</li>
                    </ol>
                    <p>The process runs entirely in your browser and is very fast.</p>
                `
            },
            {
                id: 'formatting-options',
                title: 'Formatting options',
                content: `
                    <p>You can adjust:</p>
                    <ul>
                        <li>Font type and size</li>
                        <li>Page size and orientation (portrait or landscape)</li>
                        <li>Margins and line spacing</li>
                        <li>Text alignment</li>
                    </ul>
                    <p class="info-note">These options allow you to create a PDF that matches your preferred style.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Create PDFs from notes, scripts, or essays</li>
                        <li>Share text documents professionally</li>
                        <li>Convert text logs or reports into PDF format</li>
                        <li>Combine multiple text files into one PDF</li>
                        <li>Archive or print text content easily</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about output quality',
                content: `
                    <p>The text in the PDF remains sharp and readable. Formatting is preserved according to the chosen options.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I choose the page size and orientation?',
                answer: 'Yes. You can select portrait or landscape orientation and different page sizes such as A4, Letter, or custom dimensions.'
            },
            {
                question: 'Can I upload multiple text files at once?',
                answer: 'Yes. Multiple text files can be combined into a single PDF document.'
            },
            {
                question: 'Are my text files uploaded to a server?',
                answer: 'No. All conversions happen 100% locally in your browser. Your files remain private.'
            },
            {
                question: 'Can I customize font and layout?',
                answer: 'Yes. You can select font type, size, margins, line spacing, and alignment before creating the PDF.'
            }
        ]
    },

    'html-to-pdf': {
        sections: [
            {
                id: 'what-is-html-to-pdf',
                title: 'What is HTML to PDF conversion?',
                content: `
                    <p>HTML to PDF conversion allows you to turn web pages, HTML code, or web content into PDF documents. This preserves the layout, styling, images, and links of the original HTML.</p>
                    
                    <p>PDFs generated from HTML are ideal for archiving web pages, sharing offline copies, or creating professional reports from web content.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert HTML to PDF?',
                content: `
                    <p>Converting HTML to PDF is useful when:</p>
                    <ul>
                        <li>You need an offline copy of a web page</li>
                        <li>Web content needs to be shared professionally</li>
                        <li>Reports or documentation are generated from HTML templates</li>
                        <li>Links, images, and layout must be preserved</li>
                        <li>You want a printable version of a webpage</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does HTML to PDF conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Paste your HTML code or provide a URL</li>
                        <li>The HTML is rendered and processed</li>
                        <li>Styles, images, and links are preserved in the PDF</li>
                        <li>Download the PDF instantly</li>
                    </ol>
                    <p>The process is fast, accurate, and runs entirely in your browser.</p>
                `
            },
            {
                id: 'formatting-options',
                title: 'Formatting and output options',
                content: `
                    <p>You can customize:</p>
                    <ul>
                        <li>Page size and orientation</li>
                        <li>Margins and headers/footers</li>
                        <li>Scaling and page breaks</li>
                        <li>Background graphics inclusion</li>
                    </ul>
                    <p class="info-note">These options ensure the PDF matches your preferred appearance and printing requirements.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Save webpages for offline reference</li>
                        <li>Convert HTML reports into PDF documents</li>
                        <li>Archive web content for records</li>
                        <li>Share web content in a universally accessible format</li>
                        <li>Create professional PDFs from email templates or dashboards</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about output quality',
                content: `
                    <p>The generated PDF preserves the layout and design of the original HTML. Complex CSS or scripts may render differently depending on browser compatibility.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I convert a live website URL?',
                answer: 'Yes. You can provide a URL, and the tool will render the page into a PDF.'
            },
            {
                question: 'Does the PDF keep images and links?',
                answer: 'Yes. Images, links, and most styling are preserved in the generated PDF.'
            },
            {
                question: 'Are my HTML files uploaded to a server?',
                answer: 'No. All conversions happen 100% locally in your browser. Your files and data remain private.'
            },
            {
                question: 'Can I customize page size and orientation?',
                answer: 'Yes. You can choose page size, orientation, margins, and whether to include background graphics.'
            }
        ]
    },

    'markdown-to-pdf': {
        sections: [
            {
                id: 'what-is-markdown-to-pdf',
                title: 'What is Markdown to PDF conversion?',
                content: `
                    <p>Markdown to PDF conversion allows you to transform Markdown (.md) files into PDF documents. Markdown is a lightweight markup language often used for documentation, notes, and readme files.</p>
                    
                    <p>Converting Markdown to PDF preserves headings, lists, code blocks, links, and formatting, creating a professional and shareable document.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert Markdown to PDF?',
                content: `
                    <p>Converting Markdown to PDF is useful when:</p>
                    <ul>
                        <li>You want a professional, printable version of your Markdown content</li>
                        <li>Documentation needs to be shared or archived</li>
                        <li>Headings, lists, tables, and code blocks must be preserved</li>
                        <li>Markdown content needs to be converted for reports or presentations</li>
                        <li>PDF compatibility is required across devices and platforms</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does Markdown to PDF conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your Markdown file or paste the Markdown content</li>
                        <li>The Markdown is rendered into formatted text with headings, lists, tables, and code blocks</li>
                        <li>The content is exported as a PDF document</li>
                        <li>Download the PDF instantly</li>
                    </ol>
                    <p>The process runs entirely in your browser and is fast and accurate.</p>
                `
            },
            {
                id: 'formatting-options',
                title: 'Formatting and styling options',
                content: `
                    <p>You can customize:</p>
                    <ul>
                        <li>Font type and size</li>
                        <li>Page size and orientation</li>
                        <li>Margins and line spacing</li>
                        <li>Headers, footers, and page numbers</li>
                    </ul>
                    <p class="info-note">These options ensure that the PDF output matches your preferred style and formatting requirements.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Convert project documentation or README files to PDF</li>
                        <li>Create professional handouts or reports from Markdown notes</li>
                        <li>Archive Markdown content in a universally accessible format</li>
                        <li>Share code snippets or technical documentation with preserved formatting</li>
                        <li>Prepare Markdown content for printing or distribution</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about output quality',
                content: `
                    <p>The PDF output preserves all Markdown formatting, including headings, lists, tables, links, and code blocks. Complex styling may depend on the rendering engine.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I customize the font and page layout?',
                answer: 'Yes. You can select font type, size, page size, orientation, margins, and headers/footers before generating the PDF.'
            },
            {
                question: 'Does the PDF preserve Markdown formatting?',
                answer: 'Yes. Headings, lists, tables, code blocks, and links are preserved in the PDF output.'
            },
            {
                question: 'Are my Markdown files uploaded to a server?',
                answer: 'No. All conversions happen entirely in your browser. Your files remain private and secure.'
            },
            {
                question: 'Can I combine multiple Markdown files into one PDF?',
                answer: 'Yes. You can upload multiple Markdown files and merge them into a single PDF document.'
            }
        ]
    },

    'csv-to-pdf': {
        sections: [
            {
                id: 'what-is-csv-to-pdf',
                title: 'What is CSV to PDF conversion?',
                content: `
                    <p>CSV to PDF conversion allows you to transform CSV (Comma-Separated Values) files into PDF documents. CSV files are commonly used for spreadsheets, databases, and tabular data.</p>
                    
                    <p>Converting CSV to PDF preserves the table structure, headers, and data formatting, creating a professional and shareable document.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert CSV to PDF?',
                content: `
                    <p>Converting CSV to PDF is useful when:</p>
                    <ul>
                        <li>You need a readable, printable version of your tabular data</li>
                        <li>Data must be shared with others without requiring spreadsheet software</li>
                        <li>Reports or summaries need to be created from CSV files</li>
                        <li>Tables need to be archived in a universally accessible format</li>
                        <li>Professional presentation of CSV data is required</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does CSV to PDF conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your CSV file</li>
                        <li>The CSV data is rendered into a table format</li>
                        <li>You can adjust formatting, page size, and orientation</li>
                        <li>The table is exported as a PDF document</li>
                        <li>Download the PDF instantly</li>
                    </ol>
                    <p>The process runs entirely in your browser and is quick and reliable.</p>
                `
            },
            {
                id: 'formatting-options',
                title: 'Formatting and output options',
                content: `
                    <p>You can customize:</p>
                    <ul>
                        <li>Page size and orientation (portrait or landscape)</li>
                        <li>Margins and table layout</li>
                        <li>Font size and style for table content</li>
                        <li>Headers, footers, and page numbers</li>
                    </ul>
                    <p class="info-note">These options help create a clean, readable PDF from your CSV data.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Convert financial or inventory CSVs into PDF reports</li>
                        <li>Share spreadsheet data professionally without Excel or Google Sheets</li>
                        <li>Archive tabular data in PDF format for long-term storage</li>
                        <li>Create printable versions of CSV tables</li>
                        <li>Prepare data summaries for presentations or meetings</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about output quality',
                content: `
                    <p>The table structure and all CSV data are preserved. PDFs are generated with high readability and clear formatting.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I adjust page orientation for wide tables?',
                answer: 'Yes. You can choose portrait or landscape orientation to best fit your table content.'
            },
            {
                question: 'Will the CSV formatting be preserved?',
                answer: 'Yes. Headers, rows, and columns are preserved in the PDF output.'
            },
            {
                question: 'Are my CSV files uploaded to a server?',
                answer: 'No. All conversions happen 100% locally in your browser. Your data remains private.'
            },
            {
                question: 'Can I customize fonts and table styles?',
                answer: 'Yes. You can adjust font type, size, table layout, margins, and headers/footers before generating the PDF.'
            }
        ]
    },

    /*--------------

        Audio

    --------------*/

    'mp3-to-wav': {
        sections: [
            {
                id: 'what-is-mp3',
                title: 'What is an MP3 file?',
                content: `
                    <p>MP3 (MPEG-1 Audio Layer III) is a widely used audio format that compresses audio data to reduce file size. It uses lossy compression, which means some audio quality is lost to achieve smaller file sizes.</p>
                    
                    <p>MP3 is ideal for music, podcasts, and general audio playback due to its small size and wide compatibility.</p>
                `
            },
            {
                id: 'what-is-wav',
                title: 'What is a WAV file?',
                content: `
                    <p>WAV (Waveform Audio File Format) is an uncompressed audio format that stores audio in high quality. WAV files preserve the original sound without loss of data, making them ideal for professional audio editing, mixing, and archival purposes.</p>
                    
                    <p>The downside is that WAV files are significantly larger than MP3 files.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert MP3 to WAV?',
                content: `
                    <p>Converting MP3 to WAV is useful when:</p>
                    <ul>
                        <li>You need lossless audio for editing or production</li>
                        <li>High-quality audio is required for mixing or mastering</li>
                        <li>MP3 compression artifacts need to be avoided</li>
                        <li>Compatibility with professional audio software is needed</li>
                        <li>Archiving audio in its purest form is desired</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does MP3 to WAV conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your MP3 file</li>
                        <li>The MP3 is decoded to raw audio data</li>
                        <li>The audio data is encoded into WAV format without compression</li>
                        <li>Download the WAV file instantly</li>
                    </ol>
                    <p>The conversion process is fast and preserves audio quality as much as possible given the original MP3 data.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Edit or mix MP3 audio in professional software</li>
                        <li>Prepare audio for podcasts, videos, or presentations</li>
                        <li>Archive music or recordings in a lossless format</li>
                        <li>Remove compression artifacts for better sound quality</li>
                        <li>Ensure compatibility with audio production tools</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about audio quality',
                content: `
                    <p>Converting from MP3 to WAV does not restore lost audio data. WAV will preserve the audio at the quality of the original MP3 without further loss.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does converting MP3 to WAV improve audio quality?',
                answer: 'No. WAV preserves the original MP3 audio quality, but it cannot recover data lost during MP3 compression.'
            },
            {
                question: 'Are my audio files uploaded to a server?',
                answer: 'No. All conversions happen 100% locally in your browser. Your files never leave your device.'
            },
            {
                question: 'Can WAV files be edited in professional audio software?',
                answer: 'Yes. WAV is widely supported in audio editors, DAWs, and professional production software.'
            },
            {
                question: 'Why are WAV files so large compared to MP3?',
                answer: 'WAV is an uncompressed, lossless format. It stores the full audio data, resulting in larger file sizes than compressed MP3 files.'
            }
        ]
    },

    'wav-to-mp3': {
        sections: [
            {
                id: 'what-is-wav',
                title: 'What is a WAV file?',
                content: `
                    <p>WAV (Waveform Audio File Format) is an uncompressed, lossless audio format that stores high-quality audio. WAV files are commonly used in professional audio editing, mixing, and archiving.</p>
                    
                    <p>The downside of WAV is that files are large, consuming more storage space compared to compressed formats.</p>
                `
            },
            {
                id: 'what-is-mp3',
                title: 'What is an MP3 file?',
                content: `
                    <p>MP3 (MPEG-1 Audio Layer III) is a widely used compressed audio format that reduces file size using lossy compression. It is compatible with almost all devices, software, and media players.</p>
                    
                    <p>MP3 sacrifices some audio fidelity to achieve smaller files, but it is ideal for music, podcasts, and general audio sharing.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert WAV to MP3?',
                content: `
                    <p>Converting WAV to MP3 is useful when:</p>
                    <ul>
                        <li>You want to save storage space</li>
                        <li>Audio files need to be shared online or via email</li>
                        <li>Compatibility with devices or apps that do not support WAV is required</li>
                        <li>MP3 is sufficient for casual listening or streaming</li>
                        <li>High-quality audio archiving is not required</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does WAV to MP3 conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your WAV file</li>
                        <li>The WAV audio is encoded into MP3 format using lossy compression</li>
                        <li>Compression reduces file size while preserving acceptable quality</li>
                        <li>Download the MP3 file instantly</li>
                    </ol>
                    <p>The process is quick, and the MP3 output is compatible with virtually all devices.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Convert large WAV recordings to MP3 for sharing or streaming</li>
                        <li>Save space on mobile devices or cloud storage</li>
                        <li>Create MP3 versions of podcasts, audiobooks, or music</li>
                        <li>Ensure compatibility with standard audio players</li>
                        <li>Distribute audio files via email or social media platforms</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about audio quality',
                content: `
                    <p>MP3 is a lossy format. Converting from WAV will reduce file size but may slightly decrease audio quality depending on the chosen bitrate.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does converting WAV to MP3 reduce audio quality?',
                answer: 'Yes. MP3 uses lossy compression, which slightly reduces audio fidelity. Higher bitrates reduce the quality loss.'
            },
            {
                question: 'Are my audio files uploaded to a server?',
                answer: 'No. All conversions happen 100% locally in your browser. Your files remain private and secure.'
            },
            {
                question: 'Can I adjust MP3 quality or bitrate?',
                answer: 'Yes. Many converters allow selecting bitrate to balance audio quality and file size.'
            },
            {
                question: 'Why use MP3 instead of WAV?',
                answer: 'MP3 significantly reduces file size while remaining compatible with most devices and apps, making it ideal for sharing and streaming.'
            }
        ]
    },

    'audio-trimmer': {
        sections: [
            {
                id: 'what-is-audio-trimmer',
                title: 'What is an Audio Trimmer?',
                content: `
                    <p>An Audio Trimmer is a tool that allows you to cut, trim, or extract a specific portion of an audio file. It works with formats like MP3, WAV, and others.</p>
                    
                    <p>Audio trimming is ideal for creating ringtones, shortening recordings, or isolating specific segments for podcasts, music, or presentations.</p>
                `
            },
            {
                id: 'why-trim-audio',
                title: 'Why trim audio?',
                content: `
                    <p>Trimming audio is useful when:</p>
                    <ul>
                        <li>You want to remove silence, noise, or unwanted parts</li>
                        <li>Create ringtones or notification sounds</li>
                        <li>Extract specific segments for podcasts, lectures, or interviews</li>
                        <li>Shorten music clips for presentations or videos</li>
                        <li>Improve audio flow and quality by removing unnecessary parts</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does audio trimming work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your audio file (MP3, WAV, etc.)</li>
                        <li>Select the start and end points of the segment you want to keep</li>
                        <li>The tool extracts the selected portion</li>
                        <li>Download the trimmed audio instantly</li>
                    </ol>
                    <p>The process is fast, simple, and preserves the original audio quality of the selected segment.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Create custom ringtones or alerts</li>
                        <li>Trim podcasts, lectures, or interviews to highlight key parts</li>
                        <li>Extract audio from videos for reuse</li>
                        <li>Shorten music tracks for social media or presentations</li>
                        <li>Remove silence or unwanted segments from recordings</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about audio quality',
                content: `
                    <p>Trimming preserves the quality of the selected audio segment. No additional compression or quality loss occurs unless you choose to re-encode the output.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I trim audio files of any length?',
                answer: 'Yes. You can trim files of any duration, though very large files may take slightly longer to process.'
            },
            {
                question: 'Are my audio files uploaded to a server?',
                answer: 'No. All trimming happens 100% locally in your browser. Your files remain private.'
            },
            {
                question: 'Can I trim multiple segments at once?',
                answer: 'Some tools support multiple selections or batch trimming, depending on the interface.'
            },
            {
                question: 'Does trimming affect audio quality?',
                answer: 'No. The selected segment maintains the original audio quality unless re-encoded.'
            }
        ]
    },

    'audio-normalizer': {
        sections: [
            {
                id: 'what-is-audio-normalizer',
                title: 'What is an Audio Normalizer?',
                content: `
                    <p>An Audio Normalizer is a tool that adjusts the volume of an audio file to a consistent level. It works with formats like MP3, WAV, and others, ensuring that all parts of the audio are neither too quiet nor too loud.</p>
                    
                    <p>Normalization is useful for podcasts, music playlists, video editing, or any audio content that requires consistent volume.</p>
                `
            },
            {
                id: 'why-normalize-audio',
                title: 'Why normalize audio?',
                content: `
                    <p>Audio normalization is useful when:</p>
                    <ul>
                        <li>You want consistent volume across multiple audio files</li>
                        <li>Prevent sudden loud or quiet parts in music or podcasts</li>
                        <li>Prepare audio for streaming, broadcasting, or presentations</li>
                        <li>Enhance listening experience across devices</li>
                        <li>Maintain professional audio standards for podcasts or videos</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does audio normalization work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your audio file (MP3, WAV, etc.)</li>
                        <li>The tool analyzes the audio levels throughout the file</li>
                        <li>It adjusts the volume to reach a consistent target level</li>
                        <li>Download the normalized audio instantly</li>
                    </ol>
                    <p>The process is fast and preserves the original audio quality while ensuring balanced volume.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Normalize podcasts, lectures, or interviews for smooth listening</li>
                        <li>Prepare music playlists with uniform volume</li>
                        <li>Adjust audio for video content or presentations</li>
                        <li>Ensure professional audio quality for broadcasting or streaming</li>
                        <li>Prevent listener fatigue caused by inconsistent volume levels</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about audio quality',
                content: `
                    <p>Normalization preserves the original audio content. No audio data is removed, and quality remains intact, although the dynamic range may be slightly adjusted to achieve consistent volume.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can normalization increase the volume of quiet files?',
                answer: 'Yes. The tool can boost quieter segments to match the target level.'
            },
            {
                question: 'Does normalization reduce audio quality?',
                answer: 'No. The process adjusts volume without removing or compressing audio data.'
            },
            {
                question: 'Are my files uploaded to a server?',
                answer: 'No. All normalization happens 100% locally in your browser. Your files remain private.'
            },
            {
                question: 'Can I normalize multiple files at once?',
                answer: 'Some tools support batch normalization, allowing you to process multiple audio files simultaneously.'
            }
        ]
    },

    /*--------------

        Audio

    --------------*/

    'mov-to-mp4': {
        sections: [
            {
                id: 'what-is-mov',
                title: 'What is a MOV file?',
                content: `
                    <p>MOV is a multimedia container format developed by Apple for QuickTime. It can contain video, audio, and text tracks, making it ideal for high-quality video editing and playback.</p>
                    
                    <p>The downside of MOV is that it is not as widely compatible with non-Apple devices and software without additional codecs or conversion.</p>
                `
            },
            {
                id: 'what-is-mp4',
                title: 'What is an MP4 file?',
                content: `
                    <p>MP4 (MPEG-4 Part 14) is a widely supported video container format that can store video, audio, subtitles, and images. MP4 offers good compression while maintaining quality and is compatible with virtually all devices, platforms, and browsers.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert MOV to MP4?',
                content: `
                    <p>Converting MOV to MP4 is useful when:</p>
                    <ul>
                        <li>You need maximum compatibility across devices and platforms</li>
                        <li>You want smaller file sizes while maintaining quality</li>
                        <li>You plan to upload videos to websites, social media, or streaming platforms</li>
                        <li>Editing software or players do not fully support MOV</li>
                        <li>You want a widely playable video format for sharing</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does MOV to MP4 conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your MOV video</li>
                        <li>The video is decoded and re-encoded (or remuxed) into MP4 format</li>
                        <li>Compression may be applied to optimize file size</li>
                        <li>Download the converted MP4 instantly</li>
                    </ol>
                    <p>The process is fast and preserves the original video and audio quality as much as possible.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Make Apple MOV videos compatible with Windows or Android devices</li>
                        <li>Prepare videos for social media, YouTube, or websites</li>
                        <li>Reduce file size for storage or sharing</li>
                        <li>Ensure seamless playback across all devices and players</li>
                        <li>Edit videos in software that prefers MP4 format</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about video quality',
                content: `
                    <p>Converting MOV to MP4 preserves most of the original quality. However, if re-encoding occurs, minor quality loss may happen depending on compression settings.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does converting MOV to MP4 reduce video quality?',
                answer: 'If remuxing is used, quality is preserved. If re-encoding with compression is applied, minor quality loss may occur.'
            },
            {
                question: 'Are my video files uploaded to a server?',
                answer: 'No. All conversions happen 100% locally in your browser. Your files remain private and secure.'
            },
            {
                question: 'Why choose MP4 over MOV?',
                answer: 'MP4 is more widely compatible across devices, platforms, and media players, and often has smaller file sizes.'
            },
            {
                question: 'Can I convert large MOV files?',
                answer: 'Yes. Large files can be converted, though processing time may increase depending on size and system resources.'
            }
        ]
    },

    'mp4-to-webm': {
        sections: [
            {
                id: 'what-is-mp4',
                title: 'What is an MP4 file?',
                content: `
                    <p>MP4 (MPEG-4 Part 14) is a popular video container format that can store video, audio, subtitles, and images. It offers good compression while maintaining quality and is compatible with almost all devices and platforms.</p>
                `
            },
            {
                id: 'what-is-webm',
                title: 'What is a WEBM file?',
                content: `
                    <p>WEBM is a modern, open-source video format developed by Google, designed for efficient video streaming on the web. It supports high-quality video and audio compression and is ideal for HTML5 web playback.</p>
                    
                    <p>WEBM is widely supported in modern browsers but may not be compatible with older devices or some desktop applications.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert MP4 to WEBM?',
                content: `
                    <p>Converting MP4 to WEBM is useful when:</p>
                    <ul>
                        <li>You want to optimize videos for web streaming</li>
                        <li>Reduce file size while maintaining quality</li>
                        <li>Ensure compatibility with HTML5 players</li>
                        <li>Use an open-source, royalty-free format</li>
                        <li>Embed videos directly into websites without plugins</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does MP4 to WEBM conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your MP4 video</li>
                        <li>The video is decoded and re-encoded into WEBM format</li>
                        <li>Compression is applied to balance quality and file size</li>
                        <li>Download the converted WEBM file instantly</li>
                    </ol>
                    <p>The conversion process is fast and optimized for web playback.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Embed videos on websites for HTML5 playback</li>
                        <li>Reduce video size for faster streaming</li>
                        <li>Convert MP4 videos to a royalty-free web format</li>
                        <li>Ensure smooth playback in modern browsers</li>
                        <li>Optimize video files for online platforms</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about video quality',
                content: `
                    <p>Converting MP4 to WEBM may involve re-encoding. Minor quality loss can occur depending on compression settings, but it is generally minimal for web-optimized videos.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does converting MP4 to WEBM reduce video quality?',
                answer: 'Minor quality loss may occur due to re-encoding, but WEBM is optimized for web playback and generally maintains good quality.'
            },
            {
                question: 'Are my video files uploaded to a server?',
                answer: 'No. All conversions happen 100% locally in your browser. Your files remain private.'
            },
            {
                question: 'Why use WEBM instead of MP4 for websites?',
                answer: 'WEBM is an open-source format optimized for HTML5 web playback, often with smaller file sizes and faster streaming.'
            },
            {
                question: 'Can WEBM files play on all devices?',
                answer: 'WEBM is supported in most modern browsers, but older devices or software may require additional codecs or players.'
            }
        ]
    },

    'gif-to-mp4': {
        sections: [
            {
                id: 'what-is-gif',
                title: 'What is a GIF file?',
                content: `
                    <p>GIF (Graphics Interchange Format) is a popular image format for short animations or looping images. GIFs support simple animations but have limited color depth (256 colors) and no audio support.</p>
                    
                    <p>GIFs are widely used on social media, messaging apps, and websites for memes, reactions, and short clips.</p>
                `
            },
            {
                id: 'what-is-mp4',
                title: 'What is an MP4 file?',
                content: `
                    <p>MP4 (MPEG-4 Part 14) is a widely supported video format that can store video, audio, subtitles, and images. MP4 files provide high-quality video with efficient compression and are compatible with virtually all devices and platforms.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert GIF to MP4?',
                content: `
                    <p>Converting GIF to MP4 is useful when:</p>
                    <ul>
                        <li>You want smaller file sizes compared to GIF</li>
                        <li>Include audio along with the animation</li>
                        <li>Improve playback performance on websites and social media</li>
                        <li>Ensure compatibility with video players and editing software</li>
                        <li>Optimize for streaming and sharing online</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does GIF to MP4 conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your GIF file</li>
                        <li>The animation is decoded and encoded into MP4 format</li>
                        <li>Compression is applied to reduce file size while maintaining quality</li>
                        <li>Download the MP4 file instantly</li>
                    </ol>
                    <p>The process preserves the animation and can include audio if added.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Convert memes or reactions from GIF to MP4 for social media</li>
                        <li>Reduce file size for faster web sharing</li>
                        <li>Include audio or captions for short animations</li>
                        <li>Edit GIF animations in video editing software</li>
                        <li>Optimize animations for presentations or streaming</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about video quality',
                content: `
                    <p>Converting GIF to MP4 reduces file size and preserves animation quality. The output may appear smoother and more efficient for playback, but frame rate changes may slightly alter motion appearance.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does converting GIF to MP4 reduce quality?',
                answer: 'Animation quality is generally preserved, but slight changes in frame rate or compression may occur depending on settings.'
            },
            {
                question: 'Can I add audio to the MP4 after conversion?',
                answer: 'Yes. GIFs do not have audio, but MP4 allows you to add sound during or after conversion.'
            },
            {
                question: 'Are my GIF files uploaded to a server?',
                answer: 'No. All conversions happen 100% locally in your browser. Your files remain private.'
            },
            {
                question: 'Why convert GIF to MP4 instead of using GIF?',
                answer: 'MP4 files are smaller, support audio, and provide smoother playback and better compatibility across devices and platforms.'
            }
        ]
    },

    'mp4-to-gif': {
        sections: [
            {
                id: 'what-is-mp4',
                title: 'What is an MP4 file?',
                content: `
                    <p>MP4 (MPEG-4 Part 14) is a widely supported video format that can store video, audio, subtitles, and images. MP4 offers efficient compression while maintaining high-quality video playback across devices and platforms.</p>
                `
            },
            {
                id: 'what-is-gif',
                title: 'What is a GIF file?',
                content: `
                    <p>GIF (Graphics Interchange Format) is an image format used for short animations or looping clips. GIFs have limited color depth (256 colors), do not support audio, and are widely used for memes, reactions, and short animations on social media.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert MP4 to GIF?',
                content: `
                    <p>Converting MP4 to GIF is useful when:</p>
                    <ul>
                        <li>You want to create short, looping animations from videos</li>
                        <li>The clip will be shared on social media or messaging platforms</li>
                        <li>Audio is not required and only visual content matters</li>
                        <li>You want a lightweight, playable animation for web or presentations</li>
                        <li>Extracting highlights, reactions, or memes from video clips</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does MP4 to GIF conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your MP4 video</li>
                        <li>Select the portion of the video to convert</li>
                        <li>The video frames are extracted and encoded into a GIF</li>
                        <li>Download the GIF instantly</li>
                    </ol>
                    <p>The process preserves the visual content, but audio is removed since GIF does not support sound.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Create memes, reactions, or short looping animations</li>
                        <li>Extract key moments from videos for social media sharing</li>
                        <li>Include animated visual content in presentations or blogs</li>
                        <li>Convert video highlights into shareable GIFs</li>
                        <li>Optimize short clips for lightweight web usage</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about GIF quality',
                content: `
                    <p>GIFs have limited color depth and no audio. Converting from MP4 may reduce colors or frame rate slightly, but the visual loop is preserved for easy sharing.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Does converting MP4 to GIF reduce video quality?',
                answer: 'GIFs are limited to 256 colors and no audio, so some visual quality may be reduced compared to the original video.'
            },
            {
                question: 'Can I select a portion of the video to convert?',
                answer: 'Yes. Most tools allow you to trim the MP4 and convert only the desired segment to GIF.'
            },
            {
                question: 'Are my MP4 files uploaded to a server?',
                answer: 'No. All conversions happen 100% locally in your browser. Your files remain private.'
            },
            {
                question: 'Why use GIF instead of MP4?',
                answer: 'GIFs are ideal for short, looping animations without audio, and are widely supported on social media and messaging platforms.'
            }
        ]
    },

    'video-trimmer': {
        sections: [
            {
                id: 'what-is-video-trimmer',
                title: 'What is a Video Trimmer?',
                content: `
                    <p>A Video Trimmer is a tool that allows you to cut or trim a portion of a video file without affecting the rest of the content. It works with formats like MP4, MOV, WEBM, and others, enabling precise editing of start and end times.</p>
                    
                    <p>Trimming is useful for removing unwanted sections, shortening clips, or creating highlights from longer videos.</p>
                `
            },
            {
                id: 'why-trim-videos',
                title: 'Why trim videos?',
                content: `
                    <p>Video trimming is helpful when:</p>
                    <ul>
                        <li>You want to remove unwanted parts at the beginning or end of a video</li>
                        <li>Create shorter clips for social media or messaging</li>
                        <li>Extract highlights from longer recordings</li>
                        <li>Reduce file size for easier sharing</li>
                        <li>Prepare videos for presentations or professional editing</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does video trimming work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your video file</li>
                        <li>Select the start and end points of the portion you want to keep</li>
                        <li>The tool extracts the selected segment without altering the original content</li>
                        <li>Download the trimmed video instantly</li>
                    </ol>
                    <p>The process is fast, preserves the original quality, and only saves the selected portion.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Create short clips from long videos for social media</li>
                        <li>Remove unwanted intros, outros, or commercials</li>
                        <li>Extract highlights from lectures, interviews, or events</li>
                        <li>Reduce file size for easier upload and sharing</li>
                        <li>Prepare clips for presentations, portfolios, or projects</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about video quality',
                content: `
                    <p>Video trimming preserves the original quality of the selected segment. No additional compression is applied unless specifically chosen, ensuring the output remains true to the original.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Can I trim any video format?',
                answer: 'Most tools support popular formats like MP4, MOV, WEBM, and more. Check your tool for specific format support.'
            },
            {
                question: 'Does trimming reduce video quality?',
                answer: 'No. The selected segment maintains the original video quality. Compression is optional.'
            },
            {
                question: 'Are my video files uploaded to a server?',
                answer: 'No. All trimming happens 100% locally in your browser. Your files remain private.'
            },
            {
                question: 'Can I select multiple segments to trim at once?',
                answer: 'Some advanced tools allow multi-segment trimming, but basic trimmers typically process one segment at a time.'
            }
        ]
    },

    'video-to-audio': {
        sections: [
            {
                id: 'what-is-video-to-audio',
                title: 'What is a Video to Audio Converter?',
                content: `
                    <p>A Video to Audio Converter extracts the audio track from a video file and saves it as an audio format like MP3, WAV, or AAC. It works with popular video formats such as MP4, MOV, WEBM, and more.</p>
                    
                    <p>This tool is useful when you want just the sound from a video, for music, podcasts, lectures, or voice recordings.</p>
                `
            },
            {
                id: 'why-convert',
                title: 'Why convert video to audio?',
                content: `
                    <p>Converting video to audio is helpful when:</p>
                    <ul>
                        <li>You want to listen to lectures, podcasts, or interviews offline</li>
                        <li>Extract music or soundtracks from videos</li>
                        <li>Reduce file size by removing the video track</li>
                        <li>Create audio-only content for playlists or media players</li>
                        <li>Transcribe or edit audio from video recordings</li>
                    </ul>
                `
            },
            {
                id: 'how-it-works',
                title: 'How does video to audio conversion work?',
                content: `
                    <ol class="steps-list">
                        <li>Upload your video file</li>
                        <li>The tool extracts the audio track from the video</li>
                        <li>Choose your desired audio format (MP3, WAV, etc.)</li>
                        <li>Download the extracted audio instantly</li>
                    </ol>
                    <p>The process preserves the original audio quality as much as possible.</p>
                `
            },
            {
                id: 'use-cases',
                title: 'Typical use cases',
                content: `
                    <ul>
                        <li>Extract music tracks or sound effects from videos</li>
                        <li>Listen to lectures, webinars, or interviews on the go</li>
                        <li>Create podcasts or audio-only versions of video content</li>
                        <li>Convert videos to audio for transcription or analysis</li>
                        <li>Reduce storage by keeping only audio from large video files</li>
                    </ul>
                `
            },
            {
                id: 'quality-note',
                title: 'Important note about audio quality',
                content: `
                    <p>The extracted audio quality depends on the original video's audio track. High-bitrate videos will result in higher quality audio. Some conversion formats may slightly affect quality depending on compression settings.</p>
                `
            }
        ],
        
        faq: [
            {
                question: 'Which audio formats can I choose?',
                answer: 'Most tools support MP3, WAV, AAC, and other popular audio formats.'
            },
            {
                question: 'Does converting reduce audio quality?',
                answer: 'The audio quality is preserved as much as possible. Minor differences may occur depending on the chosen format and compression.'
            },
            {
                question: 'Are my video files uploaded to a server?',
                answer: 'No. All conversions happen 100% locally in your browser. Your files remain private.'
            },
            {
                question: 'Can I convert large video files?',
                answer: 'Yes. Large video files can be converted, though processing time may increase depending on file size and system resources.'
            }
        ]
    }
}

/**
 * Get content for a specific converter
 */
export function getConverterContent(slug) {
    return CONVERTER_CONTENT[slug] || null;
}

/**
 * Check if converter has content
 */
export function hasContent(slug) {
    return slug in CONVERTER_CONTENT;
}