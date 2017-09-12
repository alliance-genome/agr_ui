import React, { Component } from 'react';


class NotFound extends Component {
  render() {
    return (
      <div className='container'>
        <div className='alert alert-info' style={{ textAlign: 'center' }}>
          <h1>Page Not Found</h1>
          <p>If you continue to see this page, please email info@alliancegenome.org.</p>
        </div>
      </div>
    );
  }
}

export default NotFound;
