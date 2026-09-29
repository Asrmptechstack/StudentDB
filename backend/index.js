const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Local Database Connection
const mongoURI = 'mongodb://127.0.0.1:27017/studentDB';

mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Student Schema Definition
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  mobileNo: { type: String, required: true },
  dob: { type: String, required: true },
  course: { 
    type: String, 
    required: true, 
    enum: ['MERN STACK', 'JavaScript', 'Python', 'AWS'] // These values are the only ones allowed
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'completed'] 
  }
}, { timestamps: true });

// Model 'Student' 
const Student = mongoose.model('Student', studentSchema);

// Base status confirmation route
app.get('/', (req, res) => {
  res.send('<h1>Student Database Server is Running Successfully!</h1>');
});

// Data receiver route handler (POST API)
app.post('/api/students', async (req, res) => {
  try {
    console.log('Incoming Frontend Data Payload:', req.body); // Log the incoming data for debugging
    
    const newStudent = new Student(req.body);
    await newStudent.save();
    
    res.status(201).json({ success: true, message: 'Saved to MongoDB!' });
  } catch (error) {
    console.error('Database Save Error Details:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running smoothly on port ${PORT}`);
});
