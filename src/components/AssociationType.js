import React from 'react';
import PropTypes from 'prop-types';

const AssociationType = ({type}) => {
  const words = type.split('_');
  return (
    <span>
      {words.map(word => (
        <>{word === 'not' ?
          <span className='text-danger'>NOT</span> :
          word
        } </>))}
    </span>
  );
};

AssociationType.propTypes = {
  type: PropTypes.string,
};

export default AssociationType;

