import React, { useEffect, useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, CloseIcon, GitHubIcon } from './Icons';
import {
  SWIPE_THRESHOLD,
  CONTENT_EASING,
  CONTENT_DURATION,
} from './projectsConstants';
import './ProjectModal.css';

/** Fade animation for the overlay background. */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/** Scale-up entrance for the modal card itself. */
const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] },
  },
};

/** Cross-fade when switching between projects inside the modal. */
const contentVariants = {
  enter: { opacity: 0, scale: 0.97 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
};

const ProjectModal = ({ projects, currentIndex, onClose, onNavigate, resolveImg }) => {
  const project = projects[currentIndex];
  const screenshots = project.screenshots || [project.image];
  const [screenshotIdx, setScreenshotIdx] = useState(0);
  const totalScreenshots = screenshots.length;
  const [swipeStart, setSwipeStart] = useState(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const swipeRef = useRef(null);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < projects.length - 1;

  /* ── Project Navigation ──────────────────── */

  const goNextProject = useCallback(() => {
    if (hasNext) {
      setScreenshotIdx(0);
      onNavigate(currentIndex + 1);
    }
  }, [hasNext, currentIndex, onNavigate]);

  const goPrevProject = useCallback(() => {
    if (hasPrev) {
      setScreenshotIdx(0);
      onNavigate(currentIndex - 1);
    }
  }, [hasPrev, currentIndex, onNavigate]);

  /* ── Screenshot Carousel ─────────────────── */

  const nextScreenshot = useCallback(() => {
    setScreenshotIdx((prev) => (prev + 1) % totalScreenshots);
  }, [totalScreenshots]);

  const prevScreenshot = useCallback(() => {
    setScreenshotIdx((prev) => (prev - 1 + totalScreenshots) % totalScreenshots);
  }, [totalScreenshots]);

  /* ── Keyboard Support ─────────────────────── */

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevScreenshot();
      if (e.key === 'ArrowRight') nextScreenshot();
    },
    [onClose, prevScreenshot, nextScreenshot]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    setScreenshotIdx(0);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, currentIndex]);

  /* ── Touch Swipe (mobile project switching) ─ */

  const handleTouchStart = (e) => {
    setSwipeStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    setSwipeOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!swipeStart) return;
    const dx = e.touches[0].clientX - swipeStart.x;
    setSwipeOffset(dx);
  };

  const handleTouchEnd = () => {
    if (!swipeStart) return;
    if (swipeOffset > SWIPE_THRESHOLD && hasPrev) goPrevProject();
    else if (swipeOffset < -SWIPE_THRESHOLD && hasNext) goNextProject();
    setSwipeStart(null);
    setSwipeOffset(0);
  };

  /* ── Render (portal to document.body) ────── */

  return createPortal(
    <AnimatePresence>
      {/* Overlay backdrop */}
      <motion.div
        className="project-modal-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        {/* Modal card */}
        <motion.div
          className="project-modal-content"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button (top-right corner) */}
          <button className="project-modal-close" onClick={onClose} aria-label="Close" type="button">
            <CloseIcon size={20} />
          </button>

          {/* Prev / Next project arrows */}
          <div className="project-modal-nav">
            {hasPrev && (
              <button
                className="project-modal-nav-btn prev"
                onClick={goPrevProject}
                aria-label="Previous project"
                type="button"
              >
                <ChevronLeft size={22} strokeWidth={2} />
              </button>
            )}
            {hasNext && (
              <button
                className="project-modal-nav-btn next"
                onClick={goNextProject}
                aria-label="Next project"
                type="button"
              >
                <ChevronRight size={22} strokeWidth={2} />
              </button>
            )}
          </div>

          {/* Gallery + details (animated between projects) */}
          <div
            className="project-modal-body"
            ref={swipeRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={
              swipeStart
                ? { transform: `translateX(${swipeOffset * 0.3}px)`, transition: 'none' }
                : {}
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: CONTENT_DURATION, ease: CONTENT_EASING }}
                className="project-modal-inner"
              >
                {/* Screenshot gallery */}
                <div className="project-modal-gallery">
                  <div className="project-modal-counter">
                    {currentIndex + 1} / {projects.length}
                  </div>

                  <div
                    className="project-modal-gallery-track"
                    style={{ transform: `translateX(-${screenshotIdx * 100}%)` }}
                  >
                    {screenshots.map((src, i) => (
                      <div key={i} className="project-modal-slide">
                        <img
                          src={resolveImg ? resolveImg(src) : src}
                          alt={`${project.title} screenshot ${i + 1}`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Screenshot-level nav buttons */}
                  {totalScreenshots > 1 && (
                    <>
                      <button
                        className="modal-gallery-btn modal-gallery-prev"
                        onClick={prevScreenshot}
                        aria-label="Previous screenshot"
                        type="button"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        className="modal-gallery-btn modal-gallery-next"
                        onClick={nextScreenshot}
                        aria-label="Next screenshot"
                        type="button"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}

                  {/* Screenshot position dots */}
                  <div className="modal-gallery-dots">
                    {Array.from({ length: totalScreenshots }, (_, i) => (
                      <button
                        key={i}
                        className={`modal-gallery-dot ${i === screenshotIdx ? 'active' : ''}`}
                        onClick={() => setScreenshotIdx(i)}
                        aria-label={`Go to screenshot ${i + 1}`}
                        type="button"
                      />
                    ))}
                  </div>
                </div>

                {/* Project info panel */}
                <div className="project-modal-info">
                  <h3 className="project-modal-title">{project.title}</h3>
                  <p className="project-modal-desc">{project.description}</p>
                  <div className="project-modal-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-modal-github"
                      >
                        <GitHubIcon size={16} />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
