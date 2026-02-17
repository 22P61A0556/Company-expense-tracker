import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    // eslint-disable-next-line no-console
    console.error("MONGODB_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);

    // eslint-disable-next-line no-console
    console.log("MongoDB Connected");
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line no-console
    console.error("MongoDB connection failed. Reason:", reason);
    process.exit(1);
  }
}
