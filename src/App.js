// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [darkMode, setDarkMode] = useState(true);
  const [skillsInView, setSkillsInView] = useState(false);
  const [projectsInView, setProjectsInView] = useState(false);
  const skillsSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);

  // Check system preference or saved preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme !== 'light' && (savedTheme === 'dark' || systemPrefersDark)) {
      setDarkMode(true);
    } else if (savedTheme === 'light') {
      setDarkMode(false);
    }
  }, []);

  // Apply dark mode class to body when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Intersection Observer for skills section animation
  useEffect(() => {
    const skillsSection = skillsSectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsInView(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  }, []);

  // Intersection Observer for projects section animation
  useEffect(() => {
    const projectsSection = projectsSectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProjectsInView(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (projectsSection) {
      observer.observe(projectsSection);
    }

    return () => {
      if (projectsSection) {
        observer.unobserve(projectsSection);
      }
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'Node.js', level: 75 },
    { name: 'Python', level: 80 },
    { name: 'UI/UX Design', level: 70 }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React and Node.js',
      image: 'https://via.placeholder.com/300x200/4A5568/FFFFFF?text=E-Commerce+Project',
      github: 'https://github.com/yourusername/ecommerce-project',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS']
    },
    {
      title: 'Task Management App',
      description: 'A productivity app for managing daily tasks and projects',
      image: 'https://via.placeholder.com/300x200/4A5568/FFFFFF?text=Task+App',
      github: 'https://github.com/yourusername/task-app',
      tags: ['React', 'Firebase', 'Material-UI', 'JavaScript']
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather application with location-based forecasts',
      image: 'https://via.placeholder.com/300x200/4A5568/FFFFFF?text=Weather+App',
      github: 'https://github.com/yourusername/weather-app',
      tags: ['JavaScript', 'API', 'CSS3', 'HTML5']
    }
  ];

  const socialLinks = {
    github: 'https://github.com/KyloReb',
    linkedin: 'https://linkedin.com/in/yourusername',
    facebook: 'https://facebook.com/yourusername'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! Thank you for reaching out.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      {/* Section 1: Hero/Introduction */}
      <section id="home" className="hero-section">
        <div className="theme-switch-wrapper">
          <label className="theme-switch" htmlFor="checkbox">
            <input 
              type="checkbox" 
              id="checkbox" 
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <div className="slider round">
              <span className="sun">☀️</span>
              <span className="moon">🌙</span>
            </div>
          </label>
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-name">David Rebancos II</h1>
            <p className="hero-intro">
              I'm a software developer building scalable fintech solutions at Nationlink/Infoserve Inc. 
              I specialize in full-stack development with the .NET ecosystem and React.js, creating CRM and business intelligence tools that enhance financial service efficiency.
            </p>
            
            <div className="skills-chip-container">
              {skills.map((skill, index) => (
                <div key={index} className="skill-chip">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <button 
            onClick={() => scrollToSection('skills')}
            className="scroll-button"
          >
            <span>Scroll to explore</span>
            <div className="scroll-arrow">↓</div>
          </button>
        </div>
      </section>

      {/* Section 2: Skills */}
      <section 
        id="skills" 
        ref={skillsSectionRef}
        className="skills-section"
      >
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className={`skill-item ${skillsInView ? 'animate-in' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${skillsInView ? 'animate-width' : ''}`}
                    style={{ 
                      width: skillsInView ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 0.1 + 0.3}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Projects */}
      <section 
        id="projects" 
        ref={projectsSectionRef}
        className="projects-section"
      >
        <div className="container">
          <h2 className="section-title">My Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`project-card ${projectsInView ? 'project-animate-in' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => window.open(project.github, '_blank')}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="github-corner">
                    <svg 
                      width="40" 
                      height="40" 
                      viewBox="0 0 250 250" 
                      className="github-icon"
                    >
                      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                      <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" 
                            fill="currentColor" 
                            className="octo-arm"></path>
                      <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" 
                            fill="currentColor"></path>
                    </svg>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Contact */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-container">
            <div className="contact-info">
              <h3>Let's Connect</h3>
              <p>
                I'm always open to discussing new opportunities, creative projects, 
                or potential collaborations. Feel free to reach out if you'd like to 
                work together or just say hello!
              </p>
              <div className="social-links">
                <a 
                  href={socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a 
                  href={socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href={socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="send-button">
                Send Message
              </button>
              <button 
                type="button" 
                className="resume-button"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                View Resume
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;