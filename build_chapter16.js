const fs = require('fs');
const file = 'content/data/chapters.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const nayiJobsMemories = [
  {
    "id": "nayi-jobs-123",
    "layout": "fullscreen",
    "text": [
      "College wala phase officially khatam ho gaya tha.",
      "JECRC se placement mili\u2026",
      "Vadodara gaye\u2026",
      "15 din ki wo apni si life jee\u2026",
      "phir Jaipur wapas aa gaye.",
      "Aur ab samajh aa raha tha ki",
      "ab actual life start hai."
    ],
    "media": [{ "id": "nj123", "type": "image", "src": "/placeholder-nayi-jobs-123.jpg", "alt": "Ab college khatam tha" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Phir kya hua? \u2192" }
  },
  {
    "id": "nayi-jobs-124",
    "layout": "fullscreen",
    "text": [
      "Jaipur wapas aake dono ko apna next step figure out krna tha.",
      "Vadodara ka chapter khatam ho chuka tha.",
      "Ab career ko bhi seriously lena tha.",
      "Humari wo ek line toh thi hi\u2026",
      "'Riyu lets get serious in life lets do something unthinkable.'"
    ],
    "emphasis": "hero",
    "media": [{ "id": "nj124", "type": "image", "src": "/placeholder-nayi-jobs-124.jpg", "alt": "Ab job dhundhni thi" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Finally\u2026 \u2192" }
  },
  {
    "id": "nayi-jobs-125",
    "layout": "fullscreen",
    "text": [
      "July 2025 me mujhe new job mil gayi.",
      "Ek taraf excitement thi\u2026",
      "aur ek taraf ye feeling ki",
      "haan bhai, ab sach me working life start ho gayi \ud83d\ude02",
      "Naya kaam.",
      "Naya routine.",
      "Nayi responsibilities."
    ],
    "media": [{ "id": "nj125", "type": "image", "src": "/placeholder-nayi-jobs-125.jpg", "alt": "July 2025" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Aur meri Billu? \u2192" }
  },
  {
    "id": "nayi-jobs-126",
    "layout": "fullscreen",
    "text": [
      "Phir August me tujhe bhi job mil gayi.",
      "Aur mujhe accha laga.",
      "Kyuki ab dono apni-apni life me kuch build krne wale the.",
      "Timing thodi alag thi\u2026",
      "par dono ka phase ek hi tha."
    ],
    "media": [{ "id": "nj126", "type": "image", "src": "/placeholder-nayi-jobs-126.jpg", "alt": "August 2025" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Ab dekh hum kya krte the \u2192" }
  },
  {
    "id": "nayi-jobs-127",
    "layout": "fullscreen",
    "text": [
      "Job lag gayi thi\u2026",
      "par humari calls thodi kam nahi hui thi \ud83d\ude02",
      "Tu office me hoti thi,",
      "kabhi apni cabin me akeli baithi hoti thi\u2026",
      "aur hum call pe.",
      "Lunch me tu pehle 10 minute me khana kha leti thi\u2026",
      "aur baaki ke 20\u201330 minute?",
      "Wo mere the \ud83d\ude02",
      "Bas hum call pe lage rehte the."
    ],
    "emphasis": "hero",
    "media": [{ "id": "nj127", "type": "image", "src": "/placeholder-nayi-jobs-127.jpg", "alt": "Din me bhi hum" }],
    "animationPreset": "playful",
    "navigation": { "nextLabel": "Evening wali sun \u2192" }
  },
  {
    "id": "nayi-jobs-128",
    "layout": "fullscreen",
    "text": [
      "Evening break bhi kuch alag hi tha.",
      "20\u201330 minute ka break hota tha\u2026",
      "aur usme bhi hum call pe.",
      "Pata nahi hum itna kya baat krte the yaar \ud83d\ude02",
      "Par mujhe yaad hai\u2026",
      "tera call aata tha aur mera din thoda aur accha ho jaata tha."
    ],
    "media": [{ "id": "nj128", "type": "image", "src": "/placeholder-nayi-jobs-128.jpg", "alt": "Break bhi saath" }],
    "animationPreset": "playful",
    "navigation": { "nextLabel": "Aur ek routine tha\u2026 \u2192" }
  },
  {
    "id": "nayi-jobs-129",
    "layout": "fullscreen",
    "text": [
      "Subah tujhe office drop krna\u2026",
      "aur shaam ko tujhe pick krne jaana\u2026",
      "Bhai ye sab mere liye alag hi magic tha.",
      "Koi bada occasion nahi tha.",
      "Koi special date nahi thi.",
      "Bas tu office ja rahi thi\u2026",
      "main tujhe drop kr raha tha\u2026",
      "phir shaam ko tujhe lene aa raha tha.",
      "Aur mujhe ye sab bhaut pasand tha."
    ],
    "emphasis": "hero",
    "media": [{ "id": "nj129", "type": "image", "src": "/placeholder-nayi-jobs-129.jpg", "alt": "Drop karna, pick karna" }],
    "animationPreset": "playful",
    "navigation": { "nextLabel": "Phir dheere dheere sab badla\u2026 \u2192" }
  },
  {
    "id": "nayi-jobs-130",
    "layout": "fullscreen",
    "text": [
      "Time ke saath tere office me kuch colleagues aur friends bhi ban gaye.",
      "Aur obviously\u2026",
      "phir poora din sirf meri call pe thodi na rehna tha \ud83d\ude02",
      "Life normal thi.",
      "Tera apna circle tha.",
      "Mera apna kaam tha.",
      "Sab kuch thoda change hua\u2026",
      "par ek cheez nahi badli."
    ],
    "media": [{ "id": "nj130", "type": "image", "src": "/placeholder-nayi-jobs-130.jpg", "alt": "Tujhe apne log mil gaye" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Wo kya? \u2192" }
  },
  {
    "id": "nayi-jobs-131",
    "layout": "fullscreen",
    "text": [
      "Tu aaj bhi din me kabhi kuch minutes ke liye call kr leti hai.",
      "Chahe kitni bhi busy ho\u2026",
      "chahe kitna bhi kuch chal raha ho\u2026",
      "tera wo chota sa call mujhe aaj bhi accha lagta hai.",
      "Pehle 20\u201330 minute hote the\u2026",
      "ab kabhi kuch minutes hote hai.",
      "Par feeling?",
      "Same.",
      "Mje aaj bhi tera call aana utna hi pasand hai."
    ],
    "emphasis": "hero",
    "media": [{ "id": "nj131", "type": "image", "src": "/placeholder-nayi-jobs-131.jpg", "alt": "Aaj bhi tera call" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Bas isi ko toh hum kehte hai\u2026 \u2192" }
  },
  {
    "id": "nayi-jobs-132",
    "layout": "fullscreen",
    "text": [
      "Shayad magic isi ko kehte hai Riyu.",
      "Har cheez same rehna magic nahi hota.",
      "Life change hoti hai.",
      "Jobs change hoti hai.",
      "Routine change hota hai.",
      "Naye log aate hai.",
      "Nayi responsibilities aati hai.",
      "Par un sab ke beech bhi\u2026",
      "tu din me kuch minutes nikal ke mujhe call krti hai.",
      "Aur main aaj bhi tera call dekh ke khush ho jaata hu.",
      "Pehle office drop aur evening pickup tha.",
      "Phir lunch calls thi.",
      "Evening breaks the.",
      "Aaj kuch minutes hai.",
      "Par hum?",
      "Hum abhi bhi hum hi hai. \u2764\ufe0f"
    ],
    "emphasis": "hero",
    "media": [{ "id": "nj132", "type": "image", "src": "/placeholder-nayi-jobs-132.jpg", "alt": "Magic" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Ab aaj tak chalte hai \u2192" }
  }
];

const nayiJobs = {
  "id": "nayi-jobs",
  "order": 15,
  "title": "NAYI JOBS, NAYA PHASE",
  "theme": "dark",
  "navigation": {
    "nextLabel": "Start",
    "prevLabel": "Back"
  },
  "memories": nayiJobsMemories
};

// Insert nayi-jobs right after wapas-jaipur
const existingIndex = data.findIndex(c => c.id === 'nayi-jobs');
if (existingIndex !== -1) {
  data[existingIndex] = nayiJobs;
} else {
  const wjIndex = data.findIndex(c => c.id === 'wapas-jaipur');
  if (wjIndex !== -1) {
    data.splice(wjIndex + 1, 0, nayiJobs);
  } else {
    data.push(nayiJobs);
  }
}

// Ensure coming-soon is right after nayi-jobs
const comingSoonIndex = data.findIndex(c => c.id === 'coming-soon');
if (comingSoonIndex !== -1) {
  const comingSoonChapter = data.splice(comingSoonIndex, 1)[0];
  const njIdx = data.findIndex(c => c.id === 'nayi-jobs');
  data.splice(njIdx + 1, 0, comingSoonChapter);
}

// Adjust order properties sequentially from vadodara onwards
let currentOrder = data.find(c => c.id === 'vadodara').order;
const vIdx = data.findIndex(c => c.id === 'vadodara');
for (let i = vIdx + 1; i < data.length; i++) {
  currentOrder++;
  data[i].order = currentOrder;
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Chapter 16 inserted successfully.');
