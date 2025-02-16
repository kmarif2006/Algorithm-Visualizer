import React from 'react';

const ControlPanel = ({ progress, currentMessage }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex items-center w-full mb-3">
        <div className="relative w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-blue-500 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}>
          </div>
        </div>
      </div>
      <div className="w-full text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {currentMessage || 'Ready to visualize recursion'}
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;