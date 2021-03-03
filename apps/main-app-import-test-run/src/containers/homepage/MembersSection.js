import React from 'react';

import style from './style.scss';

const MembersSection = () => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <h1>Members</h1>
        <div className='d-flex flex-wrap'>
          <a className={style.member} href='https://flybase.org/'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_flybase.png' />
            FlyBase
          </a>
          <a className={style.member} href='http://www.informatics.jax.org/'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_rgd.png' />
            MGD
          </a>
          <a className={style.member} href='https://rgd.mcw.edu/'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_mgd.png' />
            RGD
          </a>
          <a className={style.member} href='https://www.yeastgenome.org/'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_sgd.png' />
            SGD
          </a>
          <a className={style.member} href='https://www.wormbase.org/'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_wormbase.png' />
            WormBase
          </a>
          <a className={style.member} href='https://zfin.org/'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_zfin.png' />
            ZFIN
          </a>
          <a className={style.member} href='http://www.geneontology.org/'>
            <img src='https://alliancegenome.files.wordpress.com/2016/11/logo_goc.png' />
            GOC
          </a>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
