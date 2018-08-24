import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ScrollToTop extends Component {

  componentDidUpdate(prevProps) {
    let isChrome = !!window.chrome && !!window.chrome.webstore;

    if (this.props.location !== prevProps.location && !isChrome) {
      window.scrollTo(0, 0);
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

