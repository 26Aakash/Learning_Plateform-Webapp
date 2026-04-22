const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  progress_percentage: { type: Number, default: 0 }
}, { timestamps: true });

// Prevent duplicate enrollments
EnrollmentSchema.index({ user_id: 1, course_id: 1 }, { unique: true });

EnrollmentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    // Flattens course info if populated
    if (ret.course_id && ret.course_id.title) {
       ret.title = ret.course_id.title;
       ret.description = ret.course_id.description;
       ret.image_url = ret.course_id.image_url;
       ret.course_id = ret.course_id._id || ret.course_id.id; // restore string ID
    }
    return ret;
  }
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
