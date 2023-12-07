import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faBroom } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect } from 'react';
import { MessagesContext } from '@/context/messages';
import { getSocket } from './WebSocketClient';


const print = (param) => { 

  console.log(param);
 }


// const configuration = new Configuration({
//   apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);
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
  

  // const [messages, setMessages] = useState(
  //   JSON.parse(localStorage.getItem('chatMessages')) || [
  //     // {
  //     //   sender: 'user',
  //     //   text: 'Itt mit',
  //     // },
  //     { sender: 'agent', text: 'Üdv. Miben segíthetek?' },
  //   ]
  // );


  useEffect(() => {
    const socket = getSocket();
  
    socket.on('aiResponseGetCL', (data) => {
      const responseMessage = {
        id: data.id,
        isUserMessage: false,
        text: data.lastResp,
        newlyAdded: true,
      };
      tryAddMessage(responseMessage);
      if (data.finished) {
        setIsMessageUpdating(false);
      }
    });
  
    return () => {
      socket.off('aiResponseGetCL');
    };
  }, []);
  

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
      const newMessages = [...messages, { sender: 'user', text: inputValue }];
      setMessages(newMessages);
      setInputValue('');
      await chat(inputValue, newMessages);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };
  
  let ipA = localStorage.getItem('ipA');
  let ipD = localStorage.getItem('ipD');
  let ipDJSON = localStorage.getItem('ipDJSON');

  if (!isSendedOneceChatPanel) {
    


    print("isSendedOneceChatPanel")
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`https://chatapi.tatarmb.hu:46927/api/ChatEnter/?ipa=${encodeURIComponent(ipA)}&ipd=${encodeURIComponent(ipDJSON)}`, requestOptions)
    .catch(error => console.log('error', error));
    isSendedOneceChatPanel = true;
  }

  const chat = async (msg, updatedMessages) => {
    try {
      let uzik = updatedMessages.map((message) => message.text).join('\n');
  
      console.log("Context: '", uzik,"'");
      const socket = getSocket();
      socket.emit('aiResponse', uzik);
    } catch (error) {
      console.error(error);
    }
  };
  

  // const chat = async (msg, updatedMessages) => {
  //   try {
  //     let uzik = updatedMessages.map((message) => message.text).join('\n');

  //     console.log("Context: '", uzik,"'");
  //     var myHeaders = new Headers();
      

  //     var requestOptions = {
  //       method: 'GET',
  //       headers: myHeaders,
  //       redirect: 'follow'
  //     };

  //     const AiReply = (msg) => { 
  //       const data = JSON.parse(msg).response;
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { sender: 'agent', text: data },
  //       ]);
  //      }

  //     // fetch(`http://127.0.0.1:4069/api/bot/?text=${uzik}`, requestOptions)
  //     fetch(`https://chatapi.tatarmb.hu:46927/api/bot/?text=${encodeURIComponent(uzik)}&ipa=${encodeURIComponent(ipA)}&ipd=${encodeURIComponent(ipDJSON)}`, requestOptions)
  //       .then(response => response.text())
  //       .then(result => 

  //         AiReply(result)
  //         )
  //       .catch(error => console.log('error', error));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
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
    setMessages([]);
   }

  return (
    <div className="absolute bottom-16 right-0 bg-white p-0 mb-5 rounded-lg shadow-lg w-80 md:w-[40rem] ">
      <div className="p-2 rounded-t-lg bg-gradient-to-r from-aiMsg1 to-aiMsg2">
        <h1 className="text-center text-white font-bold">AI Chat</h1>
      </div>
      <div className="flex flex-col space-y-2 overflow-y-auto h-60 md:h-[32rem] xl:h-[35rem] mr-2 chat-scrollbar">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-md whitespace-pre-wrap text-white mt-2 ${message.sender === 'user'
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
