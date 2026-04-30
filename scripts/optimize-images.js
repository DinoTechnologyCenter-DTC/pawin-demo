import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_IMG_DIR = path.join(process.cwd(), 'public', 'img');
const QUALITY = 80;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp'];
  
  if (!supportedFormats.includes(ext)) {
    console.log(`Skipping unsupported format: ${filePath}`);
    return;
  }
  
  const originalStats = fs.statSync(filePath);
  const originalSizeMB = originalStats.size / (1024 * 1024);
  
  if (originalSizeMB < 0.5) {
    console.log(`Skipping small file (<0.5MB): ${filePath}`);
    return;
  }
  
  const outputPath = filePath; // overwrite original
  const tempOutput = filePath + '.tmp';
  
  try {
    let pipeline = sharp(filePath);
    
    // Get image metadata
    const metadata = await pipeline.metadata();
    
    // Resize if width > 1920 (max typical screen width)
    if (metadata.width && metadata.width > 1920) {
      pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
    }
    
    // Compress based on format
    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: QUALITY });
    }
    
    await pipeline.toFile(tempOutput);
    
    const newStats = fs.statSync(tempOutput);
    const newSizeMB = newStats.size / (1024 * 1024);
    const savings = ((originalSizeMB - newSizeMB) / originalSizeMB * 100).toFixed(1);
    
    console.log(`Optimized ${path.basename(filePath)}: ${originalSizeMB.toFixed(2)}MB → ${newSizeMB.toFixed(2)}MB (${savings}% reduction)`);
    
    // Replace original with optimized version
    fs.renameSync(tempOutput, outputPath);
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error.message);
    // Clean up temp file if exists
    if (fs.existsSync(tempOutput)) {
      fs.unlinkSync(tempOutput);
    }
  }
}

async function optimizeAllImages() {
  if (!fs.existsSync(PUBLIC_IMG_DIR)) {
    console.error('Public img directory not found:', PUBLIC_IMG_DIR);
    return;
  }
  
  const files = fs.readdirSync(PUBLIC_IMG_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  });
  
  console.log(`Found ${imageFiles.length} images to optimize...`);
  
  for (const file of imageFiles) {
    const filePath = path.join(PUBLIC_IMG_DIR, file);
    await optimizeImage(filePath);
  }
  
  console.log('Image optimization complete!');
}

optimizeAllImages().catch(console.error);