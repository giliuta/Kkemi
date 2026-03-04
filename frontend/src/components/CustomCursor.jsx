import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor="expand"], [data-cursor="view"]');
      if (target) {
        setIsHovering(true);
        if (target.dataset.cursor === 'view') {
          setCursorLabel('View');
        } else {
          setCursorLabel('');
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor="expand"], [data-cursor="view"]');
      if (target) {
        setIsHovering(false);
        setCursorLabel('');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    let raf;
    const animate = () => {
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.25;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.25;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        const size = isHovering ? 80 : 40;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${ringPos.current.x + 30}px, ${ringPos.current.y - 6}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(raf);
    };
  }, [isHovering]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className={`custom-cursor-ring ${isHovering ? 'expanded' : ''}`} />
      <div ref={labelRef} className={`custom-cursor-label ${cursorLabel ? 'visible' : ''}`}>
        {cursorLabel}
      </div>
    </>
  );
}
