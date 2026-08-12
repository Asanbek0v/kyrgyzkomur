import { FC } from "react";
import Link from "next/link";
import { QrCode, LogIn } from "lucide-react";
import "./TopBar.scss";

const TopBar: FC = () => {
  return (
    <div 
      id="TopBar"
      data-aos="fade-down"
      data-aos-duration="600"
    >
      <div className="container">
        <div className="TopBar__wrapper">
          <div className="TopBar__actions">
            <Link 
              href="/qr-login" 
              className="TopBar__btn"
              data-aos="fade-down"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <span>БОРБОР — QR ВХОД</span>
              <QrCode size={16} />
            </Link>

            <Link 
              href="/login" 
              className="TopBar__btn"
              data-aos="fade-down"
              data-aos-duration="600"
              data-aos-delay="200"
            >
              <span>ВОЙТИ</span>
              <LogIn size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;