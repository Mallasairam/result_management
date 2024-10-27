const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const parseExcelFile = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheet_name_list = workbook.SheetNames;
  const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return jsonData;
};

// Admin Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ msg: 'Admin not found' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ adminId: admin.id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});

// Upload Marks Route
router.post('/upload/:category', upload.single('file'), async (req, res) => {
  const category = req.params.category;
  const data = parseExcelFile(req.file.path);

  for (let i = 0; i < data.length; i++) {
    let student = await Student.findOne({ studentId: data[i].studentId });
    if (!student) {
      student = new Student({ studentId: data[i].studentId });
    }

    student[`${category}Marks`] = data[i].marks;
    student.calculateTotal();
    await student.save();
  }

  res.json({ msg: 'Data uploaded successfully' });
});

module.exports = router;
