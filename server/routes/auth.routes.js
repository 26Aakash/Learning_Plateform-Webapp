const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password_hash });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database Unreachable: Please check your MongoDB Atlas Dashboard. Your cluster might be paused, deleted, or missing an IP Whitelist.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'All fields are required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database Unreachable: Please check your MongoDB Atlas Dashboard. Your cluster might be paused, deleted, or missing an IP Whitelist.' });
  }
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/me', authenticateToken, async (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if email is being changed and is already taken
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ error: 'Email already in use' });
    }

    user.name = name;
    user.email = email;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
