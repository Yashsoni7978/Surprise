const fs = require('fs');

let code = fs.readFileSync('app/birthday/page.tsx', 'utf8');

const s1Start = code.indexOf('function Section1(');
const s2Start = code.indexOf('function Section2(');
const s3Start = code.indexOf('function Section3(');
const s4Start = code.indexOf('function Section4(');
const s5Start = code.indexOf('function Section5(');
const s6Start = code.indexOf('function Section6(');
const vQStart = code.indexOf('function VerificationQuestion(');

const newS1 = `function Section1({ onNext }: { onNext: () => void }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div {...fadeProps} className="w-full max-w-2xl p-6 text-center flex flex-col items-center space-y-12">
      <div className="space-y-6">
        <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wide opacity-90">
          Happy 25th Birthday, Riyu ❤️
        </h1>
        <p className="font-sans text-lg opacity-60 italic">
          25 saal ki ho gyi madam 😂
        </p>
        <div className="font-sans text-lg leading-relaxed opacity-80 pt-6 space-y-4 max-w-lg mx-auto">
          <p>Ek baat toh me tujhe baar baar bol he rha hu 😂<br/>ye tera last birthday hai before becoming my engaged fiancée.</p>
          <p>Aur haan...<br/>ye tera 8th birthday hai jo me tere saath celebrate kar rha hu.</p>
          <p className="opacity-70 text-base">Normally 4 September ko tu apne family ke saath busy hoti hai aur hum waise celebrate nahi kar paate...<br/>isliye iss baar thoda alag socha hai.</p>
        </div>
      </div>
      
      <div className="w-[85%] max-w-sm aspect-[4/5] relative bg-white/5 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 p-4">
            <span className="font-serif italic text-sm tracking-widest uppercase opacity-50 mb-2">Awaiting Media</span>
            <span className="font-sans text-xs opacity-30">[Strong Riya Photo Placeholder]</span>
          </div>
        ) : (
          <img 
            src="/placeholder-birthday-reveal.jpg" 
            alt="Birthday Reveal" 
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      
      <NextButton onClick={onNext} text="Ek baat bolu? →" />
    </motion.div>
  );
}

`;

const newS2 = `function Section2({ onNext }: { onNext: () => void }) {
  return (
    <motion.div {...fadeProps} className="w-full max-w-2xl p-6 flex flex-col items-center space-y-10">
      <div className="font-serif text-2xl opacity-50 italic text-center w-full border-b border-white/10 pb-4">
        Birthday Letter
      </div>
      <div className="space-y-8 font-sans text-lg leading-relaxed opacity-80 text-center w-full">
        <p>
          Riyu,<br/><br/>
          Sach bolu toh mujhe samajh nahi aa raha kya likhu.<br/>
          Har saal kuch na kuch likhta hu aur har saal lagta hai ki is baar kuch alag likhunga...<br/>
          fir sochta hu tere baare mein likhne ke liye alag kya hi bacha hai 😂
        </p>

        <p className="font-serif text-2xl italic opacity-100 py-4">10 saal.</p>
        
        <p>
          10 saal mujhe ek number se zyada kuch lagta hi nahi.<br/>
          Ek illusion sa hai.<br/>
          Kaise nikal gaye mujhe genuinely nahi pata.<br/>
          Mujhe yaad bhi nahi ki humne itna time kab spend kar liya.
        </p>
        
        <p>
          Aaj mujhe tu sirf meri girlfriend nahi lagti.<br/>
          Tu wo insaan hai jiske upar me rely kar sakta hu.<br/>
          Apni galtiyon pe bhi.<br/>
          Apni problems pe bhi.<br/>
          Apne bure time pe bhi.
        </p>

        <p>
          Tu meri comfort zone hai.<br/>
          Tu mere liye ghar jaisi hai.<br/>
          Tu meri family hai.<br/>
          Tu meri friend hai.<br/>
          Tu meri sab kuch hai.
        </p>

        <p className="pt-6">
          Waise ek confession hai...<br/>
          3 din pehle Teej pe tujhe saari mein dekha na...<br/>
          fir se pyaar ho gaya tha mujhe tujse.<br/>
          Matlab 10 saal baad bhi ye ladki ye kaise kar leti hai mere saath 😂
        </p>

        <div className="font-serif italic text-xl opacity-90 space-y-6 py-8 border-y border-white/10 my-8">
          <p>
            Ke jab wo pehnti hai atrangi se libaas,<br/>
            mujhe usse mohabbat ho jaati hai...
          </p>
          <p>
            Ke jab wo pehnti hai atrangi se libaas,<br/>
            mujhe usse mohabbat ho jaati hai...
          </p>
          <p className="text-2xl text-[#d4af37]">
            Par jab wo lapetti hai saari apne badan pe,<br/>
            mujhe meri mohabbat se mohabbat ho jaati hai...
          </p>
        </div>

        <p className="font-serif italic text-lg opacity-80 space-y-4">
          Lagta hai ke ye samay ruk jaaye,<br/>
          lagta hai ke tu mere aur kareeb aa jaaye.<br/><br/>
          Lagta hai us ghadi ko patthar maar ke tod du,<br/>
          lagta hai tujhe teri kamar se pakad apni taraf mod du.<br/><br/>
          Lagta hai is duniya mein usse khoobsurat koi nahi,<br/>
          lagta hai is duniya mein bache koi samay ki seema nahi.
        </p>

        <p className="font-serif italic text-lg opacity-80 space-y-4 pt-4">
          Wo naagin jaise baal jab chehre pe aate hain,<br/>
          meri nas-nas ko chhoo jaate hain.<br/><br/>
          Wo uska sar pe chhota sa pallu lena,<br/>
          wo uska saari pehante hi thoda zyada itrake chalna.<br/><br/>
          Wo apne maathe pe ek chhoti si bindi lagana,<br/>
          wo mera usko nihaarna dekh uska blush kar jaana.
        </p>

        <p className="font-serif italic text-lg opacity-80 space-y-4 pt-4 pb-8">
          Har cheez mein bewakoofi karne wali wo,<br/>
          jab saari pehanti hai,<br/>
          lagta hai dekh ke poore parivaar ko sambhalne ki himmat rakhti hai.
        </p>

        <p className="font-serif text-xl md:text-2xl opacity-100 leading-relaxed text-[#fdfbf7]">
          Yu toh apne normal kapdo mein<br/>
          jo nasamajh si chhoti si lagti hai...<br/><br/>
          wahi meri Riya<br/>
          saari pehante hi<br/>
          meri biwi lagti hai.
        </p>
      </div>
      <NextButton onClick={onNext} text="Ye bhi sun. →" />
    </motion.div>
  );
}

`;

const newS3 = `function Section3({ onNext }: { onNext: () => void }) {
  return (
    <motion.div {...fadeProps} className="w-full max-w-2xl p-6 flex flex-col items-center space-y-10">
      <div className="font-serif text-2xl opacity-50 italic text-center w-full border-b border-white/10 pb-4">
        Things I Want For You
      </div>
      <div className="space-y-8 font-sans text-lg leading-relaxed opacity-80 text-center w-full">
        <div className="font-serif text-2xl md:text-3xl text-[#d4af37] opacity-90 pb-4">
          <p>Tere saare dreams mere dreams hain.</p>
          <p className="py-2">Tere saare sapne mere sapne hain.</p>
          <p>Aur meri life mein mere dreams se pehle tere dreams aate hain.</p>
        </div>

        <p>
          Me nahi chahta ki tu bas ek basic life jeeye,<br/>
          job karo, struggle karo aur bas.
        </p>

        <p className="font-serif text-xl italic opacity-100">
          I want more for you.
        </p>

        <p>
          We are already working on things.<br/>
          I want to see you achieve things that even today might feel too big.<br/>
          Sath milke wo sab banayenge jo socha hai.
        </p>
      </div>
      <NextButton onClick={onNext} text="Aur ek cheez... →" />
    </motion.div>
  );
}

`;

const newS4 = `function Section4({ onNext }: { onNext: () => void }) {
  return (
    <motion.div {...fadeProps} className="w-full max-w-2xl p-6 flex flex-col items-center space-y-10">
      <div className="font-serif text-2xl opacity-50 italic text-center w-full border-b border-white/10 pb-4">
        Family & Thank You
      </div>
      <div className="space-y-8 font-sans text-lg leading-relaxed opacity-80 text-center w-full">
        <p>
          Aur ek cheez...<br/>
          Tera family.<br/>
          Aaj me unhe tera family nahi, apna family maanta hu.
        </p>

        <p className="py-4 border-y border-white/10">
          <span className="font-serif text-xl block pb-2">Thank you Riyu.</span>
          Mere life mein hone ke liye.<br/>
          Mere saath rehne ke liye.<br/>
          Har baar mere side pe khade rehne ke liye.<br/>
          Mujhe samajhne ke liye.<br/>
          Meri stupidities jhelne ke liye.
        </p>

        <p>
          <span className="font-serif text-xl block pb-2">Sorry bhi...</span>
          Kyuki me perfect nahi hu.<br/>
          Kabhi mera temperament nahi hota,<br/>
          kabhi gussa aa jata hai,<br/>
          kabhi me shout kar deta hu,<br/>
          kabhi me waise react nahi karta jaise mujhe karna chahiye.
        </p>

        <p className="opacity-90 pt-4">
          Kamiyan hamesha hoti hain.<br/>
          But me apni har kami pe kaam karunga.<br/>
          Unhe dheere dheere apni khoobiyon mein badalne ki koshish karunga.<br/>
          Kyuki mujhe sirf successful nahi banna.<br/>
          Mujhe tere liye better bhi banna hai.<br/>
          Aur tujhe khush rakhna hai.
        </p>
      </div>
      <NextButton onClick={onNext} text="Bas kuch photos aur... →" />
    </motion.div>
  );
}

`;

const newS5 = `function Section5({ onNext }: { onNext: () => void }) {
  const photos = [
    { src: "/Photos-1-001 (1)/some dramatic pic 2026.jpeg", alt: "Dramatic 2026" },
    { src: "/Photos-1-001 (1)/us in cafe 2026.jpeg", alt: "Cafe 2026" },
    { src: "/Photos-1-001 (1)/riya's most beautful picture.jpeg", alt: "Beautiful" },
    { src: "/Photos-1-001 (1)/cutest pic of us.jpeg", alt: "Cutest" }
  ];

  return (
    <motion.div {...fadeProps} className="w-full flex flex-col items-center space-y-10 py-12">
      <div className="font-serif text-2xl opacity-50 italic text-center w-full max-w-2xl px-6">
        Bas kuch photos aur...
      </div>
      
      <div className="w-full flex gap-6 overflow-x-auto no-scrollbar snap-x px-6 md:px-[20%]">
        {photos.map((photo, idx) => (
          <div key={idx} className="relative overflow-hidden shrink-0 snap-center transition-all duration-700 w-[85%] md:w-[400px] aspect-[4/5] bg-white/5 rounded-xl shadow-2xl border border-white/10">
            <img 
              src={photo.src} 
              alt={photo.alt} 
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const target = e.target;
                target.style.display = 'none';
                target.parentElement.innerHTML = '<div class="absolute inset-0 flex flex-col items-center justify-center text-white/40 p-4"><span class="font-sans text-xs opacity-30">[Photo Placeholder]</span></div>';
              }}
            />
          </div>
        ))}
      </div>

      <div className="font-sans text-lg leading-relaxed opacity-80 text-center max-w-lg px-6 pt-6">
        <p>
          10 saal ho gaye Riyu...<br/>
          aur fir bhi kabhi kabhi tujhe dekh ke lagta hai,<br/>
          bhai ye ladki mujhe abhi bhi kaise itna pyaar karwa deti hai 😂
        </p>
      </div>

      <NextButton onClick={onNext} text="Ab ye feel se padhna. →" />
    </motion.div>
  );
}

`;

const newS6 = `function Section6() {
  return (
    <motion.div {...fadeProps} className="w-full max-w-2xl p-6 text-center flex flex-col items-center my-12">
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-12 font-serif opacity-90 w-full">
        
        <div className="space-y-4 text-2xl md:text-3xl font-light">
          <motion.p variants={staggerItem}>10 years of knowing you.</motion.p>
          <motion.p variants={staggerItem}>8 years of loving you.</motion.p>
          <motion.p variants={staggerItem}>25 years of you.</motion.p>
        </div>
        
        <motion.div variants={staggerItem} className="pt-8 pb-8 space-y-6 font-sans text-lg opacity-80 leading-relaxed border-t border-white/10">
          <p>
            Riya,<br/><br/>
            Tu pehle bhi meri mohabbat thi.<br/>
            Tu aaj bhi meri mohabbat hai.<br/>
            Aur meri zindagi ke jitne bhi saal bache hain na...<br/>
            un sab mein bhi tu hi rahegi.
          </p>
        </motion.div>

        <motion.div variants={staggerItem} className="py-8 space-y-6 font-sans text-lg opacity-80 leading-relaxed bg-white/5 rounded-xl border border-white/10 px-6">
          <p>
            Startup mein enter kare — no exit plan.<br/>
            Relationship mein enter kiya — no exit plan.<br/>
            Marriage mein enter karenge — no exit plan.
          </p>
          <p className="font-serif italic text-xl">
            Bas saath mein dekhte hain kitna bada bana sakte hain isko.
          </p>
        </motion.div>

        <motion.div variants={staggerItem} className="py-8 space-y-6 font-sans text-lg opacity-80 leading-relaxed">
          <p>
            I want us to be happy.<br/>
            I want us to work on our goals.<br/>
            I want us to make money.<br/>
            I want us to travel the world.<br/>
            I want us to build something that makes us look back one day and say:
          </p>
          <p className="font-serif text-2xl text-[#d4af37]">
            'Bhai, humne sach mein kar diya.'
          </p>
          <p className="pt-4">
            Hum dono ne milke apni life bana li.
          </p>
        </motion.div>

        <motion.div variants={staggerItem} className="py-12 space-y-8 font-serif text-xl md:text-2xl leading-relaxed text-[#fdfbf7] opacity-90">
          <p>
            Ek scene hai jo me imagine karta hu...
          </p>
          <p>
            Tu mere saamne hogi.<br/>
            Teri aankhein band hongi.<br/>
            Aur mera haath...<br/>
            teri maang mein sindoor bhar raha hoga.
          </p>
          <p className="italic opacity-80">
            Bas.<br/>
            Is moment ko imagine karta hu na,<br/>
            toh aage kuch soch he nahi pata.
          </p>
        </motion.div>
        
        <motion.div variants={staggerItem} className="space-y-6 pt-12 border-t border-white/10">
          <div className="font-serif text-2xl md:text-3xl opacity-90 space-y-3">
            <p>Riya, meri jaan,</p>
            <p>Happy Birthday.</p>
            <p className="text-xl md:text-2xl opacity-80">
              Happy Birthday meri baby.<br/>
              Happy Birthday meri girl.<br/>
              Happy Birthday meri future wife.
            </p>
          </div>
          
          <div className="font-serif text-3xl md:text-4xl tracking-wide pt-8 space-y-4 text-[#fdfbf7]">
            <p>I love you.</p>
            <p>I love you meri jaan.</p>
            <p className="pt-4 pb-8">Aur haan...<br/>I love you to the square of infinity. ❤️</p>
          </div>
          
          <p className="font-sans text-lg opacity-60 italic pt-8">— Riya's Yash</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

`;

const newCode = code.substring(0, s1Start) + newS1 + newS2 + newS3 + newS4 + newS5 + newS6 + code.substring(vQStart);

fs.writeFileSync('app/birthday/page.tsx', newCode);
console.log('Successfully replaced birthday sections.');
