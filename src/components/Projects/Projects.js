// Projects.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { projects } from '../../data/projectsData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Projects.css';

const Projects = () => {
  const [ref, projectsInView] = useIntersectionObserver({ threshold: 0.2 });
  const [loadedImages, setLoadedImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);
  
  const cardsRef = useRef({});
  const autoPlayRef = useRef(null);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const dragThreshold = 50;

  // Image Configuration
  const FALLBACK_IMAGES = useRef({
    kinderpal: `${process.env.PUBLIC_URL}/assets/images/KinderPal.png`,
    ictowers: `${process.env.PUBLIC_URL}/assets/images/ICTowers.jpg`,
    spaceAttack: `${process.env.PUBLIC_URL}/assets/images/SpaceAttack.png`,
    posUdm: `${process.env.PUBLIC_URL}/assets/images/PointOfSales.jpg`,
    visitorTracker: `${process.env.PUBLIC_URL}/assets/images/VisitorTracker.jpg`,
    ePocket: `${process.env.PUBLIC_URL}/assets/images/EPocket.png`,
    inventoryMgmt: `${process.env.PUBLIC_URL}/assets/images/InventoryManagementSys.png`,
    slaMgmt: `${process.env.PUBLIC_URL}/assets/images/SLAManagement.jpg`
  }).current;

  const GENERIC_PLACEHOLDER = 'https://via.placeholder.com/400x250/007bff/ffffff?text=Project+Image';

  // Carousel Configuration
  const projectsPerSlide = 4;
  const totalSlides = Math.ceil(projects.length / projectsPerSlide);

  // FIXED: Get projects for specific slide
  const getProjectsForSlide = useCallback((slideIndex) => {
    const startIndex = slideIndex * projectsPerSlide;
    return projects.slice(startIndex, startIndex + projectsPerSlide);
  }, [projectsPerSlide]);

  // FIXED: Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((slideIndex) => {
    setCurrentSlide(slideIndex);
  }, []);

  // Enhanced Swipe/Drag Handling
  const handleDragStart = useCallback((e) => {
    if (e.type === 'touchstart') {
      setIsDragging(true);
      setDragStartX(e.touches[0].clientX);
      setDragCurrentX(e.touches[0].clientX);
    } 
    else if (e.type === 'mousedown') {
      setIsDragging(true);
      setDragStartX(e.clientX);
      setDragCurrentX(e.clientX);
      e.preventDefault();
    }
    
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  }, []);

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;
    
    let currentX;
    if (e.type === 'touchmove') {
      currentX = e.touches[0].clientX;
    } else if (e.type === 'mousemove') {
      currentX = e.clientX;
    } else {
      return;
    }
    
    setDragCurrentX(currentX);
    
    if (trackRef.current) {
      const dragDistance = currentX - dragStartX;
      trackRef.current.style.transform = `translateX(calc(-${currentSlide * 100}% + ${dragDistance * 0.5}px))`;
      trackRef.current.style.transition = 'none';
    }
  }, [isDragging, dragStartX, currentSlide]);

  const handleDragEnd = useCallback((e) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const dragDistance = dragCurrentX - dragStartX;
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
      trackRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    if (Math.abs(dragDistance) > dragThreshold) {
      if (dragDistance > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    setIsAutoPlaying(true);
  }, [isDragging, dragStartX, dragCurrentX, currentSlide, prevSlide, nextSlide]);

  // Auto-play Management
  useEffect(() => {
    if (!isAutoPlaying || !projectsInView || isDragging) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, projectsInView, totalSlides, isDragging]);

  // Add/remove event listeners for drag
  useEffect(() => {
    const trackElement = trackRef.current;
    if (!trackElement) return;

    trackElement.addEventListener('touchstart', handleDragStart, { passive: true });
    trackElement.addEventListener('touchmove', handleDragMove, { passive: true });
    trackElement.addEventListener('touchend', handleDragEnd, { passive: true });
    
    trackElement.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);

    return () => {
      trackElement.removeEventListener('touchstart', handleDragStart);
      trackElement.removeEventListener('touchmove', handleDragMove);
      trackElement.removeEventListener('touchend', handleDragEnd);
      
      trackElement.removeEventListener('mousedown', handleDragStart);
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [handleDragStart, handleDragMove, handleDragEnd]);

  // Auto-play Control
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsAutoPlaying(true);
    }
  };

  // FIXED: Image Handling with unique keys
  const getImageSource = useCallback((project, projectKey, attempt = 1) => {
    if (imageErrors[projectKey]) {
      return GENERIC_PLACEHOLDER;
    }

    const projectId = project.id?.toLowerCase();
    
    if (attempt === 1 && projectId && FALLBACK_IMAGES[projectId]) {
      return FALLBACK_IMAGES[projectId];
    }
    
    if (attempt <= 2 && project.image) {
      if (project.image.startsWith('http')) {
        return project.image;
      }
      
      if (project.image.startsWith('/')) {
        const baseUrl = process.env.NODE_ENV === 'production' 
          ? 'https://kyloreb.github.io/MyPortfolio'
          : process.env.PUBLIC_URL;
        return `${baseUrl}${project.image}`;
      }
      
      const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://kyloreb.github.io/MyPortfolio'
        : process.env.PUBLIC_URL;
      return `${baseUrl}/${project.image.replace(/^\//, '')}`;
    }
    
    if (attempt === 3 && projectId && FALLBACK_IMAGES[projectId]) {
      return FALLBACK_IMAGES[projectId];
    }
    
    return GENERIC_PLACEHOLDER;
  }, [FALLBACK_IMAGES, GENERIC_PLACEHOLDER, imageErrors]);

  const handleImageLoad = useCallback((projectKey) => {
    setLoadedImages(prev => ({ ...prev, [projectKey]: true }));
  }, []);

  const handleImageError = useCallback((projectKey, project, attempt = 1) => {
    if (attempt < 3) {
      setTimeout(() => {
        const img = new Image();
        img.onload = () => handleImageLoad(projectKey);
        img.onerror = () => handleImageError(projectKey, project, attempt + 1);
        img.src = getImageSource(project, projectKey, attempt + 1);
      }, 500);
    } else {
      setImageErrors(prev => ({ ...prev, [projectKey]: true }));
    }
  }, [getImageSource, handleImageLoad]);

  // FIXED: Preload images with unique keys
  const preloadImages = useCallback(() => {
    projects.forEach((project, index) => {
      const projectKey = `project-${project.id || index}`;
      const img = new Image();
      img.onload = () => handleImageLoad(projectKey);
      img.onerror = () => handleImageError(projectKey, project, 1);
      img.src = getImageSource(project, projectKey, 1);
    });
  }, [getImageSource, handleImageError, handleImageLoad]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // Project Card Interactions
  const toggleDescription = useCallback((projectId, event) => {
    event.stopPropagation();
    setExpandedDescriptions(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  }, []);

  const openProjectLink = useCallback((project, event) => {
    if (event.target.closest('.project-tag') || 
        event.target.closest('.project-links') ||
        event.target.closest('.see-more-btn')) {
      return;
    }
    
    const url = project.live || project.github;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  // FIXED: Project Card Renderer with unique keys
  const renderProjectCard = (project, slideIndex, cardIndex) => {
    const projectKey = `slide-${slideIndex}-card-${cardIndex}-${project.id || `project-${slideIndex * projectsPerSlide + cardIndex}`}`;
    const isExpanded = expandedDescriptions[projectKey];
    const needsSeeMore = project.description.length > 120;
    const displayDescription = isExpanded 
      ? project.description 
      : (needsSeeMore ? `${project.description.substring(0, 120)}...` : project.description);

    return (
      <div 
        key={projectKey} 
        className={`project-card ${projectsInView ? 'project-animate-in' : ''}`}
        style={{ animationDelay: `${cardIndex * 0.1}s` }}
        onClick={(e) => openProjectLink(project, e)}
        data-project-key={projectKey}
        role="article"
        aria-label={`${project.title} project card`}
        ref={el => cardsRef.current[projectKey] = el}
      >
        <div className="project-image-container">
          <div className="project-image">
            {!loadedImages[projectKey] && !imageErrors[projectKey] && (
              <div className="image-skeleton">
                <div className="skeleton-loader"></div>
              </div>
            )}
            <img 
              src={getImageSource(project, projectKey, 1)}
              alt={`${project.title} - Project Screenshot`}
              onLoad={() => handleImageLoad(projectKey)}
              onError={() => handleImageError(projectKey, project, 1)}
              className={`${
                loadedImages[projectKey] ? 'loaded' : 'loading'
              } ${
                imageErrors[projectKey] ? 'image-error' : ''
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

        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-description-container">
            <p className={`project-description ${isExpanded ? 'expanded' : ''}`}>
              {displayDescription}
              {needsSeeMore && !isExpanded && (
                <button 
                  className="see-more-btn inline"
                  onClick={(e) => toggleDescription(projectKey, e)}
                  aria-label="Show more"
                >
                  See More
                </button>
              )}
            </p>
            {needsSeeMore && isExpanded && (
              <button 
                className="see-more-btn"
                onClick={(e) => toggleDescription(projectKey, e)}
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
  };

  return (
    <section 
      id="projects" 
      ref={ref}
      className="projects-section"
    >
      <div className="projects-container">
        <h2 className="section-title">My Projects</h2>
        
        {/* Carousel Container */}
        <div 
          className="projects-carousel-wrapper"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="projects-carousel"
            ref={carouselRef}
          >
            {/* Slides */}
            <div 
              className="carousel-track"
              ref={trackRef}
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div 
                  key={`slide-${slideIndex}`} 
                  className="carousel-slide"
                  aria-hidden={currentSlide !== slideIndex}
                >
                  <div className="projects-grid">
                    {getProjectsForSlide(slideIndex).map((project, cardIndex) => 
                      renderProjectCard(project, slideIndex, cardIndex)
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              className="carousel-arrow carousel-arrow-prev"
              onClick={prevSlide}
              aria-label="Previous projects"
            >
              ‹
            </button>
            <button 
              className="carousel-arrow carousel-arrow-next"
              onClick={nextSlide}
              aria-label="Next projects"
            >
              ›
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="carousel-indicators-container">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Swipe hint for mobile users */}
        <div className="swipe-hint">
          ← Swipe to navigate →
        </div>
      </div>
    </section>
  );
};

export default Projects;