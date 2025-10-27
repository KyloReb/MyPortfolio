import React from 'react';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
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
  );
};

export default ThemeToggle;