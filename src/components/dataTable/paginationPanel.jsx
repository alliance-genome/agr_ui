import React from 'react';
import PropTypes from 'prop-types';

const PaginationPanel = ({ components }) => {
  return (
    <div className="align-items-baseline col d-flex justify-content-between text-muted">
      <span>
        {components.totalText} {components.sizePerPageDropdown} per page
      </span>
      <span>{components.pageList}</span>
    </div>
  );
};

PaginationPanel.propTypes = {
  components: PropTypes.object,
};

export default PaginationPanel;
