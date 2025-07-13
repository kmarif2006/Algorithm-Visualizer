import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecursionVisualizer from './components/RecursionVisualizer/RecursionVisualizer';
import SortingVisualizer from './components/SortingVisualizer/SortingVisualizer';
import { useState, useEffect } from 'react';
import ThemeToggler from './components/shared/ThemeToggler';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage on initial load
    const savedTheme = localStorage.getItem('theme') ?? 'light';
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
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
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggler isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
          <Route path="/recursion-visualizer" element={<RecursionVisualizer isDarkMode={isDarkMode} />} />
          <Route path="/sorting-visualizer" element={<SortingVisualizer isDarkMode={isDarkMode} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;