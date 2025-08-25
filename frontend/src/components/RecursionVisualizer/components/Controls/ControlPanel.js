const ControlPanel = ({ progress, currentMessage }) => {
  const getProgressMessage = () => {
    // First check for specific visualization messages from backend
    if (currentMessage) {
      return currentMessage;
    }
    
    // Default progress messages
    if (progress === 0) {
      return 'Select an algorithm and input to begin visualization';
    } else if (progress === 100) {
      return 'Visualization complete! Select new inputs to try again';
    } else {
      return `Calculating... ${Math.round(progress)}%`;
    }
  };

  const getProgressColor = () => {
    // Color states based on visualization progress
    if (progress === 100) return 'bg-green-500 dark:bg-green-400';
    if (progress > 0) return 'bg-blue-500 dark:bg-blue-400';
    return 'bg-gray-400 dark:bg-gray-600';
  };

  const getMessageColor = () => {
    // Message color states
    if (progress === 100) {
      return 'text-green-600 dark:text-green-400';
    }
    if (currentMessage) {
      return 'text-blue-600 dark:text-blue-400';
    }
    return 'text-gray-600 dark:text-gray-300';
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      {/* Progress bar */}
      <div className="flex items-center w-full">
        <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`absolute h-full transition-all duration-300 rounded-full ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Message display */}
      <div className="w-full text-center">
        <p className={`text-sm font-medium transition-colors duration-300 ${getMessageColor()}`}>
          {getProgressMessage()}
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;