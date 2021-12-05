import React from 'react';
import style from './style.scss';

const Resources = ({htmlContent}) => {
  return (
    <div>
      <div className='container'>
        <h2 className={style.sectionTitle}>Resources</h2>
        <div className={style.section}>
          <div dangerouslySetInnerHTML={{__html: htmlContent }} />
        </div>
      </div>
    </div>
  );
}

export default Resources;
