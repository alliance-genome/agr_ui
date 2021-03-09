import React from 'react';
import PropTypes from 'prop-types';
import ExternalLink from '../../../components/ExternalLink';
import { Link } from 'react-router-dom';

const SubMenuItem = ({item, ...rest}) => {
  if (item.route.startsWith('http')) {
    return <ExternalLink href={item.route} {...rest} />;
  } else {
    return <Link to={item.route} {...rest} />;
  }
};

SubMenuItem.propTypes = {
  item: PropTypes.shape({
    route: PropTypes.string,
  }),
};

export default SubMenuItem;
