import * as sharp from "sharp";
import * as path from "path";

async function generateFavicons() {
  const sizes = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "favicon-48x48.png": 48,
    "apple-touch-icon.png": 180,
    "android-chrome-192x192.png": 192,
    "android-chrome-512x512.png": 512,
  };

  const sourceIcon = path.join(process.cwd(), "public", "icon.svg");

  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(sourceIcon)
      .resize(size, size)
      .toFile(path.join(process.cwd(), "public", filename));
  }

  // Generate ICO file (contains multiple sizes)
  await sharp(sourceIcon)
    .resize(32, 32)
    .toFile(path.join(process.cwd(), "public", "favicon.ico"));
}

generateFavicons().catch(console.error);