import React, { useState, useCallback } from 'react';
import ChatModal from './ChatModal';
import './FloatingChat.css';

const FloatingChat = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <div className="floating-chat-wrapper">
        {showTooltip && (
          <div className="floating-chat-tooltip">
            Send a message
          </div>
        )}
        <button
          className="floating-chat-btn"
          onClick={openModal}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          aria-label="Send a message"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
      <ChatModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
};

export default FloatingChat;
