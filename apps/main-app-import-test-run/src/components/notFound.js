import React, { Component } from 'react';
import { HELP_EMAIL } from '../constants';

import notFoundImg from './notFound.png';

class NotFound extends Component {
  render() {
    return (
      <div className='container'>
        <div className='alert alert-info' style={{ margin: '0 auto', maxWidth: '45rem', textAlign: 'center' }}>
          <h1>Page Not Found</h1>
          <p>
            If you continue to see this page, please email <a href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</a>.
          </p>
        </div>
        <img src={notFoundImg} style={{ display: 'block', maxWidth: '45rem', margin: '0 auto', padding: '3rem 0' }} />
      </div>
    );
  }
}

export default NotFound;
