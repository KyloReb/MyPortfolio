// AwardsModal.js
import React, { useCallback, useEffect } from 'react';
import './Modal.css';

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

// Image Component for Modal
const ModalImageComponent = React.memo(({ item, imageLoaded, onImageLoad }) => (
  <div className="modal-image-wrapper">
    {!imageLoaded && (
      <div className="image-skeleton">
        <div className="skeleton-shimmer"></div>
      </div>
    )}
    <img 
      src={item.image} 
      alt={item.title}
      className={`modal-image ${imageLoaded ? 'image-loaded' : 'image-loading'}`}
      onLoad={() => onImageLoad(item.id)}
      loading="lazy"
    />
  </div>
));

// Modal Component
const AwardsModal = React.memo(({ 
  item, 
  onClose, 
  onBackdropClick, 
  onViewPDF, 
  onVerify,
  imageLoaded,
  onImageLoad
}) => {
  // Handle keyboard events for modal close
  const handleModalKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Add effect to handle escape key when modal is open
  useEffect(() => {
    if (item) {
      document.addEventListener('keydown', handleModalKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleModalKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [item, handleModalKeyDown]);

  if (!item) return null;

  return (
    <div 
      className="modal-backdrop"
      onClick={onBackdropClick}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="modal-content">
        <button 
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        
        <div className="modal-body">
          <div className="modal-media-container">
            <div className="modal-media-section">
              <ModalImageComponent 
                item={item} 
                imageLoaded={imageLoaded}
                onImageLoad={onImageLoad}
              />
            </div>
            
            {item.verifyUrl && (
              <div className="verification-note">
                <p>
                  <strong>Verification:</strong> This {item.type} can be verified online through the issuer's official platform.
                </p>
              </div>
            )}
          </div>
          
          <div className="modal-details">
            <div className="modal-header">
              <div className="modal-badge">
                {item.type === 'award' ? '🏆 Award' : '📜 Certificate'}
              </div>
              <div className="modal-title-container">
                <h3 id="modal-title" className="modal-title">
                  {item.title}
                </h3>
                {item.verifyUrl && (
                  <ExternalLinkIcon className="modal-title-icon" />
                )}
              </div>
            </div>
            
            <div className="modal-meta">
              <p className="modal-issuer">
                <strong>Issuer:</strong> {item.issuer}
              </p>
              <p className="modal-date">
                <strong>Date:</strong> {item.date}
              </p>
              <p className="modal-expiration">
                <strong>Expiration:</strong> {item.expirationDate}
              </p>
              {item.credentialId && (
                <p className="modal-credential-id">
                  <strong>Credential ID:</strong> {item.credentialId}
                </p>
              )}
            </div>
            
            <p className="modal-description">
              {item.description}
            </p>
            
            <div className="modal-tags">
              {item.tags.map((tag, index) => (
                <span key={index} className="modal-tag">{tag}</span>
              ))}
            </div>
            
            <div className="modal-actions">
              {item.verifyUrl && (
                <button 
                  className="btn-verify"
                  onClick={(e) => onVerify(item.verifyUrl, e)}
                >
                  🌐 Verify Online
                </button>
              )}
              {item.pdf && (
                <button 
                  className="btn-primary"
                  onClick={(e) => onViewPDF(item.pdf, e)}
                >
                  📄 View PDF
                </button>
              )}
              <button 
                className="btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AwardsModal;