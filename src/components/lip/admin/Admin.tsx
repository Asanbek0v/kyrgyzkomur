"use client";

import React, { useState } from "react";
import "./Admin.scss";

interface ArticleItem {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  mainImage: string;
  contentImage?: string;
  date: string;
  fullTitle: string;
  paragraphs: string[];
}

export default function Admin() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);

  // Текст талаалары
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("НОВОСТИ");
  const [excerpt, setExcerpt] = useState("");
  const [fullTitle, setFullTitle] = useState("");
  const [fullText, setFullText] = useState("");

  // 1. БАШКЫ СҮРӨТ (Файл же Ссылка)
  const [mainImgMode, setMainImgMode] = useState<"file" | "url">("file");
  const [mainImage, setMainImage] = useState<string>("");
  const [mainImageUrlInput, setMainImageUrlInput] = useState<string>("");

  // 2. ИЧИНДЕГИ СҮРӨТ (Файл же Ссылка)
  const [contentImgMode, setContentImgMode] = useState<"file" | "url">("file");
  const [contentImage, setContentImage] = useState<string>("");
  const [contentImageUrlInput, setContentImageUrlInput] = useState<string>("");

  // Башкы сүрөттү файлдан жүктөө
  const handleMainFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(URL.createObjectURL(file));
    }
  };

  // Башкы сүрөттү ссылка аркылуу кошуу
  const handleMainUrlAdd = () => {
    if (mainImageUrlInput.trim()) {
      setMainImage(mainImageUrlInput.trim());
      setMainImageUrlInput("");
    }
  };

  // Ичиндеги сүрөттү файлдан жүктөө
  const handleContentFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setContentImage(URL.createObjectURL(file));
    }
  };

  // Ичиндеги сүрөттү ссылка аркылуу кошуу
  const handleContentUrlAdd = () => {
    if (contentImageUrlInput.trim()) {
      setContentImage(contentImageUrlInput.trim());
      setContentImageUrlInput("");
    }
  };

  // Форманы жөнөтүү
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !excerpt || !fullTitle || !fullText || !mainImage) {
      alert("Сураныч, негизги талааларды жана башкы сүрөттү кошуңуз!");
      return;
    }

    const paragraphsArray = fullText.split("\n").filter((p) => p.trim() !== "");

    const newArticle: ArticleItem = {
      id: Date.now(),
      title,
      category,
      excerpt,
      mainImage,
      contentImage,
      date: new Date().toLocaleDateString("ru-RU"),
      fullTitle,
      paragraphs: paragraphsArray,
    };

    setArticles([newArticle, ...articles]);

    // Талааларды тазалоо
    setTitle("");
    setExcerpt("");
    setFullTitle("");
    setFullText("");
    setMainImage("");
    setContentImage("");
    alert("Жаңылык ийгиликтүү кошулду!");
  };

  return (
    <div className="adminDashboard">
      <header className="dashboardHeader">
        <h1>
          Панель управления <span>/ Жаңылык кошуу</span>
        </h1>
      </header>

      <div className="adminGrid">
        <form className="modernForm" onSubmit={handleSubmit}>
          {/* 1. НЕГИЗГИ МААЛЫМАТТАР */}
          <div className="sectionTitle">1. Негизги маалыматтар</div>

          <div className="formRow">
            <div className="formGroup flex1">
              <label>Категория</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="formGroup flex2">
              <label>Заголовок (Карточкадагы аты)</label>
              <input
                type="text"
                placeholder="Мисалы: Көмүр кампаларда сатылып баштады"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="formGroup">
            <label>Кыскача сүрөттөмөсү</label>
            <textarea
              rows={2}
              placeholder="«Кыргызкөмүр» кампаларда калкка көмүр сатууну баштады..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          {/* 2. БАШКЫ СҮРӨТ (Файл же Ссылка) */}
          <div className="sectionTitle">2. Башкы сүрөт (Главное фото)</div>

          <div className="formGroup">
            <div className="modeTabs">
              <button
                type="button"
                className={mainImgMode === "file" ? "active" : ""}
                onClick={() => setMainImgMode("file")}
              >
                📁 Папкадан таңдоо
              </button>
              <button
                type="button"
                className={mainImgMode === "url" ? "active" : ""}
                onClick={() => setMainImgMode("url")}
              >
                🔗 Ссылка чаптоо
              </button>
            </div>

            {mainImgMode === "file" ? (
              <div className="fileDropzone">
                <input
                  type="file"
                  accept="image/*"
                  id="mainFileInput"
                  onChange={handleMainFileSelect}
                />
                <label htmlFor="mainFileInput" className="dropzoneLabel">
                  📷 Папкадан башкы сүрөт тандоо
                </label>
              </div>
            ) : (
              <div className="urlInputBox">
                <input
                  type="text"
                  placeholder="https://site.com/image.jpg"
                  value={mainImageUrlInput}
                  onChange={(e) => setMainImageUrlInput(e.target.value)}
                />
                <button type="button" onClick={handleMainUrlAdd}>
                  Кошуу
                </button>
              </div>
            )}

            {mainImage && (
              <div className="previewBox">
                <img src={mainImage} alt="Main Preview" />
                <button type="button" onClick={() => setMainImage("")}>
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* 3. ТОЛУК ТЕКСТ ЖАНА ИЧИНДЕГИ СҮРӨТ */}
          <div className="sectionTitle">
            3. Макаланын мазмуну жана ички сүрөт
          </div>

          <div className="formGroup">
            <label>Толук макаланын башы (Заголовок)</label>
            <input
              type="text"
              placeholder="Кышка даярдык эрте башталды: калк үчүн көмүр даяр"
              value={fullTitle}
              onChange={(e) => setFullTitle(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label>Толук текст</label>
            <textarea
              rows={5}
              placeholder="Ар бир абзацты жаңы саптан жазыңыз..."
              value={fullText}
              onChange={(e) => setFullText(e.target.value)}
            />
          </div>

          {/* Макаланын ичине кошулуучу сүрөт */}
          <div className="formGroup">
            <label>Макаланын ичине сүрөт кошуу (Опционально)</label>
            <div className="modeTabs">
              <button
                type="button"
                className={contentImgMode === "file" ? "active" : ""}
                onClick={() => setContentImgMode("file")}
              >
                📁 Папкадан таңдоо
              </button>
              <button
                type="button"
                className={contentImgMode === "url" ? "active" : ""}
                onClick={() => setContentImgMode("url")}
              >
                🔗 Ссылка чаптоо
              </button>
            </div>

            {contentImgMode === "file" ? (
              <div className="fileDropzone">
                <input
                  type="file"
                  accept="image/*"
                  id="contentFileInput"
                  onChange={handleContentFileSelect}
                />
                <label htmlFor="contentFileInput" className="dropzoneLabel">
                  🖼️ Ички сүрөттү файлдан тандоо
                </label>
              </div>
            ) : (
              <div className="urlInputBox">
                <input
                  type="text"
                  placeholder="https://site.com/inner-photo.jpg"
                  value={contentImageUrlInput}
                  onChange={(e) => setContentImageUrlInput(e.target.value)}
                />
                <button type="button" onClick={handleContentUrlAdd}>
                  Кошуу
                </button>
              </div>
            )}

            {contentImage && (
              <div className="previewBox">
                <img src={contentImage} alt="Content Preview" />
                <button type="button" onClick={() => setContentImage("")}>
                  ✕
                </button>
              </div>
            )}
          </div>

          <button type="submit" className="saveBtn">
            Жаңылыкты сайтка чыгаруу
          </button>
        </form>

        {/* САЙТТА КӨРҮНҮШҮ (PREVIEW) */}
        <div className="livePreview">
          <h3>Сайттагы көрүнүшү:</h3>
          {articles.length === 0 ? (
            <p className="emptyText">Азырынча кошула элек...</p>
          ) : (
            articles.map((item) => (
              <div className="card" key={item.id}>
                <div className="imageBox">
                  <img src={item.mainImage} alt={item.title} />
                  <span className="badge">{item.category}</span>
                </div>
                <div className="bodyBox">
                  <h2 className="title">{item.title}</h2>
                  <p className="excerpt">{item.excerpt}</p>

                  {/* Макаланын ички сүрөтү бар болсо көрсөтүү */}
                  {item.contentImage && (
                    <div className="innerImgBox">
                      <img src={item.contentImage} alt="Inner content" />
                    </div>
                  )}

                  <span className="readMore">КЕНЕНИРЭЭК ОКУУ »</span>
                </div>
                <div className="footerBox">
                  <span>{item.date}</span> • <span>Комментарийлер жок</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
