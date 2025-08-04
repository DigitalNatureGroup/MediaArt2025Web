import { useState } from 'react';
import './App.css';
import WorkList from './components/WorkList';
import ParticleBackground from './components/ParticleBackground';
import InteractiveGrid from './components/InteractiveGrid';
import ScrollIndicator from './components/ScrollIndicator';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <ParticleBackground />
      <InteractiveGrid />
      <ScrollIndicator />
      <header>
        <h1>30² | メディアアート展示会2025</h1>
        <nav>
          <ul>
            <li>
              <a href="#about">概要</a>
            </li>
            <li>
              <a href="#works">作品</a>
            </li>
            <li>
              <a href="#access">アクセス</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="hero">
          <h1 className="hero-title">30²</h1>
          <p className="hero-subtitle">メディアアート展示会2025</p>
        </section>

        <section id="about">
          <h2>概要</h2>
          <div className="about-grid">
            <div className="about-info-card">
              <div className="info-icon">📅</div>
              <h3>会期</h3>
              <p>2025年8月5日(火)</p>
            </div>
            <div className="about-info-card">
              <div className="info-icon">🕐</div>
              <h3>時間</h3>
              <p>12:00 - 17:00</p>
            </div>
            <div className="about-info-card">
              <div className="info-icon">📍</div>
              <h3>場所</h3>
              <p>
                筑波大学 春日エリア
                <br />
                7A101・7A103
              </p>
            </div>
          </div>
          <div className="about-description">
            <p>30cm × 30cm という限られた空間の中で、私たちの想像力から生まれたメディアアートを表現する展示会です。</p>
          </div>
        </section>

        <WorkList />

        <section id="access">
          <h2>Access</h2>
          <div className="access-container">
            <div className="access-info">
              <p>
                <strong>場所:</strong> 筑波大学 春日エリア 7A101・7A103
              </p>
              <p>
                <strong>住所:</strong> 〒305-8550 茨城県つくば市春日1-2
              </p>
              <p>
                <strong>入場料:</strong> 無料
              </p>
            </div>
            <div className="map-container">
              <iframe
                title="筑波大学 春日エリア マップ"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.8280076150395!2d140.10385217586133!3d36.08615600762423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60220c7a26c9d217%3A0x65d055c542420670!2z562R5rOi5aSn5a2mIOetkeazouOCreODo-ODs-ODkeOCueaYpeaXpeOCqOODquOCog!5e1!3m2!1sja!2sjp!4v1754320580876!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <footer>
      </footer>
    </>
  );
}

export default App;
