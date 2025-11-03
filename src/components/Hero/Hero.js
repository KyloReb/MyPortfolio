// Hero.js
import React, { useState, useEffect } from 'react';
import { skills } from '../../data/skillsData';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import Navbar from './Navbar';
import './Hero.css';

const Hero = ({ darkMode, toggleDarkMode }) => {
  const scrollToSection = useScrollToSection();
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const fullText = "I'm David Rebancos II";

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, isMobile ? 120 : 100);
      } else {
        // Blinking cursor effect after typing completes
        const cursorInterval = setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);
        
        return () => clearInterval(cursorInterval);
      }
    };

    typeText();
  }, [isMobile, fullText]);

  return (
    <section id="home" className="hero-section">
      <Navbar darkMode={darkMode} />
      
      {/* Theme Toggle - now properly positioned and will stay in hero section only */}
      <div className="theme-toggle-container">
        <label className="theme-switch" htmlFor="checkbox">
          <input 
            type="checkbox" 
            id="checkbox" 
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <div className="slider">
            <span className="sun">☀️</span>
            <span className="moon">🌙</span>
          </div>
        </label>
      </div>
      
      {/* Background animation elements */}
      <div className="hero-bg-element"></div>
      <div className="hero-bg-element"></div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-greeting">
            <span className="hi-text">HI,</span>
            <div className="typing-container">
              <span className="typed-text">{displayText}</span>
              <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
            </div>
          </div>
          
          <p className="hero-intro">
            I am a full-stack developer driven by the intersection of academic excellence and real-world system reliability.
            I bring a proven track record from Nationlink/Infoserve Inc. where I architect and maintain high-performance, 
            user-centric fintech solutions. My core value is the ability to handle the entire lifecycle: from scalable web 
            app development (ASP.NET/React.js) and workflow automation to guaranteeing the 24/7 operational continuity of 
            critical ATM/POS financial networks.
          </p>
          
          <div className="skills-chip-container">
            {skills.slice(0, isMobile ? 6 : skills.length).map((skill, index) => (
              <div key={index} className="skill-chip">
                {skill.name}
              </div>
            ))}
          </div>

          {isMobile && skills.length > 6 && (
            <div className="skills-more-indicator">
              +{skills.length - 6} more skills
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <button 
          onClick={() => scrollToSection('projects')}
          className="scroll-button"
          aria-label="Scroll to explore more content"
        >
          <div className="scroll-arrow">↓</div>
          <span className="scroll-text">Explore More</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;