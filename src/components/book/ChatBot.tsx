import React, {useEffect, useState,useRef, use  } from 'react';
import { set } from 'react-hook-form';
import { HiCog } from "react-icons/hi";
import useModelObserver from "@/hooks/useModelObserver";

interface Message {
  type: string;
  text: string;
  timestamp: string;
  expanded?: boolean; 
}

const ChatBot = (
  {
    book_id,
    embeddings_state,
    shouldFetchMessages,
    resetShouldFetchMessages,
    
    
  
    
  }: {
    book_id: string,
    embeddings_state: string|undefined
    shouldFetchMessages: boolean;
    resetShouldFetchMessages: () => void;
  }
    
    
    

) => {
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [EmbeddingsState, setEmbeddingsState] = useState<string|undefined>(embeddings_state);
  const [Progress, setProgress] = useState(0);


  
  
  useEffect(() => {
    if (shouldFetchMessages) {
      fetch_messages();
      setIsChatbotVisible(true);
      resetShouldFetchMessages();
    }
  }, [shouldFetchMessages]);

  useModelObserver({
    
    roomName: book_id ?? "",
    updateData: (data) => {
      console.log(data);
      if (data.type=="vectorizing"){
        console.log(data.state);
      setEmbeddingsState(data.state); 
      
      setProgress(data.progress);
      }
      
    },
    connectToWS: true, // Adjust this based on your logic
  });


  

  const messagesEndRef = useRef<HTMLDivElement>(null);

const scrollToBottom = () => {
  //print mesagges
  console.log(messages);

  messagesEndRef.current?.scrollIntoView();
};

  const sendMessage = () => {
    if (!inputValue) return;
    setIsChatbotVisible(true);
    setMessages([...messages, { type: 'question', text: inputValue },{ type: 'answer', text: "Loading..." }]);

    
    setInputValue('');
    
    
    fetch('/api/books/generate_answer_book_chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId: book_id, question: inputValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status=="success"){
          setMessages([...messages,  { type: 'question', text: inputValue },{ type: 'answer', text: data.response }]);
        }
        else{
          setMessages([...messages,  { type: 'question', text: inputValue },{ type: 'answer', text: "Error" }]);
        }
        
      })
      
      ;
  };

  const toggleChatbot = () => {
    
    
    
    setIsChatbotVisible(!isChatbotVisible);
    
  };

  const handleInputFocus = () => {
    if (messages.length === 0) {
      setIsChatbotVisible(false);
    }
    else{
    if (!isChatbotVisible) {
      setIsChatbotVisible(true);
    }
  } 
  };



  const formatTimestamp_hour = (timestamp: string) => {
    const seconds = parseInt(timestamp, 10);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
  };


    //format timestamp in to minutes and seconds
    const formatTimestamp = (timestamp: string) => {
      const seconds = parseInt(timestamp, 10);
      const minutes = Math.floor(seconds / 60);
      const secondsLeft = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
    }


  const fetch_messages = () => {
    fetch('/api/books/get_messages_book_chat?bookId=' + book_id)

      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        //lopp through messages and format timestamp if it exists
        data.data.forEach((message: any) => {
          if (message.timestamp) {
            message.timestamp = formatTimestamp(message.timestamp);
          }
        });
        setMessages(data.data);
      }
      );
  }
  useEffect(() => {
    fetch_messages();
  }
  , []);


  useEffect(() => {
    const chatbox = document.getElementById('chatbox');
    if (chatbox) {
      if (EmbeddingsState == "pending") {
        chatbox.style.display = 'none';
      } else {
        chatbox.style.display = 'flex';
      }
    }
  }, [EmbeddingsState]);


  useEffect(() => {
    scrollToBottom(); 
  }, [messages.length, isChatbotVisible]);
  // Note: Changed the dependency from 'messages' to 'messages.length' 
  // to trigger scrolling only when the number of messages changes.
  
  const toggleMessageExpand = (index: number) => {
    setMessages(messages => messages.map((message, i) => {
      if (i === index) {
        return { ...message, expanded: !message.expanded };
      }
      return message;
    }));
  };

  return (
    
   
    <div>
      
      <div id="chatbox" style={{ 
        position: 'fixed', 
        bottom: '90px' , 
        right: '20px', 
        width: '300px', 
        height: isChatbotVisible ? '400px' : '40px', 
        backgroundColor: 'white', 
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', 
        padding: '10px', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRadius: '10px',
        
      }}>
        
        
          
        
        {isChatbotVisible && (
  <div style={{ flex: 1, overflowY: 'auto', borderRadius: '5px', marginBottom: '10px', marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
    {messages.map((message, index) => (
      <div
        key={index}
        onClick={() => toggleMessageExpand(index)} // Added onClick event to toggle expand
        style={{
          margin: '10px 0',
          maxWidth: '70%',
          alignSelf: message.type === 'answer' ? 'flex-start' : 'flex-end',
          backgroundColor: message.type === 'answer' ? '#007bff' : '#f0f0f0',
          color: message.type === 'answer' ? 'white' : 'black',
          padding: '8px 15px',
          borderRadius: '20px',
          textAlign: 'left',
          wordBreak: 'break-word',
          fontSize: '12px',
          width: "fit-content",
          height: message.expanded ? 'auto' : '100px',
          textOverflow: message.expanded ? 'initial' : 'ellipsis',
        }}
      >
        {message.text === "Loading..." ? <HiCog className="animate-spin h-6 w-6" /> : 
         message.timestamp ? 
         <a href={`https://www.youtube.com/watch?v=${book_id.split('-').pop()}&t=${message.timestamp}`} rel="noreferrer noopener" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>

           {message.timestamp + " \n" + message.text}
         </a> : 
         message.text}
      </div>
    ))}
    <div ref={messagesEndRef} /> 
  </div>
)}


        
        {EmbeddingsState !=="done" ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
          <HiCog className="animate-spin h-6 w-6" /> <span style={{marginLeft: '10px'}}>Loading Chatbot. {Progress.toFixed(1)}%</span>
        </div>
        ):(
        

        <div style={{ position: 'relative', display: 'flex', marginTop: '-3px' }} tabIndex={-1}>

          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={handleInputFocus}
            style={{ width: 'calc(100% - 60px)', marginRight: '10px',border:"1px solid black", borderRadius: '5px' }}
            placeholder=' Ask me anything...'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />

          <button onClick={sendMessage} style={{ width: '50px', backgroundColor: '#007bff', color: 'white', border:"1px solid black", borderRadius: '5px' }}>Send</button>

        </div>
        )}
        
      </div>
        <button onClick={toggleChatbot} style={{ 
          position: "fixed",
          bottom: "465px",
          right: "30px",
          border:"1px solid black",
          borderRadius: '5px',
          width: '60px', 
          visibility: isChatbotVisible ? 'visible' : 'hidden',
          fontSize: '12px',

        }}>
          {isChatbotVisible ? "Minimize" :""}
        </button>
      
        
    </div>
  );
};

export default ChatBot;
