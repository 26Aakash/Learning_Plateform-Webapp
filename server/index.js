const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const coursesRoutes = require('./routes/courses.routes');
const enrollmentsRoutes = require('./routes/enrollments.routes');
const quizzesRoutes = require('./routes/quizzes.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/enrollments', enrollmentsRoutes);
app.use('/api/quizzes', quizzesRoutes);

app.get('/', (req, res) => {
  res.send('LMS API with MongoDB is running');
});

// Basic Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
