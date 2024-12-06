import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Set the initial theme based on localStorage or default to "light"
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={handleTheme}
        checked={theme === "dark"}
      />
      <span className="swap-on text-xl">🌙</span>
      <span className="swap-off text-xl">☀️</span>
    </label>
  );
};

export default ThemeToggle;
