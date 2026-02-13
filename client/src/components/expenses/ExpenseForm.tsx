import { useState } from "react";
import type { ExpenseCreatePayload } from "../../types";

interface ExpenseFormProps {
  onSubmit: (payload: ExpenseCreatePayload) => Promise<void>;
}

const initialState: ExpenseCreatePayload = {
  category: "",
  amount: 0,
  expenseDate: "",
  paymentMethod: "Credit Card",
  vendor: "",
  description: "",
};

export default function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseCreatePayload>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!formData.category.trim() || !formData.vendor.trim() || !formData.expenseDate) {
      setError("Please fill all required fields.");
      return;
    }

    if (formData.amount <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(formData);
      setFormData(initialState);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit expense.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-4">
      <h5 className="mb-3">Submit Expense</h5>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Category</label>
          <input
            className="form-control form-control-modern"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Amount</label>
          <input
            className="form-control form-control-modern"
            type="number"
            step="0.01"
            name="amount"
            value={formData.amount || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Date</label>
          <input
            className="form-control form-control-modern"
            type="date"
            name="expenseDate"
            value={formData.expenseDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Payment Method</label>
          <select
            className="form-select form-control-modern"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>Bank Transfer</option>
            <option>Cash</option>
            <option>UPI</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Vendor</label>
          <input
            className="form-control form-control-modern"
            type="text"
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            className="form-control form-control-modern"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div className="col-12">
            <div className="alert alert-danger py-2 mb-0">{error}</div>
          </div>
        ) : null}
        <div className="col-12">
          <button className="btn btn-accent" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Expense"}
          </button>
        </div>
      </form>
    </div>
  );
}
