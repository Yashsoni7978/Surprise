const fs = require('fs');
const file = 'content/data/chapters.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const aajMemories = [
  {
    "id": "aaj-133",
    "layout": "fullscreen",
    "text": [
      "Aur phir pata hi nahi chala...",
      "kab hum itne saal aage aa gaye."
    ],
    "media": [{ "id": "a133", "type": "image", "src": "/placeholder-aaj-133.jpg", "alt": "Aaj" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Ruk... \u2192" }
  },
  {
    "id": "aaj-134",
    "layout": "fullscreen",
    "text": [
      "School me tujhe pehli baar dekha tha.",
      "Tab kaha pata tha ki ek din tu meri life ka itna bada part ban jayegi."
    ],
    "media": [{ "id": "a134", "type": "image", "src": "/placeholder-aaj-134.jpg", "alt": "School" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Ab soch... \u2192" }
  },
  {
    "id": "aaj-135",
    "layout": "fullscreen",
    "text": [
      "Kitne log aaye,",
      "kitne phases aaye,",
      "kitni cheezein change hui...",
      "par tu?",
      "Tu somehow har phase me mere saath thi."
    ],
    "media": [{ "id": "a135", "type": "image", "src": "/placeholder-aaj-135.jpg", "alt": "Har phase me" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Ek aur baat hai \u2192" }
  },
  {
    "id": "aaj-136",
    "layout": "fullscreen",
    "text": [
      "Hum perfect nahi hai.",
      "Humne bhaut ladai ki hai.",
      "Ek dusre ko irritate bhi bhaut kiya hai \ud83d\ude02",
      "Kabhi ego aaya, kabhi gussa, kabhi dono chup."
    ],
    "media": [{ "id": "a136", "type": "image", "src": "/Photos-1-001 (1)/us in cafe 2026.jpeg", "alt": "Not perfect" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Phir bhi... \u2192" }
  },
  {
    "id": "aaj-137",
    "layout": "fullscreen",
    "text": [
      "Par har baar end me humne ek dusre ko choose kiya.",
      "Aur shayad mere liye 'hum' ka matlab bas itna hi hai."
    ],
    "emphasis": "hero",
    "media": [{ "id": "a137", "type": "image", "src": "/placeholder-aaj-137.jpg", "alt": "Choose you" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Last one... \u2192" }
  },
  {
    "id": "aaj-138",
    "layout": "fullscreen",
    "text": [
      "10 years se tujhe jaanta hu.",
      "8 years se tujse pyaar karta hu.",
      "Aur aaj...",
      "main teri 25th birthday story likh raha hu.",
      "Thoda pagal hu shayad.",
      "Par ye sab tere liye hi hai, Riyu. \u2764\ufe0f"
    ],
    "emphasis": "hero",
    "media": [{ "id": "a138", "type": "image", "src": "/Photos-1-001 (1)/some dramatic pic 2026.jpeg", "alt": "10 years" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Ab asli reason bataun? \u2192" }
  }
];

const aajChapter = {
  "id": "aaj",
  "order": 16,
  "title": "AAJ",
  "theme": "dark",
  "navigation": {
    "nextLabel": "Start",
    "prevLabel": "Back"
  },
  "memories": aajMemories
};

const birthdayChapter = {
  "id": "birthday",
  "order": 17,
  "title": "BIRTHDAY",
  "theme": "dark",
  "navigation": {
    "nextLabel": "Start",
    "prevLabel": "Back"
  },
  "memories": [] // Dummy to ensure routing
};

// Insert aaj right after nayi-jobs
const njIndex = data.findIndex(c => c.id === 'nayi-jobs');
let insertIndex = njIndex !== -1 ? njIndex + 1 : data.length;

// See if aaj exists
const existingAaj = data.findIndex(c => c.id === 'aaj');
if (existingAaj !== -1) {
  data[existingAaj] = aajChapter;
} else {
  data.splice(insertIndex, 0, aajChapter);
}

// Add birthday dummy chapter if not exists right after aaj
const aajIndex = data.findIndex(c => c.id === 'aaj');
const existingBirthday = data.findIndex(c => c.id === 'birthday');
if (existingBirthday !== -1) {
  data.splice(existingBirthday, 1); // remove from old place
}
data.splice(aajIndex + 1, 0, birthdayChapter);

// Fix order values sequentially
let currentOrder = data.find(c => c.id === 'vadodara').order;
const vIdx = data.findIndex(c => c.id === 'vadodara');
for (let i = vIdx + 1; i < data.length; i++) {
  currentOrder++;
  data[i].order = currentOrder;
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Chapter 17 (AAJ) inserted successfully.');
