// React component source.
import { useEffect, useRef, useState } from 'react';
import './App.css';
import About from './components/About';
import Contact from './components/contact';
import Navbar from './components/Navbar';
import Home from './components/Portfolio';
import Services from './components/Services';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [peekBackground, setPeekBackground] = useState(false);
  const pageContentRef = useRef(null);
  const basePath = import.meta.env.BASE_URL;

  const scrollToSection = (targetId) => {
    const container = document.querySelector('.page-content');
    const section = document.getElementById(targetId);

    if (container && section) {
      container.scrollTo({
        left: section.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    setPeekBackground(false);
    scrollToSection(targetId);
  };

  const handlePagePointerMove = (event) => {
    const container = pageContentRef.current;

    if (!container) return;

    const rect = container.getBoundingClientRect();
    const threshold = 40;
    const pointerOnLeftEdge = event.clientX <= rect.left + threshold;
    const pointerOnRightEdge = event.clientX >= rect.right - threshold;

    setPeekBackground(pointerOnLeftEdge || pointerOnRightEdge);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1600);

    const elements = document.querySelectorAll('.reveal-section');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`app-shell ${isReady ? 'is-ready' : 'is-loading'}`}>
      <div className={`page-background ${peekBackground ? 'is-peeking' : ''}`} aria-hidden="true">
        <img src={`${basePath}/Backgroundprincipal.png`} alt="" className="page-bg-main" />
      </div>

      {!isReady && (
        <div className="brand-loader" aria-live="polite">
          <img src={`${basePath}/logocarga.png`} alt="Clareny" className="brand-loader__logo" />
        </div>
      )}

      <div className="content-shell">
        <Navbar onNavClick={handleNavClick} />
        <main
          ref={pageContentRef}
          className="page-content horizontal-scroll"
          onMouseMove={handlePagePointerMove}
          onMouseLeave={() => setPeekBackground(false)}
        >
          <div id="portfolio" className="reveal-section panel-panel">
            <Home onNavClick={handleNavClick} />
          </div>
          <div id="servicios" className="reveal-section panel-panel">
            <Services />
          </div>
          <div id="sobre-mi" className="reveal-section panel-panel">
            <About />
          </div>
          <div id="contacto" className="reveal-section panel-panel">
            <Contact />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
