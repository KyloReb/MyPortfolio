// Contact.js
import React, { useState, lazy, Suspense, useCallback, useMemo } from 'react';
import { socialLinks } from '../../data/socialLinks';
import emailjs from 'emailjs-com';
import './Contact.css';

// Lazy load the form component for better performance
const ContactForm = lazy(() => import('./ContactForm'));

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 4000);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'davidrebancos02@gmail.com',
      reply_to: formData.email
    };

    try {
      const result = await emailjs.send(
        'service_7dt7out',
        'template_93eluhp',
        templateParams,
        'dXHZk-T9x8E2FwTWq'
      );
      
      console.log('Email sent successfully:', result.text);
      showNotification('Message sent! Thank you for reaching out.', 'success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error.text);
      showNotification('Failed to send message. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isSubmitting, showNotification]);

  const handleViewResume = useCallback(() => {
    window.open(`${process.env.PUBLIC_URL}/assets/Resume.pdf`, '_blank', 'noopener,noreferrer');
  }, []);

  const copyToClipboard = useCallback(async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification(`${type} copied to clipboard!`, 'success');
    } catch (err) {
      console.error('Failed to copy: ', err);
      showNotification('Failed to copy to clipboard', 'error');
    }
  }, [showNotification]);

  // Memoized SVG Icons to prevent unnecessary re-renders
  const EmailIcon = useMemo(() => () => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ), []);

  const PhoneIcon = useMemo(() => () => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  ), []);

  const GithubIcon = useMemo(() => () => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ), []);

  const LinkedInIcon = useMemo(() => () => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ), []);

  const FacebookIcon = useMemo(() => () => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ), []);

  // Contact Item Component with consistent sizing
  const ContactItem = useCallback(({ icon, text, onClick, type }) => (
    <div 
      className="contact-item clickable"
      onClick={() => onClick(text, type)}
      title={`Click to copy ${type.toLowerCase()}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(text, type);
        }
      }}
    >
      <div className="contact-icon">
        {icon}
      </div>
      <span className="contact-text" title={text}>{text}</span>
    </div>
  ), []);

  const SocialLink = useCallback(({ href, icon, text }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="contact-item social-link"
      aria-label={`Visit my ${text} profile`}
    >
      <div className="contact-icon">
        {icon}
      </div>
      <span className="contact-text">{text}</span>
    </a>
  ), []);

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="container">
        <h2 id="contact-heading" className="section-title">
          Get In Touch
        </h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm always open to discussing new opportunities, creative projects, 
              or potential collaborations. Feel free to reach out if you'd like to 
              work together or just say hello!
            </p>
            
            <div className="contact-items-wrapper">
              <div className="contact-items-grid">
                <ContactItem 
                  icon={<EmailIcon />}
                  text="davidrebancos02@gmail.com"
                  onClick={copyToClipboard}
                  type="Email"
                />
                <ContactItem 
                  icon={<PhoneIcon />}
                  text="+63 947 316 5030"
                  onClick={copyToClipboard}
                  type="Phone number"
                />
                <SocialLink 
                  href={socialLinks.github}
                  icon={<GithubIcon />}
                  text="GitHub"
                />
                <SocialLink 
                  href={socialLinks.linkedin}
                  icon={<LinkedInIcon />}
                  text="LinkedIn"
                />
                <SocialLink 
                  href={socialLinks.facebook}
                  icon={<FacebookIcon />}
                  text="Facebook"
                />
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            <Suspense fallback={
              <div className="form-skeleton">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line tall"></div>
                <div className="skeleton-button"></div>
                <div className="skeleton-button outline"></div>
              </div>
            }>
              <ContactForm
                formData={formData}
                isSubmitting={isSubmitting}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onViewResume={handleViewResume}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Notification Popup */}
      {notification.show && (
        <div 
          className={`notification ${notification.type}`}
          role="alert"
          aria-live="polite"
        >
          {notification.message}
        </div>
      )}
    </section>
  );
};

export default React.memo(Contact);