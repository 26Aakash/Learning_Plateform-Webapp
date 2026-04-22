import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import { Award, Book, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (user) {
        try {
          const res = await api.get('/enrollments');
          setEnrollments(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEnrollments();
  }, [user]);

  if (!user) return <Navigate to="/login" />;
  if (loading) return <div style={{ textAlign: 'center', padding: '5rem 0' }}>Loading...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Student Dashboard</h1>
        <p className="text-secondary">Welcome back, {user.name}! Track your progress below.</p>
      </div>

      <div className="grid-3" style={{ marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '12px' }}>
            <Book size={24} color="var(--primary-color)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{enrollments.length}</h3>
            <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Enrolled Courses</span>
          </div>
        </div>
        
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px' }}>
            <Award size={24} color="#10b981" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>0</h3>
            <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Certificates Earned</span>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '12px' }}>
            <Clock size={24} color="#ef4444" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>12h</h3>
            <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Hours Learned</span>
          </div>
        </div>
      </div>

      <h2>Your Learning Path</h2>
      <div className="grid-3" style={{ marginTop: '1.5rem' }}>
        {enrollments.map(enroll => (
          <CourseCard key={enroll.course_id} course={enroll} enrollment={enroll} />
        ))}
        {enrollments.length === 0 && (
          <div className="glass-panel" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
            <p className="text-secondary" style={{ marginBottom: '1rem' }}>You haven't enrolled in any courses yet.</p>
            <a href="/courses" className="btn">Browse Courses</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
