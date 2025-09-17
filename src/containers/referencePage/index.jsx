import React from 'react';
import NotFound from '../../components/notFound.jsx';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import SpeciesIcon from '../../components/speciesIcon/index.jsx';
import Subsection from '../../components/subsection.jsx';
import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import PageNavEntity from '../../components/dataPage/PageNavEntity.jsx';
import ExternalLink from '../../components/ExternalLink.jsx';
import { CollapsibleList } from '../../components/collapsibleList';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import ApplySpeciesNameFormat from './SpeciesFinderFormatter.jsx';
import ReferenceSummary from './ReferenceSummary.jsx';
import { useParams } from 'react-router-dom';
import { getSingleReferenceUrl } from '../../components/dataTable/utils.jsx';
import styles from './style.module.scss';
import SpeciesName from '../../components/SpeciesName.jsx';

// const MODS = 'Mods';
const CITATION = 'Citation';
const SUMMARY = 'Summary';
const ABSTRACT = 'Abstract';
const SECTIONS = [{ name: SUMMARY }, { name: ABSTRACT }];

const modMap = {
  FB: 'flybase',
  MGI: 'mgd',
  RGI: 'rgd',
  SGD: 'sgd',
  WB: 'wormbase',
  Xenbase: 'xenbase',
  ZFIN: 'zfin',
};
const speciesMap = {
  FB: 'Drosophila melanogaster',
  MGI: 'Mus musculus',
  RGI: 'Rattus norvegicus',
  SGD: 'Saccharomyces cerevisiae',
  WB: 'Caenorhabditis elegans',
  Xenbase: 'Xenopus tropicalis',
  ZFIN: 'Danio rerio',
};

const SourceList = ({ sources }) => {
  return (
    sources && (
      <div style={{ textIndent: 8 }}>
        <CollapsibleList>
          {sources.map((ref) => {
            return (
              <ExternalLink href={getSingleReferenceUrl(ref.curie).url} key={ref.curie} className="" title={ref.curie}>
                {ref.curie}
              </ExternalLink>
            );
          })}
        </CollapsibleList>
      </div>
    )
  );
};

const ModSprites = ({ xrefs, size }) => {
  const wth = size || 48;
  const scale = wth / 78; // magic number 78 relates "size" to the mysterious species icon "scale"
  const prefs = xrefs.map((xref) => xref.curie.substring(0, xref.curie.indexOf(':')));
  let mods = [];
  for (let i = 0; i < prefs.length; i++) {
    if (speciesMap[prefs[i]]) mods.push(speciesMap[prefs[i]]);
  }
  return (
    <div style={{ textIndent: wth / 2 }} className={styles.speciesSprites}>
      {/* <SpeciesIcon scale={scale} species={'Homo sapiens'} key="Hsap-sprite" /> */}
      {mods.map((mid) => (
        <SpeciesIcon scale={scale} species={mid} key={`${mid}-sprite`} iconClass="speciesSprite" />
      ))}
      {/* <SpeciesIcon scale={scale} species={'Danio rerio'} key="Drer-sprite" /> */}
      {/* <SpeciesIcon scale={scale} species={'Saccharomyces cerevisiae'} key="Drer-sprite" /> */}
      {/* <SpeciesIcon scale={scale} species={'Rattus norvegicus'} key="Drer-sprite" /> */}
      {/* <SpeciesIcon scale={scale} species={'Drosophila melanogaster'} key="Drer-sprite" /> */}
    </div>
  );
};

const ReferencePage = () => {
  const { id: referenceId } = useParams();
  // const { data, isLoading, isError } = usePageLoadingQuery(`/api/reference/${referenceId}`);
  const { data, isLoading, isError } = usePageLoadingQuery(
    `https://literature-rest.alliancegenome.org/reference/${referenceId}`
  );
  // const ref = data.literatureSummary;
  const ref = data;
  if (isError) {
    return <NotFound />;
  }
  if (isLoading) {
    return null;
  }

  // separate xrefs into mod xrefs and external xrefs here, and attach them to ref object
  ref.modXrefs = [];
  ref.extXrefs = [];
  const prefs = ref.cross_references.map((xref) => xref.curie.substring(0, xref.curie.indexOf(':')));
  for (let xr = 0; xr < ref.cross_references.length; xr++) {
    if (speciesMap[ref.cross_references[xr].curie.substring(0, ref.cross_references[xr].curie.indexOf(':'))])
      ref.modXrefs.push(ref.cross_references[xr]);
    else ref.extXrefs.push(ref.cross_references[xr]);
  }
  // console.log(ref.modXrefs);

  return (
    <DataPage>
      <HeadMetaTags title={ref.title} />

      <PageNav sections={SECTIONS}>
        <PageNavEntity>
          <ModSprites xrefs={ref.modXrefs} size="48" />
        </PageNavEntity>
        <PageNavEntity entityName={ref.citation_short}>
          <SourceList sources={ref.modXrefs} />
        </PageNavEntity>
      </PageNav>

      <PageData>
        <PageCategoryLabel category="reference" />
        <PageHeader>
          <ApplySpeciesNameFormat text={ref.title} />
        </PageHeader>
        <Subsection hideTitle title={SUMMARY}>
          <ReferenceSummary ref={ref} />
        </Subsection>
        <Subsection title={ABSTRACT}>
          <ApplySpeciesNameFormat text={ref.abstract} />
        </Subsection>
      </PageData>
    </DataPage>
  );
};

export default ReferencePage;
