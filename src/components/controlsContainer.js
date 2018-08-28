import React from 'react';
import PropTypes from 'prop-types';

const ControlsContainer = ({children}) => {
  return (
    <div className="card card-body" style={{margin: '0.5em 0'}}>
      {children}
    </div>
  );
};

ControlsContainer.propTypes = {
  children: PropTypes.node,
};

export default ControlsContainer;
