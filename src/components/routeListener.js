import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

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

export default withRouter(RouteListener);
