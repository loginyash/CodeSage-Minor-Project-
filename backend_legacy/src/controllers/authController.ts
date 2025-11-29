import { Request, Response, NextFunction } from "express";
import { createUser, findUserByEmail, updateUser, readData } from "../db/jsonDatabase.js";
import { CreateUserPayload, LoginPayload, User } from "../models/user.js";
import { randomUUID } from "node:crypto";

export const signup = async (
  req: Request<unknown, unknown, CreateUserPayload>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    // Create new user (in production, hash the password!)
    const newUser: User = {
      id: randomUUID(),
      name,
      email,
      password, // In production, hash this with bcrypt!
      joinedDate: new Date().toISOString(),
    };

    const user = await createUser(newUser);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<unknown, unknown, LoginPayload>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // In production, compare hashed passwords!
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Remove password before sending
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request<{ id: string }, unknown, Partial<User>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Don't allow updating password through this endpoint
    delete updates.password;

    const updatedUser = await updateUser(id, updates);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await readData();
    const user = data.users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

