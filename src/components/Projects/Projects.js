// Projects.js - Refactored with comprehensive image fallback handling
import React, { useState, useEffect, useCallback } from 'react';
import { projects } from '../../data/projectsData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Projects.css';

const Projects = () => {
  const [ref, projectsInView] = useIntersectionObserver({ threshold: 0.2 });
  const [loadedImages, setLoadedImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const projectsPerSlide = 4;
  const totalSlides = Math.ceil(projects.length / projectsPerSlide);

  // Multiple fallback strategies
  const FALLBACK_IMAGES = {
    kinderpal: `${process.env.PUBLIC_URL}/assets/images/KinderPal.png`,
    ictowers: `${process.env.PUBLIC_URL}/assets/images/ICTowers.jpg`,
    spaceAttack: `${process.env.PUBLIC_URL}/assets/images/SpaceAttack.png`,
    posUdm: `${process.env.PUBLIC_URL}/assets/images/PointOfSales.jpg`,
    visitorTracker: `${process.env.PUBLIC_URL}/assets/images/VisitorTracker.jpg`,
    ePocket: `${process.env.PUBLIC_URL}/assets/images/EPocket.png`,
    inventoryMgmt: `${process.env.PUBLIC_URL}/assets/images/InventoryManagementSys.png`,
    slaMgmt: `${process.env.PUBLIC_URL}/assets/images/SLAManagement.jpg`
  };

  const PLACEHOLDER_IMAGE = `${process.env.PUBLIC_URL}/assets/images/project-placeholder.png`;
  const GENERIC_PLACEHOLDER = 'https://via.placeholder.com/400x250/007bff/ffffff?text=Project+Image';

  const toggleDescription = (projectId, event) => {
    event.stopPropagation();
    setExpandedDescriptions(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const handleImageLoad = (projectIndex) => {
    console.log(`Image loaded successfully for project index: ${projectIndex}`);
    setLoadedImages(prev => ({ ...prev, [projectIndex]: true }));
  };

  const handleImageError = (projectIndex, project, attempt = 1) => {
    console.warn(`Image load attempt ${attempt} failed for: ${project.title}`);
    console.warn(`Attempted source: ${getImageSource(project, projectIndex, attempt)}`);
    
    if (attempt < 3) {
      // Retry with different strategy
      setTimeout(() => {
        const img = new Image();
        img.onload = () => handleImageLoad(projectIndex);
        img.onerror = () => handleImageError(projectIndex, project, attempt + 1);
        img.src = getImageSource(project, projectIndex, attempt + 1);
      }, 500);
    } else {
      // Final failure
      console.error(`All image load attempts failed for: ${project.title}`);
      setImageErrors(prev => ({ ...prev, [projectIndex]: true }));
    }
  };

  const getImageSource = (project, index, attempt = 1) => {
    // If we already have an error, use placeholder
    if (imageErrors[index]) {
      return GENERIC_PLACEHOLDER;
    }

    const projectId = project.id?.toLowerCase();
    
    // Strategy 1: Try specific fallback based on project ID
    if (attempt === 1 && projectId && FALLBACK_IMAGES[projectId]) {
      return FALLBACK_IMAGES[projectId];
    }
    
    // Strategy 2: Try the original image path with absolute URL for GitHub Pages
    if (attempt <= 2 && project.image) {
      // Handle absolute URLs (http/https)
      if (project.image.startsWith('http')) {
        return project.image;
      }
      
      // Handle relative paths for GitHub Pages
      if (project.image.startsWith('/')) {
        // For GitHub Pages, we need to ensure the path is absolute from the repo root
        const baseUrl = process.env.NODE_ENV === 'production' 
          ? 'https://kyloreb.github.io/MyPortfolio'
          : process.env.PUBLIC_URL;
        
        return `${baseUrl}${project.image}`;
      }
      
      // Handle relative paths without leading slash
      const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://kyloreb.github.io/MyPortfolio'
        : process.env.PUBLIC_URL;
      
      return `${baseUrl}/${project.image.replace(/^\//, '')}`;
    }
    
    // Strategy 3: Try project-specific fallback
    if (attempt === 3 && projectId && FALLBACK_IMAGES[projectId]) {
      return FALLBACK_IMAGES[projectId];
    }
    
    // Final fallback: Generic placeholder
    return GENERIC_PLACEHOLDER;
  };

  const preloadImages = useCallback(() => {
    projects.forEach((project, index) => {
      const img = new Image();
      img.onload = () => handleImageLoad(index);
      img.onerror = () => handleImageError(index, project, 1);
      img.src = getImageSource(project, index, 1);
    });
  }, []);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  const openProjectLink = (project, event) => {
    if (event.target.closest('.project-tag') || 
        event.target.closest('.project-links') ||
        event.target.closest('.see-more-btn')) {
      return;
    }
    
    const url = project.live || project.github;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const calculateAndApplyConsistentHeights = useCallback(() => {
    const allCards = document.querySelectorAll('.project-card-equal');
    if (allCards.length === 0) return;

    allCards.forEach(card => {
      card.style.height = 'auto';
    });

    void document.body.offsetHeight;

    let maxHeight = 0;
    allCards.forEach(card => {
      const height = card.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    if (maxHeight > 0) {
      allCards.forEach(card => {
        card.style.height = `${maxHeight}px`;
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(calculateAndApplyConsistentHeights, 100);
    return () => clearTimeout(timer);
  }, [currentSlide, expandedDescriptions, calculateAndApplyConsistentHeights]);

  useEffect(() => {
    const handleResize = () => {
      calculateAndApplyConsistentHeights();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateAndApplyConsistentHeights]);

  useEffect(() => {
    if (!projectsInView || totalSlides <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [projectsInView, nextSlide, totalSlides]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!projectsInView || totalSlides <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projectsInView, prevSlide, nextSlide, totalSlides]);

  return (
    <section 
      id="projects" 
      ref={ref}
      className="projects-section"
    >
      <div className="projects-container">
        <h2 className="section-title">My Projects</h2>
        
        <div className="projects-slider-container">
          {totalSlides > 1 && (
            <>
              <button 
                className="slider-arrow slider-arrow-prev"
                onClick={prevSlide}
                aria-label="Previous projects"
                disabled={currentSlide === 0}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              
              <button 
                className="slider-arrow slider-arrow-next"
                onClick={nextSlide}
                aria-label="Next projects"
                disabled={currentSlide === totalSlides - 1}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </>
          )}

          <div className="projects-slider-wrapper">
            <div 
              className="projects-slider-track"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div 
                  key={slideIndex}
                  className="projects-slide"
                >
                  <div className="projects-grid-2x2">
                    {projects
                      .slice(
                        slideIndex * projectsPerSlide,
                        slideIndex * projectsPerSlide + projectsPerSlide
                      )
                      .map((project, index) => {
                        const globalIndex = slideIndex * projectsPerSlide + index;
                        const projectId = project.id || `project-${globalIndex}`;
                        const isExpanded = expandedDescriptions[projectId];
                        const needsSeeMore = project.description.length > 120;
                        const displayDescription = isExpanded 
                          ? project.description 
                          : (needsSeeMore ? `${project.description.substring(0, 120)}...` : project.description);

                        return (
                          <div 
                            key={projectId} 
                            className={`project-card-equal ${projectsInView ? 'project-animate-in' : ''}`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                            onClick={(e) => openProjectLink(project, e)}
                            data-project-id={projectId}
                            role="article"
                            aria-label={`${project.title} project card`}
                          >
                            <div className="project-image-container-equal">
                              <div className="project-image-equal">
                                {!loadedImages[globalIndex] && !imageErrors[globalIndex] && (
                                  <div className="image-skeleton">
                                    <div className="skeleton-loader"></div>
                                    <div style={{ 
                                      position: 'absolute', 
                                      bottom: '10px', 
                                      fontSize: '12px',
                                      color: 'var(--text-color)',
                                      opacity: 0.7
                                    }}>
                                      Loading image...
                                    </div>
                                  </div>
                                )}
                                <img 
                                  src={getImageSource(project, globalIndex, 1)}
                                  alt={`${project.title} - Project Screenshot`}
                                  onLoad={() => handleImageLoad(globalIndex)}
                                  onError={() => handleImageError(globalIndex, project, 1)}
                                  className={`${
                                    loadedImages[globalIndex] ? 'loaded' : 'loading'
                                  } ${
                                    imageErrors[globalIndex] ? 'image-error' : ''
                                  }`}
                                  loading="lazy"
                                />
                                <div className="project-overlay">
                                  <div className="project-links">
                                    {project.github && (
                                      <button 
                                        className="project-link-btn"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          window.open(project.github, '_blank', 'noopener,noreferrer');
                                        }}
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
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          window.open(project.live, '_blank', 'noopener,noreferrer');
                                        }}
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

                            <div className="project-content-equal">
                              <h3 className="project-title">{project.title}</h3>
                              <div className="project-description-container">
                                <p className={`project-description ${isExpanded ? 'expanded' : ''}`}>
                                  {displayDescription}
                                  {needsSeeMore && !isExpanded && (
                                    <button 
                                      className="see-more-btn inline"
                                      onClick={(e) => toggleDescription(projectId, e)}
                                      aria-label="Show more"
                                    >
                                      See More
                                    </button>
                                  )}
                                </p>
                                {needsSeeMore && isExpanded && (
                                  <button 
                                    className="see-more-btn"
                                    onClick={(e) => toggleDescription(projectId, e)}
                                    aria-label="Show less"
                                  >
                                    Show Less
                                  </button>
                                )}
                              </div>
                              
                              <div className="project-tags">
                                {project.tags.map((tag, tagIndex) => (
                                  <span key={tagIndex} className="project-tag">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <div className="slider-indicators">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`slider-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;