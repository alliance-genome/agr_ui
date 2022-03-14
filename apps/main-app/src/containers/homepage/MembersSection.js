import React from 'react';
import {Link} from 'react-router-dom';
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
          <div className={style.member} >
            <Link to='/members/flybase'>
              <img src={flybaseLogo}/>
              FlyBase
            </Link>
          </div>
          <div className={style.member} >
            <Link to='/members/mgd'>
              <img src={mgdLogo} />
              MGD
            </Link>
          </div>
          <div className={style.member} >
            <Link to='/members/rgd'>
              <img src={rgdLogo} />
              RGD
            </Link>
          </div>
          <div className={style.member} >
            <Link to='/members/sgd'>
              <img src={sgdLogo} />
              SGD
            </Link>
          </div>
          <div className={style.member} >
            <Link to='/members/wormbase'>
              <img src={wormbaseLogo} />
              WormBase
            </Link>
          </div>
          <div className={style.member} >
            <Link to='/members/zfin'>
              <img src={zfinLogo} />
              ZFIN
            </Link>
          </div>
          <div className={style.member} >
            <Link to='/members/goc'>
              <img src={gocLogo} />
              GOC
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
