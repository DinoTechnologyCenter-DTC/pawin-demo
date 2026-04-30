import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_IMG_DIR = path.join(process.cwd(), 'public', 'img');
const QUALITY = 80;

async function convertToWebP(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const supportedFormats = ['.jpg', '.jpeg', '.png'];
  
  if (!supportedFormats.includes(ext)) {
    return;
  }
  
  const baseName = path.basename(filePath, ext);
  const webpPath = path.join(PUBLIC_IMG_DIR, `${baseName}.webp`);
  
  // Skip if WebP already exists
  if (fs.existsSync(webpPath)) {
    console.log(`WebP already exists: ${webpPath}`);
    return;
  }
  
  try {
    await sharp(filePath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);
    
    const originalStats = fs.statSync(filePath);
    const webpStats = fs.statSync(webpPath);
    const originalSizeMB = originalStats.size / (1024 * 1024);
    const webpSizeMB = webpStats.size / (1024 * 1024);
    const savings = ((originalSizeMB - webpSizeMB) / originalSizeMB * 100).toFixed(1);
    
    console.log(`Created ${path.basename(webpPath)}: ${originalSizeMB.toFixed(2)}MB → ${webpSizeMB.toFixed(2)}MB (${savings}% reduction)`);
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error.message);
  }
}

async function generateAllWebP() {
  if (!fs.existsSync(PUBLIC_IMG_DIR)) {
    console.error('Public img directory not found:', PUBLIC_IMG_DIR);
    return;
  }
  
  const files = fs.readdirSync(PUBLIC_IMG_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });
  
  console.log(`Found ${imageFiles.length} images to convert to WebP...`);
  
  for (const file of imageFiles) {
    const filePath = path.join(PUBLIC_IMG_DIR, file);
    await convertToWebP(filePath);
  }
  
  console.log('WebP generation complete!');
}

generateAllWebP().catch(console.error);