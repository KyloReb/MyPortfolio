import React from 'react';
import { skills } from '../../data/skillsData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Skills.css';

const Skills = () => {
  const [ref, skillsInView] = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section 
      id="skills" 
      ref={ref}
      className="skills-section"
    >
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className={`skill-item ${skillsInView ? 'animate-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${skillsInView ? 'animate-width' : ''}`}
                  style={{ 
                    width: skillsInView ? `${skill.level}%` : '0%',
                    transitionDelay: `${index * 0.1 + 0.3}s`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;