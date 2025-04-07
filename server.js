const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
console.log("MONGO_URI from .env:", process.env.MONGO_URI);
const Todo = require('./models/Todo');

const app = express();
const PORT = 3000;

app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Root
app.get('/', (req, res) => res.send('To-Do API with MongoDB'));

// Create
app.post('/api/todos', async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Read one
app.get('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Not found' });
    res.json(todo);
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// Update
app.put('/api/todos/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch {
    res.status(400).json({ message: 'Invalid update' });
  }
});

// Delete
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch {
    res.status(400).json({ message: 'Invalid delete' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');

app.use(express.json());

// Use to-do routes
app.use('/api/todos', todoRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
