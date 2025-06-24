import React from "react";
import { useTheme } from "./ThemeProvider";

// PUBLIC_INTERFACE
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="inline-flex items-center px-3 py-2 rounded focus:outline-none border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition gap-2"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m16.24-6.24l-1.42 1.42M7.76 16.24l-1.42 1.42m12.02 0l-1.42-1.42M7.76 7.76L6.34 6.34" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Light
        </span>
      ) : (
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Dark
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
