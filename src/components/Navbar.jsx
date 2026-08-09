import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation().pathname;
  const closeMenu = () => setOpen(false);
  const links = [
    { href: '/', label: 'Home' },
    { href: '/tasks', label: 'Tasks' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={closeMenu} aria-label="TimePlanner Pro home">
          <span className="brand-mark">TP</span>
          <span className="brand-name">TimePlanner <strong>Pro</strong></span>
        </Link>
        <button className="nav-menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className="menu-icon"><span /><span /><span /></span>
        </button>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} to={link.href} onClick={closeMenu} className={`nav-link ${location === link.href ? 'active' : ''}`}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}