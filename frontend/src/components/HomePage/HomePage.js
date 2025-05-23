import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./HomePage.css";
import ThemeToggle from '../shared/ThemeToggler';

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
  <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    color: '#60a5fa'
  }}>
    {icon}
  </div>
);

const GitHubIcon = () => (
  <svg
    className="github-icon"
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
    <div className={`home-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleTheme} />
      <h1 className="header">Algorithm Visualizer</h1>
      <p className="sub-header">Interactive visualizations to help you understand algorithms better</p>

      <div className="algorithms">
        {algorithms.map((algo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="card">
              <div className="image-container">
                {algo.image ? (
                  <img src={algo.image} alt={algo.name} className="card-image" />
                ) : (
                  <DefaultImage icon={algo.defaultIcon} />
                )}
              </div>
              <h2 className="card-title">{algo.name}</h2>
              <p className="card-description">{algo.description}</p>
              <div className="button-container">
                <Link 
                  to={algo.path} 
                  className="card-button"
                >
                  <span>Open Visualizer</span>
                </Link>
                <a 
                  href={algo.githubLink} 
                  className="github-link" 
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

      <footer className="footer">
        Built with 💙 by{" "}
        <a 
          href="https://github.com/kmarif2006" 
          className="footer-link" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          kmarif2006
        </a>
      </footer>
    </div>
  );
}