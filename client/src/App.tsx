import { useEffect, useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import {
  clearToken,
  createExpense,
  getCurrentUser,
  getExpenses,
  login,
  updateExpenseStatus,
} from "./services/api";
import type { AuthUser, Expense, ExpenseCreatePayload, ViewName } from "./types";

function App() {
  const [view, setView] = useState<ViewName>("landing");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const userResponse = await getCurrentUser();
        setUser(userResponse.user);
        setView("dashboard");
      } catch {
        clearToken();
      } finally {
        setLoadingSession(false);
      }
    };

    void restoreSession();
  }, []);

  useEffect(() => {
    const loadExpenses = async () => {
      if (!user) {
        setExpenses([]);
        return;
      }

      try {
        const response = await getExpenses(user.role === "manager");
        setExpenses(response.expenses);
      } catch {
        setExpenses([]);
      }
    };

    void loadExpenses();
  }, [user]);

  const handleLogin = async (email: string, password: string) => {
    const response = await login({ email, password });
    setUser(response.user);
    const expenseResponse = await getExpenses(response.user.role === "manager");
    setExpenses(expenseResponse.expenses);
    setView("dashboard");
  };

  const handleLogout = () => {
    clearToken();
    setUser(null);
    setExpenses([]);
    setView("landing");
  };

  const handleCreateExpense = async (payload: ExpenseCreatePayload) => {
    const response = await createExpense(payload);
    setExpenses((prev) => [response.expense, ...prev]);
  };

  const handleManageExpense = async (
    expenseId: string,
    action: "approve" | "reject",
  ) => {
    const response = await updateExpenseStatus(expenseId, action);
    setExpenses((prev) =>
      prev.map((expense) =>
        expense._id === response.expense._id ? response.expense : expense,
      ),
    );
  };

  if (loadingSession) {
    return <div className="fullscreen-loader">Loading...</div>;
  }

  if (view === "landing") {
    return <LandingPage onLoginClick={() => setView("login")} />;
  }

  if (view === "login") {
    return <LoginPage onBack={() => setView("landing")} onLogin={handleLogin} />;
  }

  if (!user) {
    return <LandingPage onLoginClick={() => setView("login")} />;
  }

  return (
    <DashboardPage
      user={user}
      expenses={expenses}
      onCreateExpense={handleCreateExpense}
      onManageExpense={handleManageExpense}
      onLogout={handleLogout}
    />
  );
}

export default App;
