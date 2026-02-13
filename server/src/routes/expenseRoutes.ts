import { Router } from "express";
import {
  approveExpense,
  createExpense,
  listAllExpenses,
  listMyExpenses,
  rejectExpense,
} from "../controllers/expenseController";
import { requireAuth } from "../middleware/auth";
import { authorizeRole } from "../middleware/authorizeRole";

const expenseRouter = Router();

expenseRouter.post("/", requireAuth, authorizeRole("employee"), createExpense);
expenseRouter.get("/", requireAuth, authorizeRole("manager"), listAllExpenses);
expenseRouter.get("/me", requireAuth, authorizeRole("employee"), listMyExpenses);
expenseRouter.put("/:id/approve", requireAuth, authorizeRole("manager"), approveExpense);
expenseRouter.put("/:id/reject", requireAuth, authorizeRole("manager"), rejectExpense);

export default expenseRouter;
