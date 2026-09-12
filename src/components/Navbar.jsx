// React component source.
export default function Navbar({ onNavClick = () => {} }) {
  const basePath = import.meta.env.BASE_URL;
  
  const links = [
    { label: 'discografía', href: '#portfolio' },
    { label: 'servicios', href: '#servicios' },
    { label: 'bio', href: '#sobre-mi' },
    { label: 'contacto', href: '#contacto' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a className="brand" href="#portfolio" onClick={(event) => onNavClick(event, 'portfolio')}>
          <img src={`${basePath}/logoblanco.png`} alt="Clareny" className="brand-logo" />
        </a>
        <div className="nav-links">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(event) => onNavClick(event, link.href.replace('#', ''))}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </div>
        <div id="google_translate_element"></div>
      </div>
    </nav>
  );
}
