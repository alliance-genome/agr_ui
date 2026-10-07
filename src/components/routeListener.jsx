import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const RouteListener = ({ onRouteChange, children }) => {
  const location = useLocation();

  useEffect(() => {
    onRouteChange(location);
  }, [location, onRouteChange]);

  return children;
};

RouteListener.propTypes = {
  children: PropTypes.node,
  onRouteChange: PropTypes.func.isRequired,
};

export default RouteListener;
