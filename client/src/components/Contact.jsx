import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Download,
  Send,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';

export default function Contact() {
  const API_URL =
    import.meta.env.VITE_API_URL || "https://portfolio-production-2b3b.up.railway.app";
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address.';
      }
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus({ submitting: true, success: false, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus({
          submitting: false,
          success: true,
          message: 'Thank you! Your message has been received successfully.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          submitting: false,
          success: false,
          message: result.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus({
        submitting: false,
        success: false,
        message: 'Network error or server unavailable. Please try again later.',
      });
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Details & Socials */}
          <div className="contact-info-col">
            <div className="section-header" style={{ marginBottom: '20px' }}>
              <h2 className="section-title">Contact Me</h2>
              <p className="section-subtitle">
                Feel free to reach out for project inquiries, freelance collaborations, or just a friendly developer chat!
              </p>
            </div>

            {/* Email */}
            <div className="contact-item">
              <div className="contact-icon-box">
                <Mail size={24} />
              </div>
              <div>
                <div className="contact-text-label">Email Address</div>
                <div className="contact-text-value">thirus1712@gmail.com</div>
              </div>
            </div>

            {/* Phone */}
            <a href="tel:8838010780" className="contact-item">
              <div className="contact-icon-box">
                <Phone size={24} />
              </div>
              <div>
                <div className="contact-text-label">Phone Number</div>
                <div className="contact-text-value">+91 8838010780</div>
              </div>
            </a>

            {/* Social Links */}
            <div className="contact-socials-wrapper">
              <div className="contact-socials-title">Follow & Connect</div>
              <div className="contact-social-icons">
                <a
                  href="https://github.com/thirus1712-collab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="GitHub Profile"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/thiru-kumaran-s-67ab0a381/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={22} />
                </a>
                <span
                  className="social-icon-link"
                  aria-label="Instagram Profile"
                  style={{ cursor: 'pointer' }}
                >
                  <Instagram size={22} />
                </span>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Twitter / X Profile"
                >
                  <Twitter size={22} />
                </a>
              </div>
            </div>

            {/* Download CV Button */}
            <div className="contact-cv-btn-box">
              <a
                href="/S_Thirukumaran_Resume.pdf"
                download="S_Thirukumaran_Resume.pdf"
                className="btn btn-primary"
              >
                <Download size={20} />
                Download CV
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-card">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {/* Notification Message */}
              {status.message && (
                <div
                  className={`form-alert ${status.success ? 'form-alert-success' : 'form-alert-error'
                    }`}
                >
                  {status.success ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <AlertCircle size={20} />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              {/* Name Input */}
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  placeholder="Your Name"
                  className={`form-input ${errors.name ? 'has-error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="form-error-msg">{errors.name}</span>}
              </div>

              {/* Email Input */}
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  placeholder="Your Email"
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="form-error-msg">{errors.email}</span>}
              </div>

              {/* Message Input */}
              <div className="form-group">
                <textarea
                  name="message"
                  id="contact-message"
                  rows={6}
                  placeholder="Your Message"
                  className={`form-textarea ${errors.message ? 'has-error' : ''}`}
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <span className="form-error-msg">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="contact-submit-btn"
                className="btn-submit"
                disabled={status.submitting}
              >
                {status.submitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Message
                  </>
                )}
              </button>

              {/* Excel Download link for site owner */}
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <a
                  href="/api/contact/download-excel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-admin-link"
                >
                  <FileSpreadsheet size={15} />
                  Export All Inquiries to Excel (.xlsx)
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
