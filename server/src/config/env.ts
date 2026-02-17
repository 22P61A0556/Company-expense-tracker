import dotenv from "dotenv";

dotenv.config();

const required = ["JWT_SECRET"] as const;
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const mongoUri = process.env.MONGODB_URI ?? process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("Missing required environment variable: MONGODB_URI");
}

export const env = {
  port: Number(process.env.PORT ?? 5000),
  mongoUri,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "1d",
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
};
