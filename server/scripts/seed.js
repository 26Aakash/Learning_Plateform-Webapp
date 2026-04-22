const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const connectDB = require('../config/db');

const User = require('../models/User');
const Course = require('../models/Course');
const Quiz = require('../models/Quiz');

const seedDB = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Course.deleteMany({});
  await Quiz.deleteMany({});

  console.log('Cleared existing data.');

  // Create Users
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);

  const adminUser = new User({
    name: 'Admin User',
    email: 'admin@lms.com',
    password_hash: passwordHash,
    role: 'admin'
  });

  const studentUser = new User({
    name: 'Student User',
    email: 'student@lms.com',
    password_hash: passwordHash,
    role: 'student'
  });

  await adminUser.save();
  await studentUser.save();
  console.log('Created admin and student users. (Pass: password123)');

  // Create Courses
  const reactCourse = new Course({
    title: 'Modern Web Development',
    description: 'Learn React, Node.js, and MongoDB from scratch. Build a full-stack LMS.',
    image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    instructor_id: adminUser._id,
    lessons: [
      { title: 'Introduction to React', content: 'React is a JavaScript library for building user interfaces...', order: 1 },
      { title: 'Node.js Basics', content: 'Node.js is a JavaScript runtime built on Chrome V8 JavaScript engine...', order: 2 }
    ]
  });

  await reactCourse.save();

  const algoCourse = new Course({
    title: 'Advanced Algorithms',
    description: 'Master data structures, algorithms, and technical interviews.',
    image_url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80',
    instructor_id: adminUser._id,
    lessons: []
  });

  await algoCourse.save();
  console.log('Created courses and lessons.');

  // Create Quiz
  const reactQuiz = new Quiz({
    course_id: reactCourse._id,
    title: 'React Basics Quiz',
    questions: [
      {
        question_text: 'What is React?',
        options: ['A framework', 'A library', 'A database', 'An OS'],
        correct_answer: 'A library'
      }
    ]
  });

  await reactQuiz.save();
  console.log('Created quizzes.');

  console.log('Database Seeding Completed.');
  process.exit();
};

seedDB();
