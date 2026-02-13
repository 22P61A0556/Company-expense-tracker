import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import authRouter from "./routes/authRoutes";
import expenseRouter from "./routes/expenseRoutes";

const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "Server is running." });
});

app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
