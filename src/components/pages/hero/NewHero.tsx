import React from "react";
import "./NewHero.scss";

const products = [
  {
    id: 1,
    image:
      "https://gubkin.city/upload/medialibrary/37a/1tbzgvij6kzw27gzhnrteqeinnyy5eyd/PK_220628_115947.jpg",
    category: "ПРОИЗВОДСТВО",
    name: "НА РАЗРЕЗЕ КАРА-КЕЧЕ УВЕЛИЧЕНЫ ОБЪЁМЫ ДОБЫЧИ",
    date: "10 августа 2026",
    desc: "С начала года добыто свыше 900 тыс. тонн угля — на 12% больше прошлогоднего показателя.",
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVUQ930GO3bIeIhbePpfgDvVUC4ZDrtMDFmUKay3TebA&s=10",
    category: "КАДРЫ",
    name: "ОБУЧЕНИЕ ГОРНЯКОВ ПО ПРОГРАММЕ БЕЗОПАСНОСТИ ТРУДА",
    date: "4 августа 2026",
    desc: "Более 200 сотрудников прошли аттестацию и получили новое защитное снаряжение.",
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLXmwtgdjiVEDmYwvt5rKbQoJKtx44y9lo9kVX-dz_pA&s=10",
    category: "ОТГРУЗКА",
    name: "НАЧАЛАСЬ ПОДГОТОВКА К ОТОПИТЕЛЬНОМУ СЕЗОНУ",
    date: "28 июля 2026",
    desc: "Формируются запасы угля для населения и социальных объектов во всех областях республики.",
  },
];

const NewHero = () => {


  
  return (
    <section id="newHero">
      <div className="container">
        <div className="newHero__top">
          <div>
            <h2>НОВОСТИ И ПРЕСС-ЦЕНТР</h2>
            <span></span>
          </div>

          <a href="#">
            ВСЕ НОВОСТИ <span>→</span>
          </a>
        </div>

        <div className="newHero">
          {products.map((item) => (
            <article className="newHero__card" key={item.id}>
              <div className="newHero__image">
                <img src={item.image} alt={item.name} />

                <span>{item.category}</span>
              </div>

              <div className="newHero__content">
                <div className="newHero__date">
                  <span>▣</span>
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