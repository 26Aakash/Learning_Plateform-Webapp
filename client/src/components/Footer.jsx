import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', marginTop: 'auto', padding: '3rem 0 1.5rem 0' }}>
      <div className="container">
        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          
          {/* Brand & Description */}
          <div>
             <Link to="/" className="nav-brand flex align-center gap-2" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
               <GraduationCap size={24} className="text-primary" />
               Learning Platform
             </Link>
             <p className="text-secondary" style={{ fontSize: '0.9rem', maxWidth: '300px' }}>
               Empowering students and professionals to master the skills of the future through high-quality, accessible education.
             </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/courses" className="text-secondary" style={{ fontSize: '0.9rem' }}>Browse Courses</Link>
              <Link to="/dashboard" className="text-secondary" style={{ fontSize: '0.9rem' }}>My Dashboard</Link>
              <Link to="/login" className="text-secondary" style={{ fontSize: '0.9rem' }}>Log In</Link>
              <Link to="/signup" className="text-secondary" style={{ fontSize: '0.9rem' }}>Sign Up</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Connect With Us</h4>
            <div className="flex align-center gap-4" style={{ marginBottom: '1rem' }}>
              <a href="https://github.com/26Aakash" target="_blank" rel="noreferrer" className="text-secondary" style={{ fontSize: '0.9rem' }}>
                GitHub
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-secondary" style={{ fontSize: '0.9rem' }}>
                Twitter
              </a>
              <a href="https://www.linkedin.com/in/aakash-joshi-8a1a63298/" target="_blank" rel="noreferrer" className="text-secondary" style={{ fontSize: '0.9rem' }}>
                LinkedIn
              </a>
            </div>
            <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
              joshiaakashhld@gmail.com<br/>
              +91 9045685738
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center' }}>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
            &copy; {currentYear} Learning Platform Inc. All rights reserved. Designed for humans.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
