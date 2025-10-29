import React, { useState, useEffect } from 'react';
import { skills } from '../../data/skillsData';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import './Hero.css';

const Hero = ({ darkMode, toggleDarkMode }) => {
  const scrollToSection = useScrollToSection();
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "I'm David Rebancos II";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Blinking cursor effect after typing completes
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      
      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, fullText]);

  return (
    <section id="home" className="hero-section">
      <div className="theme-switch-wrapper">
        <label className="theme-switch" htmlFor="checkbox">
          <input 
            type="checkbox" 
            id="checkbox" 
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <div className="slider round">
            <span className="sun">☀️</span>
            <span className="moon">🌙</span>
          </div>
        </label>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-greeting">
            <span className="hi-text">HI</span>
            <div className="typing-container">
              <span className="typed-text">{displayText}</span>
              <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
            </div>
          </div>
          
          <p className="hero-intro">
            I am a full-stack developer driven by the intersection of academic excellence and real-world system reliability.

I bring a proven track record from Nationlink/Infoserve Inc. where I architect and maintain high-performance, user-centric fintech solutions. My core value is the ability to handle the entire lifecycle: from scalable web app development (ASP.NET/React.js) and workflow automation to guaranteeing the 24/7 operational continuity of critical ATM/POS financial networks. With a toolkit spanning the .NET ecosystem, Python (Django), SQL, UI/UX (Figma), and mobile development, I am prepared to immediately solve your complex technical challenges and accelerate your team's development goals.
          </p>
          
          <div className="skills-chip-container">
            {skills.map((skill, index) => (
              <div key={index} className="skill-chip">
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator without background container */}
      <div className="scroll-indicator">
        <button 
          onClick={() => scrollToSection('skills')}
          className="scroll-button"
          aria-label="Scroll to explore more content"
        >
          <div className="scroll-arrow">↓</div>
        </button>
      </div>
    </section>
  );
};

export default Hero;