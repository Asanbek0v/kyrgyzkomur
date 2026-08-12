import React from "react";
import "./Hero.scss";

// 6 түрдүү сүрөт жана маалыматтар топтому
const cardsData = [
  {
    id: 1,
    title: "Кара-Кече Көмүрү",
    desc: "Жогорку калориялуу сорт",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Тез Жеткирүү",
    desc: "24/7 Камаз кызматы",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Сервис Борбору",
    desc: "Сапат кепилдиги",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Сорттолгон Көмүр",
    desc: "Ирик жана майда сорттор",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Арзандатуулар",
    desc: "Чоң көлөмгө жеңилдиктер",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Байланыш 24/7",
    desc: "+996 (704) 21-07-06",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
  },
];

const Hero = () => {
  return (
    <section className="hero-carousel-container">
   
      <div className="hero-bg-image"></div>
      <div className="hero-bg-overlay"></div> 

      <div className="hero-wrapper">
       
        <div className="hero-text">
          <span className="badge">Кыргыз Көмүр</span>
          <h1>
            Өз үйүңүзгө <span className="gold-text">сапаттуу көмүр</span>{" "}
            буйрутма бериңиз
          </h1>
          <p>
            Кара-Кече жана мыкты сорттогу көмүрлөрдү тез жана арзаныраак баада
            үйүңүзгө чейин жеткиребиз.
          </p>
          <button className="gold-btn">Буйрутма берүү ➔</button>
        </div>

        {/* Оң тараптагы 3D АЙЛАНУУЧУ 6 СҮРӨТ КАРУСЕЛИ */}
        <div className="carousel-3d-scene">
          <div className="carousel-3d-spinner">
            {cardsData.map((card, index) => (
              <div
                key={card.id}
                className="carousel-card"
                style={{ "--index": index }}
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
