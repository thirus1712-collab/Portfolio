import React from 'react';
import { Code, Layout, Smartphone } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: Code,
    title: 'Web Design',
    description:
      'Design modern responsive websites using HTML, CSS, JavaScript and React with beautiful UI and responsive layouts.',
  },
  {
    id: 2,
    icon: Layout,
    title: 'UI/UX Design',
    description:
      'Create attractive user interfaces, responsive layouts, wireframes, animations, and interactive user experiences.',
  },
  {
    id: 3,
    icon: Smartphone,
    title: 'App Design',
    description:
      'Design interactive mobile applications and responsive web applications with modern user-centered design principles.',
  },
];

export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        {/* Heading */}
        <div className="section-header">
          <h2 className="section-title">My Services</h2>
          <p className="section-subtitle">
            High-impact solutions crafted with modern code, scalable architecture, and pixel-perfect design.
          </p>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="services-grid">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="service-card">
                <div className="service-icon-box">
                  <IconComponent size={34} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
