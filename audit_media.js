const fs = require('fs');
const path = require('path');

const chaptersPath = path.join(__dirname, 'content/data/chapters.json');
const archivePath = path.join(__dirname, 'content/data/archive.json');
const publicDir = path.join(__dirname, 'public');

const chapters = JSON.parse(fs.readFileSync(chaptersPath, 'utf8'));

let totalMemories = 0;
let totalMediaRefs = 0;
let realMediaFiles = 0;
let missingMediaRefs = [];
let placeholderMedia = 0;

function fileExists(src) {
  if (src.startsWith('http')) return true; // External URL
  if (src.startsWith('/')) {
    // Check in public dir
    const fullPath = path.join(publicDir, src);
    if (fs.existsSync(fullPath)) return true;
    
    // Sometimes paths are URL encoded
    const decodedPath = decodeURIComponent(fullPath);
    if (fs.existsSync(decodedPath)) return true;
    
    return false;
  }
  return false;
}

chapters.forEach(ch => {
  if (ch.memories) {
    totalMemories += ch.memories.length;
    ch.memories.forEach(m => {
      const allMedia = [];
      if (m.media) allMedia.push(...m.media);
      if (m.reveal && m.reveal.media) allMedia.push(...m.reveal.media);
      
      allMedia.forEach(media => {
        totalMediaRefs++;
        if (media.src.includes('placeholder')) {
          placeholderMedia++;
        } else {
          if (fileExists(media.src)) {
            realMediaFiles++;
          } else {
            missingMediaRefs.push({ id: m.id, src: media.src });
          }
        }
      });
    });
  }
});

console.log('--- AUDIT REPORT ---');
console.log('TOTAL MEMORIES:', totalMemories);
console.log('TOTAL MEDIA REFERENCES:', totalMediaRefs);
console.log('TOTAL REAL MEDIA FILES (FOUND):', realMediaFiles);
console.log('TOTAL PLACEHOLDER MEDIA (EXPLICIT placeholders):', placeholderMedia);
console.log('TOTAL MISSING MEDIA REFERENCES:', missingMediaRefs.length);

if (missingMediaRefs.length > 0) {
  console.log('Missing References Details:');
  missingMediaRefs.forEach(ref => console.log(`  - Memory: ${ref.id} | Src: ${ref.src}`));
}

// Find unused mapped photos from the prompt's provided list
const providedPhotos = [
  "riya's most beautful picture.jpeg",
  "riyu childhood pic i school.jpeg",
  "riyu small kid.jpeg",
  "riya before meeting me on dandiya.jpeg",
  "first proper date.jpg",
  "first time starbucks.jpeg",
  "nahargarh biological park.jpg",
  "us in night.jpeg",
  "us latenight in nahargarh.jpeg",
  "ys on movie date.jpeg",
  "riyu being cute.jpeg",
  "riya always resting on my lap.jpg",
  "us on harsh birthday.jpeg",
  "riya and me on citypark.jpg",
  "riyu adoring flowers given by me.jpeg",
  "us on videocall.jpeg",
  "cutest pic of us.jpeg",
  "riyu on my lap.jpeg",
  "hilariuous pic of riya.jpeg",
  "during 2-22 college days.jpg",
  "riya in her college.jpeg",
  "riya and me visitinf trhe manipal college.jpg",
  "riyu in 2021.jpeg",
  "last exam in bva.jpeg",
  "riya in college farewell.jpeg",
  "first time in jecrc.jpeg",
  "riyu and me after bike drive.jpeg",
  "last night in jaipur before we moved to vadodara.jpg",
  "3rd meal in vadodara.jpg",
  "me and riya cooking food for the first time.jpg",
  "nightout misal paav in vadodara.jpg",
  "she visited firt show of me dandiya.jpeg",
  "us returng from dandiyua night.jpeg",
  "me in bhajan.jpeg",
  "riyu in bhajan.jpeg",
  "us in khatu shyam ji.jpeg",
  "us in khatu.jpeg",
  "me riya and aryan on the way to final exams 2023.jpg",
  "me sleeping on her shoulder.jpeg",
  "riyu college farewell pic with m e2023.jpeg",
  "riyu in ethnic 2024.jpeg",
  "some dramatic pic 2026.jpeg",
  "us in cafe 2026.jpeg",
  "us doing anchoring together furst time.jpeg"
];

let unused = [];
const chaptersJson = fs.readFileSync(chaptersPath, 'utf8');

providedPhotos.forEach(p => {
  if (!chaptersJson.includes(encodeURIComponent(p)) && !chaptersJson.includes(p)) {
    unused.push(p);
  }
});

console.log('TOTAL UNUSED MAPPED PHOTOS:', unused.length);
if (unused.length > 0) {
  console.log('Unused Photos Details:');
  unused.forEach(p => console.log(`  - ${p}`));
}

