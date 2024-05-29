import React from 'react';
import style from './style.module.scss';

const PapersSection = () => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <div className='row'>
          <div className='col-lg-12'>
            <p>Recent Papers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PapersSection;
