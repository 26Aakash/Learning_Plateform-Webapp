const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, default: 0 }
}, { timestamps: true });

ResultSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Result', ResultSchema);
