const fs = require('fs');
const path = require('path');
const cloudinary = require('./src/config/cloudinary');

// Put the folders you want to scan here
const FOLDERS_TO_SCAN = [
    path.join(__dirname, '../client/src/assets'),
    path.join(__dirname, 'uploads')
];

// Supported extensions
const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif', '.mp4'];

async function uploadFile(filePath) {
    try {
        console.log(`Uploading: ${filePath}`);
        const isVideo = filePath.toLowerCase().endsWith('.mp4');
        
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'ai-growth-exa-assets',
            resource_type: isVideo ? 'video' : 'image',
            use_filename: true, // Keep the original filename
            unique_filename: false
        });
        
        console.log(`✅ Success: ${result.secure_url}`);
    } catch (error) {
        console.error(`❌ Failed to upload ${filePath}:`, error.message);
    }
}

async function scanAndUpload(directory) {
    if (!fs.existsSync(directory)) return;

    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Recursively scan subdirectories
            await scanAndUpload(fullPath);
        } else {
            const ext = path.extname(fullPath).toLowerCase();
            if (SUPPORTED_EXTS.includes(ext)) {
                await uploadFile(fullPath);
            }
        }
    }
}

async function startBulkUpload() {
    console.log("Starting Bulk Upload to Cloudinary...");
    for (const folder of FOLDERS_TO_SCAN) {
        console.log(`\nScanning folder: ${folder}`);
        await scanAndUpload(folder);
    }
    console.log("\nBulk Upload Finished!");
}

startBulkUpload();
