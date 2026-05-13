interface CustomCursorProps {
  pos: { x: number; y: number };
  isHovering: boolean;
}

export function CustomCursor({ pos, isHovering }: CustomCursorProps) {
  return (
    // FIX 2: aria-hidden — purely decorative, must never receive focus or be announced
    <div
      aria-hidden="true"
      className={`cursor ${isHovering ? 'hover' : ''}`}
      style={{ left: pos.x, top: pos.y }}
    />
  );
}