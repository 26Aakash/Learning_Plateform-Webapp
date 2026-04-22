import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Clock } from 'lucide-react';

const CourseCard = ({ course, enrollment }) => {
  return (
    <div className="glass-panel" style={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <img 
        src={course.image_url || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80'} 
        alt={course.title} 
        className="card-image"
        style={{ margin: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      />
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{course.title}</h3>
        <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
          {course.description?.substring(0, 80)}...
        </p>

        {enrollment ? (
          <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span>Progress</span>
              <span>{enrollment.progress_percentage}%</span>
            </div>
            <div className="progress-container" style={{ marginTop: 0, marginBottom: '1rem' }}>
              <div className="progress-bar" style={{ width: `${enrollment.progress_percentage}%` }}></div>
            </div>
            <Link to={`/courses/${course.course_id || course.id}`} className="btn" style={{ width: '100%' }}>
              Continue Learning
            </Link>
          </div>
        ) : (
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge" style={{ margin: 0 }}><Book size={12} style={{ display:'inline', marginRight:'4px' }}/> Beginner</span>
            <Link to={`/courses/${course.id}`} className="btn btn-secondary">View Course</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
