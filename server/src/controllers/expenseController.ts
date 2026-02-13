import { Types } from "mongoose";
import type { Request, Response } from "express";
import { Expense } from "../models/Expense";

export async function createExpense(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const { category, amount, expenseDate, paymentMethod, vendor, description } =
      req.body as {
        category?: string;
        amount?: number;
        expenseDate?: string;
        paymentMethod?: string;
        vendor?: string;
        description?: string;
      };

    if (!category || !expenseDate || !paymentMethod || !vendor || !amount) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const expense = await Expense.create({
      employee: new Types.ObjectId(req.user.id),
      category: category.trim(),
      amount,
      expenseDate: new Date(expenseDate),
      paymentMethod: paymentMethod.trim(),
      vendor: vendor.trim(),
      description: description?.trim() ?? "",
      status: "pending",
      approvedBy: null,
    });

    return res.status(201).json({ expense });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create expense." });
  }
}

export async function listAllExpenses(_req: Request, res: Response) {
  try {
    const expenses = await Expense.find()
      .populate("employee", "name email")
      .sort({ createdAt: -1 });
    return res.status(200).json({ expenses });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch expenses." });
  }
}

export async function listMyExpenses(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const expenses = await Expense.find({ employee: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ expenses });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch your expenses." });
  }
}

export async function approveExpense(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    expense.status = "approved";
    expense.approvedBy = new Types.ObjectId(req.user.id);
    await expense.save();

    return res.status(200).json({ expense });
  } catch (error) {
    return res.status(500).json({ message: "Failed to approve expense." });
  }
}

export async function rejectExpense(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    expense.status = "rejected";
    expense.approvedBy = new Types.ObjectId(req.user.id);
    await expense.save();

    return res.status(200).json({ expense });
  } catch (error) {
    return res.status(500).json({ message: "Failed to reject expense." });
  }
}
