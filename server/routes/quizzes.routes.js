const express = require('express');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Get quizzes for a course
router.get('/course/:courseId', authenticateToken, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ course_id: req.params.courseId }, 'title createdAt');
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a quiz with questions (omitting correct_answer is best practice, but kept simple here)
router.get('/:quizId', authenticateToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    
    // For the UI to render what it expects:
    res.json({
      quiz: { id: quiz._id, title: quiz.title, course_id: quiz.course_id },
      questions: quiz.questions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit quiz answers
router.post('/:quizId/submit', authenticateToken, async (req, res) => {
  try {
    const { answers } = req.body; 
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    
    let score = 0;
    const total = quiz.questions.length;

    quiz.questions.forEach(q => {
      const questionId = q._id.toString();
      if (answers && answers[questionId] === q.correct_answer) {
        score++;
      }
    });

    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    const result = new Result({ user_id: req.user.id, quiz_id: quiz._id, score: percentage });
    await result.save();

    res.json({
      score: percentage,
      correct: score,
      total,
      resultId: result._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
