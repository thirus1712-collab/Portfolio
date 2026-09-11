import React, { useState, useEffect } from 'react';
import { Download, ArrowUpRight, Sparkles } from 'lucide-react';

const typingRoles = [
  'Full Stack Developer',
  'React Developer',
  'Frontend Developer',
  'Node.js Developer',
];

const techBadges = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'React.js',
  'Node.js',
  'Express.js',
  'MySQL',
  'MongoDB',
  'Vercel',
];

export default function Hero() {
  // Typing animation state
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentRole = typingRoles[currentRoleIndex];
    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          // Pause at full word before deleting
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        // Deleting
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % typingRoles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const scrollToPortfolio = (e) => {
    e.preventDefault();
    const portfolioEl = document.getElementById('portfolio');
    if (portfolioEl) {
      portfolioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Subtle parallax translation and fade on scroll
  const parallaxOffset = Math.min(scrollY * 0.25, 120);
  const fadeOpacity = Math.max(1 - scrollY / 700, 0.2);

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column Content */}
          <div className="hero-content">
            <div className="hero-role-badge">
              <span className="hero-role-dot"></span>
              Full Stack Developer
            </div>

            <h1 className="hero-title">
              <span className="hero-title-white">Hi, I'm</span>
              <span className="hero-title-pink">S.Thirukumaran</span>
              <span className="hero-title-white">From India</span>
            </h1>

            {/* Continuous Typing Animation */}
            <div className="hero-typing-wrapper">
              <span className="hero-typing-prefix">I am a</span>
              <span className="hero-typing-text">{displayText}</span>
              <span className="typing-cursor"></span>
            </div>

            <p className="hero-description">
              A passionate Full Stack Developer from India who loves building modern
              websites, responsive web applications, backend systems, and interactive
              digital experiences.
            </p>

            {/* Tech Stack Badges */}
            <div className="hero-badges-title">Technologies & Tools</div>
            <div className="hero-badges-container">
              {techBadges.map((badge) => (
                <span key={badge} className="tech-badge">
                  {badge}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hero-actions">
              <a
                href="/S_Thirukumaran_Resume.pdf"
                download="S_Thirukumaran_Resume.pdf"
                className="btn btn-primary"
              >
                <Download size={19} />
                Download Resume
              </a>
              <a
                href="#portfolio"
                onClick={scrollToPortfolio}
                className="btn btn-outline"
              >
                View Portfolio
                <ArrowUpRight size={19} />
              </a>
            </div>
          </div>

          {/* Right Column Image with Parallax & Soft Glow */}
          <div
            className="hero-image-wrapper"
            style={{
              transform: `translateY(${parallaxOffset}px)`,
              opacity: fadeOpacity,
            }}
          >
            <div className="hero-image-glow-bg"></div>
            <div className="hero-image-card">
              <img
                src="/images/Thiru.jpeg"
                alt="S.Thirukumaran - Full Stack Developer"
                loading="eager"
              />
              <div className="hero-image-overlay-mask"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
