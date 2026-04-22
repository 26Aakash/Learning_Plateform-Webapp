const express = require('express');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Get user's enrollments
router.get('/', authenticateToken, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user_id: req.user.id }).populate('course_id');
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Enroll in a course
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { course_id } = req.body;
    if (!course_id) return res.status(400).json({ error: 'Course ID missing' });

    const course = await Course.findById(course_id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const existing = await Enrollment.findOne({ user_id: req.user.id, course_id });
    if (existing) return res.status(400).json({ error: 'Already enrolled' });

    const newEnrollment = new Enrollment({ user_id: req.user.id, course_id });
    await newEnrollment.save();

    res.status(201).json(newEnrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update progress
router.put('/:id/progress', authenticateToken, async (req, res) => {
  try {
    const { progress_percentage } = req.body;
    const enrollment = await Enrollment.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      { progress_percentage },
      { new: true }
    );
    
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found or unauthorized' });
    
    res.json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
