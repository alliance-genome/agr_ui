import React from 'react';

import style from './style.scss';

const AboutSection = () => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <div className='row'>
          <div className='col-md-8'>
            <h1>This is the future home of the WB landing page</h1>


            <p className='lead'>
            There will be a blurb here
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
