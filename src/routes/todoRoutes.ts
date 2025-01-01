import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todoController';

const router = express.Router();

// Create a Todo
router.post('/', createTodo);

// Get all Todos
router.get('/', getTodos);

// Update a Todo
router.put('/:id', updateTodo);  // :id is the placeholder for the Todo ID

// Delete a Todo
router.delete('/:id', deleteTodo);  // :id is the placeholder for the Todo ID

export default router;
