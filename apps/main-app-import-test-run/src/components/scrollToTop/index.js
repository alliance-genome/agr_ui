import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ScrollToTop extends Component {
  componentDidMount() {
    // prevent scrollRestoration 'auto' interfere with scrolling to the top
    history.scrollRestoration = 'manual';
  }

  componentDidUpdate(prevProps) {
    // compare pathname, which ignoring changes in URL hash
    const currentPath = this.props.location && (this.props.location.pathname + this.props.location.search);
    const previousPath = prevProps.location && (prevProps.location.pathname + prevProps.location.search);
    if (currentPath !== previousPath) {
      window.scrollTo(0,0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);

ScrollToTop.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object.isRequired,
};
