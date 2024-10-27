const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

// Get student results by ID
router.get('/results/:studentId', async (req, res) => {
  const student = await Student.findOne({ studentId: req.params.studentId });
  if (!student) return res.status(404).json({ msg: 'Student not found' });

  res.json({
    studentId: student.studentId,
    attendanceMarks: student.attendanceMarks,
    projectReviewMarks: student.projectReviewMarks,
    assessmentMarks: student.assessmentMarks,
    projectSubmissionMarks: student.projectSubmissionMarks,
    linkedInPostMarks: student.linkedInPostMarks,
    totalMarks: student.totalMarks,
  });
});

module.exports = router;
