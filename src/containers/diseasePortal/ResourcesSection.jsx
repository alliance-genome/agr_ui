import React from 'react';
import style from './style.module.scss';
import ExternalLink from '../../components/ExternalLink.jsx';

const ResourcesSection = ({ disease }) => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <div className="row">
          <div className="col-lg-12">
            <h2>Community Resources</h2>
            <div>
              {disease.resources.map((resourceLink, index) => {
                return (
                  <div key={'resources-' + index}>
                    <ExternalLink href={resourceLink.url}>{resourceLink.title}</ExternalLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
