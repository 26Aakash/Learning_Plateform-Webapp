const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  video_url: { type: String },
  order: { type: Number, default: 0 }
});

LessonSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image_url: { type: String },
  instructor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lessons: [LessonSchema]
}, { timestamps: true });

CourseSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    if (ret.instructor_id && ret.instructor_id.name) {
      ret.instructor_name = ret.instructor_id.name;
    }
    return ret;
  }
});

module.exports = mongoose.model('Course', CourseSchema);
