interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside className={`app-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-brand">Expense EMS</div>
        <nav className="d-flex flex-column gap-2">
          <button className="sidebar-link active" type="button">
            Dashboard
          </button>
          <button className="sidebar-link" type="button">
            Expenses
          </button>
          <button className="sidebar-link" type="button">
            Reports
          </button>
        </nav>
      </aside>
      {isOpen ? <div className="sidebar-overlay d-lg-none" onClick={onClose} /> : null}
    </>
  );
}
