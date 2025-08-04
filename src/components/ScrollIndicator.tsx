import { useEffect, useState } from 'react';
import './ScrollIndicator.css';

function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Determine active section
      const sections = ['hero', 'about', 'works', 'access'];
      let current = 'hero';

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-indicator">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="section-dots">
        {['hero', 'about', 'works', 'access'].map((section) => (
          <button
            key={section}
            type="button"
            className={`section-dot ${activeSection === section ? 'active' : ''}`}
            onClick={() => {
              document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label={`Scroll to ${section} section`}
          />
        ))}
      </div>
    </div>
  );
}

export default ScrollIndicator;
