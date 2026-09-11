import React, { useState } from 'react';
import {
  Code,
  Server,
  Database,
  Cloud,
  Layers,
  GraduationCap,
  Briefcase,
  Cpu,
} from 'lucide-react';

const techStackCards = [
  {
    id: 1,
    category: 'Frontend',
    icon: Code,
    items: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'React.js'],
  },
  {
    id: 2,
    category: 'Backend',
    icon: Server,
    items: ['Node.js', 'Express.js'],
  },
  {
    id: 3,
    category: 'Database',
    icon: Database,
    items: ['MySQL', 'MongoDB'],
  },
  {
    id: 4,
    category: 'Deployment',
    icon: Cloud,
    items: ['Vercel Hosting Platform'],
  },
];

const skillsData = {
  frontend: [
    { name: 'React.js', percentage: 92 },
    { name: 'Node.js', percentage: 88 },
    { name: 'JavaScript (ES6)', percentage: 95 },
    { name: 'HTML5', percentage: 98 },
    { name: 'CSS3', percentage: 94 },
    { name: 'Bootstrap', percentage: 86 },
  ],
  backend: [
    { name: 'SQL', percentage: 88 },
    { name: 'MongoDB', percentage: 90 },
    { name: 'MySQL', percentage: 89 },
  ],
};

export default function About() {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Get to know my journey, academic background, passion, and engineering skillset.
          </p>
        </div>

        {/* About Main Grid: Left Portrait, Right Content */}
        <div className="about-main-grid">
          <div className="about-image-card">
            <img
              src="/images/Thirub.png"
              alt="S.Thirukumaran Profile"
              style={{ objectPosition: 'left top' }}
              loading="lazy"
            />
          </div>

          <div className="about-text-content">
            <p className="about-paragraph">
              Hi, I am S. Thirukumaran. I am passionate about coding and currently work as a Full Stack Developer.
              <br /><br />
              I used to take badminton classes simply for the love and passion of the sport.
              <br /><br />
              I completed my schooling at St. John's Senior Secondary School and Junior College in Mandaveli.
              <br /><br />
              I am currently pursuing a Bachelor of Engineering in Computer Science and Engineering (B.E. CSE) at SRM Easwari Engineering College.
            </p>

            <div className="about-highlights">
              <div className="about-highlight-box">
                <div className="about-highlight-title">College</div>
                <div className="about-highlight-desc">BE-CSE @ SRM Easwari</div>
              </div>
              <div className="about-highlight-box">
                <div className="about-highlight-title">Schooling</div>
                <div className="about-highlight-desc">S.T.Johns, Mandaveli</div>
              </div>
              <div className="about-highlight-box">
                <div className="about-highlight-title">Specialization</div>
                <div className="about-highlight-desc">Full Stack Web Dev</div>
              </div>
              <div className="about-highlight-box">
                <div className="about-highlight-title">Sport & Passion</div>
                <div className="about-highlight-desc">Badminton Player 🏸</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Subsection */}
        <div className="tech-stack-section">
          <h3 className="subsection-title">Tech Stack</h3>
          <div className="tech-cards-grid">
            {techStackCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <div key={card.id} className="tech-card">
                  <div className="tech-card-icon">
                    <IconComponent size={28} />
                  </div>
                  <h4 className="tech-card-title">{card.category}</h4>
                  <ul className="tech-card-items">
                    {card.items.map((item) => (
                      <li key={item} className="tech-card-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Tabs: Skills, Experience, Education */}
        <div className="about-tabs-wrapper">
          <div className="tabs-nav">
            <button
              className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              Skills
            </button>
            <button
              className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </button>
            <button
              className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              Education
            </button>
          </div>

          {/* TAB 1: SKILLS */}
          {activeTab === 'skills' && (
            <div className="tab-content">
              <h4 className="skills-tab-heading">Web & Databases</h4>
              <div className="skills-columns-grid">
                {/* Frontend Column */}
                <div>
                  <div className="skills-subgroup-title">
                    <Layers size={20} />
                    Frontend Technologies
                  </div>
                  <div className="skills-list">
                    {skillsData.frontend.map((skill) => (
                      <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem', color: '#ffffff', padding: '4px 0' }}>
                        <span style={{ color: '#ff004f', fontSize: '1.2rem' }}>•</span>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Backend Column */}
                <div>
                  <div className="skills-subgroup-title">
                    <Database size={20} />
                    Backend & Databases
                  </div>
                  <div className="skills-list">
                    {skillsData.backend.map((skill) => (
                      <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem', color: '#ffffff', padding: '4px 0' }}>
                        <span style={{ color: '#ff004f', fontSize: '1.2rem' }}>•</span>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="tab-content">
              <div className="timeline-list">
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <div>
                      <h4 className="timeline-role">CodeAlpha</h4>
                      <span className="timeline-company">Full Stack Developer</span>
                    </div>
                    <span className="timeline-badge">Developer / Internship</span>
                  </div>
                  <p className="timeline-desc">
                    Worked as a Full Stack Developer at CodeAlpha. Responsibilities included
                    building responsive web applications using React.js, JavaScript, Node.js,
                    Express.js, MongoDB, and SQL. Developed frontend interfaces and backend APIs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EDUCATION */}
          {activeTab === 'education' && (
            <div className="tab-content">
              <div className="timeline-list">
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <div>
                      <h4 className="timeline-role">
                        BE – Computer Science and Engineering
                      </h4>
                      <span className="timeline-company">
                        SRM Easwari Engineering College, Ramapuram, Chennai
                      </span>
                    </div>
                    <span className="timeline-badge">Currently Pursuing</span>
                  </div>
                  <p className="timeline-desc">
                    Undergraduate study covering core computer science principles, data
                    structures, algorithms, web engineering, distributed systems, and database
                    architectures.
                  </p>
                </div>

                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <div>
                      <h4 className="timeline-role">Schooling</h4>
                      <span className="timeline-company">
                        St. John's Senior Secondary School and Junior College, Mandaveli
                      </span>
                    </div>
                    <span className="timeline-badge">Completed</span>
                  </div>
                  <p className="timeline-desc">
                    Completed Senior Secondary School and Junior College education with strong academic
                    focus on science and computer application fundamentals.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
