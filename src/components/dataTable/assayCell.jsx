import React from 'react';

const AssayCell = (a) => {
  return <span title={a.name}>{a.displaySynonym}</span>;
};

export default AssayCell;
