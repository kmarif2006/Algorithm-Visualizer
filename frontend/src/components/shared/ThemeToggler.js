import { Sun, Moon } from "lucide-react";
const ThemeToggler = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="fixed top-4 right-4 p-3 rounded-full 
                 bg-white dark:bg-gray-800 shadow-lg 
                 hover:scale-110 hover:shadow-xl 
                 transition-all duration-300 
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 z-[9999]"
    >
      {isDarkMode ? (
        <Sun className="w-6 h-6 text-yellow-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-6 h-6 text-gray-700 dark:text-gray-200 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggler;
