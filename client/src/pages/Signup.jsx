import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to sign up');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
        {error && <div className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', width: '100%', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="John Doe"
              required 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Create a strong password"
              required 
            />
          </div>
          <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }} className="text-secondary">
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
