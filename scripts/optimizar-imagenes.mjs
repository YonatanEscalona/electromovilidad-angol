import sharp from 'sharp';
import {readdirSync} from 'node:fs';
for(const name of readdirSync('src/assets/electromovilidad').filter(n=>n.endsWith('.png'))){
  const file='src/assets/electromovilidad/'+name;
  await sharp(file).webp({quality:95,alphaQuality:100,effort:6}).toFile(file.replace(/\.png$/,'.webp'));
}
console.log('Imágenes codificadas en WebP de alta calidad, sin cambiar resolución ni composición.');
