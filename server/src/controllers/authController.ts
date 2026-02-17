import { pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import type { AuthUserPayload } from "../types/auth";

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string) {
  const [salt, savedHash] = stored.split(":");
  if (!salt || !savedHash) {
    return false;
  }

  const computed = pbkdf2Sync(password, salt, 120000, 32, "sha256");
  const saved = Buffer.from(savedHash, "hex");
  if (computed.length !== saved.length) {
    return false;
  }

  return timingSafeEqual(computed, saved);
}

function toAuthPayload(user: {
  _id: unknown;
  name: string;
  email: string;
  role: "employee" | "manager";
}): AuthUserPayload {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      role?: "employee" | "manager";
    };

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: hashPassword(password),
      role: role ?? "employee",
    });

    return res.status(201).json({
      message: "User created.",
      user: toAuthPayload(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to register user." });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
    return res.status(200).json({ token, user: payload });
  } catch (error) {
    return res.status(500).json({ message: "Failed to log in." });
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch profile." });
  }
}
