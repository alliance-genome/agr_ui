import React from 'react';
import style from './style.scss';

const Resources = ({htmlContent, sectionStyle}) => {
  return (
    <div>
      <div className={`container ${style.containerExtra}`}>
        <div className={`${style.section} ${sectionStyle}`}>
        <h2 className={style.sectionTitle}>Resources</h2>
          <div className={style.resourceDiv} dangerouslySetInnerHTML={{__html: htmlContent }} />
        </div>
      </div>
    </div>
  );
}

export default Resources;
