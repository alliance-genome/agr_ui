import React, { Component } from 'react';

import style from './style.scss';
import { SMALL_COL_CLASS, LARGE_COL_CLASS } from '../constants';

class LoadingPage extends Component {
  render() {
    return (
      <div className={`row ${style.fadeInAndOut}`}>
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
