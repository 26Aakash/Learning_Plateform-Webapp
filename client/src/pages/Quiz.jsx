import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, XCircle } from 'lucide-react';

const Quiz = () => {
  const { quizId } = useParams();
  const { user } = useContext(AuthContext);
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quizzes/${quizId}`);
        setQuizData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchQuiz();
  }, [quizId, user]);

  const handleOptionSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post(`/quizzes/${quizId}/submit`, { answers });
      setResult(res.data);
      
      // Attempt to update progress as a demonstration
      // Ideally we should know the enrollment ID but for this demo we skip it or update via backend trigger.
    } catch (err) {
      console.error(err);
      alert('Failed to submit quiz');
    }
  };

  if (!user) return <div style={{ textAlign: 'center', padding: '5rem 0' }}>Please log in to take quizzes.</div>;
  if (loading) return <div style={{ textAlign: 'center', padding: '5rem 0' }}>Loading quiz...</div>;
  if (!quizData) return <div style={{ textAlign: 'center', padding: '5rem 0' }}>Quiz not found.</div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{quizData.quiz.title}</h1>
        <p className="text-secondary">Answer all questions to complete the quiz.</p>
      </div>

      {!result ? (
        <>
          {quizData.questions.map((q, idx) => (
            <div key={q.id} className="glass-panel" style={{ marginBottom: '1.5rem', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                <span className="text-primary" style={{ marginRight: '0.5rem' }}>{idx + 1}.</span> 
                {q.question_text}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {q.options.map((opt, i) => (
                  <label key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    padding: '1rem', 
                    background: answers[q.id] === opt ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)', 
                    border: `1px solid ${answers[q.id] === opt ? 'var(--primary-color)' : 'var(--border-color)'}`,
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}>
                    <input 
                      type="radio" 
                      name={`question_${q.id}`} 
                      value={opt} 
                      checked={answers[q.id] === opt}
                      onChange={() => handleOptionSelect(q.id, opt)} 
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
                    />
                    <span style={{ fontSize: '1rem' }}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button 
            className="btn" 
            style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem' }}
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== quizData.questions.length}
          >
            Submit Quiz
          </button>
        </>
      ) : (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          {result.score >= 70 ? (
            <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1.5rem auto' }} />
          ) : (
            <XCircle size={64} color="#ef4444" style={{ margin: '0 auto 1.5rem auto' }} />
          )}
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            You scored {result.score}%
          </h2>
          <p className="text-secondary" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            {result.correct} out of {result.total} questions correct.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => window.location.reload()}>Retake Quiz</button>
            <Link to="/dashboard" className="btn">Back to Dashboard</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
