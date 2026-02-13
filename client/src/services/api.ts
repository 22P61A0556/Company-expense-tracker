import type {
  AuthUser,
  Expense,
  ExpenseCreatePayload,
  LoginPayload,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";
const TOKEN_KEY = "expense-tracker-token";

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message ?? "Request failed.");
  }

  return body as T;
}

export async function login(payload: LoginPayload) {
  const data = await request<{ token: string; user: AuthUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  setToken(data.token);
  return data;
}

export async function getCurrentUser() {
  return request<{ user: AuthUser }>("/auth/me");
}

export async function getExpenses(isManager: boolean) {
  const endpoint = isManager ? "/expenses" : "/expenses/me";
  return request<{ expenses: Expense[] }>(endpoint);
}

export async function createExpense(payload: ExpenseCreatePayload) {
  return request<{ expense: Expense }>("/expenses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateExpenseStatus(
  expenseId: string,
  action: "approve" | "reject",
) {
  return request<{ expense: Expense }>(`/expenses/${expenseId}/${action}`, {
    method: "PUT",
  });
}
