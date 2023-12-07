import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center">
      <div className="w-2 h-2 rounded-full bg-gray-800 mr-1 animate-bounce"></div>
      <div className="w-2 h-2 rounded-full bg-gray-800 mr-1 animate-bounce200"></div>
      <div className="w-2 h-2 rounded-full bg-gray-800 animate-bounce400"></div>
    </div>
  );
};

export default TypingIndicator;