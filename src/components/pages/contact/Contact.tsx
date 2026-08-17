import { FC } from "react";
import "./Contact.scss";
import { Building2, MapPin, ShieldAlert } from "lucide-react";
import Link from "next/link";
interface ContactItem {
  label: string;
  phone: string;
}

const mainContacts: ContactItem[] = [
  { label: "Общий отдел", phone: "(0312) 540 451" },
  { label: "Приемная", phone: "(0312) 540 631" },
  { label: "Юридический отдел", phone: "(0312) 540 433" },
  { label: "QR пропуск", phone: "+996 (600) 011 032" },
];

const branches: ContactItem[] = [
  { label: "Филиал Кара-Кече", phone: "+996 (706) 520 959" },
  { label: "Филиал Балыкчы", phone: "+996 (703) 169 025" },
  { label: "Филиал Южный", phone: "+996 (700) 240 679" },
];

const Contact: FC = () => {
  return (
    <section id="Contact">
      <div className="container">
        <h1 className="header" data-aos="zoom-in" data-aos-duration="700">
          Контакты и Филиалы
        </h1>
        <div className="Contact">
          <div className="Contact--head">
            <div
              className="Contact--head__right"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              <ShieldAlert className="defence" />
              <div className="Contact--head__right--card">
                <h3>Антикоррупция / Телефон доверия</h3>
                <p className="phone">+996 (772) 575 777</p>
                <p className="subtext">E-mail: @kyrgyzkomur@gmail.com</p>
              </div>
            </div>
            <div
              className="Contact--head__left"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              <Building2 className="icon" />
              <div className="Contact--head__block--card">
                <h3>Приобретение угля на социальных топливных базах</h3>
                <p className="phone">996 (509) 222 033</p>
              </div>
            </div>
          </div>
          <div className="Contact--body">
            <div
              className="Contact--body__left"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <h3>
                <Building2 />
                Основные отделы
              </h3>
              <ul>
                {mainContacts.map((el, idx) => (
                  <li key={idx}>
                    <span>{el.label}</span>
                    <Link href={`tel:${el.phone}`}>{el.phone}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="Contact--body__right"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <h3>
                <MapPin />
                Основные отделы
              </h3>

              <ul>
                {branches.map((el, idx) => (
                  <li key={idx}>
                    <span>{el.label}</span>
                    <Link href={`tel:${el.phone.replace(/\D/g, "")}`}>
                      {el.phone}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="Contact--footer"
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            <div className="Contact--footer__head">
              <h3>Мы на карте</h3>
              <Link
                href="https://go.2gis.com/vJGJM"
                target="_blank"
                rel="noopener noreferrer"
                className="Contact--footer__link"
              >
                <MapPin size={16} />
                Открыть в 2GIS
              </Link>
            </div>

            <div className="Contact--footer__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.621400134707!2d74.6062892759583!3d42.859726771150996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb633161a2095%3A0xfbb1bbd9c1a3fbf2!2zMjQg0YPQuy4g0JrRg9C70LDRgtC-0LLQsCwg0JHQuNGI0LrQtdC6!5e0!3m2!1sru!2skg!4v1786954653106!5m2!1sru!2skg"
                style={{ border: 0, width: "100%", height: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;