// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://pratik2271:pratik%401624@pratikproject.vglse6e.mongodb.net/gateSubjects?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

// Define the schema and model
const subjectSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  questionsSolved: { type: Number, default: 0 },
});

const Subject = mongoose.model('Subject', subjectSchema);

// Initialize subjects if they don't already exist
async function initializeSubjects() {
  const subjects = [
    'mathematics', 'discreteMaths', 'aptitude', 'dsa', 
    'cProgramming', 'algorithms', 'digitalLogic', 
    'computerOrganization', 'theoryOfComputation', 
    'compilerDesign', 'dbms', 'os', 'cn'
  ];

  for (const subject of subjects) {
    await Subject.findOneAndUpdate(
      { name: subject },
      { $setOnInsert: { questionsSolved: 0 } },
      { upsert: true, new: true }
    );
  }
}

initializeSubjects().catch(err => console.error('Failed to initialize subjects', err));

// API endpoints
app.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/subjects/:name', async (req, res) => {
  const { name } = req.params;
  const { questionsSolved } = req.body;
  try {
    const subject = await Subject.findOneAndUpdate(
      { name },
      { questionsSolved },
      { new: true }
    );
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
