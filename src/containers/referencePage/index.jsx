import React from 'react';
import { useQueries } from '@tanstack/react-query';
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
import fetchData from '../../lib/fetchData';
import ReferenceSummary from './ReferenceSummary.jsx';
import ApplySpeciesNameFormat from './SpeciesFinderFormatter.jsx';
import ReferenceGeneTable from './tables/ReferenceGeneTable.jsx';
import ReferenceAlleleTable from './tables/ReferenceAlleleTable.jsx';
import ReferenceTransgenicAlleleTable from './tables/ReferenceTransgenicAlleleTable.jsx';
import ReferenceModelTable from './tables/ReferenceModelTable.jsx';
import { useParams } from 'react-router-dom';
import { buildUrlFromTemplate } from '../../lib/utils.js';
import styles from './style.module.scss';

const SUMMARY = 'Summary';
const ABSTRACT = 'Abstract';
const GENES = 'Genes';
const ALLELES_AND_VARIANTS = 'Alleles/Variants';
const TRANSGENIC_ALLELES = 'Transgenic Alleles';
const MODELS = 'Models';
const totalUrl = (base) => {
  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}limit=0`;
};

function useSectionCounts(referenceId) {
  const countable = [
    { name: GENES, url: `/api/reference/${referenceId}/genes` },
    { name: ALLELES_AND_VARIANTS, url: `/api/reference/${referenceId}/alleles` },
    { name: TRANSGENIC_ALLELES, url: `/api/reference/${referenceId}/transgenic-alleles` },
    { name: MODELS, url: `/api/reference/${referenceId}/models` },
  ];
  const queries = useQueries({
    queries: countable.map((s) => ({
      queryKey: ['ref-section-count', referenceId, s.name, s.url],
      queryFn: () => fetchData(totalUrl(s.url)).then((d) => d?.total ?? 0),
      staleTime: 60_000,
    })),
  });
  return Object.fromEntries(countable.map((s, i) => [s.name, queries[i].data]));
}

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
              <ExternalLink href={buildUrlFromTemplate(ref)} key={ref.curie} title={ref.curie}>
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

  // Skip firing section-count queries while the four Reference-array tables
  // are hidden. Restore this call when the tables come back.
  const counts = {};
  // const counts = useSectionCounts(referenceId);

  if (isError) {
    return <NotFound />;
  }
  if (isLoading || !data) {
    return null;
  }
  const ref = data.literatureSummary;

  // separate xrefs into mod xrefs and external xrefs here, and attach them to ref object.
  // cross_references may be missing entirely (e.g. internal_process_reference), so default to [].
  ref.modXrefs = [];
  ref.extXrefs = [];
  for (const entry of ref.cross_references || []) {
    if (!entry.curie) continue;
    const prefix = entry.curie.substring(0, entry.curie.indexOf(':'));
    (speciesMap[prefix] ? ref.modXrefs : ref.extXrefs).push(entry);
  }
  const sections = [
    { name: SUMMARY },
    { name: ABSTRACT },
    // Hidden on stage until the four Reference-array tables are ready. Restore
    // these entries in the same order to re-enable the PageNav links + badges.
    // { name: GENES, count: counts[GENES] },
    // { name: ALLELES_AND_VARIANTS, count: counts[ALLELES_AND_VARIANTS] },
    // { name: TRANSGENIC_ALLELES, count: counts[TRANSGENIC_ALLELES] },
    // { name: MODELS, count: counts[MODELS] },
  ];

  const FormattedAbstract = ({ abstract }) => {
    if (!abstract) return <NoData>Not Available</NoData>;
    if (abstract === null) return <NoData>Not Available</NoData>;
    return <ApplySpeciesNameFormat text={abstract} />;
    // return abstract;
  };

  return (
    <DataPage>
      <HeadMetaTags title={ref.title} />

      <PageNav sections={sections}>
        <PageNavEntity>
          <ModSprites xrefs={ref.modXrefs} size="48" />
        </PageNavEntity>
        <div>
          <PageNavEntity entityName={ref.short_citation || ref.citation}>
            <SourceList sources={ref.modXrefs} />
            {/* AGRKB ID sits below the MOD IDs, outside the collapsible list so it is always visible */}
            {ref.curie && <div style={{ textIndent: 8, marginTop: 6 }}>{ref.curie}</div>}
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
        {/* Hidden on stage until the four Reference-array tables are ready.
            Restore the four sections below (and their sections array entries
            above) to bring them back on the page.
        <Subsection title={GENES}>
          <ReferenceGeneTable id={referenceId} />
        </Subsection>
        <Subsection title={ALLELES_AND_VARIANTS}>
          <ReferenceAlleleTable id={referenceId} />
        </Subsection>
        <Subsection title={TRANSGENIC_ALLELES}>
          <ReferenceTransgenicAlleleTable id={referenceId} />
        </Subsection>
        <Subsection title={MODELS}>
          <ReferenceModelTable id={referenceId} />
        </Subsection>
        */}
      </PageData>
    </DataPage>
  );
};

export default ReferencePage;
