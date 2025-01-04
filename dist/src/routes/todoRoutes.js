"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const router = express_1.default.Router();
// Create a Todo
router.post('/', todoController_1.createTodo);
// Get all Todos
router.get('/', todoController_1.getTodos);
// Update a Todo
router.put('/:id', todoController_1.updateTodo); // :id is the placeholder for the Todo ID
// Delete a Todo
router.delete('/:id', todoController_1.deleteTodo); // :id is the placeholder for the Todo ID
exports.default = router;
