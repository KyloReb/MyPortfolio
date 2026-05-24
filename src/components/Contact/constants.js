/*
 * EmailJS — https://www.emailjs.com
 * Free tier: 200 emails/month.
 * Template editor lets you design the exact HTML email received in Gmail.
 */
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_7dt7out',
  TEMPLATE_ID: 'template_93eluhp',
  PUBLIC_KEY: 'dXHZk-T9x8E2FwTWq',
};

export const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    messages: {
      required: 'Name is required',
      minLength: 'Name must be at least 2 characters',
      maxLength: 'Name must be under 100 characters',
      pattern: 'Name contains invalid characters',
    },
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: 'Email is required',
      pattern: 'Please enter a valid email',
    },
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 2000,
    messages: {
      required: 'Message is required',
      minLength: 'Message must be at least 10 characters',
      maxLength: 'Message must be under 2000 characters',
    },
  },
};

export const validateField = (name, value) => {
  const rule = VALIDATION_RULES[name];
  if (!rule) return '';

  if (rule.required && !value.trim()) {
    return rule.messages.required;
  }
  if (rule.minLength && value.trim().length < rule.minLength) {
    return rule.messages.minLength;
  }
  if (rule.maxLength && value.trim().length > rule.maxLength) {
    return rule.messages.maxLength;
  }
  if (rule.pattern && !rule.pattern.test(value.trim())) {
    return rule.messages.pattern;
  }
  return '';
};

export const validateForm = (formData) => {
  const errors = {};
  Object.keys(VALIDATION_RULES).forEach((field) => {
    const error = validateField(field, formData[field] || '');
    if (error) errors[field] = error;
  });
  return errors;
};
