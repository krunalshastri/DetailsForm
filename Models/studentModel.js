const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
});

module.exports = Student = mongoose.model('students', studentSchema);
