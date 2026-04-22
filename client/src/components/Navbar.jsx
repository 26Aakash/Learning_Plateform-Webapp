import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar container" style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(255, 255, 255, 0.95)' }}>
      <Link to="/" className="nav-brand flex align-center gap-2" onClick={closeMenu}>
        <GraduationCap size={28} className="text-primary" />
        Learning Platform
      </Link>
      
      {/* Mobile Menu Toggle Button */}
      <button 
        className="mobile-toggle-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
        aria-label="Toggle Navigation"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/courses" className="nav-link" onClick={closeMenu}>Courses</Link>
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
            <div className={`mobile-user-actions flex align-center gap-4 ${isMobileMenuOpen ? 'flex-col justify-center w-full' : 'ml-4'}`}>
              <Link to="/profile" className={`text-secondary flex align-center gap-2 nav-link ${isMobileMenuOpen ? 'justify-center w-full' : ''}`} style={{ textDecoration: 'none' }} onClick={closeMenu}>
                <User size={18} /> {user.name}
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary flex align-center justify-center gap-2" style={{ padding: '0.5rem 1rem', width: isMobileMenuOpen ? '100%' : 'auto' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
            <Link to="/signup" className="btn" onClick={closeMenu}>Sign Up</Link>
          </>
        )}
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .mobile-toggle-btn {
              display: block !important;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
