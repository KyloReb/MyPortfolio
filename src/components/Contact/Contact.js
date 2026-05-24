import React, { useState, lazy, Suspense, useCallback } from 'react';
import { socialLinks } from '../../data/socialLinks';
import emailjs from 'emailjs-com';
import { EMAILJS_CONFIG, validateForm } from './constants';
import { EmailIcon, PhoneIcon, GithubIcon, LinkedInIcon, FacebookIcon } from './Icons';
import ToastContainer from '../Toast/Toast';
import { useToast } from '../Toast/useToast';
import './Contact.css';

const ContactForm = lazy(() => import('./ContactForm'));

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState('idle'); // idle | submitting | success | error
  const { toasts, remove, success: toastSuccess, error: toastError } = useToast();

  const validate = useCallback(() => {
    const errs = validateForm(formData);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((e) => {
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

  const handleViewResume = useCallback(() => {
    window.open(`${process.env.PUBLIC_URL}/assets/Resume.pdf`, '_blank', 'noopener,noreferrer');
  }, []);

  const copyToClipboard = useCallback(async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      toastSuccess(`${type} copied to clipboard!`);
    } catch {
      toastError('Failed to copy to clipboard');
    }
  }, [toastSuccess, toastError]);

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
      <div className="contact-icon">{icon}</div>
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
      <div className="contact-icon">{icon}</div>
      <span className="contact-text">{text}</span>
    </a>
  ), []);

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="container">
        <h2 id="contact-heading" className="section-title">Get In Touch</h2>

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
                <ContactItem icon={<EmailIcon />} text="davidrebancos02@gmail.com" onClick={copyToClipboard} type="Email" />
                <ContactItem icon={<PhoneIcon />} text="+63 947 316 5030" onClick={copyToClipboard} type="Phone number" />
                <SocialLink href={socialLinks.github} icon={<GithubIcon />} text="GitHub" />
                <SocialLink href={socialLinks.linkedin} icon={<LinkedInIcon />} text="LinkedIn" />
                <SocialLink href={socialLinks.facebook} icon={<FacebookIcon />} text="Facebook" />
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <Suspense fallback={
              <div className="form-skeleton">
                <div className="skeleton-line" />
                <div className="skeleton-line" />
                <div className="skeleton-line tall" />
                <div className="skeleton-button" />
                <div className="skeleton-button outline" />
              </div>
            }>
              <ContactForm
                formData={formData}
                errors={errors}
                isSubmitting={formState === 'submitting'}
                formState={formState}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onViewResume={handleViewResume}
              />
            </Suspense>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemove={remove} />
    </section>
  );
};

export default React.memo(Contact);
