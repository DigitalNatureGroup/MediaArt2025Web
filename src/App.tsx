import './App.css';
import Hero from './components/Hero';
import WorkList from './components/WorkList';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <>
      <ParticleBackground />
      <header>
        <h1>GE72501「メディアアート」展示会2025</h1>
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
          <Hero />
          <h1 className="hero-title">GE72501「メディアアート」展示会2025</h1>
        </section>

        <section id="about">
          <h2>概要</h2>
          <p>
            <strong>会期:</strong> 2025年8月5日(火)
          </p>
          <p>
            <strong>時間:</strong> 12:00 - 17:00
          </p>
          <p>メディアアートの新しい表現を探る展示会です。</p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.493881832084!2d140.0998868152772!3d36.1059238800449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60220dd9b5561731%3A0x8b82b5a53b15524!2z562J5rOi5aSn5a2mIOaZuua_pue0jOOCv-ODvOODsA!5e0!3m2!1sja!2sjp!4v1722696949174!5m2!1sja!2sjp"
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
        <p>
          詳しくは
          <a href="https://www.tsukuba.ac.jp/" target="_blank" rel="noopener noreferrer">
            大学のウェブサイト
          </a>
          をご覧ください。
        </p>
      </footer>
    </>
  );
}

export default App;
