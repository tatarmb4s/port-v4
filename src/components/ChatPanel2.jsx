import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faBroom } from '@fortawesome/free-solid-svg-icons'
import { MessagesContext } from '../context/messages.tsx';
import { getSocket } from './WebSocketClient.ts';
import { useMutation } from "@tanstack/react-query";
import { nanoid } from 'nanoid';

const print = (param) => { 
  console.log(param);
}

let isSendedOneceChatPanel = false;
const ChatPanel = () => {
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
    tryAddMessage,
  } = useContext(MessagesContext);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const socket = getSocket();
  useEffect(() => {
    socket.on('aiResponseGetCL', function(trig) {
        console.log("Success!");
        var jsTrig = JSON.parse(trig);
        var data = {id: jsTrig["id"], msgs: jsTrig["msgs"], lastResp: jsTrig["lastResp"], finished: jsTrig["finished"]};
        if (!data) throw new Error("No stream returned from server");

        var id = data.id;

        console.log(data);
        var responseMessage = {
            id: id,
            isUserMessage: false,
            text: "",
            newlyAdded: true,
        };
        tryAddMessage(responseMessage);
        console.log("object");
        console.log(data);
        updateMessage(id, function(prev) { return prev + data.lastResp; });

        if (data.finished) {
            setIsMessageUpdating(false);
            setInputValue('');

            // setTimeout(function() {
            //     if (textAreaRef.current) {
            //         textAreaRef.current.focus();
            //     }
            // }, 10);
        }
    });

    return function() {
        socket.off('aiResponseGetCL');
    }
}, [socket, messages, addMessage, updateMessage, setIsMessageUpdating]);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message) => {
      const replID = nanoid();
      let messagesList = [];
      for (let key in messages) {
        messagesList.push(messages[key]);
      }

      console.log(messagesList);

      const RoomRecord = {};

      console.log(RoomRecord);
      const aiRespSendData = {msgs:messagesList, id:replID, houseData:RoomRecord, currentLocation:""};
      socket.emit('aiResponse', aiRespSendData)
      return null;
    },
    onMutate: (message) => {
      addMessage(message);
      console.log(message);
    },
    onSuccess: async (stream) => {
      console.log("Success!");
    },
    onError(_, message) {
      removeMessage(message.id);
      // textAreaRef.current?.focus();
    },
  });

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      const newMessage = { id:nanoid(), sender: 'user', text: inputValue, isUserMessage: true, newlyAdded: true };
      addMessage(newMessage);
      setInputValue('');
      sendMessage(newMessage);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  let ipA = localStorage.getItem('ipA');
  let ipD = localStorage.getItem('ipD');
  let ipDJSON = localStorage.getItem('ipDJSON');

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


  const ClearHistory = () => { 
    localStorage.removeItem("chatMessages");
    // setMessages([]);
   }

  return (
    <div className="absolute bottom-16 right-0 bg-white p-0 mb-5 rounded-lg shadow-lg w-80 md:w-[40rem] ">
      <div className="p-2 rounded-t-lg bg-gradient-to-r from-aiMsg1 to-aiMsg2">
        <h1 className="text-center text-white font-bold">AI Chat</h1>
      </div>
      <div className="flex flex-col space-y-2 overflow-y-auto h-60 md:h-[32rem] xl:h-[35rem] mr-2 chat-scrollbar">
        {Object.values(messages).map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-md whitespace-pre-wrap text-white mt-2 ${message.isUserMessage
                ? 'self-end bg-gradient-to-r from-red-400 to-red-500 mr-3 '
                : 'self-start bg-gradient-to-r from-aiMsg1 to-aiMsg2 ml-3'
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
      <div className="flex m-2">
        <textarea
          className="flex-grow border rounded-l-md p-2 focus:outline-none resize-none"
          rows="1"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder='Írj, s légy türelmes...'
        />
        <button
          className="bg-blue-500 text-white hidden md:flex px-4 py-2 rounded-r-md focus:outline-none"
          onClick={handleSendMessage}
        >
          Küldés
        </button>
        <button
          className="bg-red-500 text-white hidden md:flex px-4 mr-1 ml-2 py-2 rounded-md focus:outline-none"
          onClick={ClearHistory}
        >
          Új chat
        </button>
      </div>
      <div className="flex m-2 md:hidden justify-center">
      <button
          className="bg-blue-500 text-white md:hidden ml-2 px-4 py-2 rounded-full focus:outline-none"
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
        <button
          className="bg-red-500 text-white md:hidden px-4 mr-1 ml-2 py-2 rounded-full focus:outline-none"
          onClick={ClearHistory}
        >
          <FontAwesomeIcon icon={faBroom} />
        </button>
      </div>
      <style jsx>{`
        .chat-scrollbar::-webkit-scrollbar {
          width: 8px;
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
