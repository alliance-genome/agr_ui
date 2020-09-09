import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({children}) => {
  return (
    <div className='d-none d-md-block'>
      <h1>
        {children}
        <hr />
      </h1>
    </div>
  );
};

PageHeader.propTypes = {
  children: PropTypes.node
};

export default PageHeader;
