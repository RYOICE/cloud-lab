const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const Student = mongoose.model('Student', new mongoose.Schema({
  studentId: String, name: String, email: String
}));

app.get('/api/students', async (req, res) => res.json(await Student.find()));
app.post('/api/students', async (req, res) => res.status(201).json(await Student.create(req.body)));
app.put('/api/students/:id', async (req, res) => res.json(await Student.findByIdAndUpdate(req.params.id, req.body, {new: true})));
app.delete('/api/students/:id', async (req, res) => res.json(await Student.findByIdAndDelete(req.params.id)));

app.listen(process.env.PORT || 5000, () => console.log('Server runs on port 5000'));
