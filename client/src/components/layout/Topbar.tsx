import type { AuthUser } from "../../types";
import ThemeToggle from "./ThemeToggle";

interface TopbarProps {
  user: AuthUser;
  onMenuToggle: () => void;
  onLogout: () => void;
}

export default function Topbar({ user, onMenuToggle, onLogout }: TopbarProps) {
  return (
    <header className="glass-card topbar p-3 mb-4 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-theme d-lg-none" type="button" onClick={onMenuToggle}>
          Menu
        </button>
        <div>
          <div className="fw-semibold">{user.name}</div>
          <small className="text-secondary text-capitalize">{user.role}</small>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <ThemeToggle />
        <button className="btn btn-outline-danger" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
