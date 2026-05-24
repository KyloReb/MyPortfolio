import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../../data/skillsData';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import Navbar from './Navbar';
import './Hero.css';

/** Curated subset of skills shown as highlight chips */
const SKILL_HIGHLIGHTS = [
  'C#', '.NET', 'MSSQL', 'HTML/CSS', 'JavaScript',
  'React.js', 'Python', 'Java', 'Blender',
  'Augmented Reality', 'Unity', 'Adobe Photoshop',
  'Figma', 'GIT',
];

const FULL_NAME = "I'm David Rebancos II";

const Hero = ({ darkMode, toggleDarkMode }) => {
  const scrollToSection = useScrollToSection();
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const heroRef = useRef(null);

  /* ---- Responsive detection ---- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ---- Typing effect ---- */
  useEffect(() => {
    let index = 0;
    let cleanup;

    const type = () => {
      if (index < FULL_NAME.length) {
        setDisplayText(FULL_NAME.substring(0, index + 1));
        index++;
        setTimeout(type, isMobile ? 120 : 100);
      } else {
        const interval = setInterval(() => setShowCursor((p) => !p), 500);
        cleanup = () => clearInterval(interval);
      }
    };

    type();
    return () => cleanup?.();
  }, [isMobile]);

  const resumeUrl = `${process.env.PUBLIC_URL}/assets/Rebancos_David_Resume.pdf`;

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      <Navbar darkMode={darkMode} />

      {/* ---- Theme Toggle ---- */}
      <div className="theme-toggle-container">
        <label className="theme-switch" htmlFor="checkbox">
          <input type="checkbox" id="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <div className="slider">
            <span className="sun">☀️</span>
            <span className="moon">🌙</span>
          </div>
        </label>
      </div>

      {/* ---- Static glass background circles ---- */}
      <div className="hero-bg-element hero-bg-1" />
      <div className="hero-bg-element hero-bg-2" />
      <div className="hero-bg-element hero-bg-3" />

      <div className="hero-container">
        <div className="hero-content">
          {/* ---- Profile Image with greeting overlay ---- */}
          <motion.div
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.1 }}
          >
            <div className="hero-image-container">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/profile.png`}
                alt="David Rebancos II"
                className="profile-image"
              />
              <div className="hero-greeting-overlay">
                <span className="hi-text">HI, </span>
                <span className="typed-text">{displayText}</span>
                <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
              </div>
            </div>
          </motion.div>

          <p className="hero-intro">
            I am a full-stack developer driven by the intersection of academic excellence
            and real-world system reliability. I bring a proven track record from
            Nationlink/Infoserve Inc. where I architect and maintain high-performance,
            user-centric fintech solutions. My core value is the ability to handle the
            entire lifecycle: from scalable web app development (ASP.NET/React.js) and
            workflow automation to guaranteeing the 24/7 operational continuity of
            critical ATM/POS financial networks.
          </p>

              {/* ---- Resume Button ---- */}
              <button
                onClick={() => setShowResume(true)}
                className={`resume-chip-button ${darkMode ? 'dark-mode' : ''}`}
                aria-label="View my resume"
              >
                View Resume
              </button>

          {/* ---- Skill Highlights ---- */}
          <div className="skills-highlights-section">
            <h3 className="skills-highlights-title">Core Technologies</h3>
            <div className="skills-highlights-container">
              {SKILL_HIGHLIGHTS.map((skill, index) => (
                <div
                  key={skill}
                  className="skill-highlight-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="skill-highlight-text">{skill}</span>
                  <div className="skill-highlight-glow" />
                </div>
              ))}
            </div>
          </div>

          {isMobile && (
            <div className="skills-more-indicator">
              +{skills.length - SKILL_HIGHLIGHTS.length} more skills
            </div>
          )}
        </div>
      </div>

      {/* ---- Scroll Indicator ---- */}
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

      {/* ---- Resume Modal ---- */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            className="resume-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResume(false)}
          >
            <motion.div
              className="resume-modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="resume-modal-close"
                onClick={() => setShowResume(false)}
                aria-label="Close resume"
              >
                ✕
              </button>
              <iframe
                src={resumeUrl}
                className="resume-modal-iframe"
                title="Resume"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
