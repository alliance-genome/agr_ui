import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

const AssociationType = ({type, showOnlyNot = false}) => {
  type = type.toLowerCase();

  if (showOnlyNot && type.indexOf('_not_') < 0) {
    return null;
  }

  if (type === 'is_not_model_of') {
    return <>does <span className='text-danger'>NOT</span> model</>;
  }

  const words = type
    .replaceAll('_not_', '_<span class=\'text-danger\'>NOT</span>_')
    .replaceAll('_', ' ');
  return parse(words);
};

AssociationType.propTypes = {
  showOnlyNot: PropTypes.bool,
  type: PropTypes.string,
};

export default AssociationType;

