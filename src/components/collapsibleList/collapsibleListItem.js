import React from 'react';
import PropTypes from 'prop-types';

const CollapsibleListItem = ({children}) => {
  return <li>{children}</li>;
};

CollapsibleListItem.propTypes = {
  children: PropTypes.node,
};

export default CollapsibleListItem;
