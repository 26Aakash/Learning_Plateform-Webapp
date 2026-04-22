const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' }
}, { timestamps: true });

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password_hash;
    return ret;
  }
});

module.exports = mongoose.model('User', UserSchema);
