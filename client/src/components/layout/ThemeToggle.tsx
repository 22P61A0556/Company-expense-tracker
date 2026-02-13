import { useTheme } from "../../context/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="btn btn-outline-theme" onClick={toggleTheme} type="button">
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
