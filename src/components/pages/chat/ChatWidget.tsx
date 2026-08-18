"use client";

import { FC, useState } from "react";
import { BotMessageSquare, X } from "lucide-react";
import "./ChatWidget.scss";
import { useTranslatePage } from "@/src/api/useTranslate";

type Language = "ky" | "ru";

const ChatWidget: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: translatePage } = useTranslatePage();

  const handleMainButton = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLanguage = (lang: Language) => {
    translatePage(lang);
    setIsOpen(false);
  };

  return (
    <section id="ChatWidget">
      <div className="container">
        <div className="ChatWidget">
          {isOpen && (
            <div className="ChatWidget--language">
              <div className="ChatWidget--language_header">
                <div>
                  <span>🌐</span>
                  <h3>Переводчик сайта</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="ChatWidget--window_close"
                  aria-label="Жабуу"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="ChatWidget--language_body">
                <p>Сайтты кайсы тилге которобуз?</p>

                <button
                  type="button"
                  className="ChatWidget--language_item"
                  onClick={() => handleLanguage("ky")}
                >
                  <span className="flag">🇰🇬</span>
                  <div>
                    <strong>Кыргызча</strong>
                    <small>Kyrgyz</small>
                  </div>
                </button>

                <button
                  type="button"
                  className="ChatWidget--language_item"
                  onClick={() => handleLanguage("ru")}
                >
                  <span className="flag">🇷🇺</span>
                  <div>
                    <strong>Русский</strong>
                    <small>Russian</small>
                  </div>
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            className={`ChatWidget--main ${isOpen ? "active" : ""}`}
            onClick={handleMainButton}
            aria-label="Тил тандоо"
          >
            {isOpen ? <X size={25} /> : <BotMessageSquare size={26} />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatWidget;
