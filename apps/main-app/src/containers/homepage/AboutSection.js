import React from 'react';
import WordpressInject from '../wordpress/wordpressInject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import style from './style.scss';

const AboutSection = () => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <div className='row'>
          <div className='col-lg-12'>
            <WordpressInject  slug='agr-summary-homepage' />
          </div>
          <div className='col-md-4'>
            <a
              className='text-decoration-none'
              href='https://community.alliancegenome.org/categories'
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className='alert alert-primary'>
                <h4 className='alert-heading'>
                  <FontAwesomeIcon icon={faComments} /> Join the Alliance User Community
                </h4>
                <p>
                  Click here to access official announcements, ask questions, and view discussions with other members of the Alliance Community.
                </p>
                <p className='mb-0'>
                  Join today to stay up-to-date.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
