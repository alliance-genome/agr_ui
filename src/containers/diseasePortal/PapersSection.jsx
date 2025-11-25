import React from 'react';
import NotFound from '../../components/notFound.jsx';
import style from './style.module.scss';
import { Link } from 'react-router-dom';
import ExternalLink from '../../components/ExternalLink.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';

const CitationLink = ({ curie }) => {
  const { data: pubData, isLoading, isError } = usePageLoadingQuery(`/api/reference/${curie}`);
  if (isError) {
    return <NotFound />;
  }
  if (isLoading) {
    return null;
  }

  if (pubData) {
    const ref = pubData.literatureSummary;
    return <Link to={`/reference/${curie}`}>{ref.short_citation}</Link>;
  }

  console.log(`what happened to ${curie}?`);
};

const PapersSection = ({ disease }) => {
  return (
    <section className={style.section}>
      <div className={style.contentContainer}>
        <div className="row">
          <div className="col-lg-12">
            <h2>Recent Papers</h2>
            <div>
              {disease.publications.map((publication, index) => {
                if (publication.curie) {
                  return (
                    <p key={'publications-' + index}>
                      <CitationLink curie={publication.curie} />
                    </p>
                  );
                }
                if (publication.pmid) {
                  return (
                    <p key={'publications-' + index}>
                      <ExternalLink href={'https://www.ncbi.nlm.nih.gov/pubmed/' + publication.pmid}>
                        {publication.title}
                      </ExternalLink>
                    </p>
                  );
                }
                return <p key={'publications-' + index}>{publication.title}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PapersSection;
