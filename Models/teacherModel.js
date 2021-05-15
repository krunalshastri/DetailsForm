const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
  },
  subject: {
    type: String,
    required: true,
  },
});

module.exports = Teacher = mongoose.model('teachers', teacherSchema);
