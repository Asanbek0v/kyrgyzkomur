"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Hero.scss";

const cardsData = [
  {
    id: 1,
    title: "Уголь Кара-Кече",
    desc: "Высококалорийный сорт",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Быстрая доставка",
    desc: "Собственный автопарк 24/7",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Сервисный центр",
    desc: "Гарантия качества и веса",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Отборный сорт",
    desc: "Крупная и мелкая фракция",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Гибкие скидки",
    desc: "Выгодные цены на объемы",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Поддержка 24/7",
    desc: "+996 (704) 21-07-06",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
  },
];

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="hero-carousel-container">
      <div className="hero-bg-image"></div>
      <div className="hero-bg-overlay"></div>


      <div className="glow-sphere glow-1"></div>
      <div className="glow-sphere glow-2"></div>

      {/* <div className="glow-sphere glow-1"></div>
      <div className="glow-sphere glow-2"></div> */}
 

      <div className="hero-wrapper">
        <div className="hero-text" data-aos="fade-right">
          <div className="badge" data-aos="fade-down" data-aos-delay="100">
            <span className="dot"></span>
            ГП «Кыргызкомур»
          </div>

          <h1 data-aos="fade-up" data-aos-delay="200">
            Тепло и уют в ваш дом: <br />
            <span className="gradient-text">Отборный уголь</span> с доставкой
          </h1>

          <p data-aos="fade-up" data-aos-delay="300">
            Поставляем высококалорийный уголь Кара-Кече прямо к вашему порогу.
            Быстро, надежно и по честным ценам.
          </p>

          <div className="btn-group" data-aos="zoom-in" data-aos-delay="400">
            <button className="primary-btn">
              <span>Заказать доставку</span>
              <div className="btn-icon">➔</div>
            </button>
          </div>
        </div>

        <div
          className="carousel-3d-scene"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <div className="carousel-3d-spinner">
            {cardsData.map((card, index) => (
              <div
                key={card.id}
                className="carousel-card"
                style={{ "--index": index } as React.CSSProperties}
              >
                <img src={card.img} alt={card.title} />
                <div className="card-overlay">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
