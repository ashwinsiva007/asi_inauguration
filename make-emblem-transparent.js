import fs from 'fs';
import { PNG } from 'pngjs';
import jpeg from 'jpeg-js';

// Read JPG file
const rawJpg = fs.readFileSync('public/assets/asi-student-chapter-emblem.jpg');
const decodedJpg = jpeg.decode(rawJpg, { useTArray: true });

const width = decodedJpg.width;
const height = decodedJpg.height;
const centerX = width / 2;
const centerY = height / 2;
const radius = Math.min(centerX, centerY) * 0.96;

const png = new PNG({ width, height });

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    png.data[idx] = decodedJpg.data[idx];
    png.data[idx + 1] = decodedJpg.data[idx + 1];
    png.data[idx + 2] = decodedJpg.data[idx + 2];

    // If pixel is outside the circular emblem boundary, make it transparent
    if (dist > radius) {
      png.data[idx + 3] = 0;
    } else {
      png.data[idx + 3] = 255;
    }
  }
}

png.pack().pipe(fs.createWriteStream('public/assets/asi-student-chapter-emblem.png')).on('finish', () => {
  console.log('Circular ASI Student Chapter emblem PNG generated successfully!');
});
