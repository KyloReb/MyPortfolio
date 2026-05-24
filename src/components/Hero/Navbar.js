import React, { useState, useEffect } from 'react';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import './Navbar.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'awards-certificates', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ darkMode }) => {
  const scrollToSection = useScrollToSection();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      {isMobile ? (
        <div className="mobile-nav">
          <button
            className={`menu-button ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          {isMenuOpen && (
            <div className="mobile-menu">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className="mobile-nav-item"
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="pill-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className="nav-pill"
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
