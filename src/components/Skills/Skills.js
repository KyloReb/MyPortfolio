import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../../data/skillsData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Skills.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const skillVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }
  }
};

const RING_RADIUS = 40;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const AnimatedCount = ({ to, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const steps = 20;
      const increment = to / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= to) {
          setCount(to);
          clearInterval(interval);
        } else {
          setCount(Math.round(current));
        }
      }, 30 / steps);
    }, delay * 1000);
    return () => {
      clearTimeout(timer);
      setCount(0);
    };
  }, [to, delay]);

  return <>{count}</>;
};

const SkillRing = ({ level, color, delay, inView, hoverKey }) => (
  <motion.div
    className="skill-ring-wrapper"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={inView ? { scale: 1, opacity: 1 } : {}}
    transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay }}
  >
    <svg viewBox="0 0 100 100" className="skill-ring-svg">
      <circle
        cx="50" cy="50" r={RING_RADIUS}
        fill="none" stroke="currentColor" strokeWidth="5"
        className="skill-ring-bg"
      />
      <motion.circle
        cx="50" cy="50" r={RING_RADIUS}
        fill="none" stroke={color} strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={RING_CIRCUMFERENCE}
        initial={{ strokeDashoffset: RING_CIRCUMFERENCE }}
        animate={inView ? { strokeDashoffset: RING_CIRCUMFERENCE * (1 - level / 100) } : {}}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay }}
        transform="rotate(-90 50 50)"
        className="skill-ring-fill"
        style={{ '--glow-color': color }}
      />
    </svg>
    <span className="skill-ring-value">
      <AnimatedCount key={hoverKey} to={level} delay={delay} />
      <span className="skill-ring-percent">%</span>
    </span>
  </motion.div>
);

const Skills = () => {
  const [ref, skillsInView] = useIntersectionObserver({ threshold: 0.08 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const visibleCategories = useMemo(() => {
    if (activeCategory === 'all') return skillCategories;
    return skillCategories.filter(c => c.id === activeCategory);
  }, [activeCategory]);

  const renderSkillContent = () => {
    const rows = [
      { anchor: 'frontend', partners: ['backend'] },
      { anchor: 'database', partners: ['gamedev', 'tools'] },
    ];
    const skipped = new Set(rows.flatMap(r => [r.anchor, ...r.partners]).filter(id => id !== rows[0].anchor));

    const renderCol = (col) => (
      <div key={col.id} className="skill-col">
        <div className="skill-category-heading" style={{ '--accent': col.color }}>
          <span className="skill-category-dot" style={{ background: col.color }} />
          <span className="skill-category-name">{col.label}</span>
        </div>
        <div className="skill-grid">
          {col.skills.map((skill, idx) => {
            const delay = 0.1 + idx * 0.06;
            return (
              <motion.div
                key={skill.name}
                className="skill-card"
                variants={skillVariants}
                style={{ '--card-accent': col.color }}
                onMouseEnter={() => setHoveredCard(skill.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <SkillRing level={skill.level} color={col.color} delay={delay} inView={skillsInView} hoverKey={hoveredCard === skill.name ? Date.now() : 0} />
                <div className="skill-card-info">
                  {skill.icon && <img src={skill.icon} alt="" className="skill-card-icon" loading="lazy" />}
                  <span className="skill-card-name">{skill.name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );

    const items = [];
    for (const row of rows) {
      const anchor = visibleCategories.find(c => c.id === row.anchor);
      const partners = row.partners.map(id => visibleCategories.find(c => c.id === id));
      if (!anchor || partners.some(p => !p)) continue;
      items.push(
        <div key={`row-${row.anchor}`} className="skill-row-pair">
          {[anchor, ...partners].map(renderCol)}
        </div>
      );
    }

    visibleCategories.forEach(category => {
      if (!skipped.has(category.id)) {
        const isInRow = rows.some(r => r.anchor === category.id || r.partners.includes(category.id));
        if (!isInRow) {
          items.push(
            <div key={category.id} className="skill-category-block">
              <div className="skill-category-heading" style={{ '--accent': category.color }}>
                <span className="skill-category-dot" style={{ background: category.color }} />
                <span className="skill-category-name">{category.label}</span>
              </div>
              <div className="skill-grid">
                {category.skills.map((skill, idx) => {
                  const delay = 0.1 + idx * 0.06;
                  return (
                    <motion.div
                      key={skill.name}
                      className="skill-card"
                      variants={skillVariants}
                      style={{ '--card-accent': category.color }}
                      onMouseEnter={() => setHoveredCard(skill.name)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <SkillRing level={skill.level} color={category.color} delay={delay} inView={skillsInView} hoverKey={hoveredCard === skill.name ? Date.now() : 0} />
                      <div className="skill-card-info">
                        {skill.icon && (
                          <img
                            src={skill.icon}
                            alt=""
                            className="skill-card-icon"
                            loading="lazy"
                          />
                        )}
                        <span className="skill-card-name">{skill.name}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        }
      }
    });
    return items;
  };

  return (
    <section id="skills" ref={ref} className="skills-section">
      <div className="skills-container">
        <motion.h2
          className="skills-section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Technical Skills
        </motion.h2>

        <motion.div
          className="skills-filter"
          initial={{ opacity: 0, y: 10 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <button
            className={`skill-filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              className={`skill-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
              style={{
                '--pill-color': cat.color,
                borderColor: activeCategory === cat.id ? cat.color : 'transparent'
              }}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="skills-content"
            variants={containerVariants}
            initial="hidden"
            animate={skillsInView ? 'visible' : 'hidden'}
            exit={{ opacity: 0, y: 20 }}
          >
            {renderSkillContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
