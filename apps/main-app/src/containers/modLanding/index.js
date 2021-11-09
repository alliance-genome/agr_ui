import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import style from './style.scss';
import PropTypes from 'prop-types';
import MainWB from './MainWB';
import MainSGD from './MainSGD';

const MODLanding = ({modId}) => {
  return (
    <div>
      <HeadMetaTags title='Landing page' />

      <section className={style.section}>
        <div className={`${style.contentContainer}`}>
          {modId === 'wb' ? <MainWB /> : null}
          {modId === 'sgd' ? <MainSGD /> : null}
        </div>
      </section>
    </div>
  );
};

export default MODLanding;

MODLanding.propTypes = {
  modId: PropTypes.string.isRequired
}
