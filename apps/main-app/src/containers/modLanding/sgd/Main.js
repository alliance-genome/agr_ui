import React from 'react';
import About from './About';
import style from '../style.scss';
import Resources from "./Resources";
import News from "./News";
import Meetings from "./Meetings";

const Main = () => {
  return (
    <div>
      <div className={style.bannerSGD}>
        <div className={style.secondaryNavEmptyRow} />
        <div className={style.secondaryNavSGD}>
          <div className='container'>
            <h1><img src="https://alliancegenome.files.wordpress.com/2016/11/logo_sgd.png" height="50px" /> Saccharomyces Genome Database </h1>
          </div>
        </div>
      </div>
      <div className='container'>
        <About/>
      </div>
      <div className='container'>
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
    </div>
  );
}

export default Main;
