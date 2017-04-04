import React, { Component } from 'react';
import HeadMetaTags from '../../components/headMetaTags';

class About extends Component {
  render() {
    let title='About Us - Alliance of Genome Resources';
    return (
      <div>
        <HeadMetaTags title={title} />
        <h1>About</h1>
      </div>
    );
  }
}

export default About;
