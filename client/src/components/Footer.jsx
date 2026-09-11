import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-text">
          <span>&copy; 2026 S.Thirukumaran. All Rights Reserved. Made with</span>
          <Heart size={16} className="heart-icon" fill="#ff004f" />
          <span>in India.</span>
        </div>
      </div>
    </footer>
  );
}
