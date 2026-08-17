"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import "./NewHero.scss";
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });

    const timer = setTimeout(() => {
      AOS.refresh();
    }, 500);

    return () => clearTimeout(timer);

  }, [products]);

  }, []);


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


        <div className="newHero" >

        <div className="newHero">

          {products.map((item, index) => (
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

                  alt={item.title}
                  onLoad={() => AOS.refresh()} 
                />
                <span>НОВОСТИ</span>

                  alt={item.name}
                  onLoad={() => AOS.refresh()} // Сүрөт жүктөлөрү менен анимацияны жаңыртуу
                />
                <span>{item.category}</span>

              </div>

              <div className="newHero__content">
                <div className="newHero__date">
                  <span>📅</span>

                  {new Date(item.date).toLocaleDateString("ru-RU")}

                  {item.date}

                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

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
