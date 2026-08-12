import { FC, ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import "./LayoutSite.scss";
interface ILayoutSite {
  children: ReactNode;
}
const LayoutSite: FC<ILayoutSite> = ({ children }) => {
  return (
    <div id="LayoutSite">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutSite;
