import React from 'react';
import PropTypes from 'prop-types';

const AssociationType = ({type, showOnlyNot = false}) => {
  type = type.toLowerCase();

  if (showOnlyNot && type.indexOf('_not_') < 0) {
    return null;
  }

  {if (type === 'is_not_model_of') {
    return <>does <span className='text-danger'>NOT</span> model</>;
  }}

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
  showOnlyNot: PropTypes.bool,
  type: PropTypes.string,
};

export default AssociationType;

