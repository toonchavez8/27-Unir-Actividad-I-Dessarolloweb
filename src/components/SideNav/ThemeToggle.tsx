import React, { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import "./ThemeToggle.css";
import type { ThemeToggleProps } from "@/types/sidenavProps";

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isCollapsed = false }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check for saved theme preference or default to dark mode (since that's our root theme now)
    const savedTheme = localStorage.getItem("theme");
    return savedTheme !== "light"; // Default to dark mode
  });

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.removeAttribute("data-theme"); // Dark is default (root)
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      className={`theme-toggle ${isCollapsed ? "theme-toggle--collapsed" : ""}`}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="theme-toggle__icon">
        {isDark ? <MdLightMode /> : <MdDarkMode />}
      </div>
      {!isCollapsed && (
        <span className="theme-toggle__text">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
