import { Request, Response, RequestHandler } from "express";
import prisma from "../../prisma/index";

// Create a Todo
export const createTodo = async (req: Request, res: Response) => {
  const { title, description, dueDate } = req.body;
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        status: "Pending",
      },
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get All Todos
export const getTodos: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todos = await prisma.todo.findMany();
    if (todos.length === 0) {
      res.status(404).json({ error: "No todos found" });
    } else {
      res.status(200).json(todos);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateTodo: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      // Return here without returning the res object directly
      res.status(404).json({ error: "Todo not found" });
      return;  // Ensure the function doesn't continue after sending the response
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        status,
      },
    });

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
// Delete a Todo

export const deleteTodo: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      // Return without continuing after sending the response
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    await prisma.todo.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
