const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  attendanceMarks: { type: Number, default: 0 },
  projectReviewMarks: { type: Number, default: 0 },
  assessmentMarks: { type: Number, default: 0 },
  projectSubmissionMarks: { type: Number, default: 0 },
  linkedInPostMarks: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 },
});

StudentSchema.methods.calculateTotal = function () {
  this.totalMarks = this.attendanceMarks + this.projectReviewMarks + this.assessmentMarks + this.projectSubmissionMarks + this.linkedInPostMarks;
};

module.exports = mongoose.model('Student', StudentSchema);
