import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../config/env";
import type { AuthUserPayload } from "../types/auth";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verify(token, env.jwtSecret);
    if (!decoded || typeof decoded === "string") {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user = decoded as AuthUserPayload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
}
