import React from 'react';
import About from "./About";
import Resources from "./Resources";
import News from "./News";
import Meetings from "./Meetings";
import style from '../style.scss';

const MainWB = () => {
  return (
    <div>
      <h1>WormBase</h1>
      <section className={style.section}>
        <div>
          <About/>
        </div>
      </section>
      <div className="row">
      <div className="col-sm-4">
        <section className={style.section}>
          <div className={`${style.contentContainer}`}>
            <Resources/>
          </div>
        </section>
      </div>
      <div className="col-sm-4">
        <section className={style.section}>
          <div className={`${style.contentContainer}`}>
            <News/>
          </div>
        </section>
      </div>
      <div className="col-sm-4">
        <section className={style.section}>
          <div className={`${style.contentContainer}`}>
            <Meetings/>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}

export default MainWB;
