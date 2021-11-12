import React from 'react';
import About from './About';
import Resources from './Resources';
import News from './News';
import Meetings from './Meetings';
import style from '../style.scss';

const MainWB = () => {
  return (
    <div>
      <div className={style.bannerWB}>
        <div className={style.secondaryNavEmptyRow} />
        <div className={`row ${style.secondaryNavWB}`}>
          <div className='container'>
            <h1>WormBase</h1>
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

export default MainWB;