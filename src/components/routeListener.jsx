import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

class RouteListener extends React.Component {
  componentDidMount() {
    this.onRouteChange();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChange();
    }
  }

  onRouteChange() {
    this.props.onRouteChange(this.props.location);
  }

  render() {
    return this.props.children;
  }
}

RouteListener.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object.isRequired,
  onRouteChange: PropTypes.func.isRequired,
};

/*
 * TODO: Replace this component with either a hook, or the useEffect below
 *
 * Returning children unmodified is an antipattern. This component is purely functional,
 * and thus should either be a hook, or just place the same useEffect where needed since
 * location is accessible anywhere in the app.
 *
 * The only location where the component is used is in ReactApp, which is currently a class component,
 * and would need converted to a functional component either way, which suggests the useEffect option
 * would be best.
 * */
const RouteListenerFC = ({ onRouteChange, children }) => {
  const location = useLocation();

  useEffect(() => {
    onRouteChange(location);
  }, [location, onRouteChange]);

  return children;
};

RouteListenerFC.propTypes = {
  children: PropTypes.node,
  onRouteChange: PropTypes.func.isRequired,
};

//TODO: withRouter - test
export default RouteListenerFC;
