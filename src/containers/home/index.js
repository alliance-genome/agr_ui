import React, { Component } from 'react';
import HeadMetaTags from '../../components/headMetaTags';

class Home extends Component {
  render() {
    let title= 'Home - Alliance of Genome Resources'; 
    return (
      <div>
        <HeadMetaTags title={title} />
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
