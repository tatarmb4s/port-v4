import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatPanel = () => {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem('chatMessages')) || [
      {
        sender: 'user',
        text: 'Hello!\n\nThis is a **markdown** message.\n\n- [x] Task 1\n- [ ] Task 2\n\n```js\nconst x = 1;\n```',
      },
      { sender: 'agent', text: 'Hi there! How can I help you?' },
    ]
  );
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: inputValue }]);
      setInputValue('');

      // Send request to OpenAI API
      const response = await fetch('http://127.0.0.1:46928/bot/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: messages,
        }),
      });
      const data = await response.json();

      // Use response from OpenAI API to generate reply
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'agent', data },
      ]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const renderers = {
    code: ({ language, value }) => {
      return (
        <SyntaxHighlighter
          style={coy}
          language={language}
          children={value}
        />
      );
    },
  };

  return (
    <div className="absolute bottom-16 right-0 bg-white p-4 rounded-lg shadow-lg w-80">
      <div className="p-2 rounded-t-lg bg-gradient-to-r from-light-blue-400 to-blue-500">
        <h1 className="text-center text-white font-bold">Chat Header</h1>
      </div>
      <div className="flex items-center justify-between p-2 rounded-t-lg bg-gradient-to-r from-light-blue-400 to-blue-500">
        <div className="flex items-center space-x-2">
          <img
            className="w-8 h-8 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Chat partner's avatar"
          />
          <span className="text-white font-bold">Chat Partner</span>
        </div>
        <button className="text-white focus:outline-none">X</button>
      </div>
      <div className="flex flex-col space-y-2 overflow-y-auto h-60 mr-2 chat-scrollbar">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-md whitespace-pre-wrap ${
              message.sender === 'user'
                ? 'self-end bg-gradient-to-r from-red-400 to-red-500'
                : 'bg-gradient-to-r from-light-blue-400 to-blue-500'
            }`}
          >
            <ReactMarkdown
              renderers={renderers}
              remarkPlugins={[remarkGfm]}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex mt-2">
        <textarea
          className="flex-grow border rounded-l-md p-2 focus:outline-none resize-none"
          rows="1"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md focus:outline-none"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
      <style jsx>{`
        .chat-scrollbar::-webkit-scrollbar {
          width: 0;
        }
        .chat-scrollbar:hover::-webkit-scrollbar {
          width: 8px;
        }
        .chat-scrollbar::-webkit-scrollbar-track {
          background-color: transparent;
        }
        .chat-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #a0aec0;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
};

export default ChatPanel;
