import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const initialProjects = [
  {
    id: 1,
    title: 'Social Media App',
    category: 'Social Media Mobile App',
    description:
      'A modern social networking application connecting people through messaging, sharing, communities, and real-time interactions.',
    image: '/images/project_social.jpg',
    url: 'https://github.com/thirus1712',
  },
  {
    id: 2,
    title: 'Music App',
    category: 'Music Streaming App',
    description:
      'A music streaming application with playlists, albums, favorites, personalized recommendations, and modern audio experience.',
    image: '/images/project_music.jpg',
    url: 'https://github.com/thirus1712',
  },
  {
    id: 3,
    title: 'Online Shopping App',
    category: 'Online Shopping App',
    description:
      'An e-commerce shopping application with product catalog, secure checkout, shopping cart, order tracking, and payment integration.',
    image: '/images/project_ecommerce.jpg',
    url: 'https://github.com/thirus1712',
  },
];

export default function Portfolio() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="container">
        {/* Heading */}
        <div className="section-header">
          <h2 className="section-title">My Work</h2>
          <p className="section-subtitle">
            A showcase of recent digital products, mobile applications, and interactive web applications.
          </p>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="portfolio-grid">
          {initialProjects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <img
                src={project.image}
                alt={project.title}
                className="portfolio-image"
                loading="lazy"
              />

              {/* Bottom-to-Top Sliding Overlay */}
              <div className="portfolio-overlay">
                <h3 className="portfolio-overlay-title">{project.title}</h3>
                <p className="portfolio-overlay-desc">{project.description}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-arrow-btn"
                  aria-label={`View ${project.title} details`}
                >
                  <ArrowUpRight size={26} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="portfolio-cta-container">
          <a
            href="https://github.com/thirus1712"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ padding: '14px 44px' }}
          >
            See More Projects
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
