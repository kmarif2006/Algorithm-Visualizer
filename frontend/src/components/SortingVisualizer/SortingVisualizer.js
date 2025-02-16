import React, { useState, useEffect } from "react";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import SortingVisualizer from "./components/SortingVisualizer/SortingVisualizer";
import "./App.css"; // Import the CSS file

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage to get the saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark"); // Add 'dark' class to body
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <div className="App">
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <SortingVisualizer isDarkMode={isDarkMode}/>
    </div>
  );
}

export default App;