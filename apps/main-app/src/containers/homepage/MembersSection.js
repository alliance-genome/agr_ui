import React from 'react';
import flybaseLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_flybase.png';
import mgdLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_mgd.png';
import rgdLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_rgd.png';
import sgdLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_sgd.png';
import wormbaseLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_wormbase.png';
import zfinLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_zfin.png';
import gocLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_goc.png';

import style from './style.scss';

const MembersSection = () => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <h1>Members</h1>
        <div className='d-flex flex-wrap'>
          <a className={style.member} href='/members/flybase'>
            <img src={flybaseLogo} />
            FlyBase
          </a>
          {/* sic - WordPress has MGD/RGD pictures switched; the "logo_rgd.png" is a mouse. */}
          <a className={style.member} href='/members/mgd'>
            <img src={mgdLogo} />
            MGD
          </a>
          <a className={style.member} href='/members/rgd'>
            <img src={rgdLogo} />
            RGD
          </a>
          <a className={style.member} href='/members/sgd'>
            <img src={sgdLogo} />
            SGD
          </a>
          <a className={style.member} href='/members/wormbase'>
           <img src={wormbaseLogo} />
            WormBase
          </a>
          <a className={style.member} href='/members/zfin'>
            <img src={zfinLogo} />
            ZFIN
          </a>
          <a className={style.member} href='/members/goc'>
            <img src={gocLogo} />
            GOC
          </a>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
