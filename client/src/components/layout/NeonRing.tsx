interface NeonRingProps {
  interactive?: boolean;
}

export default function NeonRing({ interactive = false }: NeonRingProps) {
  return (
    <div
      className={`neon-ring-container ${interactive ? "interactive" : ""}`}
      aria-hidden="true"
    >
      <span className="neon-ring" />
    </div>
  );
}
