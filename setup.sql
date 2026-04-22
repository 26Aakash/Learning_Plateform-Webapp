-- Database: lms_db
-- Create the database manually first: CREATE DATABASE lms_db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    instructor_id INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    video_url VARCHAR(255),
    "order" INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    progress_percentage INT DEFAULT 0,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS quizzes (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL, -- Format: ["Option A", "Option B", "Option C"]
    correct_answer VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    quiz_id INT REFERENCES quizzes(id) ON DELETE CASCADE,
    score INT DEFAULT 0,
    taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Dummy Data --
INSERT INTO users (name, email, password_hash, role) VALUES 
('Admin User', 'admin@lms.com', '$2b$10$EP6DToXoDpx9pS//5aR8eOnT6Wl1V/O3N8rOONqZzB.aV9Z1kNjV.', 'admin'), -- password: password123
('Student User', 'student@lms.com', '$2b$10$EP6DToXoDpx9pS//5aR8eOnT6Wl1V/O3N8rOONqZzB.aV9Z1kNjV.', 'student')
ON CONFLICT (email) DO NOTHING;

INSERT INTO courses (title, description, image_url, instructor_id) VALUES 
('Modern Web Development', 'Learn React, Node.js, and PostgreSQL from scratch. Build a full-stack LMS.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', 1),
('Advanced Algorithms', 'Master data structures, algorithms, and technical interviews.', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80', 1)
ON CONFLICT DO NOTHING;

INSERT INTO lessons (course_id, title, content, "order") VALUES 
(1, 'Introduction to React', 'React is a JavaScript library for building user interfaces...', 1),
(1, 'Node.js Basics', 'Node.js is a JavaScript runtime built on Chrome''s V8 JavaScript engine...', 2)
ON CONFLICT DO NOTHING;

INSERT INTO quizzes (course_id, title) VALUES
(1, 'React Basics Quiz')
ON CONFLICT DO NOTHING;

INSERT INTO questions (quiz_id, question_text, options, correct_answer) VALUES
(1, 'What is React?', '["A framework", "A library", "A database", "An OS"]', 'A library')
ON CONFLICT DO NOTHING;
