import React, { useEffect, useState } from 'react';
import api from '../api';
import CourseCard from '../components/CourseCard';

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem 0' }}>Loading courses...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Course Catalog</h1>
        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Browse our extensive library of premium courses designed to take your skills to the next level.
        </p>
      </div>
      
      <div className="grid-3">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseListing;
