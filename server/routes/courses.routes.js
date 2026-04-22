const express = require('express');
const Course = require('../models/Course');
const { authenticateToken, requireAdmin } = require('../middlewares/auth');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor_id', 'name').sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor_id', 'name');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get lessons for a course
router.get('/:id/lessons', authenticateToken, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    // Sort lessons by `order` if needed
    const lessons = course.lessons.sort((a, b) => a.order - b.order);
    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create course (Admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { title, description, image_url, lessons } = req.body;
    const newCourse = new Course({
      title,
      description,
      image_url,
      instructor_id: req.user.id,
      lessons: lessons || []
    });
    
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
