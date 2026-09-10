export default function Navbar({ onNavClick = () => {} }) {
  const links = [
    { label: 'portfolio', href: '#portfolio' },
    { label: 'servicios', href: '#servicios' },
    { label: 'sobre mi', href: '#sobre-mi' },
    { label: 'contacto', href: '#contacto' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a className="brand" href="#portfolio" onClick={(event) => onNavClick(event, 'portfolio')}>Clareny</a>
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
      </div>
    </nav>
  );
}
