import React from 'react';

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
export default TableSummary;
