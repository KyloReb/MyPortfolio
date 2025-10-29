// ContactForm.js
import React from 'react';

const ContactForm = ({ formData, isSubmitting, onInputChange, onSubmit, onViewResume }) => {
  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={onInputChange}
          required
          disabled={isSubmitting}
          aria-required="true"
          aria-label="Your Name"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={onInputChange}
          required
          disabled={isSubmitting}
          aria-required="true"
          aria-label="Your Email"
        />
      </div>
      <div className="form-group">
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={onInputChange}
          required
          disabled={isSubmitting}
          aria-required="true"
          aria-label="Your Message"
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="send-button"
        disabled={isSubmitting}
        aria-label={isSubmitting ? 'Sending message' : 'Send message'}
      >
        {isSubmitting ? (
          <>
            <span className="button-spinner"></span>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
      <button 
        type="button" 
        className="resume-button"
        onClick={onViewResume}
        disabled={isSubmitting}
        aria-label="View resume"
      >
        View Resume
      </button>
    </form>
  );
};

export default ContactForm;