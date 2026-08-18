"use client";
import { FC, useEffect, useState } from "react";
import "./News.scss";
import NewHero from "../hero/NewHero";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

const News: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/products/get`;
        console.log("Запрос отправляется на URL:", apiUrl);

        const res = await fetch(apiUrl);
        const data = await res.json();

        console.log("Данные от сервера:", data);

        setProducts(data);
      } catch (err) {
        console.error("Ошибка при загрузке:", err);
      }
    };

    loadProducts();
  }, []);

  return (
    <section id="News">
      <div className="container">
        <div className="News">
          <NewHero />
          {products.map((item) => (
            <div key={item.id} className="news-card">
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span>{item.date}</span>
            </div>
          ))}
          <NewHero />
        </div>
      </div>
    </section>
  );
};

export default News;
