import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import PropTypes from 'prop-types';
import MainWB from './wb/Main';
import MainSGD from './sgd/Main';
import MainZFIN from './zfin/Main'

const MODLanding = ({modId}) => {
  return (
    <div>
      <HeadMetaTags title='Members' />
      {modId === 'wb' ? <MainWB/> : null}
      {modId === 'sgd' ? <MainSGD/> : null}
      {modId === 'zfin' ? <MainZFIN/> : null}
    </div>
  );
};

export default MODLanding;

MODLanding.propTypes = {
  modId: PropTypes.string.isRequired
}
