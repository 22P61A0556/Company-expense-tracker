import ThemeToggle from "../components/layout/ThemeToggle";
import FloatingShapes from "../components/layout/FloatingShapes";
import NeonRing from "../components/layout/NeonRing";

interface LandingPageProps {
  onLoginClick: () => void;
}

export default function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <main className="landing-page">
      <FloatingShapes />
      <NeonRing />
      <div className="container py-5">
        <div className="d-flex justify-content-end mb-4">
          <ThemeToggle />
        </div>
        <section className="hero-card glass-card p-5 text-center animate-fade-hero">
          <p className="hero-kicker">Expense Management Suite</p>
          <h1 className="hero-title">Expense Management System</h1>
          <p className="hero-subtitle mx-auto">
            A streamlined finance workflow for employees and managers with secure
            approvals and real-time visibility.
          </p>
          <button className="btn btn-accent mt-3" onClick={onLoginClick} type="button">
            Login
          </button>
        </section>
      </div>
    </main>
  );
}
