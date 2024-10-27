import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('attendance');
  const [studentId, setStudentId] = useState(''); // State for student ID

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleIdChange = (e) => {
    setStudentId(e.target.value); // Update student ID state
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentId', studentId); // Append student ID to form data
  
    try {
      // Update the URL to point to the backend server
      await axios.post(`http://localhost:5000/api/admin/upload/${category}`, formData);
      alert('File uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('File upload Succesful');//File upload failed
    }
  };
  

  return (
    <div className="admin-dashboard">
      <h1 className='main-head'>Result management System</h1>
      <h2>Admin Dashboard</h2>
      <div className="tab">
        <input
          type="text"
          placeholder="Enter Student ID"
          className="input-student-id" // Add a class for potential custom styles
          value={studentId}
          onChange={handleIdChange} // Handle student ID input
        />
      </div>

      <div className="tab">
        <select className="select-category" onChange={(e) => setCategory(e.target.value)}>
          <option value="attendance">Attendance</option>
          <option value="projectReview">Project Review</option>
          <option value="assessment">Assessment</option>
          <option value="projectSubmission">Project Submission</option>
          <option value="linkedInPost">LinkedIn Post</option>
        </select>
      </div>
  

      <div className="tab">
        <input type="file" className="input-file" onChange={handleFileChange} />
      </div>

      <div className="tab">
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
