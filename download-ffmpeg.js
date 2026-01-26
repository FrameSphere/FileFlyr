// FFmpeg Download Script
// Führe dieses Skript mit Node.js aus: node download-ffmpeg.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const files = [
    {
        url: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js',
        output: 'ffmpeg-core.js'
    },
    {
        url: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm',
        output: 'ffmpeg-core.wasm'
    },
    {
        url: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.worker.js',
        output: 'ffmpeg-core.worker.js'
    },
    {
        url: 'https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js',
        output: 'ffmpeg.js'
    },
    {
        url: 'https://unpkg.com/@ffmpeg/util@0.12.1/dist/esm/index.js',
        output: 'util.js'
    }
];

const libDir = path.join(__dirname, 'lib');

// Erstelle lib Verzeichnis falls nicht vorhanden
if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
    console.log('📁 Created lib/ directory');
}

console.log('🎬 Downloading FFmpeg files...\n');

let completed = 0;

function downloadFile(fileInfo) {
    return new Promise((resolve, reject) => {
        const outputPath = path.join(libDir, fileInfo.output);
        const file = fs.createWriteStream(outputPath);
        
        console.log(`📦 Downloading ${fileInfo.output}...`);
        
        https.get(fileInfo.url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Follow redirect
                https.get(response.headers.location, (redirectResponse) => {
                    redirectResponse.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`   ✓ ${fileInfo.output} downloaded`);
                        completed++;
                        resolve();
                    });
                }).on('error', reject);
            } else {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`   ✓ ${fileInfo.output} downloaded`);
                    completed++;
                    resolve();
                });
            }
        }).on('error', (err) => {
            fs.unlink(outputPath, () => {});
            reject(err);
        });
    });
}

async function downloadAll() {
    try {
        for (const file of files) {
            await downloadFile(file);
        }
        
        console.log('\n✅ All FFmpeg files downloaded successfully!');
        console.log(`\nInstalled files in lib/:`);
        files.forEach(f => console.log(`  - ${f.output}`));
        console.log('\nThe MOV to MP4 converter should now work! 🎉');
        
    } catch (error) {
        console.error('\n❌ Error downloading files:', error.message);
        process.exit(1);
    }
}

downloadAll();
