const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number
});
const Student = mongoose.model('Student', StudentSchema);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express Backend!' });
});

app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/api/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

app.put('/api/students/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
});

app.delete('/api/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
