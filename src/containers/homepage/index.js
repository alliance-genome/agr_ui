import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import SearchSection from './SearchSection';
import AboutSection from './AboutSection';
import MembersSection from './MembersSection';
import {Link} from 'react-router-dom';
import style from './style.scss';

const Homepage = () => {
  return (
    <div>
      <HeadMetaTags title='Home' />
      <SearchSection />

      <section className={style.section}>
        <div className={`${style.contentContainer}`}>
          <Link className='text-decoration-none' to='/coronavirus-resources'>
            <div className='alert alert-danger m-0' role='alert'>
              <h4 className='alert-heading'>
                <i className='fa fa-exclamation-triangle' /> COVID-19 Information
              </h4>
              <p className='mb-0'>Click here for animal model information and resources for COVID-19 research</p>
            </div>
          </Link>
        </div>
      </section>

      <AboutSection />
      <MembersSection />
    </div>
  );
};

export default Homepage;
