import React from 'react';
import PropTypes from 'prop-types';

const ControlsContainer = ({children}) => {
  return (
    <div className='card'>
      <div className='card-body'>
        {children}
      </div>
    </div>
  );
};

ControlsContainer.propTypes = {
  children: PropTypes.node,
};

export default ControlsContainer;
