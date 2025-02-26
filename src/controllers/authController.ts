import { Request, Response } from "express";
import prisma from "../../prisma/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "$2a$12$c.PE11wbVBh3W3pB6ibFv.sAmynU6vfDZgXO8enDc9V2IOjoxkwVS"; // Change this to an environment variable in production

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return; // ✅ Ensures function always exits with a response
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully" });
    return; // ✅ Ensures function exits properly
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
    return; // ✅ Explicitly return in case of an error
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return; // ✅ Exit function properly
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return; // ✅ Exit function properly
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ token });
    return; // ✅ Ensure function always returns a response
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
    return; // ✅ Exit properly in case of an error
  }
};
