import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AmbientSilhouette = () => {
  const graphicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!graphicRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2; 
      const y = (e.clientY / window.innerHeight - 0.5) * 2; 

      gsap.to(graphicRef.current, {
        x: x * -15, y: y * -15, rotationY: x * 5, rotationX: y * -5,
        duration: 2.5, ease: "power3.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none perspective-[1500px]">
      {/* Absolute dead-center lock */}
      <div 
        ref={graphicRef}
        className="absolute top-1/2 left-1/2 w-full max-w-[1920px] aspect-[16/9] -translate-x-1/2 -translate-y-1/2 opacity-15 grayscale contrast-200 blur-[1px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img src="/silhouette.png" alt="Silhouette" draggable={false} className="w-full h-full object-contain pointer-events-none select-none" />
      </div>
    </div>
  );
};

export default AmbientSilhouette;