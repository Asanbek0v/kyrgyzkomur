"use client";

import { FC, useState } from "react";
import { BotMessageSquare, X } from "lucide-react";
import "./ChatWidget.scss";
import { useTranslatePage } from "@/src/api/useTranslate";
import whatsApp from "@/src/assets/WhatsApp_Logo_green.svg.webp";
import Image from "next/image";

type ChatMode = "translate" | null;
type Language = "ky" | "ru" | null;

const ChatWidget: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<ChatMode>(null);

  const { mutate: translatePage } = useTranslatePage();

  const phone = "996704210706";
  const message = encodeURIComponent(
    "Здравствуйте! Я хотел бы получить информацию об угле.",
  );
  const waUrl = `https://wa.me/${phone}?text=${message}`;

  const handleMainButton = () => {
    if (activeMode) {
      setActiveMode(null);
      return;
    }
    setIsOpen((prev) => !prev);
  };

  const handleMode = (mode: ChatMode) => {
    setActiveMode(mode);
    setIsOpen(false);
  };

  const handleLanguage = (lang: Language) => {
    if (!lang) return;
    translatePage(lang);
    handleClose();
  };

  const handleClose = () => {
    setActiveMode(null);
    setIsOpen(false);
  };

  return (
    <section id="ChatWidget">
      <div className="container">
        <div className="ChatWidget">
          {isOpen && !activeMode && (
            <div className="ChatWidget--options">
              <button
                type="button"
                className="ChatWidget--options_translate"
                onClick={() => handleMode("translate")}
              >
                <span>🌐</span>
                <p>Переводчик</p>
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ChatWidget--options_bot"
                onClick={handleClose}
              >
                <Image src={whatsApp} alt="logo" width={20} height={20} />
                <p>WhatsApp</p>
              </a>
            </div>
          )}

          {activeMode === "translate" && (
            <div className="ChatWidget--language">
              <div className="ChatWidget--language_header">
                <div>
                  <span>🌐</span>
                  <h3>Переводчик сайтов</h3>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
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
            className={`ChatWidget--main ${isOpen || activeMode ? "active" : ""}`}
            onClick={handleMainButton}
            aria-label="Chat"
          >
            {isOpen || activeMode ? (
              <X size={25} />
            ) : (
              <BotMessageSquare size={26} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatWidget;
