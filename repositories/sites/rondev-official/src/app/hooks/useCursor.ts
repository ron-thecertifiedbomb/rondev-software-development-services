import { useEffect, useState } from 'react';

interface CursorState {
  cursorPos: { x: number; y: number };
  cursorHover: boolean;
  setCursorHover: (v: boolean) => void;
}

export function useCursor(): CursorState {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) =>
      setCursorPos({ x: e.clientX, y: e.clientY });

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return { cursorPos, cursorHover, setCursorHover };
}
