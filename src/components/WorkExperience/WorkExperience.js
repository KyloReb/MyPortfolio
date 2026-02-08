import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experienceData } from '../../data/experienceData';
import './WorkExperience.css';

const ExperienceCard = ({ experience, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isExpanded, setIsExpanded] = React.useState(true);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <motion.div
            ref={ref}
            className={`experience-card-container ${index % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
        >
            <div className="experience-marker"></div>
            <div
                className={`experience-card interactive ${isExpanded ? 'expanded' : ''}`}
                onClick={toggleExpand}
            >
                <div className="experience-header">
                    <div className="experience-role-company">
                        <h3 className="experience-role">{experience.role}</h3>
                        <div className="experience-company-wrapper">
                            {experience.logo && (
                                <img
                                    src={experience.logo}
                                    alt={`${experience.company} logo`}
                                    className="experience-company-logo"
                                />
                            )}
                            <h4 className="experience-company">{experience.company}</h4>
                        </div>
                    </div>
                    <div className="experience-date-toggle">
                        <span className="experience-date">{experience.date}</span>
                        <span className={`experience-toggle-icon ${isExpanded ? 'expanded' : ''}`}>
                            ▼
                        </span>
                    </div>
                </div>

                <div className={`experience-details ${isExpanded ? 'show' : ''}`}>
                    <p className="experience-description">{experience.description}</p>
                    <div className="experience-tags">
                        {experience.technologies.map((tech, i) => (
                            <span key={i} className="experience-tag">{tech}</span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const WorkExperience = () => {
    return (
        <section id="experience" className="experience-section">
            <div className="experience-container">
                <h2 className="section-title">Work Experience</h2>
                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    {experienceData.map((experience, index) => (
                        <ExperienceCard key={experience.id} experience={experience} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkExperience;
