import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky shadow/blur
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section for indicator
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a
            href="#home"
            className="nav-logo"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <span className="nav-logo-pink">S.</span>
            <span className="nav-logo-white">Thirukumaran</span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {navItems.map((item) => {
              const secId = item.href.replace('#', '');
              const isActive = activeSection === secId;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            className="nav-hamburger"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button
          className="mobile-close-btn"
          aria-label="Close menu"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X size={26} />
        </button>

        <a
          href="#home"
          className="nav-logo"
          style={{ marginBottom: '20px' }}
          onClick={(e) => handleNavClick(e, '#home')}
        >
          <span className="nav-logo-pink">S.</span>
          <span className="nav-logo-white">Thirukumaran</span>
        </a>

        {navItems.map((item) => {
          const secId = item.href.replace('#', '');
          const isActive = activeSection === secId;
          return (
            <a
              key={item.label}
              href={item.href}
              className={`mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </>
  );
}
