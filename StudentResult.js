// models/StudentResult.js
const mongoose = require('mongoose');

const studentResultSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true, // Ensure each student ID is unique
  },
  attendanceMarks: { type: Number, default: 0 },
  projectReviewMarks: { type: Number, default: 0 },
  assessmentMarks: { type: Number, default: 0 },
  projectSubmissionMarks: { type: Number, default: 0 },
  linkedInPostMarks: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 },
});

const StudentResult = mongoose.model('StudentResult', studentResultSchema);

module.exports = StudentResult;
