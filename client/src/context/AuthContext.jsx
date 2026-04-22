import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('lms_token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
        } catch (error) {
          console.error('Failed to fetch user', error);
          localStorage.removeItem('lms_token');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('lms_token', res.data.token);
    setUser(res.data.user);
  };

  const signup = async (name, email, password) => {
    const res = await api.post('/auth/signup', { name, email, password });
    localStorage.setItem('lms_token', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('lms_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
