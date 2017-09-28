import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';

import {
  // fetchDownload
} from '../../actions/disease.js';

class downloadButton extends Component {
  constructor(props) {
    super(props);

  }

  handleDownloadButtonOnClick(id){
    console.log(`http://build.alliancegenome.org/api/disease/${id}/associations`);

    // fetch(`http://build.alliancegenome.org/api/disease/${id}/associations`)
    // .then(function(response) {
    //   return response;
    // }).then(function(data) {
    //   console.log(data);
    // }).catch(function(error) {
    //   console.log(error);
    // });
  }

  render(){

    return(
      <Button href={'http://build.alliancegenome.org/api/disease/${id}/associations/dlow'} onClick={() => this.handleDownloadButtonOnClick(this.props.id) }>{this.props.buttonText}</Button>
    );
  }
}

downloadButton.propTypes = {
  buttonText: PropTypes.text,
  id: PropTypes.string,
};

export default downloadButton;
