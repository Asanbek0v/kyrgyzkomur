"use client"

import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.scss';
import { BotMessageSquare, Menu } from 'lucide-react';

const ChatWidget = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState(null); // 'bot', 'translate' же null
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false); // Жазып жатат индикатору

  
  const chatBodyRef = useRef(null);

 
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  
  const handleMainIconClick = () => {
    if (activeMode) {
      setActiveMode(null);
      setIsOptionsOpen(false);
    } else {
      setIsOptionsOpen(!isOptionsOpen);
    }
  };
 
  const handleSelectMode = (mode) => {
    setActiveMode(mode);
    setIsOptionsOpen(false);
    
    if (mode === 'bot') {
      setMessages([{ sender: 'bot', text: 'Саламатсызбы! Кыргыз Көмүр боюнча сурооңузду бериңиз.' }]);
    } else if (mode === 'translate') {
      setMessages([{ sender: 'bot', text: 'Текстти киргизиңиз (Кыргызча ⇄ Русский).' }]);
    }
  };

   
  const translateText = async (text) => {
    try {
       
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ky|ru`
      );
      const data = await res.json();
      return data.responseData?.translatedText || 'Которууга мүмкүн болгон жок.';
    } catch (error) {
      return 'Котормо сервисине туташууда ката чыкты.';
    }
  };

 
  const getBotResponse = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('баа') || lower.includes('цена') || lower.includes('канча')) {
      return 'Көмүрдүн баасы жана сорттору Сервис-центр бөлүмүндө көрсөтүлгөн.';
    }
    if (lower.includes('салам') || lower.includes('привет') || lower.includes('хай')) {
      return 'Саламатсызбы! Сизге кантип жардам бере алам?';
    }
    if (lower.includes('телефон') || lower.includes('номер') || lower.includes('байланыш')) {
      return 'Биздин байланыш телефонубуз: +996 (704) 21-07-06.';
    }
    return 'Сурооңуз кабыл алынды. Тез арада оператор сиз менен байланышат.';
  };
 
  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');
    setIsTyping(true); // Индикаторду күйгүзүү

    if (activeMode === 'bot') {
     
      setTimeout(() => {
        const replyText = getBotResponse(userText);
        setMessages((prev) => [...prev, { sender: 'bot', text: replyText }]);
        setIsTyping(false);
      }, 600);
    } else {
       
      const translated = await translateText(userText);
      setMessages((prev) => [...prev, { sender: 'bot', text: translated }]);
      setIsTyping(false);
    }
  };

  return (
    <div className="widget-container">
      
       
      {activeMode && (
        <div className="chat-window">
          <div className="chat-header">
            <span>{activeMode === 'bot' ? '🤖 Авто-жоопчу Бот' : '🌐 Котормочу'}</span>
            <button className="close-btn" onClick={() => setActiveMode(null)}>✕</button>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <span>.</span><span>.</span><span>.</span>
              </div>
            )}
          </div>

          <form className="chat-footer" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Жазыңыз..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping}>➔</button>
          </form>
        </div>
      )}

      
      <div className={`options-wrapper ${isOptionsOpen ? 'open' : ''}`}>
        <button 
          className="option-btn translate-btn" 
          title="Котормочу"
          onClick={() => handleSelectMode('translate')}
        >
          🌐
        </button>
        <button 
          className="option-btn bot-btn" 
          title="Бот"
          onClick={() => handleSelectMode('bot')}
        >
          🤖
        </button>
      </div>

       
      <button className="main-icon-btn" onClick={handleMainIconClick}>
      <BotMessageSquare />
      </button>

    </div>
  );
};

export default ChatWidget;