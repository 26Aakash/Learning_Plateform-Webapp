const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question_text: { type: String, required: true },
  options: [{ type: String }],
  correct_answer: { type: String, required: true }
});

QuestionSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});

const QuizSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  questions: [QuestionSchema]
}, { timestamps: true });

QuizSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Quiz', QuizSchema);
