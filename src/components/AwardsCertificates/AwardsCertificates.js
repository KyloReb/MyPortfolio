// AwardsCertificates.js - Refactored with separate modal
import React, { useState, useCallback, useMemo } from 'react';
import { awardsCertificates } from '../../data/awardsCertificates';
import AwardsModal from './Modal';
import './AwardsCertificates.css';

const AwardsCertificates = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('all');
  const [imageLoaded, setImageLoaded] = useState({});

  // Filter items based on selection
  const filteredItems = useMemo(() => {
    if (filter === 'all') return awardsCertificates;
    return awardsCertificates.filter(item => item.type === filter);
  }, [filter]);

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
    e.stopPropagation();
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  }, []);

  // Handle verification URL
  const handleVerify = useCallback((verifyUrl, e) => {
    e.stopPropagation();
    if (verifyUrl) {
      window.open(verifyUrl, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <section id="awards-certificates" className="awards-certificates-section">
      <div className="container">
        <h2 className="section-title">
          Awards & Certificates
        </h2>
        <p className="section-subtitle">
          Recognition and certifications that showcase my expertise and achievements
        </p>

        {/* Filter Buttons */}
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

        {/* Items Grid */}
        <div className="items-grid">
          {filteredItems.map((item) => (
            <ItemCard 
              key={item.id} 
              item={item}
              onItemClick={handleItemClick}
              onKeyDown={handleKeyDown}
              imageLoaded={imageLoaded[item.id]}
              onImageLoad={handleImageLoad}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="empty-state">
            <p>No {filter === 'all' ? 'items' : filter + 's'} found.</p>
          </div>
        )}
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

// Image Component
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

// Award/Certificate Card Component
const ItemCard = React.memo(({ item, onItemClick, onKeyDown, imageLoaded, onImageLoad }) => {
  const handleClick = () => {
    onItemClick(item);
  };

  const handleKeyPress = (e) => {
    onKeyDown(e, item);
  };

  return (
    <div 
      className="item-card"
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
        <div className="item-type-badge">
          {item.type === 'award' ? '🏆 Award' : '📜 Certificate'}
        </div>
      </div>
      
      <div className="item-content">
        <div className="item-title-container">
          <h3 className="item-title">{item.title}</h3>
          {item.verifyUrl && (
            <ExternalLinkIcon className="item-title-icon" />
          )}
        </div>
        <p className="item-issuer">{item.issuer}</p>
        <p className="item-date">{item.date}</p>
        
        <div className="item-tags">
          {item.tags.map((tag, index) => (
            <span key={index} className="item-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default React.memo(AwardsCertificates);