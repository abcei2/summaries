import React, {useEffect, useState,useRef, use  } from 'react';
import { set } from 'react-hook-form';
import { HiCog } from "react-icons/hi";
import useModelObserver from "@/hooks/useModelObserver";

interface Message {
  type: string;
  text: string;
}

const ChatBot = (
  {book_id,embeddings_state}: {book_id: string,embeddings_state: string|undefined}
) => {
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [EmbeddingsState, setEmbeddingsState] = useState<string|undefined>(embeddings_state);
  const [Progress, setProgress] = useState(0);
  const messagesEndRef = useRef(null);

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


  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(false);
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

  useEffect(() => {
    scrollToBottom(); 
  }, [messages, isChatbotVisible]);
  

  const fetch_messages = () => {
    fetch('/api/books/get_messages_book_chat?bookId=' + book_id)

      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setMessages(data.data);
      }
      );
  }
  useEffect(() => {
    fetch_messages();
  }
  , []);


useEffect(() => {
  if (EmbeddingsState=="pending"){

    document.getElementById('chatbox').style.display = 'none';
}
else{
  document.getElementById('chatbox').style.display = 'flex';
}
}
, [EmbeddingsState]);
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
          
            <div style={{ flex: 1, overflowY: 'auto', borderRadius: '5px' , marginBottom: '10px',marginTop: '20px',display: 'flex' , flexDirection: 'column' }}>


            {messages.map((message, index) => (
              <div 
                key={index} 
                style={{ 
                  position: 'relative',
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
                  marginRight:"5px",
                  
                }}
              >
                {message.text == "Loading..." ? <HiCog className="animate-spin h-6 w-6" /> : message.text}
                

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
