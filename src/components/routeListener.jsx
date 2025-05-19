import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';

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

const RouterListenerFC = ({ onRouteChange, children }) => {

  const location = useLocation();

  useEffect(() => {
    onRouteChange(location);
  }, [location, onRouteChange]);

  return children;
};

//TODO: withRouter - Trivial
// export default withRouter(RouteListener);
export { RouterListenerFC };
