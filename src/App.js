// App.js
import React from 'react';
import './App.css';

// Components
import Hero from './components/Hero/Hero';
import WorkExperience from './components/WorkExperience/WorkExperience';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import AwardsCertificates from './components/AwardsCertificates/AwardsCertificates';
import Contact from './components/Contact/Contact';

// Hooks
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Hero darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <WorkExperience />
      <Skills />
      <Projects />
      <AwardsCertificates /> {/* Add this line */}
      <Contact />
    </div>
  );
}

export default App;