import React, { Component } from 'react';

import notFoundImg from './notFound.png';

class NotFound extends Component {
  render() {
    return (
      <div className='container'>
        <div className='alert alert-info' style={{ textAlign: 'center' }}>
          <h1>Page Not Found</h1>
          <p>If you continue to see this page, please email info@alliancegenome.org.</p>
        </div>
        <img src={notFoundImg} style={{ display: 'block', maxWidth: '45rem', margin: '0 auto', padding: '3rem 0' }} />
      </div>
    );
  }
}

export default NotFound;
