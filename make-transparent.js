import fs from 'fs';
import { PNG } from 'pngjs';

// Version 1: Transparent bg, invert black text to white for dark header
fs.createReadStream('public/assets/asi-logo.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function () {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        // If pixel is near white (background)
        if (r > 210 && g > 210 && b > 210) {
          this.data[idx + 3] = 0; // Make fully transparent
        } else if (r < 60 && g < 60 && b < 60) {
          // If pixel is black text "Analytics"
          if (x > this.width * 0.28) {
            this.data[idx] = 255;
            this.data[idx + 1] = 255;
            this.data[idx + 2] = 255;
          }
        }
      }
    }

    this.pack().pipe(fs.createWriteStream('public/assets/asi-logo-header.png'));
  });

// Version 2: Pure transparent bg (keep original colors)
fs.createReadStream('public/assets/asi-logo.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function () {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        if (r > 210 && g > 210 && b > 210) {
          this.data[idx + 3] = 0;
        }
      }
    }

    this.pack().pipe(fs.createWriteStream('public/assets/asi-logo-transparent.png'));
  });
