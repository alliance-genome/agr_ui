import React from 'react';
import style from './style.module.scss';

const ResourcesSection = () => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <div className='row'>
          <div className='col-lg-12'>
            <p>Community Resoures</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
