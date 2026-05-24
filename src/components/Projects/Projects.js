import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, projectFilters } from '../../data/projectsData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import ProjectModal from './ProjectModal';
import { ChevronLeft, ChevronRight, GitHubIcon, ExpandIcon } from './Icons';
import { ITEMS_PER_PAGE, PAGE_SPRING, PAGE_OPACITY, resolveImg } from './projectsConstants';
import './Projects.css';

/** Direction-aware page transition variants for the project grid. */
const pageVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 })
};

const Projects = () => {
  /* ── State ─────────────────────────────────── */

  const [ref, projectsInView] = useIntersectionObserver({ threshold: 0.05 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);

  /* ── Derived Data ──────────────────────────── */

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const visibleProjects = filteredProjects.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  /* ── Event Handlers ────────────────────────── */

  const goNext = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  }, [currentPage, totalPages]);

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  }, [currentPage]);

  const handleFilterChange = useCallback((id) => {
    setActiveFilter(id);
    setCurrentPage(0);
    setDirection(0);
  }, []);

  /* ── Render ────────────────────────────────── */

  return (
    <section id="projects" ref={ref} className="projects-section">
      <div className="projects-container">

        {/* Section Heading */}
        <motion.h2
          className="projects-section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h2>

        {/* Filter Pills */}
        <motion.div
          className="projects-filter"
          initial={{ opacity: 0, y: 10 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {projectFilters.map((f) => (
            <button
              key={f.id}
              className={`project-filter-pill ${activeFilter === f.id ? 'active' : ''}`}
              style={{
                '--pill-color': f.color || 'var(--primary-color)',
                borderColor:
                  activeFilter === f.id
                    ? f.color || 'var(--primary-color)'
                    : 'transparent',
              }}
              onClick={() => handleFilterChange(f.id)}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Paginated Grid */}
        <div className="projects-carousel-wrapper">

          {/* Prev / Next Arrows */}
          {totalPages > 1 && currentPage > 0 && (
            <button className="projects-carousel-arrow prev" onClick={goPrev} aria-label="Previous page">
              <ChevronLeft size={20} />
            </button>
          )}
          {totalPages > 1 && currentPage < totalPages - 1 && (
            <button className="projects-carousel-arrow next" onClick={goNext} aria-label="Next page">
              <ChevronRight size={20} />
            </button>
          )}

          <div className="projects-carousel-track">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={`${activeFilter}-${currentPage}`}
                className="projects-grid"
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: PAGE_SPRING, opacity: PAGE_OPACITY }}
              >
                {visibleProjects.map((project, i) => {
                  const globalIndex = currentPage * ITEMS_PER_PAGE + i;
                  return (
                    <motion.article key={project.id} className="project-card" layout>
                      {/* Clickable image that opens the modal */}
                      <button
                        className="project-image-wrapper"
                        onClick={() => setModalIndex(globalIndex)}
                        aria-label={`View ${project.title} screenshots`}
                        type="button"
                      >
                        <div className="project-image">
                          <img
                            src={resolveImg(project.image)}
                            alt={`${project.title} screenshot`}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        {/* GitHub link badge (overlaid on image) */}
                        <div className="project-image-links">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link-icon"
                              aria-label={`View ${project.title} source code`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <GitHubIcon size={18} />
                            </a>
                          )}
                        </div>

                        <div className="project-image-gradient" />
                        <div className="project-image-expand-hint">
                          <ExpandIcon size={18} />
                        </div>
                      </button>

                      {/* Card text body */}
                      <div className="project-body">
                        <h3 className="project-title">{project.title}</h3>
                        <div className="project-description">
                          <p>{project.description}</p>
                        </div>
                        <div className="project-tags">
                          {project.tags.map((tag) => (
                            <span key={tag} className="project-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="projects-carousel-dots">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`projects-carousel-dot ${i === currentPage ? 'active' : ''}`}
                onClick={() => {
                  setDirection(i > currentPage ? 1 : -1);
                  setCurrentPage(i);
                }}
                aria-label={`Go to page ${i + 1}`}
                type="button"
              />
            ))}
          </div>
        )}

        {/* Empty state when filter yields no results */}
        {filteredProjects.length === 0 && (
          <p className="projects-empty">No projects match this category.</p>
        )}

      </div>

      {/* Full-screen project detail modal */}
      {modalIndex !== null && (
        <ProjectModal
          projects={filteredProjects}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onNavigate={(idx) => setModalIndex(idx)}
          resolveImg={resolveImg}
        />
      )}
    </section>
  );
};

export default Projects;
