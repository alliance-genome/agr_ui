import React from 'react';
import NotFound from '../../components/notFound.jsx';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import SpeciesIcon from '../../components/speciesIcon/index.jsx';
import Subsection from '../../components/subsection.jsx';
import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import PageNavEntity from '../../components/dataPage/PageNavEntity.jsx';
import ExternalLink from '../../components/ExternalLink.jsx';
import { CollapsibleList } from '../../components/collapsibleList';
import NoData from '../../components/noData.jsx';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import ReferenceSummary from './ReferenceSummary.jsx';
import ApplySpeciesNameFormat from './SpeciesFinderFormatter.jsx';
import { useParams } from 'react-router-dom';
import { getSingleReferenceUrl } from '../../components/dataTable/utils.jsx';
import styles from './style.module.scss';

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
export const speciesMap = {
  FB: 'Drosophila melanogaster',
  Hsap: 'Homo sapiens',
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
      <div style={{ textIndent: 8, marginTop: 6 }}>
        <CollapsibleList collapsedSize={3}>
          {sources.map((ref) => {
            return (
              <ExternalLink href={getSingleReferenceUrl(ref.curie).url} key={ref.curie} title={ref.curie}>
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
  if (xrefs.length === 0)
    return (
      <div style={{ textIndent: wth / 2 }} className={styles.speciesSprites}>
        <SpeciesIcon scale={scale} species={'Homo sapiens'} key="Hsap-sprite" />
      </div>
    );
  return (
    <div style={{ textIndent: wth / 2 }} className={styles.speciesSprites}>
      {mods.map((mid) => (
        <SpeciesIcon scale={scale} species={mid} key={`${mid}-sprite`} />
      ))}
    </div>
  );
};

const ReferencePage = () => {
  const { id: referenceId } = useParams();
  const { data, isLoading, isError } = usePageLoadingQuery(`/api/reference/${referenceId}`);
  // const { data, isLoading, isError } = usePageLoadingQuery(    `https://literature-rest.alliancegenome.org/reference/${referenceId}`  );
  if (isError) {
    return <NotFound />;
  }
  if (isLoading) {
    return null;
  }
  const ref = data.literatureSummary;
  // const ref = data;

  // separate xrefs into mod xrefs and external xrefs here, and attach them to ref object
  ref.modXrefs = [];
  ref.extXrefs = [];
  for (let xr = 0; xr < ref.cross_references.length; xr++) {
    if (speciesMap[ref.cross_references[xr].curie.substring(0, ref.cross_references[xr].curie.indexOf(':'))])
      ref.modXrefs.push(ref.cross_references[xr]);
    else ref.extXrefs.push(ref.cross_references[xr]);
  }
  // console.log(ref.modXrefs);

  const FormattedAbstract = ({ abstract }) => {
    if (!abstract) return <NoData>Not Available</NoData>;
    if (abstract === null) return <NoData>Not Available</NoData>;
    return <ApplySpeciesNameFormat text={abstract} />;
    // return abstract;
  };

  return (
    <DataPage>
      <HeadMetaTags title={ref.title} />

      <PageNav sections={SECTIONS}>
        <PageNavEntity>
          <ModSprites xrefs={ref.modXrefs} size="48" />
        </PageNavEntity>
        <div>
          <PageNavEntity entityName={ref.short_citation || ref.citation}>
            <SourceList sources={ref.modXrefs} />
          </PageNavEntity>
        </div>
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
          <FormattedAbstract abstract={ref.abstract} />
        </Subsection>
      </PageData>
    </DataPage>
  );
};

export default ReferencePage;
