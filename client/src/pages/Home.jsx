import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import CourseCard from '../components/CourseCard';
import { Sparkles, Zap, Shield } from 'lucide-react';

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data.slice(0, 3)); // top 3 courses
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="animate-fade-in">
      <section className="hero-section">
        <h1 className="hero-title">Elevate Your Learning Experience</h1>
        <p className="hero-subtitle">
          Master the skills of the future with our premium courses. Learn at your own pace, anytime, anywhere.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/courses" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Explore Courses
          </Link>
          <Link to="/signup" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Get Started
          </Link>
        </div>
      </section>

      <section style={{ marginBottom: '6rem' }}>
        <div className="grid-3">
          <div className="glass-panel" style={{ textAlign: 'center' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <Zap size={30} color="#8b5cf6" />
            </div>
            <h3>Fast Paced Learning</h3>
            <p className="text-secondary" style={{ marginTop: '0.5rem' }}>Optimized bite-sized lessons to get you up to speed quickly.</p>
          </div>
          <div className="glass-panel" style={{ textAlign: 'center' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <Sparkles size={30} color="#10b981" />
            </div>
            <h3>Interactive Quizzes</h3>
            <p className="text-secondary" style={{ marginTop: '0.5rem' }}>Test your knowledge instantly with our built in quiz system.</p>
          </div>
          <div className="glass-panel" style={{ textAlign: 'center' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <Shield size={30} color="#ef4444" />
            </div>
            <h3>Certified Results</h3>
            <p className="text-secondary" style={{ marginTop: '0.5rem' }}>Earn a certificate of completion to prove your expertise.</p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <h2>Featured Courses</h2>
          <Link to="/courses" className="text-secondary" style={{ textDecoration: 'underline' }}>View All</Link>
        </div>
        <div className="grid-3">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
