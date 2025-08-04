import { useEffect, useRef } from 'react';
import './InteractiveGrid.css';

function InteractiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      gridRef.current.style.setProperty('--mouse-x', `${x}%`);
      gridRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={gridRef} className="interactive-grid">
      <div className="grid-squares">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="grid-square" />
        ))}
      </div>
    </div>
  );
}

export default InteractiveGrid;
