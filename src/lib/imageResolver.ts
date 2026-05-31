import img1 from '../assets/images/bellini_imagen_1_1.jpeg';
import img2 from '../assets/images/bellini_imagen_2_1.jpeg';
import img3 from '../assets/images/bellini_imagen_3.jpeg';
import img4 from '../assets/images/bellini_imagen_4.jpeg';
import img5 from '../assets/images/bellini_imagen_5.jpeg';
import img6 from '../assets/images/bellini_imagen_6.jpeg';
import img7 from '../assets/images/bellini_imagen_7.jpeg';
import img8 from '../assets/images/bellini_imagen_8.jpeg';
import img9 from '../assets/images/bellini_imagen_9.jpeg';
import img10 from '../assets/images/bellini_imagen_10_1.jpeg';
import img11 from '../assets/images/bellini_imagen_11_1.jpeg';
import img12 from '../assets/images/bellini_imagen_12_1.jpeg';
import img13 from '../assets/images/bellini_imagen_13.jpeg';
import img14 from '../assets/images/bellini_imagen_14_1.jpeg';
import img15 from '../assets/images/bellini_imagen_15_1.jpeg';

const imageMap: Record<string, string> = {
  // Direct mappings to the clean, uploaded files
  'bellini_imagen_1_1.jpeg': img1,
  'bellini_imagen_2_1.jpeg': img2,
  'bellini_imagen_3.jpeg': img3,
  'bellini_imagen_4.jpeg': img4,
  'bellini_imagen_5.jpeg': img5,
  'bellini_imagen_6.jpeg': img6,
  'bellini_imagen_7.jpeg': img7,
  'bellini_imagen_8.jpeg': img8,
  'bellini_imagen_9.jpeg': img9,
  'bellini_imagen_10_1.jpeg': img10,
  'bellini_imagen_11_1.jpeg': img11,
  'bellini_imagen_12_1.jpeg': img12,
  'bellini_imagen_13.jpeg': img13,
  'bellini_imagen_14_1.jpeg': img14,
  'bellini_imagen_15_1.jpeg': img15,

  // Direct bracket mapping fallbacks for older DB records still containing spaces/parentheses
  'bellini_imagen (1)-1.jpeg': img1,
  'bellini_imagen (2)-1.jpeg': img2,
  'bellini_imagen (3).jpeg': img3,
  'bellini_imagen (4).jpeg': img4,
  'bellini_imagen (5).jpeg': img5,
  'bellini_imagen (6).jpeg': img6,
  'bellini_imagen (7).jpeg': img7,
  'bellini_imagen (8).jpeg': img8,
  'bellini_imagen (9).jpeg': img9,
  'bellini_imagen (10)-1.jpeg': img10,
  'bellini_imagen (11)-1.jpeg': img11,
  'bellini_imagen (12)-1.jpeg': img12,
  'bellini_imagen (13).jpeg': img13,
  'bellini_imagen (14)-1.jpeg': img14,
  'bellini_imagen (15)-1.jpeg': img15,

  // Fallbacks for the older files so the app remains resilient
  'bellini_teeth_before_1779371123423.png': img3,
  'bellini_teeth_after_1779371142222.png': img4,
  'bellini_foto01.jpg': img5,
  'bellini_foto02.jpg': img6,
  'bellini_foto03.jpg': img7,
  'bellini_imagen (1).jpeg': img1,
  'bellini_imagen (2).jpeg': img2,
  'bellini_imagen (10).jpeg': img10,
  'bellini_imagen (11).jpeg': img11,
  'bellini_imagen (12).jpeg': img12,
  'bellini_imagen (14).jpeg': img14,
  'bellini_imagen (15).jpeg': img15,

  // Absolute or longer path fallbacks
  '/src/assets/images/bellini_teeth_before_1779371123423.png': img3,
  '/src/assets/images/bellini_teeth_after_1779371142222.png': img4,
  '/src/assets/images/bellini_foto01.jpg': img5,
  '/src/assets/images/bellini_foto02.jpg': img6,
  '/src/assets/images/bellini_foto03.jpg': img7,
  '/src/assets/images/bellini_imagen (1).jpeg': img1,
  '/src/assets/images/bellini_imagen (2).jpeg': img2,
  '/src/assets/images/bellini_imagen (10).jpeg': img10,
  '/src/assets/images/bellini_imagen (11).jpeg': img11,
  '/src/assets/images/bellini_imagen (12).jpeg': img12,
  '/src/assets/images/bellini_imagen (14).jpeg': img14,
  '/src/assets/images/bellini_imagen (15).jpeg': img15,
};

export function resolveClinicalImagePath(pathStr: string | null | undefined): string {
  if (!pathStr) return '';
  
  // If it's a remote URL or data URI, process Google Drive conversions or return as is
  if (pathStr.startsWith('http://') || pathStr.startsWith('https://') || pathStr.startsWith('data:')) {
    // Process Google Drive URL structures to render them directly as native images
    if (pathStr.includes('drive.google.com') || pathStr.includes('docs.google.com') || pathStr.includes('googleusercontent.com')) {
      let fileId = '';
      
      // Match /file/d/[ID]/view or /file/d/[ID]/edit or similar
      const dMatch = pathStr.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (dMatch && dMatch[1]) {
        fileId = dMatch[1];
      } else {
        // Match id=[ID] in URL query parameters (e.g. open?id=xxx)
        const idMatch = pathStr.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (idMatch && idMatch[1]) {
          fileId = idMatch[1];
        } else {
          // Match /d/[ID] directly from other googleusercontent structures
          const directMatch = pathStr.match(/\/d\/([a-zA-Z0-9_-]+)/);
          if (directMatch && directMatch[1]) {
            fileId = directMatch[1];
          }
        }
      }
      
      if (fileId) {
        // Return highly reliable direct cdn-like embed URL from Google's content servers
        return `https://lh3.googleusercontent.com/d/${fileId}`;
      }
    }
    return pathStr;
  }
  
  // Normalize the input path (replace backslashes, double slashes, etc.)
  const normalized = pathStr.replace(/\\/g, '/');
  const filename = normalized.split('/').pop() || '';
  
  // 1. Check if we have a static ESM import map for it
  if (imageMap[filename]) {
    return imageMap[filename];
  }
  if (imageMap[normalized]) {
    return imageMap[normalized];
  }
  
  // 2. Default to serving it from our public copied folder (/assets/images/)
  if (filename) {
    return `/assets/images/${filename}`;
  }
  
  return normalized;
}
