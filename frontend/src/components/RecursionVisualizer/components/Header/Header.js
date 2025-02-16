import React from 'react';

const Header = ({ isDarkMode }) => {
  return (
    <h1 className={`text-4xl font-semibold text-center mb-8 
      ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
      Recursion Tree Visualizer
    </h1>
  );
};

export default Header; 