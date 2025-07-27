import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import RecursionVisualizer from './components/RecursionVisualizer/RecursionVisualizer';
import SortingVisualizer from './components/SortingVisualizer/SortingVisualizer';
import ThemeToggler from './components/shared/ThemeToggler';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On mount, check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  // Memoized toggle function to avoid re-renders
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  }, []);

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen bg-white dark:bg-gray-900 text-slate-900 dark:text-slate-200 transition-colors duration-300`}
        role="main"
      >
        <ThemeToggler isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
          <Route
            path="/recursion-visualizer"
            element={<RecursionVisualizer isDarkMode={isDarkMode} />}
          />
          <Route
            path="/sorting-visualizer"
            element={<SortingVisualizer isDarkMode={isDarkMode} />}
          />
          {/* Add 404 or other routes as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
