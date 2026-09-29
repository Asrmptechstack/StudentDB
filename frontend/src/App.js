import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mobileNo: '',
    dob: '',
    course: '',  
    status: ''   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/students', formData);
      if (response.data.success) {
        alert('Student data saved successfully to database!');
        handleReset();
      }
    } catch (err) {
      console.error("Frontend Axios Error:", err);
      alert('Failed to save data. Please check your backend terminal for validation errors.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      age: '',
      mobileNo: '',
      dob: '',
      course: '',
      status: ''
    });
  };

  return (
    <div className="form-container">
      <h3 className="form-title">STUDENT REGISTRATION FORM</h3>
      <form onSubmit={handleSubmit} className="marksheet-form">
        
        {/* Text Input Fields */}
        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Age', name: 'age', type: 'number' },
          { label: 'Mobile No', name: 'mobileNo', type: 'text' },
          { label: 'DOB', name: 'dob', type: 'date' }
        ].map((field) => (
          <div key={field.name} className="form-row">
            <div className="form-label">{field.label}</div>
            <div className="form-input-cell">
              <input 
                type={field.type} 
                name={field.name} 
                value={formData[field.name]} 
                onChange={handleChange} 
                required 
                className="full-width-input"
              />
            </div>
          </div>
        ))}

        {/* Full Size Course Dropdown Menu */}
        <div className="form-row">
          <div className="form-label">Course</div>
          <div className="form-input-cell">
            <select 
              name="course" 
              value={formData.course} 
              onChange={handleChange} 
              required
              className="full-width-input"
            >
              <option value="">-- Select Course --</option>
              <option value="MERN STACK">MERN STACK</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="AWS">AWS</option>
            </select>
          </div>
        </div>

        {/* Status Radio Elements */}
        <div className="form-row">
          <div className="form-label">Status</div>
          <div className="form-input-cell radio-group">
            <label>
              <input 
                type="radio" 
                name="status" 
                value="pending" 
                checked={formData.status === 'pending'} 
                onChange={handleChange} 
                required 
              /> Pending
            </label>
            <label>
              <input 
                type="radio" 
                name="status" 
                value="completed" 
                checked={formData.status === 'completed'} 
                onChange={handleChange} 
              /> Completed
            </label>
          </div>
        </div>

        {/* Action Panel Buttons */}
        <div className="form-row">
          <div className="form-label"></div>
          <div className="form-input-cell button-group">
            <button type="submit" className="btn btn-submit">Submit</button>
            <button type="button" onClick={handleReset} className="btn btn-reset">Reset</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
