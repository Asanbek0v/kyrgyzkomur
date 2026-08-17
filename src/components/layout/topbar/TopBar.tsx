import { FC } from "react";
import Link from "next/link";
import { QrCode, LogIn } from "lucide-react";
import "./TopBar.scss";

const TopBar: FC = () => {
  return (
    <div id="TopBar" data-aos="fade-down" data-aos-duration="600">
      <div className="container">
        <div className="TopBar">
          <div className="TopBar__actions">
            <Link
              href="/qr_login"
              className="TopBar__btn TopBar__btn--secondary"
              data-aos="fade-down"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <QrCode size={18} />
              <span>БОРБОР — QR ВХОД</span>
            </Link>

            <Link
              href="/login"
              className="TopBar__btn TopBar__btn--primary"
              data-aos="fade-down"
              data-aos-duration="600"
              data-aos-delay="200"
            >
              <LogIn size={18} />
              <span>ВОЙТИ</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;