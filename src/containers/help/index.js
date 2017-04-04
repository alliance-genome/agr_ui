import React, { Component } from 'react';
import HeadMetaTags from '../../components/headMetaTags';

class Help extends Component {
  render() {
    let title='Help Using Alliance of Genome Resources ';
    return (
      <div>
        <HeadMetaTags title={title} />
        <h1>Help</h1>
      </div>
    );
  }
}

export default Help;
