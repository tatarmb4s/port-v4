import React, { useState, useEffect, useRef  } from 'react';
import ChatPanel from './ChatPanel2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'

const ChatButton = ({ showChat, handleChatToggle }) => {
  // const [showChat, setShowChat] = useState(false);

  // const handleChatToggle = () => {
  //   setShowChat(!showChat);
  // };

  return (
    <div className="fixed bottom-4 right-4 z-[3]" >
      <button
      id='toggleAI'
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg focus:outline-none"
        onClick={handleChatToggle}
      >
        <FontAwesomeIcon icon={faComments} />
      </button>
      {showChat && <ChatPanel />}
    </div>
  );
};



export default ChatButton;  