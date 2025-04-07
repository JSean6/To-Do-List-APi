const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API!');
});

// Dummy in-memory database
let todos = [
  { id: 1, task: 'Buy groceries', completed: false },
  { id: 2, task: 'Clean the house', completed: true }
];

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// GET a single todo by ID
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ message: 'To-do not found' });
  res.json(todo);
});

// POST a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: req.body.completed || false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT to update a todo
app.put('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'To-do not found' });

  todos[index] = {
    id: parseInt(req.params.id),
    task: req.body.task,
    completed: req.body.completed
  };
  res.json(todos[index]);
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'To-do not found' });

  todos.splice(index, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`To-Do List API running on http://localhost:${PORT}`);
});
