import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './styles.css';
import profileImage from '../profile.jpeg';

// Initialize EmailJS (Replace with your actual Public Key)
emailjs.init('88-DfWPEZqF_P2WOp');

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

const PortfolioWebsite = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    // Simulate loading sequence
    const loadingSequence = [
      { text: 'Loading Assets...', delay: 0, duration: 1000 },
      { text: 'Initializing Experience...', delay: 1000, duration: 1000 },
      { text: 'Preparing 3D Scene...', delay: 2000, duration: 1000 },
      { text: 'Welcome.', delay: 3000, duration: 1000 },
    ];

    loadingSequence.forEach((step) => {
      setTimeout(() => {
        setLoadingProgress((step.delay / 4000) * 100);
      }, step.delay);
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div ref={containerRef} className="portfolio-container">
      <CustomCursor position={cursorPosition} />
      <AnimatedBackground />
      <Navigation />
      
      <main className="portfolio-main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <ExperienceSection />
        <AchievementsSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

// ============================================================================
// LOADING SCREEN
// ============================================================================

const LoadingScreen = ({ progress }) => {
  const [loadingText, setLoadingText] = useState('Loading Assets...');

  useEffect(() => {
    if (progress < 25) {
      setLoadingText('Loading Assets...');
    } else if (progress < 50) {
      setLoadingText('Initializing Experience...');
    } else if (progress < 75) {
      setLoadingText('Preparing 3D Scene...');
    } else {
      setLoadingText('Welcome.');
    }
  }, [progress]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-text">{loadingText}</div>
        <div className="loading-progress-bar">
          <div
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-percentage">{Math.round(progress)}%</div>
      </div>
      <AnimatedBackground />
    </div>
  );
};

// ============================================================================
// CUSTOM CURSOR
// ============================================================================

const CustomCursor = ({ position }) => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const handleMouseEnter = (e) => {
      if (
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('[data-interactive]')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

// ============================================================================
// ANIMATED BACKGROUND
// ============================================================================

const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      <div className="bg-gradient" />
      <div className="stars-container">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (3 + Math.random() * 4) + 's',
            }}
          />
        ))}
      </div>
      <div className="particles-container">
        {[...Array(100)].map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>
      <div className="nebula-cloud nebula-1" />
      <div className="nebula-cloud nebula-2" />
      <div className="aurora-effect" />
    </div>
  );
};

const FloatingParticle = ({ index }) => {
  return (
    <div
      className="particle"
      style={{
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        width: Math.random() * 4 + 1 + 'px',
        height: Math.random() * 4 + 1 + 'px',
        animationDelay: Math.random() * 8 + 's',
        animationDuration: (15 + Math.random() * 20) + 's',
        opacity: Math.random() * 0.6 + 0.2,
      }}
    />
  );
};

// ============================================================================
// NAVIGATION
// ============================================================================

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Timeline', 'Contact'];

  return (
    <nav className={`floating-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">Portfolio</span>
          <div className="logo-dot" />
        </div>
        <ul className="nav-items">
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" data-interactive onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Get In Touch
        </button>
      </div>
    </nav>
  );
};

// ============================================================================
// HERO SECTION
// ============================================================================

const HeroSection = () => {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Animate name with SplitType-like effect
    if (nameRef.current) {
      const name = nameRef.current;
      name.style.animation = 'nameGlow 3s ease-out forwards';
    }

    if (subtitleRef.current) {
      const subtitle = subtitleRef.current;
      subtitle.style.animation = 'subtitleFade 2s ease-out 0.5s forwards';
    }
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-3d-scene">
        <FloatingGeometry />
      </div>
      
      <div className="hero-content">
        <div className="hero-photo-holder" aria-label="Profile photo placeholder">
          <img src={profileImage} alt="Profile photo" />
        </div>
        <div className="hero-text-wrapper">
          <h4 ref={nameRef} className="hero-name">
            Eppakayala Rakshith Sai Srusheel
          </h4>
          <div ref={subtitleRef} className="hero-subtitle">
            <p className="subtitle-line">Problem Solving</p>
            <p className="subtitle-line">C++ programer</p>
            <p className="subtitle-line">MERN Developer</p>
            <p className="subtitle-line">Open Source Enthusiast</p>
          </div>
        </div>
        <div className="hero-cta">
          <button className="primary-button" data-interactive onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore My Work
          </button>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-dot" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

const FloatingGeometry = () => {
  return (
    <div className="geometry-container">
      <div className="floating-sphere sphere-1" />
      <div className="floating-sphere sphere-2" />
      <div className="rotating-ring ring-1" />
      <div className="rotating-ring ring-2" />
      <div className="light-beam beam-1" />
      <div className="light-beam beam-2" />
    </div>
  );
};

// ============================================================================
// ABOUT SECTION
// ============================================================================

const AboutSection = () => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = (e.clientY - rect.top - centerY) * 0.1;
    const y = (e.clientX - rect.left - centerX) * -0.1;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="about" className="about-section">
      <h2 className="section-title">About Me</h2>
      
      <div
        ref={cardRef}
        className="about-card glass-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="about-card-content">
          <div className="about-avatar">
            <div className="avatar-placeholder">
              <img src={profileImage} alt="Profile photo" />
            </div>
          </div>
          
          <div className="about-text">
            <h3>AI & Software Enthusiast</h3>
            <p>
            I'm Rakshith Sai, an Artificial Intelligence & Machine Learning student with a passion for software development and problem-solving. 
            I enjoy building practical applications, exploring intelligent systems, and learning technologies that solve real-world challenges. 
            Whether it's developing web applications, strengthening my Data Structures & Algorithms skills, or experimenting with AI concepts,
            I'm always eager to learn, create, and grow as an engineer.

            I'm particularly interested in the intersection of Artificial Intelligence, Machine Learning, and modern software engineering,
            where intelligent solutions meet intuitive user experiences.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">Build Projects</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">DSA Problems solved</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Learning MindSet</span>
              </div>
            </div>

            <div className="about-highlights">
              <h4>Education</h4>
              <p>B.Tech in Artificial intelligence & Machine Learning</p>
              
              <h4>Interests</h4>
              <p>AI/ML, Data Structures & Algorithms, UI/UX Design,Emerging Technologies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SKILLS SECTION
// ============================================================================

const SkillsSection = () => {
  const skills = [
    { name: 'Machine Learning', level: 'Beginner', color: '#0478d6' },
    { name: 'React', level: 'intermediate', color: '#00F5FF' },
    { name: 'JavaScript', level: 'intermediate', color: '#00F5FF' },
    { name: 'Node.js', level: 'intermediate', color: '#00F5FF' },
    { name: 'MongoDB', level: 'intermediate', color: '#00F5FF' },
    { name: 'C++', level: 'Advanced', color: '#FF2D95' },
    { name: 'Git', level: 'Advanced', color: '#FF2D95' },
    { name: 'Data Analysis', level: 'Advanced', color: '#FF2D95' },
    { name: 'SQL', level: 'Advanced', color: '#FF2D95' }
  ];

  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">Skills & Technologies</h2>
      
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <SkillPlanet
            key={skill.name}
            skill={skill}
            index={index}
            total={skills.length}
          />
        ))}
      </div>
    </section>
  );
};

const SkillPlanet = ({ skill, index, total }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  const angle = (index / total) * Math.PI * 2;
  const radius = 150;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <div
      ref={ref}
      className="skill-planet-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <div
        className={`skill-planet ${isHovered ? 'hovered' : ''}`}
        style={{
          borderColor: skill.color,
          boxShadow: `0 0 20px ${skill.color}, inset 0 0 20px ${skill.color}33`,
        }}
      >
        <div
          className="planet-inner"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${skill.color}22, transparent)`,
          }}
        />
        <div className="planet-glow" style={{ borderColor: skill.color }} />
      </div>

      <div className="skill-info">
        <h4 className="skill-name">{skill.name}</h4>
        <p className="skill-level">{skill.level}</p>
      </div>

      {isHovered && (
        <div className="skill-particles">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="particle-dot"
              style={{
                '--angle': `${(i / 6) * 360}deg`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// PROJECTS SECTION
// ============================================================================

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: 'Real Time Stock Price Tracker',
      description: 'Real-time data visualization platform',
      tech: ['React + vite', 'yfinance + pandas', 'FastAPI+Uvicorn', 'Charts.js','Axios'],
      image: '📈',
      github: '#',
      demo: '#',
      stats: { Stocks: '5+',Features:'Live Updates'},
    },
    {
      id: 2,
      title: '',
      description: '',
      tech: [],
      image: '⌛',
      github: '#',
      demo: '#',
      stats: { },
    },
    {
      id: 3,
      title: '',
      description: '',
      tech: [],
      image: '⌛',
      github: '#',
      demo: '#',
      stats: {  },
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Featured Projects</h2>
      
      <div className="projects-container">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  if (isExpanded) {
    return (
      <ProjectModal
        project={project}
        onClose={() => setIsExpanded(false)}
      />
    );
  }

  return (
    <div
      ref={cardRef}
      className={`project-card glass-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(true)}
      data-interactive
    >
      <div className="project-image">{project.image}</div>
      
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        
        <div className="project-tech">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-stats">
          {Object.entries(project.stats).map(([key, value]) => (
            <div key={key} className="stat-item">
              <span className="stat-value">{value}</span>
              <span className="stat-name">{key}</span>
            </div>
          ))}
        </div>

        <div className="project-links">
          <a href={project.github} className="link-button" data-interactive>
            GitHub
          </a>
          <a href={project.demo} className="link-button primary" data-interactive>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} data-interactive>
          ✕
        </button>
        
        <div className="modal-content">
          <div className="modal-image">{project.image}</div>
          
          <div className="modal-text">
            <h2>{project.title}</h2>
            <p className="modal-description">{project.description}</p>
            
            <div className="modal-section">
              <h4>Technologies</h4>
              <div className="tech-list">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h4>Project Highlights</h4>
              <ul className="highlights-list">
                <li>Built with modern technologies and best practices</li>
                <li>Optimized for performance and user experience</li>
                <li>Deployed and maintained in production</li>
                <li>Continuous improvement and monitoring</li>
              </ul>
            </div>

            <div className="modal-links">
              <a href={project.github} className="link-button" data-interactive>
                View Code on GitHub
              </a>
              <a href={project.demo} className="link-button primary" data-interactive>
                Open Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// TIMELINE SECTION
// ============================================================================

const TimelineSection = () => {
  const events = [
  { year: "2024", title: "Started B.Tech in AI & ML", icon: "🎓" },
  { year: "2024", title: "Began Learning Programming", icon: "💻" },
  { year: "2025", title: "Started Full-Stack Development", icon: "🌐" },
  { year: "2026", title: "Built Real-Time Stock Price Tracker", icon: "📈" },
  { year: "2026", title: "Developing Advanced Portfolio & AI Projects", icon: "🤖" },
  { year: "Future", title: "AI&ML engineer", icon: "🚀" },
];

  return (
    <section id="timeline" className="timeline-section">
      <h2 className="section-title">My Journey</h2>
      
      <div className="timeline-container">
        <div className="timeline-line" />
        {events.map((event, index) => (
          <TimelineEvent key={event.year} event={event} index={index} />
        ))}
      </div>
    </section>
  );
};

const TimelineEvent = ({ event, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`timeline-event ${isVisible ? 'visible' : ''} ${
        index % 2 === 0 ? 'left' : 'right'
      }`}
    >
      <div className="timeline-dot">
        <span className="timeline-icon">{event.icon}</span>
      </div>
      
      <div className="timeline-content glass-card">
        <span className="timeline-year">{event.year}</span>
        <h3>{event.title}</h3>
      </div>
    </div>
  );
};

// ============================================================================
// EXPERIENCE SECTION
// ============================================================================

const ExperienceSection = () => {
  const experience = [
  {
    title: 'Full-Stack Development',
    company: 'Personal Projects',
    period: '2025',
    highlights: [
      'Built responsive web applications',
      'Developed REST APIs using FastAPI',
      'Integrated React with backend services',
    ],
  },
  {
    title: 'Real-Time Stock Price Tracker',
    company: 'Academic Project',
    period: '2026',
    highlights: [
      'Tracked live prices for 5+ major stocks',
      'Visualized historical trends with Chart.js',
      'Used yfinance, Pandas & FastAPI',
    ],
  },
  {
    title: 'Data Structures & Algorithms',
    company: 'Competitive Programming',
    period: '2025 - Present',
    highlights: [
      'Solved coding challenges',
      'Strengthened problem-solving skills',
      'Practiced core CS concepts',
    ],
  },
];

  return (
    <section id="experience" className="experience-section">
      <h2 className="section-title">Experience</h2>
      
      <div className="experience-container">
        {experience.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} index={index} />
        ))}
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience, index }) => {
  return (
    <div className="experience-card glass-card">
      <div className="exp-header">
        <h3>{experience.title}</h3>
        <span className="exp-company">{experience.company}</span>
      </div>
      
      <div className="exp-period">{experience.period}</div>
      
      <div className="exp-highlights">
        {experience.highlights.map((highlight) => (
          <div key={highlight} className="highlight-badge">
            {highlight}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// ACHIEVEMENTS SECTION
// ============================================================================

const AchievementsSection = () => {
  const achievements = [
    { title: 'Awwwards Winner', icon: '🏆' },
    { title: 'Best Code Quality', icon: '⭐' },
    { title: 'Innovation Leader', icon: '💡' },
    { title: 'Community Hero', icon: '🦸' },
    { title: 'Open Source Star', icon: '✨' },
    { title: 'Performance Expert', icon: '⚡' },
  ];

  return (
    <section id="achievements" className="achievements-section">
      <h2 className="section-title">Achievements</h2>
      
      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <AchievementBadge key={achievement.title} achievement={achievement} />
        ))}
      </div>
    </section>
  );
};

const AchievementBadge = ({ achievement }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`achievement-capsule glass-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="achievement-icon">{achievement.icon}</span>
      <h3>{achievement.title}</h3>
      
      {isHovered && (
        <div className="achievement-glow" />
      )}
    </div>
  );
};

// ============================================================================
// CERTIFICATIONS SECTION
// ============================================================================

const CertificationsSection = () => {
  const certifications = [
    { title: 'Top 100 Coder', issuer: 'VNRVJIET', date: '2025' },
    { title: '', issuer: '', date: '' },
    { title: '', issuer: '', date: '' },
  ];

  return (
    <section id="certifications" className="certifications-section">
      <h2 className="section-title">Certifications</h2>
      
      <div className="certifications-grid">
        {certifications.map((cert) => (
          <CertificationCard key={cert.title} certification={cert} />
        ))}
      </div>
    </section>
  );
};

const CertificationCard = ({ certification }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`certification-card glass-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="cert-frame">
        <div className="cert-content">
          <h3>{certification.title}</h3>
          <p className="cert-issuer">{certification.issuer}</p>
          <p className="cert-date">{certification.date}</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CONTACT SECTION
// ============================================================================

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_8obcgr5',      // Replace with your EmailJS Service ID
        'template_diumvnt',     // Replace with your EmailJS Template ID
        {
          to_email: 'rakshithsai897@gmail.com', // Replace with your email
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        }
      );

      // Show success message
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Email send failed:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="contact-section">
        <div className="contact-success">
          <div className="success-icon">✓</div>
          <h2>Transmission Successful</h2>
          <p>Message Received</p>
          <p className="thank-you">Thank You</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Get In Touch</h2>
      
      <form className="contact-form glass-card" onSubmit={handleSubmit}>
        <div className="terminal-header">
          <div className="terminal-dots">
            <span></span><span></span><span></span>
          </div>
        </div>

        <div className="form-field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
          />
        </div>

        <div className="form-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
          />
        </div>

        <div className="form-field">
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your message..."
            rows="5"
          />
        </div>

        {error && <p className="error-message" style={{ color: '#FF2D95', marginTop: '10px' }}>{error}</p>}
        
        <button type="submit" className="send-button" data-interactive disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
};

// ============================================================================
// FOOTER
// ============================================================================

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/sai-srushee-34' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/eppakayala-rakshith-sai-srusheel-7a2631298/' },
    { name: 'Twitter', url: 'https://x.com/RakshithSa20867' },
    { name: 'Smart Interviews', url: 'https://smartinterviews.in/profile/Srusheel_34' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-planet">
          <div className="rotating-planet" />
          <span className="footer-symbol" aria-hidden="true">&lt;/&gt;</span>
        </div>

        <div className="footer-text">
          <h3>Thanks for Visiting My Portfolio</h3>
          <p>© 2026 Eppakayala Rakshith Sai Srusheel. All rights reserved.</p>
        </div>

        <div className="social-links">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="social-link"
              data-interactive
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="footer-particle"
            style={{
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default PortfolioWebsite;
