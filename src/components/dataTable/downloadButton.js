import React, { Component } from 'react';
import PropTypes from 'prop-types';

class downloadButton extends Component {
  constructor(props) {
    super(props);
  }

  render(){

    return(
      <a
        className={'btn btn-primary'}
        download
        href={`/api/disease/${this.props.id}/associations/download`}
      >
        {this.props.buttonText}
      </a>
    );
  }
}

downloadButton.propTypes = {
  buttonText: PropTypes.text,
  filename: PropTypes.string,
  id: PropTypes.string,
};

export default downloadButton;
