// models/FileUpload.js
const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const FileUpload = mongoose.model('FileUpload', fileUploadSchema);

module.exports = FileUpload;
