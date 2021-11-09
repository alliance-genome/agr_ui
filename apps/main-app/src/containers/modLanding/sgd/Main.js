import React from 'react';
import About from './About';
import style from '../style.scss';

const Main = () => {
  return (
    <div>
      <h1>SGD</h1>
      <section className={style.section}>
        <div>
          <About/>
        </div>
      </section>
    </div>
  );
}

export default Main;
