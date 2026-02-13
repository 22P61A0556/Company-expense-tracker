interface SummaryCardsProps {
  totalExpenses: number;
  pendingApprovals: number;
  approvedExpenses: number;
}

export default function SummaryCards({
  totalExpenses,
  pendingApprovals,
  approvedExpenses,
}: SummaryCardsProps) {
  const cards = [
    { label: "Total Expenses", value: totalExpenses },
    { label: "Pending Approvals", value: pendingApprovals },
    { label: "Approved Expenses", value: approvedExpenses },
  ];

  return (
    <div className="row g-3">
      {cards.map((card) => (
        <div key={card.label} className="col-md-4">
          <div className="glass-card p-4 summary-card">
            <div className="text-secondary">{card.label}</div>
            <h3 className="mb-0 mt-2">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
