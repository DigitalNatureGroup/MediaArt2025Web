import { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${isComplete ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <div className="logo-grid">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="logo-square" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <h1 className="loading-title">30²</h1>
        </div>
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <p className="loading-text">Loading Media Art Exhibition...</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
