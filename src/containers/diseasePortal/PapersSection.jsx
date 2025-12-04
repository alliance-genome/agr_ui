import React from 'react';
import NotFound from '../../components/notFound.jsx';
import ExternalLink from '../../components/ExternalLink.jsx';
import SpeciesIcon from '../../components/speciesIcon/index.jsx';
import { speciesMap } from '../referencePage/index.jsx';
import style from './style.module.scss';
import { Link } from 'react-router-dom';
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

    ref.modXrefs = [];
    ref.extXrefs = [];
    for (let xr = 0; xr < ref.cross_references.length; xr++) {
      if (speciesMap[ref.cross_references[xr].curie.substring(0, ref.cross_references[xr].curie.indexOf(':'))])
        ref.modXrefs.push(ref.cross_references[xr]);
      else ref.extXrefs.push(ref.cross_references[xr]);
    }

    const scale = 6 / 13;
    const prefs = ref.modXrefs.map((xref) => xref.curie.substring(0, xref.curie.indexOf(':')));
    let mods = [];
    for (let i = 0; i < prefs.length; i++) {
      if (speciesMap[prefs[i]]) mods.push(speciesMap[prefs[i]]);
    }
    if (prefs.length === 0) mods.push('Homo sapiens');

    return (
      <>
        {mods.map((mid) => (
          <div style={{ float: 'left', lineHeight: 0.9, paddingRight: 8 }} key={`${mid}-sprite`}>
            <SpeciesIcon scale={scale} species={mid} />
          </div>
        ))}
        <Link to={`/reference/${curie}`} dangerouslySetInnerHTML={{ __html: ref.citation }} />
      </>
    );
  }
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
