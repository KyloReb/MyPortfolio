import React from 'react';
import { motion } from 'framer-motion';

/**
 * Contact form with validation, loading spinner, success state, and resume button.
 */
const ContactForm = ({ formData, errors, isSubmitting, formState, onInputChange, onSubmit, onViewResume }) => {
  const fieldClass = (name) => {
    let cls = 'form-group';
    if (errors[name]) cls += ' has-error';
    else if (formData[name]) cls += ' is-valid';
    return cls;
  };

  /* ---- Success State ---- */
  if (formState === 'success') {
    return (
      <motion.div
        className="form-success-state"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <div className="success-checkmark">
          <svg viewBox="0 0 52 52" width="64" height="64">
            <circle className="success-circle" cx="26" cy="26" r="24" fill="none" stroke="#10b981" strokeWidth="3" />
            <path className="success-check" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l7 7 16-16" />
          </svg>
        </div>
        <h3 className="success-title">Message Sent!</h3>
        <p className="success-text">Thank you for reaching out. I'll get back to you as soon as possible.</p>
      </motion.div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className={fieldClass('name')}>
        <input
          type="text" name="name" placeholder="Your Name"
          value={formData.name} onChange={onInputChange}
          required disabled={isSubmitting}
          aria-required="true" aria-label="Your Name"
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className={fieldClass('email')}>
        <input
          type="email" name="email" placeholder="Your Email"
          value={formData.email} onChange={onInputChange}
          required disabled={isSubmitting}
          aria-required="true" aria-label="Your Email"
          aria-invalid={!!errors.email}
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className={fieldClass('message')}>
        <textarea
          name="message" placeholder="Your Message" rows="5"
          value={formData.message} onChange={onInputChange}
          required disabled={isSubmitting}
          aria-required="true" aria-label="Your Message"
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      <button
        type="submit" className="send-button"
        disabled={isSubmitting || formState === 'submitting'}
        aria-label={isSubmitting ? 'Sending message' : 'Send message'}
      >
        {isSubmitting || formState === 'submitting' ? (
          <>
            <span className="button-spinner" />
            <span>Sending...</span>
          </>
        ) : (
          <span>Send Message</span>
        )}
      </button>

      <button
        type="button" className="resume-button"
        onClick={onViewResume} disabled={isSubmitting}
        aria-label="View resume"
      >
        <span>View Resume</span>
      </button>
    </form>
  );
};

export default ContactForm;
