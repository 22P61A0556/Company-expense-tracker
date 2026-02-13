import type { Expense } from "../../types";

interface ExpenseListProps {
  expenses: Expense[];
  canManage: boolean;
  onAction: (expenseId: string, action: "approve" | "reject") => Promise<void>;
}

const statusClassMap: Record<Expense["status"], string> = {
  pending: "badge-status badge-pending",
  approved: "badge-status badge-approved",
  rejected: "badge-status badge-rejected",
};

export default function ExpenseList({ expenses, canManage, onAction }: ExpenseListProps) {
  return (
    <div className="glass-card p-4 mt-4">
      <h5 className="mb-3">Expense List</h5>
      <div className="table-responsive">
        <table className="table table-modern align-middle mb-0">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Vendor</th>
              <th>Status</th>
              {canManage ? <th>Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={canManage ? 6 : 5} className="text-center py-4">
                  No expenses available.
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense._id} className="table-row-hover">
                  <td>{expense.category}</td>
                  <td>${expense.amount.toFixed(2)}</td>
                  <td>{new Date(expense.expenseDate).toLocaleDateString()}</td>
                  <td>{expense.vendor}</td>
                  <td>
                    <span className={statusClassMap[expense.status]}>{expense.status}</span>
                  </td>
                  {canManage ? (
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-success"
                        disabled={expense.status !== "pending"}
                        onClick={() => onAction(expense._id, "approve")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        disabled={expense.status !== "pending"}
                        onClick={() => onAction(expense._id, "reject")}
                      >
                        Reject
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
