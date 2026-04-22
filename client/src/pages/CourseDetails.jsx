import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, PlayCircle, BookOpen } from 'lucide-react';

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await api.get(`/courses/${id}`);
        setCourse(courseRes.data);

        if (user) {
          // Check enrollment status
          const enrollmentsRes = await api.get('/enrollments');
          const enrolled = enrollmentsRes.data.find(e => e.course_id === parseInt(id));
          setIsEnrolled(!!enrolled);

          // Get lessons and quizzes if strictly useful, or just fetch lessons
          try {
            const lessonsRes = await api.get(`/courses/${id}/lessons`);
            setLessons(lessonsRes.data);
            const quizzesRes = await api.get(`/quizzes/course/${id}`);
            setQuizzes(quizzesRes.data);
          } catch(e) {
            console.log("Not authorized to view lessons/quizzes until verified/enrolled");
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await api.post('/enrollments', { course_id: id });
      setIsEnrolled(true);
      // Refresh lessons
      const lessonsRes = await api.get(`/courses/${id}/lessons`);
      setLessons(lessonsRes.data);
      const quizzesRes = await api.get(`/quizzes/course/${id}`);
      setQuizzes(quizzesRes.data);
    } catch (error) {
      console.error(error);
      alert('Failed to enroll');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem 0' }}>Loading...</div>;
  if (!course) return <div style={{ textAlign: 'center', padding: '5rem 0' }}>Course not found.</div>;

  return (
    <div className="animate-fade-in">
      <div className="glass-panel" style={{ marginBottom: '3rem', padding: '3rem', display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <img src={course.image_url} alt={course.title} style={{ width: '100%', maxWidth: '400px', borderRadius: '16px' }} />
        <div style={{ flex: 1, minWidth: '300px' }}>
          <span className="badge">Featured</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{course.title}</h1>
          <p className="text-secondary" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>{course.description}</p>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <img src={`https://ui-avatars.com/api/?name=${course.instructor_name}&background=0D8ABC&color=fff`} style={{width: 32, borderRadius: '50%'}} /> 
               {course.instructor_name}
            </span>
          </div>

          {!isEnrolled ? (
            <button onClick={handleEnroll} className="btn" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Enroll Now
            </button>
          ) : (
             <div className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '0.5rem 1rem', fontSize: '1rem' }}>
               <CheckCircle size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} />
               Enrolled
             </div>
          )}
        </div>
      </div>

      {isEnrolled && (
        <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Course Content</h2>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              {lessons.map((lesson, idx) => (
                <div key={lesson.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 0', borderBottom: idx < lessons.length -1 ? '1px solid var(--border-color)' : 'none' }}>
                  <div style={{ marginTop: '3px' }}><PlayCircle size={24} color="var(--primary-color)" /></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{idx + 1}. {lesson.title}</h4>
                    <p className="text-secondary" style={{ fontSize: '0.9rem' }}>{lesson.content}</p>
                  </div>
                </div>
              ))}
              {lessons.length === 0 && <p className="text-secondary">No lessons available yet.</p>}
            </div>
          </div>
          
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Quizzes</h2>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
               {quizzes.map(quiz => (
                 <Link key={quiz.id} to={`/quiz/${quiz.id}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '1rem' }}>
                   <BookOpen size={20} color="var(--secondary-color)" />
                   <span style={{ fontWeight: 500 }}>{quiz.title}</span>
                 </Link>
               ))}
               {quizzes.length === 0 && <p className="text-secondary">No quizzes available.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
