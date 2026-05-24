import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { experienceData } from '../../data/experienceData';
import './WorkExperience.css';

function parseTimeline(dateStr) {
  const parts = dateStr.split('–').map(s => s.trim());
  const start = parts[0];
  const end = parts[1] || '';

  const startYear = start.match(/\d{4}/)?.[0] || '';
  const endDisplay = end === 'Present' ? 'Present' : end.match(/\w{3}\s*\d{4}/)?.[0] || end;

  const startDate = new Date(start);
  const endDate = end === 'Present' ? new Date() : new Date(end);

  let duration = '';
  if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12
      + (endDate.getMonth() - startDate.getMonth());
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const rem = months % 12;
      duration = rem > 0 ? `${years}yr ${rem}mo` : `${years}yr`;
      if (years > 1 && rem === 0) duration = `${years}yrs`;
    } else {
      duration = `${months}mo${months !== 1 ? 's' : ''}`;
    }
  }

  const startShort = start.replace(/\d{4}/, '').trim();
  const endShort = end === 'Present' ? end : end.replace(/\d{4}/, '').trim();

  return { startYear, endDisplay, startShort, endShort, duration };
}

const MonthBadge = ({ start, end }) => (
  <span className="month-badge">{start} – {end}</span>
);

const ExperienceCard = ({ experience, index, showYear }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isExpanded, setIsExpanded] = useState(false);
  const { startYear, endDisplay, startShort, endShort, duration } = parseTimeline(experience.date);

  const toggleExpand = () => setIsExpanded(prev => !prev);

  return (
    <motion.div
      ref={ref}
      className="timeline-entry"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {showYear ? (
        <div className="entry-year-block">
          <span className="entry-year">{startYear}</span>
          <MonthBadge start={startShort || startYear} end={endShort || endDisplay} />
          {duration && <span className="entry-duration">{duration}</span>}
        </div>
      ) : (
        <div className="entry-year-block entry-year-block--empty" />
      )}

      <div className="entry-connector">
        <div className="connector-dot" />
        <div className="connector-line" />
      </div>

      <div className="entry-card">
        <div className="card-accent-bar" />

        <div className="card-main" onClick={toggleExpand}>
          <div className="card-title-row">
            <div className="card-title-group">
              {experience.logo && (
                <img
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  className="card-company-logo"
                />
              )}
              <div>
                <h3 className="card-role">{experience.role}</h3>
                <h4 className="card-company">{experience.company}</h4>
              </div>
            </div>
            <span className={`card-toggle ${isExpanded ? 'open' : ''}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>

          <div className="card-tags">
            {experience.technologies.map((tech, i) => (
              <span key={i} className="card-tag">{tech}</span>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                className="card-details"
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <p className="card-description">{experience.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const WorkExperience = () => {
  const yearGroups = {};
  experienceData.forEach((exp, idx) => {
    const year = exp.date.match(/\d{4}/)?.[0] || 'unknown';
    if (!yearGroups[year]) yearGroups[year] = [];
    yearGroups[year].push(idx);
  });

  const firstInYear = new Set();
  Object.values(yearGroups).forEach(group => {
    if (group.length > 0) firstInYear.add(group[0]);
  });

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <h2 className="experience-section-title">Work Experience</h2>
        <div className="timeline-track" />
        <div className="timeline-entries">
          {experienceData.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              showYear={firstInYear.has(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
