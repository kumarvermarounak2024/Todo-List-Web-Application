const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST a new todo
router.post('/', async (req, res) => {
  const { text, dueDate, priority } = req.body;

  // Basic validation
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const newTodo = new Todo({
    text,
    completed: false,
    dueDate: dueDate || new Date(), // fallback to now
    priority: priority || 'medium',
  });

  await newTodo.save();
  res.status(201).json(newTodo);
});

// TOGGLE complete status
router.put('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
