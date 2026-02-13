import { useMemo, useState } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import Sidebar from "../components/layout/Sidebar";
import SummaryCards from "../components/layout/SummaryCards";
import Topbar from "../components/layout/Topbar";
import type { AuthUser, Expense, ExpenseCreatePayload } from "../types";

interface DashboardPageProps {
  user: AuthUser;
  expenses: Expense[];
  onCreateExpense: (payload: ExpenseCreatePayload) => Promise<void>;
  onManageExpense: (expenseId: string, action: "approve" | "reject") => Promise<void>;
  onLogout: () => void;
}

export default function DashboardPage({
  user,
  expenses,
  onCreateExpense,
  onManageExpense,
  onLogout,
}: DashboardPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pendingCount = useMemo(
    () => expenses.filter((expense) => expense.status === "pending").length,
    [expenses],
  );
  const approvedCount = useMemo(
    () => expenses.filter((expense) => expense.status === "approved").length,
    [expenses],
  );

  return (
    <main className="dashboard-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <section className="dashboard-content">
        <Topbar
          user={user}
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
          onLogout={onLogout}
        />
        <SummaryCards
          totalExpenses={expenses.length}
          pendingApprovals={pendingCount}
          approvedExpenses={approvedCount}
        />
        {user.role === "employee" ? <ExpenseForm onSubmit={onCreateExpense} /> : null}
        <ExpenseList
          expenses={expenses}
          canManage={user.role === "manager"}
          onAction={onManageExpense}
        />
      </section>
    </main>
  );
}
