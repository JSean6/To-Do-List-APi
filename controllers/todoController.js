const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
};

const addTodo = async (req, res) => {
  const todo = await Todo.create({ text: req.body.text, userId: req.user.id });
  res.status(201).json(todo);
};

const updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(todo);
};

const deleteTodo = async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.status(204).end();
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
