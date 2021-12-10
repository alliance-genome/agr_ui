import React from 'react';

import style from './style.scss';

const MembersSection = () => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <h1>Members</h1>
        <div className='d-flex flex-wrap'>
          <a className={style.member} href='/members/fb'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_flybase.png' />
            FlyBase
          </a>
          {/* sic - WordPress has MGI/RGD pictures switched; the "logo_rgd.png" is a mouse. */}
          <a className={style.member} href='/members/mgi'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_rgd.png' />
            MGD
          </a>
          <a className={style.member} href='/members/rgd'>
          {/* sic - WordPress has MGI/RGD pictures switched; the "logo_mgd.png" is a rat. */}
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_mgd.png' />
            RGD
          </a>
          <a className={style.member} href='/members/sgd'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_sgd.png' />
            SGD
          </a>
          <a className={style.member} href='/members/wb'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_wormbase.png' />
            WormBase
          </a>
          <a className={style.member} href='/members/zfin'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_zfin.png' />
            ZFIN
          </a>
          <a className={style.member} href='/members/goc'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_goc.png' />
            GOC
          </a>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
