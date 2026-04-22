const User = require('../models/User');
const Course = require('../models/Course');
const Quiz = require('../models/Quiz');
const Enrollment = require('../models/Enrollment');
const bcrypt = require('bcrypt');

const seedDummyData = async (userEmail) => {
  console.log('Seeding dummy data into local Memory DB...');
  try {
    // Check if courses exist
    const count = await Course.countDocuments();
    if (count > 0) return;

    // Create a generic admin user for instructor refs
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    
    let admin = await User.findOne({ email: 'admin@learningplatform.com' });
    if (!admin) {
      admin = new User({ name: 'Admin', email: 'admin@learningplatform.com', password_hash: passwordHash, role: 'admin' });
      await admin.save();
    }

    const jsCourse = new Course({
      title: 'JavaScript 101',
      description: 'Learn the fundamentals of JavaScript programming to jumpstart your web development career.',
      image_url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
      instructor_id: admin._id,
      lessons: [{ title: 'Variables & Data Types', content: 'Let and Const', order: 1 }]
    });

    const reactCourse = new Course({
      title: 'Advanced React',
      description: 'Master Hooks, Context API, and Performance optimization for enterprise applications.',
      image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
      instructor_id: admin._id,
      lessons: [{ title: 'State Management with Hooks', content: 'useState and useEffect', order: 1 }]
    });

    const pythonCourse = new Course({
      title: 'Python for Data Science',
      description: 'Dive deep into data manipulation, analysis, and visualization using Python and Pandas.',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      instructor_id: admin._id,
      lessons: [{ title: 'Intro to Pandas', content: 'DataFrames and Series', order: 1 }]
    });

    const devopsCourse = new Course({
      title: 'DevOps Cloud CI/CD',
      description: 'Deploy software rapidly and reliably using Docker, Kubernetes, and GitHub Actions.',
      image_url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
      instructor_id: admin._id,
      lessons: [{ title: 'Docker Containers', content: 'Containerizing Node.js Apps', order: 1 }]
    });

    const designCourse = new Course({
      title: 'UI/UX Design Masterclass',
      description: 'Design beautiful, accessible, and high-converting user interfaces using Figma.',
      image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      instructor_id: admin._id,
      lessons: [{ title: 'Color Theory', content: 'Choosing palettes', order: 1 }]
    });

    await jsCourse.save();
    await reactCourse.save();
    await pythonCourse.save();
    await devopsCourse.save();
    await designCourse.save();
    
    // Automatically enroll the user if their email is provided
    if (userEmail) {
        const user = await User.findOne({ email: userEmail });
        if (user) {
            await new Enrollment({ user_id: user._id, course_id: jsCourse._id, progress_percentage: 45 }).save();
            await new Enrollment({ user_id: user._id, course_id: reactCourse._id, progress_percentage: 12 }).save();
        }
    }

    console.log('Dummy data seeded successfully with 5 courses!');
  } catch (err) {
    console.error('Failed to seed dummy data: ', err);
  }
};

module.exports = seedDummyData;
