import React from 'react';
import PropTypes from 'prop-types';

const NOT = <span className='text-danger'>NOT</span>;

const AssociationType = ({type, showOnlyNot = false}) => {
  type = type.toLowerCase();

  if (showOnlyNot && type.indexOf('_not_') < 0) {
    return null;
  }

  if (type === 'is_not_model_of') {
    return <>does {NOT} model</>;
  }

  const words = type
    .replaceAll('_', ' ')
    .split(/(?:^| )not(?: |$)/, 2);
  return (
    <>
      {words[0]}
      {words.length > 1 && <> {NOT} {words[1]}</>}
    </>
  );
};

AssociationType.propTypes = {
  showOnlyNot: PropTypes.bool,
  type: PropTypes.string,
};

export default AssociationType;

