const CLARITY_ID = 'yiz0lf21iu';

export default function loadClarity() {
  window.clarity =
    window.clarity ||
    function clarity(...args) {
      (window.clarity.q = window.clarity.q || []).push(args);
    };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);
}
