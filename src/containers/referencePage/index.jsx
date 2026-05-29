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
import ReferenceDiseaseTable from './tables/ReferenceDiseaseTable.jsx';
import ReferencePhenotypeTable from './tables/ReferencePhenotypeTable.jsx';
import ReferenceExpressionTable from './tables/ReferenceExpressionTable.jsx';
import ReferenceInteractionTable from './tables/ReferenceInteractionTable.jsx';
import ReferenceGeneticInteractionTable from './tables/ReferenceGeneticInteractionTable.jsx';
import ReferenceOrthologyTable from './tables/ReferenceOrthologyTable.jsx';
import RelatedPapersList from './RelatedPapersList.jsx';
import ReferenceGeneTable from './tables/ReferenceGeneTable.jsx';
import ReferenceAlleleTable from './tables/ReferenceAlleleTable.jsx';
import ReferenceModelTable from './tables/ReferenceModelTable.jsx';
import { useParams } from 'react-router-dom';
import { getSingleReferenceUrl } from '../../components/dataTable/utils.jsx';
import styles from './style.module.scss';

// const MODS = 'Mods';
const CITATION = 'Citation';
const SUMMARY = 'Summary';
const ABSTRACT = 'Abstract';
const GENES = 'Genes';
const ALLELES_AND_VARIANTS = 'Alleles and Variants';
const MODELS = 'Models';
const DISEASE_ASSOCIATIONS = 'Disease Associations';
const PHENOTYPES = 'Phenotypes';
const EXPRESSION = 'Expression';
const MOLECULAR_INTERACTIONS = 'Molecular Interactions';
const GENETIC_INTERACTIONS = 'Genetic Interactions';
const ORTHOLOGY = 'Orthology';
const RELATED_PAPERS = 'Related Papers';
const totalUrl = (base) => {
  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}limit=0`;
};

function useSectionCounts(referenceId, crossReferenceCuries) {
  const xrefParam = crossReferenceCuries.length
    ? `?crossReferences=${encodeURIComponent(crossReferenceCuries.join(','))}`
    : '';
  const countable = [
    { name: GENES, url: `/api/reference/${referenceId}/genes` },
    { name: ORTHOLOGY, url: `/api/reference/${referenceId}/orthology` },
    { name: PHENOTYPES, url: `/api/reference/${referenceId}/phenotype-annotations` },
    { name: DISEASE_ASSOCIATIONS, url: `/api/reference/${referenceId}/disease-annotations` },
    { name: ALLELES_AND_VARIANTS, url: `/api/reference/${referenceId}/alleles` },
    { name: MODELS, url: `/api/reference/${referenceId}/models` },
    { name: EXPRESSION, url: `/api/reference/${referenceId}/expression-annotations${xrefParam}` },
    { name: MOLECULAR_INTERACTIONS, url: `/api/reference/${referenceId}/molecular-interactions${xrefParam}` },
    { name: GENETIC_INTERACTIONS, url: `/api/reference/${referenceId}/genetic-interactions${xrefParam}` },
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

  const crossReferenceCuries = React.useMemo(
    () => (data?.literatureSummary?.cross_references || []).map((x) => x.curie).filter(Boolean),
    [data]
  );
  const counts = useSectionCounts(referenceId, crossReferenceCuries);

  if (isError) {
    return <NotFound />;
  }
  if (isLoading || !data) {
    return null;
  }
  const ref = data.literatureSummary;

  // separate xrefs into mod xrefs and external xrefs here, and attach them to ref object
  ref.modXrefs = [];
  ref.extXrefs = [];
  for (let xr = 0; xr < ref.cross_references.length; xr++) {
    if (speciesMap[ref.cross_references[xr].curie.substring(0, ref.cross_references[xr].curie.indexOf(':'))])
      ref.modXrefs.push(ref.cross_references[xr]);
    else ref.extXrefs.push(ref.cross_references[xr]);
  }
  const sections = [
    { name: SUMMARY },
    { name: ABSTRACT },
    { name: GENES, count: counts[GENES] },
    { name: ORTHOLOGY, count: counts[ORTHOLOGY] },
    { name: PHENOTYPES, count: counts[PHENOTYPES] },
    { name: DISEASE_ASSOCIATIONS, count: counts[DISEASE_ASSOCIATIONS] },
    { name: ALLELES_AND_VARIANTS, count: counts[ALLELES_AND_VARIANTS] },
    { name: MODELS, count: counts[MODELS] },
    { name: EXPRESSION, count: counts[EXPRESSION] },
    { name: MOLECULAR_INTERACTIONS, count: counts[MOLECULAR_INTERACTIONS] },
    { name: GENETIC_INTERACTIONS, count: counts[GENETIC_INTERACTIONS] },
    { name: RELATED_PAPERS },
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
        <Subsection title={GENES}>
          <ReferenceGeneTable id={referenceId} />
        </Subsection>
        <Subsection title={ORTHOLOGY}>
          <ReferenceOrthologyTable id={referenceId} />
        </Subsection>
        <Subsection title={PHENOTYPES}>
          <ReferencePhenotypeTable id={referenceId} />
        </Subsection>
        <Subsection title={DISEASE_ASSOCIATIONS}>
          <ReferenceDiseaseTable id={referenceId} />
        </Subsection>
        <Subsection title={ALLELES_AND_VARIANTS}>
          <ReferenceAlleleTable id={referenceId} />
        </Subsection>
        <Subsection title={MODELS}>
          <ReferenceModelTable id={referenceId} />
        </Subsection>
        <Subsection title={EXPRESSION}>
          <ReferenceExpressionTable id={referenceId} crossReferences={crossReferenceCuries} />
        </Subsection>
        <Subsection title={MOLECULAR_INTERACTIONS}>
          <ReferenceInteractionTable id={referenceId} crossReferences={crossReferenceCuries} />
        </Subsection>
        <Subsection title={GENETIC_INTERACTIONS}>
          <ReferenceGeneticInteractionTable id={referenceId} crossReferences={crossReferenceCuries} />
        </Subsection>
        <Subsection title={RELATED_PAPERS}>
          <RelatedPapersList referenceId={referenceId} />
        </Subsection>
      </PageData>
    </DataPage>
  );
};

export default ReferencePage;
