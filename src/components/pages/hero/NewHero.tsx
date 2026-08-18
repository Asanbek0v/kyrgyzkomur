"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./NewHero.scss";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type NewsItem = {
  id: number;
  name: string;
  category: string;
  image: string;
  date: string;
  desc: string;
};

const NewHero = () => {
  const [products, setProducts] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    if (!API_URL) {
      console.error(
        "NEXT_PUBLIC_API_URL табылган жок (.env файлын текшериңиз).",
      );
      setError("Сервер дареги көрсөтүлгөн эмес.");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/products/get`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Сервер ката кайтарды: ${res.status}`);
        }

        const data = await res.json();

        const mapped: NewsItem[] = data.map((p: any) => ({
          id: p.id,
          name: p.title,
          category: "НОВОСТИ",
          image: p.image,
          date: p.date
            ? new Date(p.date).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "",
          desc: p.description,
        }));

        setProducts(mapped);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Жаңылыктарды жүктөөдө ката:", err);
          setError("Жаңылыктарды жүктөөдө ката кетти.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!isLoading && products.length > 0) {
      const timer = setTimeout(() => {
        AOS.refresh();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoading, products]);

  return (
    <section id="newHero">
      <div className="container">
        <div className="newHero__top" data-aos="fade-down">
          <div>
            <h2>НОВОСТИ И ПРЕСС-ЦЕНТР</h2>
            <span></span>
          </div>

          <a href="#">
            ВСЕ НОВОСТИ <span>→</span>
          </a>
        </div>

        <div className="newHero">
          {isLoading && <p>Жүктөлүүдө...</p>}

          {error && <p className="newHero__error">{error}</p>}

          {!isLoading && !error && products.length === 0 && (
            <p className="newHero__empty">Азырынча жаңылыктар жок</p>
          )}

          {!isLoading &&
            !error &&
            products.map((item, index) => (
              <article
                className="newHero__card"
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div
                  className="newHero__image"
                  data-aos="zoom-in"
                  data-aos-delay={index * 150 + 100}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    onLoad={() => AOS.refresh()}
                  />
                  <span>{item.category}</span>
                </div>

                <div className="newHero__content">
                  <div className="newHero__date">
                    <span>📅</span>
                    {item.date}
                  </div>

                  <h3>{item.name}</h3>

                  <p>{item.desc}</p>

                  <a href="#">
                    ПОДРОБНЕЕ <span>→</span>
                  </a>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};

export default NewHero;
