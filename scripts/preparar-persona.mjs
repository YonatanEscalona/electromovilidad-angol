import sharp from 'sharp';
import {copyFileSync, mkdirSync} from 'node:fs';
import path from 'node:path';

// Only copy and encode the images edited by Imagegen; keep every original.
const [technician, portrait] = process.argv.slice(2);
if (!technician || !portrait) throw new Error('Indicar las dos imágenes generadas.');
const originals = path.resolve('../output/imagenes-personalizadas');
mkdirSync(originals, {recursive:true});
for (const [source, name] of [[technician,'tecnico-personalizado'],[portrait,'profesional-personalizado']]) {
  copyFileSync(source,path.join(originals,name+'.png'));
  const target='src/assets/electromovilidad/'+name+'.webp';
  const metadata = await sharp(source).metadata();
  await sharp(source).webp({quality:95,alphaQuality:100,effort:6}).toFile(target);
  console.log(JSON.stringify({archivo:target,ancho:metadata.width,alto:metadata.height,transparencia:metadata.hasAlpha}));
}
