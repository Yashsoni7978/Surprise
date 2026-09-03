const fs = require('fs');
const file = 'content/data/chapters.json';
const data = JSON.parse(fs.readFileSync(file));
const map = {
  'prologue-4': "/Photos-1-001 (1)/riya's most beautful picture.jpeg",
  'before-us-11': "/Photos-1-001 (1)/riyu childhood pic i school.jpeg",
  'before-us-12': "/Photos-1-001 (1)/riyu small kid.jpeg",
  'before-us-13': "/Photos-1-001 (1)/riya before meeting me on dandiya.jpeg",
  'after-that-43': "/Photos-1-001 (1)/first proper date.jpg",
  'after-that-44': "/Photos-1-001 (1)/first time starbucks.jpeg",
  'after-that-45': "/Photos-1-001 (1)/nahargarh biological park.jpg",
  'after-that-46': "/Photos-1-001 (1)/us in night.jpeg",
  'after-that-49': "/Photos-1-001 (1)/us latenight in nahargarh.jpeg",
  'after-that-50': "/Photos-1-001 (1)/ys on movie date.jpeg",
  'hum-ho-gaye-54': "/Photos-1-001 (1)/riyu being cute.jpeg",
  'hum-ho-gaye-57': "/Photos-1-001 (1)/riya always resting on my lap.jpg",
  'hum-ho-gaye-58': "/Photos-1-001 (1)/us on harsh birthday.jpeg",
  'hum-ho-gaye-62': "/Photos-1-001 (1)/riya and me on citypark.jpg",
  'more-than-girlfriend-65': "/Photos-1-001 (1)/riyu adoring flowers given by me.jpeg",
  'more-than-girlfriend-67': "/Photos-1-001 (1)/us on videocall.jpeg",
  'more-than-girlfriend-70': "/Photos-1-001 (1)/cutest pic of us.jpeg",
  'more-than-girlfriend-71': "/Photos-1-001 (1)/riyu on my lap.jpeg",
  'pagal-85': "/Photos-1-001 (1)/hilariuous pic of riya.jpeg",
  'alag-college-93': "/Photos-1-001 (1)/during 2-22 college days.jpg",
  'alag-college-94': "/Photos-1-001 (1)/riya in her college.jpeg",
  'alag-college-95': "/Photos-1-001 (1)/riya and me visitinf trhe manipal college.jpg",
  'alag-college-96': "/Photos-1-001 (1)/riyu in 2021.jpeg",
  'alag-college-98': "/Photos-1-001 (1)/last exam in bva.jpeg",
  'alag-college-99': "/Photos-1-001 (1)/riya in college farewell.jpeg",
  'jecrc-103': "/Photos-1-001 (1)/first time in jecrc.jpeg",
  'jecrc-104': "/Photos-1-001 (1)/riyu and me after bike drive.jpeg"
};

data.forEach(ch => {
  ch.memories.forEach(mem => {
    if (map[mem.id]) {
      if (mem.media && mem.media.length > 0) {
        mem.media[0].src = map[mem.id];
      }
    }
  });
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Update complete');
