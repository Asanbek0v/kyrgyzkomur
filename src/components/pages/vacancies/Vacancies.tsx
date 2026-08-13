"use client";
import { FC, useState, useEffect } from "react";
import { PhoneForwarded, ChevronDown, ChevronUp } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Vacancies.scss";

interface VacancyItem {
  id: number;
  title: string;
  count: number;
}

interface Department {
  id: string;
  title: string;
  vacancies: VacancyItem[];
}

const departmentsData: Department[] = [
  {
    id: "central",
    title: "ЦЕНТРАЛЬНЫЙ АППАРАТ",
    vacancies: [
      { id: 1, title: "Главный специалист", count: 1 },
      { id: 2, title: "Юрист", count: 1 },
    ],
  },
  {
    id: "kara-keche",
    title: 'Филиал "КАРА-КЕЧЕ"',
    vacancies: [
      { id: 1, title: "Автослесарь", count: 1 },
      { id: 2, title: "Инженер по буровзрывным работам", count: 1 },
    ],
  },
  {
    id: "issyk-kul",
    title: 'Филиал "ИССЫК-КУЛЬСКОЕ ПАРОХОДСТВО"',
    vacancies: [{ id: 1, title: "Капитан судна", count: 1 }],
  },
  {
    id: "yuzhnyi",
    title: 'Филиал "ЮЖНЫЙ"',
    vacancies: [
      { id: 1, title: "Главный инженер", count: 1 },
      { id: 2, title: "Главный специалист юрист", count: 1 },
      { id: 3, title: "Водитель хозяйственно-технического отдела", count: 1 },
    ],
  },
];

const Vacancies: FC = () => {
  const [openDeptId, setOpenDeptId] = useState<string | null>("yuzhnyi");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: "ease-in-out",
    });

    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const toggleDept = (id: string) => {
    setOpenDeptId((prevId) => (prevId === id ? null : id));
    // Аккордеон ачылып-жабылганда AOS скролл позицияларын кайра эсептейт
    setTimeout(() => {
      AOS.refresh();
    }, 350);
  };

  return (
    <section id="Vacancies">
      <div className="container">
        <div className="Vacancies">
          <h1 data-aos="fade-up">Вакансии</h1>

          <p className="greeting" data-aos="fade-up" data-aos-delay="100">
            Уважаемые соискатели!
          </p>

          <p className="description" data-aos="fade-up" data-aos-delay="150">
            Государственное предприятие «Кыргызкомур» при Министерстве
            энергетики Кыргызской Республики объявляет о наличии вакантных
            должностей в центральном аппарате и филиалах предприятия.
          </p>

          <p className="description" data-aos="fade-up" data-aos-delay="200">
            Для получения подробной информации и подачи документов, просим
            обращаться по следующим контактным номерам:
          </p>

          <ul
            className="Vacancies--block"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            <li className="Vacancies--block__card">
              <div className="card-icon">
                <PhoneForwarded size={20} />
              </div>
              <div className="card-info">
                <span className="card-title">Центральный аппарат:</span>
                <a href="tel:+996701808950" className="card-phone">
                  +996 (701) 808 950
                </a>
              </div>
            </li>

            <li className="Vacancies--block__card">
              <div className="card-icon">
                <PhoneForwarded size={20} />
              </div>
              <div className="card-info">
                <span className="card-title">Филиал «Кара-Кече»:</span>
                <a href="tel:+996702672673" className="card-phone">
                  +996 (702) 672 673
                </a>
              </div>
            </li>

            <li className="Vacancies--block__card">
              <div className="card-icon">
                <PhoneForwarded size={20} />
              </div>
              <div className="card-info">
                <span className="card-title">
                  Филиал «Иссык-Кульское пароходство»:
                </span>
                <a href="tel:+996701106110" className="card-phone">
                  +996 (701) 106 110
                </a>
              </div>
            </li>

            <li className="Vacancies--block__card">
              <div className="card-icon">
                <PhoneForwarded size={20} />
              </div>
              <div className="card-info">
                <span className="card-title">Филиал «Южный»:</span>
                <a href="tel:+996772688740" className="card-phone">
                  +996 (772) 688 740
                </a>
              </div>
            </li>
          </ul>

          <p className="description" data-aos="fade-up">
            Рассмотрение поступающих заявлений и прилагаемых документов
            осуществляется в порядке, установленном внутренними нормативными
            актами ГП «Кыргызкомур».
          </p>

          <p className="description" data-aos="fade-up">
            Благодарим Вас за интерес, проявленный к деятельности нашего
            предприятия, и желаем успехов в трудоустройстве!
          </p>

          <div className="Vacancies--accordion" data-aos="fade-up">
            {departmentsData.map((el) => {
              const isOpen = openDeptId === el.id;
              return (
                <div key={el.id} className="accordion-item">
                  <button
                    className={`accordion-header ${isOpen ? "active" : ""}`}
                    onClick={() => toggleDept(el.id)}
                  >
                    <span className="icon">
                      {isOpen ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </span>
                    <span className="title">{el.title}</span>
                  </button>

                  <div
                    className={`accordion-body-wrapper ${isOpen ? "open" : ""}`}
                  >
                    <div className="accordion-body">
                      <table className="vacancies-table">
                        <thead>
                          <tr>
                            <th className="col-num">№</th>
                            <th className="col-title">Должность</th>
                            <th className="col-count">Вакантное место</th>
                          </tr>
                        </thead>
                        <tbody>
                          {el.vacancies.map((item) => (
                            <tr key={item.id}>
                              <td className="col-num">{item.id}</td>
                              <td className="col-title">{item.title}</td>
                              <td className="col-count">{item.count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vacancies;
