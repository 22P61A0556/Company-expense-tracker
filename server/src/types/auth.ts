export type UserRole = "employee" | "manager";

export interface AuthUserPayload {
  id: string;
  role: UserRole;
  email: string;
  name: string;
}
