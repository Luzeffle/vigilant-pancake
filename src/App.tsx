import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import StarCursor from './components/StarCursor';
import AmbientSilhouette from './components/AmbientSilhouette';

// THE CONTENT DATABASE
const manifestoContent = [
  { id: '001', header: 'SYSTEM_LOG', title: 'We build structures\nto house our chaos.' },
  { id: '002', header: 'DEBTS_OF_TIME', title: 'Every unwritten line\nis a ghost in the machine.' },
  { id: '003', header: 'STATE_SUNFLOWER', title: 'I am merely a sunflower,\nwaiting for a digital dawn.' }
];

function App() {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // THE GLITCH ENGINE
  const handleLongPress = () => {
    const nextIndex = (currentIndex + 1) % manifestoContent.length;
    const tl = gsap.timeline();

    tl.to(textContainerRef.current, {
      duration: 0.1, skewX: 20, scaleY: 0.5, opacity: 0.2, filter: "blur(4px)", yoyo: true, repeat: 3
    })
    .to(textContainerRef.current, {
      opacity: 0, duration: 0.2, filter: "blur(10px)",
      onComplete: () => setCurrentIndex(nextIndex)
    })
    .to(textContainerRef.current, {
      opacity: 1, skewX: 0, scaleY: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out"
    });
  };

  const currentContent = manifestoContent[currentIndex];

  return (
    <main ref={containerRef} className="cursor-none fixed inset-0 w-screen h-screen bg-[#0A0A0A] text-[#F5F5F5] font-['Montserrat'] overflow-hidden selection:bg-red-600 selection:text-white">
      
      <StarCursor onHoldComplete={handleLongPress} />
      
      {/* BACKGROUND LAYER: The silhouette operates independently here */}
      <AmbientSilhouette />
      
      {/* FOREGROUND HUD LAYER: Fills 100% of the screen with safe padding so text never overlaps */}
      <div className="absolute inset-0 w-full h-full p-6 md:p-12 flex flex-col justify-between z-10 pointer-events-none">
        
        {/* TOP ROW */}
        <div className="flex justify-between items-start uppercase tracking-widest w-full">
          <div className="flex flex-col gap-2">
            {/* Made text slightly smaller on mobile so it doesn't break boundaries */}
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold tracking-[-0.02em] leading-none">
              [YOUR STUDIO]
            </h1>
            <div className="text-[10px] md:text-xs lg:text-sm text-[#888888] font-medium mt-2 md:mt-4">
              <p>[DATE: CURRENT]</p>
              <p>[SUBJECT: MANIFESTO {currentContent.id}]</p>
            </div>
          </div>
          
          <h2 ref={textContainerRef} className="text-xl md:text-3xl lg:text-5xl font-bold tracking-tight text-right">
            {currentContent.header}
          </h2>
        </div>

        {/* CENTER MANIFESTO */}
        {/* Placed absolute in the center so it never fights with the top/bottom rows for space */}
        <div className="absolute inset-0 flex items-center justify-center mix-blend-difference pointer-events-none px-4">
          <div ref={textContainerRef} className="max-w-3xl text-center flex flex-col gap-4 md:gap-6">
            <p className="text-lg md:text-3xl lg:text-4xl font-bold uppercase tracking-widest leading-relaxed whitespace-pre-line">
              {currentContent.title}
            </p>
            <p className="text-xs md:text-sm text-[#AAAAAA] italic tracking-wide">
              (Hold star to decrypt next phase)
            </p>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex justify-between items-end border-t-[1px] border-[#333333] pt-4 md:pt-6 text-[8px] md:text-xs text-[#888888] uppercase tracking-widest w-full">
          <div className="flex gap-4 md:gap-12">
            <div className="flex flex-col gap-1"><span className="font-bold text-[#F5F5F5]">STATUS</span><span>ONLINE</span></div>
            <div className="flex flex-col gap-1"><span className="font-bold text-[#F5F5F5]">COORDINATES</span><span>X: -- Y: --</span></div>
          </div>
          <div className="text-right flex flex-col gap-1">
            <span>SYS.REQ.001948</span><span>AWAITING INPUT...</span>
          </div>
        </div>

      </div>
    </main>
  );
}

export default App;