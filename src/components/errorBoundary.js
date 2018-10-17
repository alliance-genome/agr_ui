import React from 'react';
import PropTypes from 'prop-types';
import { HELP_EMAIL } from '../constants';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    // Display fallback UI
    // eslint-disable-next-line
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="alert alert-danger" role="alert">
          <strong>There is a problem displaying this section.</strong>
          <br />
          <span>If you continue to see this message, please contact us at </span>
          <a href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</a>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any,
};
