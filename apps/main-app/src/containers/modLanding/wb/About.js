import React from 'react';
import style from '../style.scss';

const About = () => {
  return (
    <div>
      <div>
          <div className='container-fluid'>
            <div className={style.secondaryNavEmptyRow} />
            <div className={`row ${style.secondaryNav}`}>
              <div className='container'>
              </div>
            </div>
          </div>
      </div>

      <div className={style.secondaryNavEmptyRow} >
        <div className={style.aboutMenuContainer}>
          <h2>WormBase</h2>
        </div>
      </div>
      <div className={style.contentContainer}>
        <div className='row'>
          <div className='col-md-12'>
            <p className='lead'>
              WormBase is an international consortium of biologists and computer scientists providing the research community
              with accurate, current, accessible information concerning the genetics, genomics and biology of
              <i>C. elegans</i> and related nematodes. Founded in 2000, the WormBase Consortium is led by Paul Sternberg
              (CalTech), Matt Berriman (The Wellcome Trust Sanger Institute), Kevin Howe (EBI), and Lincoln Stein (The
              Ontario Institute for Cancer Research).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
