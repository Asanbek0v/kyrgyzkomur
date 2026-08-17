"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import "./ChatWidget.scss";
import { BotMessageSquare } from "lucide-react";

type ChatMode = "bot" | "translate" | null;

type Message = {
  sender: "bot" | "user";
  text: string;
};

const ChatWidget = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<ChatMode>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);


  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chatBody = chatBodyRef.current;

    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleMainIconClick = () => {
    if (activeMode) {
      setActiveMode(null);
      setIsOptionsOpen(false);
    } else {
      setIsOptionsOpen((prev) => !prev);
    }
  };

  const handleSelectMode = (mode: "bot" | "translate") => {
    setActiveMode(mode);
    setIsOptionsOpen(false);

    if (mode === "bot") {
      setMessages([
        {
          sender: "bot",
          text: "Саламатсызбы! Кыргыз Көмүр боюнча сурооңузду бериңиз.",
        },
      ]);
    }

    if (mode === "translate") {
      setMessages([
        {
          sender: "bot",
          text: "Текстти киргизиңиз (Кыргызча ⇄ Русский).",
        },
      ]);
    }

    setInputValue("");
    setIsTyping(false);
  };

  const translateText = async (text: string): Promise<string> => {
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text,
        )}&langpair=ky|ru`,
      );

      if (!res.ok) {
        throw new Error("Translation request failed");
      }

      const data = await res.json();

      return (
        data.responseData?.translatedText ||
        "Котормого мүмкүн болгон жок."
      );
    } catch (error) {
      console.error("Translation error:", error);

      return "Котормо сервисине туташууда ката чыкты.";
    }
  };

  const getBotResponse = (text: string): string => {
    const lower = text.toLowerCase();

    if (
      lower.includes("баа") ||
      lower.includes("цена") ||
      lower.includes("канча")
    ) {
      return "Көмүрдүн баасы жана сорттору Сервис-центр бөлүмүндө көрсөтүлгөн.";
    }

    if (
      lower.includes("салам") ||
      lower.includes("привет") ||
      lower.includes("хай")
    ) {
      return "Саламатсызбы! Сизге кантип жардам бере алам?";
    }

    if (
      lower.includes("телефон") ||
      lower.includes("номер") ||
      lower.includes("байланыш")
    ) {
      return "Биздин байланыш телефонубуз: +996 (704) 21-07-06.";
    }

    return "Сурооңуз кабыл алынды. Тез арада оператор сиз менен байланышат.";
  };

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userText = inputValue.trim();

    if (!userText || isTyping || !activeMode) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
      },
    ]);

    setInputValue("");
    setIsTyping(true);

    if (activeMode === "bot") {
      setTimeout(() => {
        const replyText = getBotResponse(userText);

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: replyText,
          },
        ]);

        setIsTyping(false);
      }, 600);

      return;
    }

    try {
      const translated = await translateText(userText);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: translated,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="widget-container">
      {activeMode && (
        <div className="chat-window">
          <div className="chat-header">
            <span>
              {activeMode === "bot"
                ? "🤖 Авто-жоопчу Бот"
                : "🌐 Котормочу"}
            </span>

            <button
              type="button"
              className="close-btn"
              onClick={() => {
                setActiveMode(null);
                setIsOptionsOpen(false);
              }}
              aria-label="Чатты жабуу"
            >
              ✕
            </button>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div
                key={`${msg.sender}-${index}`}
                className={`message ${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="message bot typing">
                <span>.</span>
                <span>.</span>
                <span>.</span>
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

            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              aria-label="Жөнөтүү"
            >
              ➔
            </button>
          </form>
        </div>
      )}

      <div className={`options-wrapper ${isOptionsOpen ? "open" : ""}`}>
        <button
          type="button"
          className="option-btn translate-btn"
          title="Котормочу"
          onClick={() => handleSelectMode("translate")}
        >
          🌐
        </button>

        <button
          type="button"
          className="option-btn bot-btn"
          title="Бот"
          onClick={() => handleSelectMode("bot")}
        >
          🤖
        </button>
      </div>

      <button
        type="button"
        className="main-icon-btn"
        onClick={handleMainIconClick}
        aria-label="Чат менюсун ачуу"
      >
        <BotMessageSquare />
      </button>
    </div>
  );
};

export default ChatWidget;