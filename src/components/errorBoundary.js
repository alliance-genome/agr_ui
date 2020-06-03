import React from 'react';
import PropTypes from 'prop-types';
import { HELP_EMAIL } from '../constants';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: false,
    };
  }

  componentDidCatch(error) {
    // Display fallback UI
    // eslint-disable-next-line
    this.setState({
      hasError: true,
      errorMessage: error && error.message,
    });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    const { hasError, errorMessage } = this.state;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div className="alert alert-danger" role="alert">
          {/* errorMessage to indicate provide more visibility and accountability */}
          <strong>A problem displaying this section{errorMessage ? ':' : null}</strong>
          <samp style={{fontSize: 'small', paddingLeft: '1em'}}><br /> {errorMessage}</samp>
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
