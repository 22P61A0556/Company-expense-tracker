import { model, Schema, type Document, type Types } from "mongoose";

export interface IExpense extends Document {
  employee: Types.ObjectId;
  category: string;
  amount: number;
  expenseDate: Date;
  paymentMethod: string;
  vendor: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  approvedBy: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new Schema<IExpense>(
  {
    employee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    expenseDate: { type: Date, required: true },
    paymentMethod: { type: String, required: true, trim: true },
    vendor: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true },
);

export const Expense = model<IExpense>("Expense", expenseSchema);
