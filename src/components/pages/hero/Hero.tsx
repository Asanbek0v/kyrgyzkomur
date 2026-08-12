"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import hero1 from "../../../assets/hero1.jpg";
import hero2 from "../../../assets/hero2.jpg";
import hero3 from "../../../assets/hero3.jpg";

import "./Hero.scss";

const slides = [
  {
    image: hero1,
    title: "ОТГРУЗКА УГЛЯ ГОД",
    text: "Прямые поставки автотранспортом и вагонами во все регионы Кыргызской Республики.",
  },
  {
    image: hero3,
    title: "КАЧЕСТВЕННЫЙ УГОЛЬ",
    text: "Надежные поставки качественного угля для вашего бизнеса.",
  },
  {
    image: hero2,
    title: "БЫСТРАЯ ДОСТАВКА",
    text: "Доставляем уголь автомобильным и железнодорожным транспортом.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[current];

  return (
    <section id="hero">
      <img className="hero--bg" src={slide.image.src} alt="Hero background" />

      <div className="hero--overlay"></div>

      <div className="container">
        <div className="hero">
          <button className="hero--arrow" onClick={prevSlide}>
            <ChevronLeft />
          </button>

          <div className="hero--text">
            <h2>- Логистика</h2>

            <h1>{slide.title}</h1>

            <h3>{slide.text}</h3>

            <button className="hero--request">ОФОРМИТЬ ЗАЯВКУ</button>
          </div>

          <button className="hero--arrow" onClick={nextSlide}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
