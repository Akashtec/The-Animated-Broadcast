import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, [data-interactive="true"]');
        setIsHovering(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth trailing ring (CRT phosphor decay lag)
    let currentX = pos.x;
    let currentY = pos.y;
    const animateTrail = () => {
      currentX += (pos.x - currentX) * 0.28;
      currentY += (pos.y - currentY) * 0.28;
      setTrail({ x: currentX, y: currentY });
      requestRef.current = requestAnimationFrame(animateTrail);
    };
    requestRef.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, [pos.x, pos.y]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Phosphor Lag Aura */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: isHovering ? '44px' : '28px',
          height: isHovering ? '44px' : '28px',
          backgroundColor: isHovering ? 'rgba(230, 86, 34, 0.15)' : 'rgba(255, 230, 200, 0.08)',
          border: isHovering ? '1.5px solid rgba(220, 70, 20, 0.7)' : '1px dashed rgba(255, 240, 220, 0.35)',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
        }}
      />

      {/* Center Reticle / Eye Pupil */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovering ? '8px' : '6px',
          height: isHovering ? '14px' : '6px', // Morphs into a vertical slit pupil on hover!
          backgroundColor: isHovering ? '#ff3b20' : '#ffe9d0',
          boxShadow: isHovering
            ? '0 0 10px #ff3b20, 0 0 20px rgba(255,59,32,0.6)'
            : '0 0 6px rgba(255, 230, 200, 0.7)',
          transform: `translate(-50%, -50%) scale(${isClicking ? 1.4 : 1})`,
        }}
      />
    </div>
  );
};
