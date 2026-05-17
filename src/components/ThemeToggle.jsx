import { useEffect, useState } from "react";

const ThemeToggle = () => {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {

    document
      .querySelector("html")
      .setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);

  }, [theme]);

  const toggleTheme = () => {

    setTheme(
      theme === "light"
        ? "dark"
        : "light"
    );

  };

  return (

    <button
      onClick={toggleTheme}
      className="btn btn-sm"
    >

      {
        theme === "light"
          ? "🌙"
          : "☀️"
      }

    </button>

  );

};

export default ThemeToggle;