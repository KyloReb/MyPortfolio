// App.js
import React from 'react';
import './App.css';

// Components
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';

// Hooks
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Hero darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;