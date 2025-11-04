// Hero.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { skills } from '../../data/skillsData';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import Navbar from './Navbar';
import './Hero.css';

const Hero = ({ darkMode, toggleDarkMode }) => {
  const scrollToSection = useScrollToSection();
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeHighlights, setActiveHighlights] = useState([]);
  const heroRef = useRef(null);
  const fullText = "I'm David Rebancos II";

  // Skill highlights - curated selection
  const skillHighlights = [
    'C#', '.NET', 'MSSQL', 'HTML/CSS', 'JavaScript', 
    'React.js', 'Python', 'Java', 'Blender', 
    'Augmented Reality', 'Unity', 'Adobe Photoshop', 
    'Figma', 'GIT'
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Enhanced mouse move effect for background highlights
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current || isMobile) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });

      // Create highlights on mouse move with better visibility
      if (Math.random() > 0.8) {
        const newHighlight = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 80 + 40, // Larger sizes for better visibility
          opacity: darkMode ? 0.15 : 0.08 // Higher opacity for light mode
        };
        
        setActiveHighlights(prev => [...prev.slice(-10), newHighlight]);
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [darkMode, isMobile]);

  // Enhanced auto-generate highlights
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeHighlights.length < 12) {
        const newHighlight = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 100 + 50, // Larger sizes
          opacity: darkMode ? 0.12 : 0.06 // Adjusted for light mode
        };
        setActiveHighlights(prev => [...prev.slice(-15), newHighlight]);
      }
    }, 800); // More frequent generation

    return () => clearInterval(interval);
  }, [activeHighlights.length, darkMode]);

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

  const handleViewResume = useCallback(() => {
    window.open(`${process.env.PUBLIC_URL}/assets/Resume.pdf`, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      <Navbar darkMode={darkMode} />
      
      {/* Theme Toggle */}
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
      
      {/* Enhanced Interactive Background Elements */}
      {!isMobile && (
        <div 
          className="hero-mouse-follower"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            opacity: darkMode ? 0.1 : 0.05 // Enhanced visibility
          }}
        ></div>
      )}

      {/* Enhanced Animated Background Highlights */}
      {activeHighlights.map(highlight => (
        <div
          key={highlight.id}
          className="hero-highlight"
          style={{
            left: `${highlight.x}%`,
            top: `${highlight.y}%`,
            width: `${highlight.size}px`,
            height: `${highlight.size}px`,
            opacity: highlight.opacity || (darkMode ? 0.1 : 0.05)
          }}
        />
      ))}

      {/* Enhanced Static Background Elements */}
      <div className="hero-bg-element hero-bg-1"></div>
      <div className="hero-bg-element hero-bg-2"></div>
      <div className="hero-bg-element hero-bg-3"></div>
      
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

          {/* Resume Button - Chip Style */}
          <button 
            onClick={handleViewResume}
            className={`resume-chip-button ${darkMode ? 'dark-mode' : ''}`}
            aria-label="View my resume"
          >
            View Resume
          </button>
          
          {/* Skill Highlights Section */}
          <div className="skills-highlights-section">
            <h3 className="skills-highlights-title">Core Technologies</h3>
            <div className="skills-highlights-container">
              {skillHighlights.map((skill, index) => (
                <div 
                  key={skill}
                  className="skill-highlight-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="skill-highlight-text">{skill}</span>
                  <div className="skill-highlight-glow"></div>
                </div>
              ))}
            </div>
          </div>

          {isMobile && (
            <div className="skills-more-indicator">
              +{skills.length - skillHighlights.length} more skills
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