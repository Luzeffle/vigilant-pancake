import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface StarCursorProps {
  onHoldComplete: () => void;
}

const StarCursor = ({ onHoldComplete }: StarCursorProps) => {
  const cursorRef = useRef<HTMLImageElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

    // Create a timeline that handles the charge-up
    tl.current = gsap.timeline({ 
      paused: true, 
      onComplete: () => {
        // When the animation finishes 100%, trigger the glitch!
        onHoldComplete(); 
        // Auto-shrink the star after triggering
        tl.current?.reverse();
      }
    });

    tl.current.to(cursorRef.current, {
      scale: 1.5, opacity: 0.8, duration: 1.5, ease: "power2.inOut"
    });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
    };

    const handleMouseDown = () => tl.current?.play();
    const handleMouseUp = () => tl.current?.reverse(); // Cleanly reverses if spammed!

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onHoldComplete]);

  return (
    <img ref={cursorRef} src="/star.png" alt="Star" className="fixed top-0 left-0 w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] pointer-events-none z-[100]" />
  );
};

export default StarCursor;