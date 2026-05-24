import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import { EMAILJS_CONFIG, validateForm } from '../Contact/constants';
import ToastContainer from '../Toast/Toast';
import { useToast } from '../Toast/useToast';
import './ChatModal.css';

const ChatModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState('idle'); // idle | submitting | success | error
  const { toasts, remove, error: toastError } = useToast();

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setFormState('idle');
    }
  }, [isOpen]);

  const validate = useCallback(() => {
    const errs = validateForm(formData);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (formState !== 'idle' || !validate()) return;
    setFormState('submitting');

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'davidrebancos02@gmail.com',
          reply_to: formData.email,
          subject: `${formData.name} sent a message from your portfolio`,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      setFormState('success');
    } catch {
      setFormState('error');
      toastError('Failed to send message. Please try again later.');
    }
  }, [formData, formState, validate, toastError]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const fieldClass = (name) => {
    let cls = 'chat-form-group';
    if (errors[name]) cls += ' has-error';
    else if (formData[name]) cls += ' is-valid';
    return cls;
  };

  if (!isOpen) return null;

  return (
    <div className="chat-overlay" onClick={handleOverlayClick}>
      <div className="chat-modal" role="dialog" aria-modal="true" aria-label="Send a message">
        <button className="chat-modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <AnimatePresence mode="wait">
          {formState === 'success' ? (
            <motion.div
              key="success"
              className="cm-success-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="cm-success-checkmark">
                <svg viewBox="0 0 52 52" width="56" height="56">
                  <circle className="cm-sc-circle" cx="26" cy="26" r="24" fill="none" stroke="#10b981" strokeWidth="3" />
                  <path className="cm-sc-check" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l7 7 16-16" />
                </svg>
              </div>
              <h3 className="cm-success-title">Message Sent!</h3>
              <p className="cm-success-text">Thank you for reaching out. I'll get back to you soon.</p>
              <button className="cm-close-btn" onClick={onClose}>Close</button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="chat-modal-header">
                <h3>Send a Message</h3>
                <p>I'll get back to you as soon as possible.</p>
              </div>

              <form className="chat-modal-form" onSubmit={handleSubmit} noValidate>
                <div className={fieldClass('name')}>
                  <input
                    type="text" name="name" placeholder="Your Name"
                    value={formData.name} onChange={handleChange}
                    required disabled={formState === 'submitting'}
                    aria-label="Your Name" aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className="form-error-cm">{errors.name}</span>}
                </div>
                <div className={fieldClass('email')}>
                  <input
                    type="email" name="email" placeholder="Your Email"
                    value={formData.email} onChange={handleChange}
                    required disabled={formState === 'submitting'}
                    aria-label="Your Email" aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="form-error-cm">{errors.email}</span>}
                </div>
                <div className={fieldClass('message')}>
                  <textarea
                    name="message" placeholder="Your Message" rows="4"
                    value={formData.message} onChange={handleChange}
                    required disabled={formState === 'submitting'}
                    aria-label="Your Message" aria-invalid={!!errors.message}
                  />
                  {errors.message && <span className="form-error-cm">{errors.message}</span>}
                </div>
                <button
                  type="submit" className="chat-send-btn"
                  disabled={formState === 'submitting'}
                >
                  {formState === 'submitting' ? (
                    <>
                      <span className="chat-spinner" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ToastContainer toasts={toasts} onRemove={remove} />
    </div>
  );
};

export default ChatModal;
