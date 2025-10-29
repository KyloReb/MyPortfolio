import React from 'react';
import { skills } from '../../data/skillsData';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import './Hero.css';

const Hero = ({ darkMode, toggleDarkMode }) => {
  const scrollToSection = useScrollToSection();

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
          <h1 className="hero-name">David Rebancos II</h1>
          <p className="hero-intro">
            I'm a software developer building scalable fintech solutions at Nationlink/Infoserve Inc. 
            I specialize in full-stack development with the .NET ecosystem and React.js, creating CRM and business intelligence tools that enhance financial service efficiency.
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