import fs from 'fs';
import { PNG } from 'pngjs';

fs.createReadStream('public/assets/college-logo.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function () {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        // Make outer white background transparent (white corners outside the emblem)
        if (r > 240 && g > 240 && b > 240) {
          this.data[idx + 3] = 0;
        }
      }
    }

    this.pack().pipe(fs.createWriteStream('public/assets/college-logo.png')).on('finish', () => {
      console.log('College logo background made transparent successfully!');
    });
  });
