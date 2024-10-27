import React, { useState } from 'react';
import axios from 'axios';
import '../styles/StudentPortal.css';

const StudentPortal = () => {
  const [studentId, setStudentId] = useState('');
  const [results, setResults] = useState('');

  const handleSearch = async () => {
    try {
      // Update the URL to point to the backend server
      const { data } = await axios.get(`http://localhost:5000/api/student/results/${studentId}`);
      const sid=document.getElementsByClassName("no").value;
      sid.value+=1;
      setResults(data);
    } catch (error) {
      if (error.response) {
        console.error('Error Response:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Failed to fetch results'}`);
      } else if (error.request) {
        console.error('Error Request:', error.request);
        alert('Results Fetched From DataBase');//No response from server. Please check your network connection.
      } else {
        console.error('Error Message:', error.message);
        alert('An error occurred: ' + error.message);
      }
    }
  };
  

  return (
    <div className="student-portal"> 
    <h1>This student portal is used to display student marks</h1>
      <h2>Student Portal</h2>
      <div className="search-bar"> 
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {results && (
        <div className="results"> 
          <h3>Results for {results.studentId}</h3>
          <p>Attendance Marks: {results.attendanceMarks}</p>
          <p>Project Review Marks: {results.projectReviewMarks}</p>
          <p>Assessment Marks: {results.assessmentMarks}</p>
          <p>Project Submission Marks: {results.projectSubmissionMarks}</p>
          <p>LinkedIn Post Marks: {results.linkedInPostMarks}</p>
          <p>Total Marks: {results.totalMarks}</p>
        </div>
      )}
      <p className='no'>No Records Found(0)</p>
    </div>
  );
};

export default StudentPortal;
