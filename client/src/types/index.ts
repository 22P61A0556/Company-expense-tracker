export type ThemeMode = "light" | "dark";

export type UserRole = "employee" | "manager";

export type ViewName = "landing" | "login" | "dashboard";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Expense {
  _id: string;
  employee: string;
  category: string;
  amount: number;
  expenseDate: string;
  paymentMethod: string;
  vendor: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  approvedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseCreatePayload {
  category: string;
  amount: number;
  expenseDate: string;
  paymentMethod: string;
  vendor: string;
  description: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
