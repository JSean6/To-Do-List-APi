const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Mock data
let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', year: 2018 },
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho', year: 1988 }
];

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Book API!');
  });
  
app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

app.post('/api/books', (req, res) => {
  const newBook = { id: books.length + 1, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });
  books[index] = { id: parseInt(req.params.id), ...req.body };
  res.json(books[index]);
});

app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });
  books.splice(index, 1);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
