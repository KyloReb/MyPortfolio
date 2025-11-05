// Skills.js - Cleaned version with mobile-only swipe
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { skills } from '../../data/skillsData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Skills.css';

const Skills = () => {
  const [ref, skillsInView] = useIntersectionObserver({ threshold: 0.1 });
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate donut chart values
  const calculateDonutValues = useCallback((level) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (level / 100) * circumference;
    return { radius, circumference, offset };
  }, []);

  // Generate glow effect color
  const getGlowColor = useCallback((level, index) => {
    const hue = (index * 137.5) % 360;
    return `hsla(${hue}, 80%, 60%, 0.6)`;
  }, []);

  // Track which skills have been animated
  useEffect(() => {
    if (skillsInView) {
      const timer = setTimeout(() => {
        setAnimatedSkills(skills.map(skill => skill.id || skill.name));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [skillsInView]);

  // Smart slide grouping
  const getOptimalSlides = useCallback(() => {
    const skillsPerSlideDesktop = 12;
    const skillsPerSlideMobile = 9; // 3 columns × 3 rows = 9 skills per slide
    
    const skillsPerSlide = isMobile ? skillsPerSlideMobile : skillsPerSlideDesktop;
    const slides = [];
    
    let currentIndex = 0;
    while (currentIndex < skills.length) {
      const remainingSkills = skills.length - currentIndex;
      
      if (remainingSkills < skillsPerSlide && remainingSkills > 0) {
        if (remainingSkills <= skillsPerSlide / 2 && slides.length > 0) {
          const lastSlide = slides[slides.length - 1];
          const remainingItems = skills.slice(currentIndex);
          
          const maxReasonableItems = skillsPerSlide * 1.5;
          if (lastSlide.length + remainingItems.length <= maxReasonableItems) {
            slides[slides.length - 1] = [...lastSlide, ...remainingItems];
            break;
          }
        }
      }
      
      const slideSkills = skills.slice(currentIndex, currentIndex + skillsPerSlide);
      slides.push(slideSkills);
      currentIndex += skillsPerSlide;
    }
    
    return { slides };
  }, [isMobile]);

  const { slides: skillSlides } = getOptimalSlides();
  const totalSlides = skillSlides.length;
  const currentSkills = skillSlides[currentSlide] || [];

  // Auto-advance slides
  useEffect(() => {
    if (!autoPlay || !skillsInView || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, skillsInView, totalSlides]);

  // Mobile-only swipe gestures
  const bind = useDrag(
    ({ swipe: [swipeX], last, first }) => {
      if (totalSlides <= 1) return;
      
      if (first) {
        setAutoPlay(false);
      }
      
      if (last) {
        // Re-enable autoplay after 3 seconds
        setTimeout(() => setAutoPlay(true), 3000);
        
        // Handle swipe
        if (swipeX !== 0) {
          const dir = swipeX > 0 ? -1 : 1;
          setDirection(dir);
          
          // Add haptic feedback if available
          if ('vibrate' in navigator) {
            navigator.vibrate(10);
          }
          
          setCurrentSlide((prev) => {
            const nextSlide = prev + dir;
            if (nextSlide < 0) return totalSlides - 1;
            if (nextSlide >= totalSlides) return 0;
            return nextSlide;
          });
        }
      }
    },
    {
      enabled: isMobile, // Only enable on mobile
      filterTaps: true,
      axis: 'x',
      swipe: {
        duration: 500,
        distance: 50
      }
    }
  );

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Simplified animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };

  // Render individual donut chart
  const renderDonutChart = useCallback((skill, index) => {
    const { circumference, offset } = calculateDonutValues(skill.level);
    const gradientId = `skill-gradient-${skill.id || skill.name.replace(/\s+/g, '-')}`;
    const isAnimated = animatedSkills.includes(skill.id || skill.name);
    const animationDelay = `${index * 150}ms`;

    return (
      <motion.div 
        key={skill.id || skill.name}
        className="skill-donut-item"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          ease: [0.22, 0.61, 0.36, 1]
        }}
        whileHover={{ 
          scale: 1.05,
          y: -8,
          transition: { duration: 0.3 }
        }}
      >
        <div className="donut-chart-container">
          <svg 
            className="donut-chart-svg"
            width="140" 
            height="140" 
            viewBox="0 0 140 140"
          >
            <defs>
              <linearGradient 
                id={gradientId} 
                x1="0%" 
                y1="0%" 
                x2="100%" 
                y2="100%"
              >
                <stop offset="0%" stopColor={`hsl(${(index * 137.5) % 360}, 80%, 55%)`} />
                <stop offset="50%" stopColor={`hsl(${(index * 137.5 + 30) % 360}, 90%, 45%)`} />
                <stop offset="100%" stopColor={`hsl(${(index * 137.5 + 60) % 360}, 85%, 50%)`} />
              </linearGradient>
            </defs>
            
            {/* Background circle */}
            <circle
              cx="70"
              cy="70"
              r="40"
              fill="none"
              stroke="var(--donut-bg)"
              strokeWidth="12"
              className="donut-background"
            />
            
            {/* Progress circle with gradient */}
            <circle
              cx="70"
              cy="70"
              r="40"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={isAnimated ? offset : circumference}
              transform="rotate(-90 70 70)"
              className="donut-progress"
              style={{
                transition: `stroke-dashoffset 1.8s cubic-bezier(0.22, 0.61, 0.36, 1) ${animationDelay}`,
                filter: isAnimated ? `drop-shadow(0 0 8px ${getGlowColor(skill.level, index)})` : 'none'
              }}
            />
            
            {/* Pulsing effect circle */}
            <circle
              cx="70"
              cy="70"
              r="40"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={isAnimated ? offset : circumference}
              transform="rotate(-90 70 70)"
              className="donut-pulse"
              style={{
                transition: `stroke-dashoffset 1.8s cubic-bezier(0.22, 0.61, 0.36, 1) ${animationDelay}`,
                animationDelay: isAnimated ? `${index * 150 + 1800}ms` : '0ms'
              }}
            />
          </svg>
          
          {/* Center content */}
          <div className="donut-center-content">
            {skill.icon && (
              <motion.img 
                src={skill.icon} 
                alt=""
                className="donut-icon"
                loading="lazy"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.span 
              className="donut-percentage"
              animate={isAnimated ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3, delay: index * 0.15 + 1.8 }}
            >
              {isAnimated ? skill.level : 0}%
            </motion.span>
          </div>
        </div>
        
        {/* Skill name */}
        <motion.div 
          className="skill-name"
          whileHover={{ color: 'var(--primary-color)', y: 2 }}
          transition={{ duration: 0.3 }}
        >
          {skill.name}
        </motion.div>
      </motion.div>
    );
  }, [animatedSkills, calculateDonutValues, getGlowColor]);

  return (
    <section 
      id="skills" 
      ref={ref}
      className="skills-section"
      onMouseEnter={() => !isMobile && setAutoPlay(false)}
      onMouseLeave={() => !isMobile && setAutoPlay(true)}
    >
      <div className="skills-container">
        <h2 className="skills-section-title">Technical Skills</h2>
        
        <div className="skills-carousel">
          {/* Navigation buttons - desktop only */}
          {totalSlides > 1 && !isMobile && (
            <>
              <button 
                className="carousel-nav-btn carousel-nav-prev"
                onClick={prevSlide}
                aria-label="Previous skills"
              >
                ‹
              </button>
              
              <button 
                className="carousel-nav-btn carousel-nav-next"
                onClick={nextSlide}
                aria-label="Next skills"
              >
                ›
              </button>
            </>
          )}
          
          <div 
            className={`skills-carousel-track ${isMobile ? 'swipeable' : ''}`}
            {...(isMobile ? bind() : {})}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                className="skills-donut-grid"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                {currentSkills.map((skill, index) => renderDonutChart(skill, index))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Swipe hint for mobile */}
          {isMobile && totalSlides > 1 && (
            <div className="swipe-hint-container">
              <div className="swipe-hint">
                <span className="swipe-arrow">←</span>
                Swipe to explore
                <span className="swipe-arrow">→</span>
              </div>
            </div>
          )}
          
          {/* Carousel indicators */}
          {totalSlides > 1 && (
            <div className="skills-carousel-controls">
              <div className="carousel-indicators">
                {Array.from({ length: totalSlides }, (_, i) => (
                  <button
                    key={i}
                    className={`carousel-indicator ${i === currentSlide ? 'active' : ''}`}
                    onClick={() => {
                      const newDirection = i > currentSlide ? 1 : -1;
                      setDirection(newDirection);
                      setCurrentSlide(i);
                    }}
                    aria-label={`Go to slide ${i + 1}`}
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