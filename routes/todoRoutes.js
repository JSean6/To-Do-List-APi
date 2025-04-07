const express = require('express');
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', getTodos);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;