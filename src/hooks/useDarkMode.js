import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme !== 'light' && (savedTheme === 'dark' || systemPrefersDark)) {
      setDarkMode(true);
    } else if (savedTheme === 'light') {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return { darkMode, toggleDarkMode };
};