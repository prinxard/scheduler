"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const index_1 = __importDefault(require("../../prisma/index"));
// Create a Todo
const createTodo = async (req, res) => {
    const { title, description, dueDate } = req.body;
    try {
        const todo = await index_1.default.todo.create({
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null,
                status: "Pending",
            },
        });
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createTodo = createTodo;
// Get All Todos
const getTodos = async (req, res) => {
    try {
        const todos = await index_1.default.todo.findMany();
        if (todos.length === 0) {
            res.status(404).json({ error: "No todos found" });
        }
        else {
            res.status(200).json(todos);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getTodos = getTodos;
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;
    try {
        const todo = await index_1.default.todo.findUnique({
            where: { id: Number(id) },
        });
        if (!todo) {
            // Return here without returning the res object directly
            res.status(404).json({ error: "Todo not found" });
            return; // Ensure the function doesn't continue after sending the response
        }
        const updatedTodo = await index_1.default.todo.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null,
                status,
            },
        });
        res.status(200).json(updatedTodo);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateTodo = updateTodo;
// Delete a Todo
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await index_1.default.todo.findUnique({
            where: { id: Number(id) },
        });
        if (!todo) {
            // Return without continuing after sending the response
            res.status(404).json({ error: "Todo not found" });
            return;
        }
        await index_1.default.todo.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ message: "Todo deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteTodo = deleteTodo;
