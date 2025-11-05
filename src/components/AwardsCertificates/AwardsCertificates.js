// AwardsCertificates.js - Updated mobile layout with 3 items per row
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { awardsCertificates } from '../../data/awardsCertificates';
import AwardsModal from './Modal';
import './AwardsCertificates.css';

const AwardsCertificates = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [imageLoaded, setImageLoaded] = useState({});
  const [visibleItems, setVisibleItems] = useState(9); // Show multiples of 3 for mobile
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let items = awardsCertificates;
    
    if (filter !== 'all') {
      items = items.filter(item => item.type === filter);
    }
    
    if (sortBy === 'alphabetical') {
      items = [...items].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'date') {
      items = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return items;
  }, [filter, sortBy]);

  // Lazy loaded items
  const displayedItems = useMemo(() => {
    return filteredAndSortedItems.slice(0, visibleItems);
  }, [filteredAndSortedItems, visibleItems]);

  // Handle scroll for lazy loading
  const handleScroll = useCallback(() => {
    if (!gridRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 100 && visibleItems < filteredAndSortedItems.length) {
      setVisibleItems(prev => Math.min(prev + 6, filteredAndSortedItems.length));
    }
  }, [visibleItems, filteredAndSortedItems.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    
    if (Math.abs(diff) > minSwipeDistance) {
      // Optional: Add swipe navigation between items
      console.log('Swipe detected:', diff > 0 ? 'left' : 'right');
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
  }, []);

  // Handle image load
  const handleImageLoad = useCallback((id) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  }, []);

  // Handle item click
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Close modal
  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  // Handle modal backdrop click
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setSelectedItem(null);
    }
  }, []);

  // Handle keyboard events for accessibility
  const handleKeyDown = useCallback((e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedItem(item);
    }
  }, []);

  // Handle PDF view
  const handleViewPDF = useCallback((pdfUrl, e) => {
    e?.stopPropagation();
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  }, []);

  // Handle verification URL
  const handleVerify = useCallback((verifyUrl, e) => {
    e?.stopPropagation();
    if (verifyUrl) {
      window.open(verifyUrl, '_blank', 'noopener,noreferrer');
    }
  }, []);

  // Reset visible items when filter/sort changes
  useEffect(() => {
    setVisibleItems(9); // Reset to multiple of 3
  }, [filter, sortBy]);

  return (
    <section 
      id="awards-certificates" 
      className="awards-certificates-section"
      ref={sectionRef}
    >
      <div className="container">
        <h2 className={`section-title ${isInView ? 'animate-in' : ''}`}>
          Awards & Certificates
        </h2>
        <p className={`section-subtitle ${isInView ? 'animate-in' : ''}`}>
          Recognition and certifications that showcase my expertise and achievements
        </p>

        {/* Filter and Sort Controls */}
        <div className={`controls-container ${isInView ? 'animate-in' : ''}`}>
          <div className="filter-container">
            <FilterButton
              type="all"
              label="All"
              active={filter === 'all'}
              onClick={setFilter}
            />
            <FilterButton
              type="award"
              label="🏆 Awards"
              active={filter === 'award'}
              onClick={setFilter}
            />
            <FilterButton
              type="certificate"
              label="📜 Certificates"
              active={filter === 'certificate'}
              onClick={setFilter}
            />
          </div>

          <div className="sort-container">
            <label htmlFor="sort-select" className="sort-label">Sort by:</label>
            <select 
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Date (Newest)</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Items Grid with Horizontal Scroll on Mobile */}
        <div 
          className={`items-grid ${isInView ? 'animate-in' : ''}`}
          ref={gridRef}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {displayedItems.map((item, index) => (
            <ItemCard 
              key={item.id} 
              item={item}
              index={index}
              onItemClick={handleItemClick}
              onKeyDown={handleKeyDown}
              imageLoaded={imageLoaded[item.id]}
              onImageLoad={handleImageLoad}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visibleItems < filteredAndSortedItems.length && (
          <div className="load-more-container">
            <button 
              className="load-more-btn"
              onClick={() => setVisibleItems(prev => Math.min(prev + 9, filteredAndSortedItems.length))}
            >
              Load More ({filteredAndSortedItems.length - visibleItems} remaining)
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedItems.length === 0 && (
          <div className="empty-state">
            <p>No {filter === 'all' ? 'items' : filter + 's'} found.</p>
          </div>
        )}

        {/* Mobile Scroll Indicator */}
        <div className="mobile-scroll-indicator">
          <span>← Swipe to view more →</span>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <AwardsModal
          item={selectedItem}
          onClose={handleCloseModal}
          onBackdropClick={handleBackdropClick}
          onViewPDF={handleViewPDF}
          onVerify={handleVerify}
          imageLoaded={imageLoaded[selectedItem.id]}
          onImageLoad={handleImageLoad}
        />
      )}
    </section>
  );
};

// Filter Button Component
const FilterButton = React.memo(({ type, label, active, onClick }) => (
  <button
    className={`filter-btn ${active ? 'active' : ''}`}
    onClick={() => onClick(type)}
    aria-pressed={active}
  >
    {label}
  </button>
));

// Image Component with Lazy Loading
const ImageComponent = React.memo(({ item, isModal = false, imageLoaded, onImageLoad }) => (
  <div className={`image-wrapper ${isModal ? 'modal-image-wrapper' : 'card-image-wrapper'}`}>
    {!imageLoaded && (
      <div className="image-skeleton">
        <div className="skeleton-shimmer"></div>
      </div>
    )}
    <img 
      src={item.image} 
      alt={item.title}
      className={`item-image ${isModal ? 'modal-image' : 'card-image'} ${imageLoaded ? 'image-loaded' : 'image-loading'}`}
      onLoad={() => onImageLoad(item.id)}
      loading="lazy"
      style={isModal ? { maxHeight: '300px', width: 'auto', objectFit: 'contain' } : {}}
    />
  </div>
));

// External Link Icon Component
const ExternalLinkIcon = React.memo(({ className = '' }) => (
  <svg 
    className={`external-link-icon ${className}`}
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
));

// Type Icon Component for Mobile
const TypeIcon = React.memo(({ type, className = '' }) => (
  <div className={`type-icon ${type} ${className}`} aria-label={type === 'award' ? 'Award' : 'Certificate'}>
    {type === 'award' ? '🏆' : '📜'}
  </div>
));

// Award/Certificate Card Component
const ItemCard = React.memo(({ item, onItemClick, onKeyDown, imageLoaded, onImageLoad, isInView, index }) => {
  const handleClick = () => {
    onItemClick(item);
  };

  const handleKeyPress = (e) => {
    onKeyDown(e, item);
  };

  return (
    <div 
      className={`item-card ${isInView ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${item.title}`}
    >
      <div className="item-media-container">
        <ImageComponent 
          item={item} 
          isModal={false}
          imageLoaded={imageLoaded}
          onImageLoad={onImageLoad}
        />
        {/* Mobile Type Icon - Only icon on mobile, full badge on desktop */}
        <div className="item-type-badge">
          <span className="badge-text">{item.type === 'award' ? '🏆 Award' : '📜 Certificate'}</span>
          <TypeIcon type={item.type} className="badge-icon" />
        </div>
      </div>
      
      <div className="item-content">
        <div className="item-title-container">
          <h3 className="item-title">{item.title}</h3>
          {item.verifyUrl && (
            <ExternalLinkIcon className="item-title-icon" />
          )}
        </div>
        
        {/* Desktop-only content */}
        <div className="desktop-content">
          <p className="item-issuer">{item.issuer}</p>
          <p className="item-date">{item.date}</p>
          
          <div className="item-tags">
            {item.tags.map((tag, index) => (
              <span key={index} className="item-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default React.memo(AwardsCertificates);