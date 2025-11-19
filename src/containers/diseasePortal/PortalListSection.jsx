import React from 'react';
import style from './style.module.scss';
import { Link } from 'react-router-dom';
import { data } from './portalData.js';

const PortalListSection = () => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <div className="row">
          <div className={`col-lg-12 ${style.portalList}`}>
            <h2>Disease Portals</h2>
            <ul style={{ fontSize: '1.2rem' }}>
              <li>Disease of metabolism</li>
              <li style={{ listStyleType: 'none' }}>
                <ul>
                  <li>
                    <Link to={'/disease-portal/diabetes-mellitus'}>diabetes mellitus</Link>
                  </li>
                </ul>
              </li>
              <li>Neurodegenerative disease</li>
              <li style={{ listStyleType: 'none' }}>
                <ul>
                  <li>
                    <Link to={'/disease-portal/alzheimers-disease'}>Alzheimer's disease</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalListSection;
