import React from 'react';
import style from './style.scss';

const Resources = ({htmlContent}) => {
  return (
    <div>
      <div className='container'>
        <div className={style.section}>
        <h2 className={style.sectionTitle}>Resources</h2>
          <div dangerouslySetInnerHTML={{__html: htmlContent }} />
        </div>
      </div>
    </div>
  );
}

export default Resources;
