import React, { Component } from 'react';

import style from './style.css';
import { SMALL_COL_CLASS, LARGE_COL_CLASS } from '../constants';

class LoadingPage extends Component {
  render() {
    return (
      <div className='row'>
        <div className={SMALL_COL_CLASS}>
          <div className={style.loadingText} />
          <div className={style.loadingText} />
        </div>
        <div className={LARGE_COL_CLASS}>
          <div className={`${style.loadingText} ${style.loadingHeader}`} />
          <div className={style.loadingText} />
          <div className={style.loadingText} />
          <div className={style.loadingText} />
        </div>
      </div>
    );
  }
}

export default LoadingPage;
