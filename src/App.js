// App.js
import React from 'react';
import './App.css';

// Components
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import WorkExperience from './components/WorkExperience/WorkExperience';
import AwardsCertificates from './components/AwardsCertificates/AwardsCertificates';
import Contact from './components/Contact/Contact';
import FloatingChat from './components/FloatingChat/FloatingChat';

// Hooks
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Hero darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Skills />
      <Projects />
      <WorkExperience />
      <AwardsCertificates /> {/* Add this line */}
      <Contact />
      <FloatingChat />
    </div>
  );
}

export default App;