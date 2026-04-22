import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseListing from './pages/CourseListing';
import Dashboard from './pages/Dashboard';
import CourseDetails from './pages/CourseDetails';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main className="container" style={{ paddingBottom: '3rem', flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<CourseListing />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
