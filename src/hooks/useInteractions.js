// Efectos interactivos de la web: aparición al hacer scroll, botones magnéticos,
// tarjetas con inclinación 3D, luz que sigue al cursor y barra de progreso.
import { useEffect } from 'react';

const REVEAL_SELECTOR = [
  '.ed-head',
  '.playlist-stage',
  '.mix-block .mix-hint',
  '.process-head',
  '.process-steps article',
  '.bio-poster',
  '.bio-story',
  '.bio-credits li',
  '.bio-mentor',
].join(', ');

const MAGNETIC_SELECTOR = '.sound-btn, .playlist-play, .playlist-open, .bio-mentor';
const TILT_SELECTOR = '.sound-card, .process-steps article, .bio-poster__frame';

export default function useInteractions(isReady) {
  // Barra de progreso de lectura (siempre activa, es barata).
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      root.style.setProperty('--scroll-progress', progress.toFixed(4));
      root.classList.toggle('is-scrolled', window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups = [];

    // Aparición escalonada al entrar en pantalla.
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const targets = document.querySelectorAll(REVEAL_SELECTOR);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('fx-in');
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );
      targets.forEach((el) => {
        const siblings = Array.from(el.parentElement?.children || []);
        const index = Math.max(0, siblings.indexOf(el));
        el.style.setProperty('--fx-delay', `${Math.min(index, 8) * 70}ms`);
        el.classList.add('fx-reveal');
        observer.observe(el);
      });
      cleanups.push(() => observer.disconnect());
    }

    if (reduceMotion || !finePointer) {
      return () => cleanups.forEach((fn) => fn());
    }

    // Luz que sigue al cursor.
    const root = document.documentElement;
    const onMove = (event) => {
      root.style.setProperty('--cursor-x', `${event.clientX}px`);
      root.style.setProperty('--cursor-y', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    cleanups.push(() => window.removeEventListener('pointermove', onMove));

    // Botones magnéticos.
    document.querySelectorAll(MAGNETIC_SELECTOR).forEach((el) => {
      el.classList.add('fx-magnetic');
      const move = (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        el.style.setProperty('--mx', `${x * 0.25}px`);
        el.style.setProperty('--my', `${y * 0.35}px`);
      };
      const leave = () => {
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      });
    });

    // Tarjetas con inclinación 3D y brillo.
    document.querySelectorAll(TILT_SELECTOR).forEach((el) => {
      el.classList.add('fx-tilt');
      const move = (event) => {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        el.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
        el.style.setProperty('--ry', `${(px - 0.5) * 10}deg`);
        el.style.setProperty('--gx', `${px * 100}%`);
        el.style.setProperty('--gy', `${py * 100}%`);
      };
      const leave = () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [isReady]);
}
