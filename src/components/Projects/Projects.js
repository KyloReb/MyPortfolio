import React, { useState, useEffect } from 'react';
import { projects } from '../../data/projectsData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Projects.css';

const Projects = () => {
  const [ref, projectsInView] = useIntersectionObserver({ threshold: 0.2 });
  const [loadedImages, setLoadedImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  const handleImageLoad = (projectIndex) => {
    setLoadedImages(prev => ({ ...prev, [projectIndex]: true }));
  };

  const handleImageError = (projectIndex) => {
    setImageErrors(prev => ({ ...prev, [projectIndex]: true }));
  };

  const getImageSource = (project, index) => {
    if (imageErrors[index]) {
      return '/images/project-placeholder.png'; // Fallback image
    }
    return project.image;
  };

  const openProjectLink = (project, event) => {
    // Prevent opening if clicking on tags or other interactive elements
    if (event.target.closest('.project-tag') || event.target.closest('.project-links')) {
      return;
    }
    window.open(project.github || project.live, '_blank');
  };

  return (
    <section 
      id="projects" 
      ref={ref}
      className="projects-section"
    >
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id || index} 
              className={`project-card ${projectsInView ? 'project-animate-in' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={(e) => openProjectLink(project, e)}
            >
              <div className="project-image-container">
                <div className="project-image">
                  {!loadedImages[index] && !imageErrors[index] && (
                    <div className="image-skeleton">
                      <div className="skeleton-loader"></div>
                    </div>
                  )}
                  <img 
                    src={getImageSource(project, index)}
                    alt={`${project.title} - Project Screenshot`}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                    className={`
                      ${loadedImages[index] ? 'loaded' : 'loading'} 
                      ${imageErrors[index] ? 'image-error' : ''}
                    `}
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.github && (
                        <button 
                          className="project-link-btn"
                          onClick={() => window.open(project.github, '_blank')}
                          aria-label={`View ${project.title} code on GitHub`}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          Code
                        </button>
                      )}
                      {project.live && (
                        <button 
                          className="project-link-btn live-demo"
                          onClick={() => window.open(project.live, '_blank')}
                          aria-label={`View ${project.title} live demo`}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                          </svg>
                          Live Demo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;