import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ThemeToggle from './shared/ThemeToggler';

const algorithms = [
  {
    name: "Recursion Visualizer",
    description: "Visualize recursive algorithms and understand their execution flow through interactive animations",
    path: "/recursion-visualizer",
    githubLink: "https://github.com/kmarif2006/Recursion-Visualizer",
    image: "/images/recursion_image.png",
    defaultIcon: "⟲"
  },
  {
    name: "Sorting Visualizer",
    description: "Interactive visualization of various sorting algorithms",
    path: "/sorting-visualizer",
    githubLink: "https://github.com/kmarif2006/sorting-visualizer",
    image: "/images/sorting_image.png",
    defaultIcon: "⇅"
  }
];

const DefaultImage = ({ icon }) => (
  <div className="w-full h-full flex items-center justify-center text-3xl text-blue-400">
    {icon}
  </div>
);

const GitHubIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') ?? 'light';
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 sm:p-6 text-center transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-slate-200' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleTheme} />
      
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 sm:mt-6 mb-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent tracking-wide relative">
        Algorithm Visualizer
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded"></div>
      </h1>
      
      <p className="text-base sm:text-lg md:text-xl mt-4 sm:mt-6 mb-6 sm:mb-8 text-slate-500 dark:text-slate-400 px-4">
        Interactive visualizations to help you understand algorithms better
      </p>

      {/* Algorithm Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6 w-full max-w-4xl lg:max-w-5xl px-2 sm:px-4">
        {algorithms.map((algo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className={`h-full flex flex-col items-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              isDarkMode
                ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-slate-900/20'
                : 'bg-white/90 shadow-md hover:shadow-xl'
            }`}>
              
              {/* Image Container */}
              <div className="w-full h-40 sm:h-48 md:h-60 rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center p-2">
                {algo.image ? (
                  <img 
                    src={algo.image} 
                    alt={algo.name} 
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105" 
                  />
                ) : (
                  <DefaultImage icon={algo.defaultIcon} />
                )}
              </div>
              
              {/* Card Title */}
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 text-blue-500">
                {algo.name}
              </h2>
              
              {/* Card Description */}
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-4 sm:mb-5 md:mb-6 flex-grow px-2">
                {algo.description}
              </p>
              
              {/* Button Container */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mt-auto w-full">
                <Link 
                  to={algo.path} 
                  className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:opacity-90 hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <span>Open Visualizer</span>
                </Link>
                <a 
                  href={algo.githubLink} 
                  className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-medium transition-all duration-300 hover:opacity-90 hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base ${
                    isDarkMode
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-800 text-white'
                  }`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                  <span>View Code</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-6 sm:mt-8 pt-4 sm:pt-6 text-sm sm:text-base text-slate-500 dark:text-slate-400">
        Built with 💙 by{" "}
        <a 
          href="https://github.com/kmarif2006" 
          className="text-blue-400 font-medium transition-colors duration-300 hover:text-blue-600" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          kmarif2006
        </a>
      </footer>
    </div>
  );
}