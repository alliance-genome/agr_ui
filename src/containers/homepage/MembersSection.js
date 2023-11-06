import React from 'react';
import { Link } from 'react-router-dom';
import flybaseLogo from '../../assets/images/alliance_logo_flybase.png';
import mgdLogo from '../../assets/images/alliance_logo_mgd.png';
import rgdLogo from '../../assets/images/alliance_logo_rgd.png';
import sgdLogo from '../../assets/images/alliance_logo_sgd.png';
import wormbaseLogo from '../../assets/images/alliance_logo_wormbase.png';
import zfinLogo from '../../assets/images/alliance_logo_zfin.png';
import xenbaseLogo from '../../assets/images/alliance_logo_xenbase.png';
import gocLogo from '../../assets/images/alliance_logo_goc.png';

import style from './style.module.scss';

const MembersSection = () => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <h1>Members</h1>
        <div className='d-flex flex-wrap'>
          <div className={style.member} >
            <Link to='/members/flybase'>
              <img alt="" src={flybaseLogo}/>
              FlyBase
            </Link>
          </div>
          <div className={style.member} >
            <Link to='/members/mgd'>
              <img alt="" src={mgdLogo} />
              MGD
            </Link>
          </div>
          <div className={style.member} >
            <Link to='/members/rgd'>
              <img alt="" src={rgdLogo} />
              RGD
            </Link>
          </div>
          <div className={style.member} >
            <Link to='/members/sgd'>
              <img alt="" src={sgdLogo} />
              SGD
            </Link>
          </div>
          <div className={style.member} >
            <Link to='/members/wormbase'>
              <img alt="" src={wormbaseLogo} />
              WormBase
            </Link>
          </div>
          <div className={style.member} >
            <a href='https://www.xenbase.org/entry/'>
              <img alt="" src={xenbaseLogo} />
              Xenbase
            </a>
          </div>
          <div className={style.member} >
            <Link to='/members/zfin'>
              <img alt="" src={zfinLogo} />
              ZFIN
            </Link>
          </div>
          <div className={style.member} >
            <Link to='/members/goc'>
              <img alt="" src={gocLogo} />
              GOC
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
