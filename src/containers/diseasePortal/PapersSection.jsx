import React from 'react';
import style from './style.module.scss';
import { Link } from 'react-router-dom';
import ExternalLink from '../../components/ExternalLink.jsx';
import { data } from './portalData.js';

const PapersSection = ({ disease }) => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <div className="row">
          <div className="col-lg-12">
            <h2>Recent Papers</h2>
            <div>
              {disease.publications.map((publication, index) => {
                if (publication.curie)
                  return (
                    <p key={'publications-' + index}>
                      <Link to={`/reference/${publication.curie}`}>{publication.title}</Link>
                    </p>
                  );
                else if (publication.pmid)
                  return (
                    <p key={'publications-' + index}>
                      <ExternalLink href={'https://www.ncbi.nlm.nih.gov/pubmed/' + publication.pmid}>
                        {publication.title}
                      </ExternalLink>
                    </p>
                  );
                else return <p key={'publications-' + index}>{publication.title}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PapersSection;
