const fs = require('fs');
const file = 'content/data/chapters.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const vadodaraMemories = [
  {
    "id": "vadodara-105",
    "layout": "fullscreen",
    "text": [
      "Vadodara jaane se ek raat pehle kaafi ajeeb sa feel tha.",
      "Pata nahi excitement zyada thi ya ye thought ki...",
      "ab kuch din ke liye hum dono ek hi jagah pe hain.",
      "Bas hum."
    ],
    "media": [{ "id": "v105", "type": "image", "src": "/Photos-1-001 (1)/last night in jaipur before we moved to vadodara.jpg", "alt": "Before we left" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Phir hum nikal gaye \u2192" }
  },
  {
    "id": "vadodara-106",
    "layout": "fullscreen",
    "text": [
      "Vadodara pahuchke koi movie jaisa scene nahi hua tha \ud83d\ude02",
      "Bas normal life start ho gayi.",
      "Khana.",
      "Kaam.",
      "Bahar jaana.",
      "Wapas aana.",
      "Aur pata nahi kyun...",
      "ye normal cheezein hi sabse zyada achhi lag rahi thi."
    ],
    "media": [{ "id": "v106", "type": "image", "src": "/Photos-1-001 (1)/3rd meal in vadodara.jpg", "alt": "First days" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Ek aur normal day \u2192" }
  },
  {
    "id": "vadodara-107",
    "layout": "fullscreen",
    "text": [
      "Phir humne pehli baar saath me khana banaya \ud83d\ude02",
      "Honestly mujhe nahi pata tha result kya niklega.",
      "Par yaad ye nahi hai ki khana kaisa bana tha...",
      "Yaad ye hai ki hum dono saath me bana rahe the."
    ],
    "media": [{ "id": "v107", "type": "image", "src": "/Photos-1-001 (1)/me and riya cooking food for the first time.jpg", "alt": "Cooking together" }],
    "animationPreset": "playful",
    "navigation": { "nextLabel": "Result chhod \ud83d\ude02 \u2192" }
  },
  {
    "id": "vadodara-108",
    "layout": "fullscreen",
    "text": [
      "Shayad mujhe Vadodara ki sabse achhi cheez ye lagi thi...",
      "ki humare paas koi bada plan nahi tha.",
      "Bas ek normal sa din hota tha...",
      "aur usme tu hoti thi.",
      "Bas kaafi tha."
    ],
    "media": [{ "id": "v108", "type": "image", "src": "/placeholder-vadodara-108.jpg", "alt": "The little life" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Phir shaam hoti thi \u2192" }
  },
  {
    "id": "vadodara-109",
    "layout": "fullscreen",
    "text": [
      "Raat ko bahar nikalna.",
      "Kuch kha lena.",
      "Idhar udhar ghoomna.",
      "Misal paav jaise random plans bhi memory ban jaate hain \ud83d\ude02",
      "Tab pata nahi tha...",
      "baad me inhi choti choti cheezon ko yaad karunga."
    ],
    "media": [{ "id": "v109", "type": "image", "src": "/Photos-1-001 (1)/nightout misal paav in vadodara.jpg", "alt": "Night out" }],
    "animationPreset": "playful",
    "navigation": { "nextLabel": "Par sab perfect nahi tha \u2192" }
  },
  {
    "id": "vadodara-110",
    "layout": "fullscreen",
    "text": [
      "Un 15 dinon me ek reality bhi saamne thi.",
      "Mera Ahmedabad transfer hone wala tha...",
      "aur tu Vadodara me rehne wali thi.",
      "Matlab ye setup permanent nahi tha.",
      "Hume pata tha."
    ],
    "media": [{ "id": "v110", "type": "image", "src": "/placeholder-vadodara-110.jpg", "alt": "Reality check" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Phir decision lena pada \u2192" }
  },
  {
    "id": "vadodara-111",
    "layout": "fullscreen",
    "text": [
      "Phir tune apni job chhod di.",
      "Aur hum wapas Jaipur aa gaye.",
      "Aaj sochta hu toh lagta hai...",
      "hum dono us waqt life figure out karne ki koshish hi toh kar rahe the.",
      "Perfect plan nahi tha.",
      "Bas saath rehna tha."
    ],
    "media": [{ "id": "v111", "type": "image", "src": "/placeholder-vadodara-111.jpg", "alt": "Coming back" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Par ek memory reh gayi \u2192" }
  },
  {
    "id": "vadodara-112",
    "layout": "fullscreen",
    "text": [
      "Ek raat...",
      "tu ne mujhe apni baahon me pakda hua tha.",
      "Mera head tere chest pe tha.",
      "Aur pata nahi kyun...",
      "us moment me mujhe laga tha ki agar life aisi hi simple ho na...",
      "toh mje aur kuch nahi chahiye.",
      "Bas tu.",
      "Bas main.",
      "Aur ye normal si life."
    ],
    "emphasis": "hero",
    "media": [{ "id": "v112", "type": "image", "src": "/placeholder-vadodara-112.jpg", "alt": "The memory to freeze" }],
    "animationPreset": "cinematic",
    "navigation": { "nextLabel": "Ye 15 din kab khatam ho gaye... \u2192" }
  }
];

const vadodaraIndex = data.findIndex(c => c.id === 'vadodara');
if (vadodaraIndex !== -1) {
  data[vadodaraIndex].title = "15 DIN VADODARA ME";
  data[vadodaraIndex].memories = vadodaraMemories;
}

// Extract coming-soon
const comingSoonChapter = data.find(c => c.id === 'coming-soon');
// Filter it out
const filteredData = data.filter(c => c.id !== 'coming-soon');
// Re-insert right after vadodara
const newVidx = filteredData.findIndex(c => c.id === 'vadodara');
filteredData.splice(newVidx + 1, 0, comingSoonChapter);

fs.writeFileSync(file, JSON.stringify(filteredData, null, 2));
console.log('Chapter 14 updated successfully.');
