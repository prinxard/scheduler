import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todoController';
import { authenticateUser } from "../middleware/authMiddleware";
const router = express.Router();


// Create a Todo
router.post('/', authenticateUser, createTodo);

// Get all Todos
router.get('/', authenticateUser, getTodos);

// Update a Todo
router.put('/:id', authenticateUser, updateTodo);  

// Delete a Todo
router.delete('/:id', authenticateUser, deleteTodo);  

export default router;
