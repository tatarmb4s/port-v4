import React, { useState } from 'react';
import Home from './Home';
import ChatButton from './ChatButton';

const ParentComponent = () => {
  const [showChat, setShowChat] = useState(false);

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  return (
    <>
      <Home handleChatToggle={handleChatToggle} />
      <ChatButton showChat={showChat} handleChatToggle={handleChatToggle} />
    </>
  );
};

export default ParentComponent;
