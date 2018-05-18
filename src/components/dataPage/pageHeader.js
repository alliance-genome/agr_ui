import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({entityName}) => {
  return (
    <div className='d-none d-md-block'>
      <h1>
        {entityName}
        <hr />
      </h1>
    </div>
  );
};

PageHeader.propTypes = {
  entityName: PropTypes.string
};

export default PageHeader;
