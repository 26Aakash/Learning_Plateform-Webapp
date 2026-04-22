import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Save, CheckCircle } from 'lucide-react';
import api from '../api';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.put('/auth/me', { name, email });
      setUser(res.data); // update global state
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', marginTop: '3rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>My Profile</h1>
      
      <div className="glass-panel">
        
        {error && <div className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', width: '100%', marginBottom: '1.5rem' }}>{error}</div>}
        {success && <div className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', width: '100%', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={16}/> {success}
        </div>}
        
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="name" className="flex align-center gap-2">
              <User size={16} className="text-secondary" /> Full Name
            </label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your name"
              required 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email" className="flex align-center gap-2">
              <Mail size={16} className="text-secondary" /> Email Address
            </label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Your email"
              required 
            />
          </div>

          <div style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
             <button type="submit" className="btn" disabled={loading} style={{ minWidth: '150px' }}>
                <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
