import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Controls from './components/Controls/Controls';
import TreeVisualization from './components/TreeVisualization/TreeVisualization';
import ControlPanel from './components/Controls/ControlPanel';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import CodeViewer from './components/CodeViewer/CodeViewer';
import Resizer from './components/Resizer/Resizer';
import { generateRecursionTree } from './Services/api';

function App() {
  // useState hooks
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [recursionData, setRecursionData] = useState(null);
  const [functionName, setFunctionName] = useState("Fibonacci");
  const [inputValue, setInputValue] = useState("5");
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [codeWidth, setCodeWidth] = useState(25);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') ?? 'light'; // Default to light
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode logic
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Restrict resizer width (Min: 20%, Max: 80%)
  const handleResize = (newWidth) => {
    if (newWidth < 20) newWidth = 20;
    if (newWidth > 80) newWidth = 80;
    setCodeWidth(newWidth);
  };

  // Generate recursion tree logic
  const handleGenerateTree = async () => {
    try {
      const data = await generateRecursionTree(functionName, inputValue);
      setRecursionData(data);
      setProgress(0);
      setCurrentMessage('Tree generated successfully!');
      setCurrentStep(0);
    } catch (error) {
      console.error('Error generating tree:', error);
      setCurrentMessage('Error generating tree.');
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 
      ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Header isDarkMode={isDarkMode} />
        
        {/* Control Section with improved spacing and shadow */}
        <div className="mb-8">
          <Controls 
            functionName={functionName}
            setFunctionName={setFunctionName}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onGenerateTree={handleGenerateTree}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Main Content Section with improved layout */}
        <div className="space-y-6">
          {/* Progress Bar Section - Only show when there's recursion data */}
          {recursionData && (
            <div className={`rounded-lg shadow-lg transition-all duration-200 overflow-hidden
              ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
              <ControlPanel progress={progress} currentMessage={currentMessage} />
            </div>
          )}

          {/* Visualization Section */}
          <div className="flex flex-col md:flex-row h-[600px] relative items-stretch rounded-lg overflow-hidden shadow-xl">
            {/* Code Viewer Panel */}
            <div className={`transition-all duration-200 
              ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              style={{ width: `${codeWidth}%` }}>
              <CodeViewer functionName={functionName} isDarkMode={isDarkMode} />
            </div>

            {/* Resizer */}
            <div className={`w-6 flex items-center justify-center transition-colors duration-200
              ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <Resizer onResize={handleResize} />
            </div>

            {/* Tree Visualization Panel */}
            <div className={`transition-all duration-200 flex-1
              ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <TreeVisualization 
                recursionData={recursionData} 
                setProgress={setProgress}
                setCurrentMessage={setCurrentMessage}
                currentStep={currentStep}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
