// React component source.
import { useEffect, useRef, useState } from 'react';
import './App.css';
import About from './components/About';
import Contact from './components/contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Portfolio';
import Process from './components/Process';
import Services from './components/Services';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window === 'undefined') return 'portfolio';
    const hash = window.location.hash.replace('#', '');
    return hash || 'portfolio';
  });
  const pageContentRef = useRef(null);
  const basePath = import.meta.env.BASE_URL;

  const scrollToSection = (targetId) => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    setActiveSection(targetId);
    scrollToSection(targetId);
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

  useEffect(() => {
    const ids = ['portfolio', 'servicios', 'proceso', 'sobre-mi', 'contacto'];
    const syncSection = () => {
      const marker = window.scrollY + 140;
      let current = ids[0];
      ids.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = id;
      });
      setActiveSection(current);
    };

    syncSection();
    window.addEventListener('scroll', syncSection, { passive: true });
    return () => window.removeEventListener('scroll', syncSection);
  }, [isReady]);

  return (
    <div className={`app-shell ${isReady ? 'is-ready' : 'is-loading'}`}>
      <div className="page-background" aria-hidden="true">
        <img src={`${basePath}Backgroundprincipal.webp`} alt="" className="page-bg-main" />
      </div>

      {!isReady && (
        <div className="brand-loader" aria-live="polite">
          <img src={`${basePath}logoblanco.png`} alt="Clareny" className="brand-loader__logo" />
        </div>
      )}

      <div className="content-shell">
        <Navbar onNavClick={handleNavClick} activeSection={activeSection} />
        <main ref={pageContentRef} className="page-content page-flow">
          <div id="portfolio" className="flow-section">
            <Home onNavClick={handleNavClick} />
          </div>
          <div id="servicios" className="flow-section">
            <Services />
          </div>
          <div id="proceso" className="flow-section">
            <Process />
          </div>
          <div id="sobre-mi" className="flow-section">
            <About />
          </div>
          <div id="contacto" className="flow-section">
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
