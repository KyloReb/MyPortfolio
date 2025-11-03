import React, { useState, useCallback, useEffect, useRef } from 'react';
import { skills } from '../../data/skillsData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Skills.css';

const Skills = () => {
  const [ref, skillsInView] = useIntersectionObserver({ threshold: 0.3 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const autoAdvanceRef = useRef(null);
  const sliderTrackRef = useRef(null);
  const sliderContainerRef = useRef(null);

  // Minimum swipe distance required (in pixels)
  const minSwipeDistance = 50;

  const skillsPerSlide = 4; // 2 rows × 2 columns
  const totalSlides = Math.ceil(skills.length / skillsPerSlide);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((slideIndex) => {
    setCurrentSlide(slideIndex);
  }, []);

  // Touch event handlers for swipe detection
  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  }, []);

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) {
      setIsSwiping(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && totalSlides > 1) {
      nextSlide();
    } else if (isRightSwipe && totalSlides > 1) {
      prevSlide();
    }
    
    setIsSwiping(false);
  }, [touchStart, touchEnd, minSwipeDistance, nextSlide, prevSlide, totalSlides]);

  // Mouse event handlers for hover detection
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Define gradient colors for different skill levels
  const getProgressGradient = useCallback((level) => {
    if (level >= 80) {
      return 'linear-gradient(90deg, var(--primary-color), var(--success-color))';
    } else if (level >= 60) {
      return 'linear-gradient(90deg, var(--primary-color), var(--warning-color))';
    } else {
      return 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))';
    }
  }, []);

  // Calculate and apply consistent heights for all skill cards
  const calculateAndApplyConsistentHeights = useCallback(() => {
    const allCards = document.querySelectorAll('.skill-card-equal');
    if (allCards.length === 0) return;

    // Reset heights first
    allCards.forEach(card => {
      card.style.height = 'auto';
    });

    // Force a reflow
    void document.body.offsetHeight;

    // Find the maximum height within the current slide only
    let maxHeight = 0;
    const currentSlideCards = document.querySelectorAll('.skills-slide.active .skill-card-equal');
    
    if (currentSlideCards.length > 0) {
      currentSlideCards.forEach(card => {
        const height = card.offsetHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      // Apply the maximum height to all cards in current slide
      if (maxHeight > 0) {
        currentSlideCards.forEach(card => {
          card.style.height = `${maxHeight}px`;
        });
      }
    }
  }, []);

  // Update active slide class for CSS targeting
  useEffect(() => {
    const slides = document.querySelectorAll('.skills-slide');
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    const timer = setTimeout(calculateAndApplyConsistentHeights, 100);
    return () => clearTimeout(timer);
  }, [currentSlide, calculateAndApplyConsistentHeights]);

  useEffect(() => {
    const handleResize = () => {
      calculateAndApplyConsistentHeights();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateAndApplyConsistentHeights]);

  // Auto-advance slides with hover interruption
  useEffect(() => {
    if (!skillsInView || totalSlides <= 1 || isHovering || isSwiping) return;
    
    autoAdvanceRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
        autoAdvanceRef.current = null;
      }
    };
  }, [skillsInView, nextSlide, totalSlides, isHovering, isSwiping]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
        autoAdvanceRef.current = null;
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!skillsInView || totalSlides <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skillsInView, prevSlide, nextSlide, totalSlides]);

  // Render skill card component
  const renderSkillCard = useCallback((skill, index, globalIndex) => (
    <div 
      key={globalIndex} 
      className={`skill-card-equal ${skillsInView ? 'skill-animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="skill-card-content">
        <div className="skill-header-equal">
          <div className="skill-name-container-equal">
            {skill.icon && (
              <img 
                src={skill.icon} 
                alt={`${skill.name} icon`}
                className="skill-icon-equal"
                loading="lazy"
              />
            )}
            <span className="skill-name-equal">{skill.name}</span>
          </div>
          <span className="skill-percentage-equal">{skill.level}%</span>
        </div>
        
        <div className="skill-progress-container-equal">
          <div className="skill-progress-bar-equal">
            <div 
              className={`skill-progress-fill-equal ${skillsInView ? 'skill-animate-width' : ''}`}
              style={{ 
                width: skillsInView ? `${skill.level}%` : '0%',
                background: getProgressGradient(skill.level),
                transitionDelay: `${index * 0.15 + 0.3}s`
              }}
            ></div>
          </div>
        </div>
        
        <div className="skill-level-indicator-equal">
          <div className="skill-level-dots-equal">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div 
                key={dot}
                className={`skill-level-dot-equal ${skill.level >= dot * 20 ? 'active' : ''}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ), [skillsInView, getProgressGradient]);

  return (
    <section 
      id="skills" 
      ref={ref}
      className="skills-section"
    >
      <div className="skills-container">
        <h2 className="skills-section-title">Technical Skills</h2>
        
        <div 
          className="skills-slider-container"
          ref={sliderContainerRef}
        >
          {totalSlides > 1 && (
            <>
              <button 
                className="skills-slider-arrow skills-slider-arrow-prev"
                onClick={prevSlide}
                aria-label="Previous skills"
                disabled={currentSlide === 0}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              
              <button 
                className="skills-slider-arrow skills-slider-arrow-next"
                onClick={nextSlide}
                aria-label="Next skills"
                disabled={currentSlide === totalSlides - 1}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </>
          )}

          <div 
            className="skills-slider-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              ref={sliderTrackRef}
              className="skills-slider-track"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: isSwiping ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div 
                  key={slideIndex}
                  className={`skills-slide ${slideIndex === currentSlide ? 'active' : ''}`}
                >
                  <div className="skills-grid-2x2">
                    {skills
                      .slice(
                        slideIndex * skillsPerSlide,
                        slideIndex * skillsPerSlide + skillsPerSlide
                      )
                      .map((skill, index) => {
                        const globalIndex = slideIndex * skillsPerSlide + index;
                        return renderSkillCard(skill, index, globalIndex);
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <div className="skills-slider-indicators-container">
              <div className="skills-slider-indicators">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    className={`skills-slider-indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to skills slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;