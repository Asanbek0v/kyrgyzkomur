import { FC } from "react";
import "./News.scss";
import NewHero from "../hero/NewHero";

const News: FC = () => {
  return (
    <section id="News">
      <div className="container">
        <div className="News">
          <NewHero />
        </div>
      </div>
    </section>
  );
};

export default News;
