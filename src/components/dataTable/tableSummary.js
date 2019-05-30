import React from 'react';
import PropTypes from 'prop-types';

function pluralize(word = '', count = 2) {
  if (count < 2) {
    return word;
  } else {
    return `${word}s`;
  }
}

function TableSummary({ style, numberOfEntities, numberOfAnnotations, entityType }) {
  return numberOfEntities ? (
    <div style={style}>
      <span className="badge badge-secondary">
        {numberOfEntities} {pluralize(entityType, numberOfEntities)}
      </span>{' '}
      based on{' '}
      <span className="badge badge-secondary">
        {numberOfAnnotations} {pluralize('annotation', numberOfAnnotations)}
      </span>
    </div>
  ) : null;
}

TableSummary.propTypes = {
  entityType: PropTypes.string,
  numberOfAnnotations: PropTypes.number,
  numberOfEntities: PropTypes.number,
  style: PropTypes.any,
};

export default TableSummary;
