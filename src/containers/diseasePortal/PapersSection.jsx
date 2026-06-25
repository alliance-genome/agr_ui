import React from 'react';
import NotFound from '../../components/notFound.jsx';
import SpeciesIcon from '../../components/speciesIcon/index.jsx';
import { Link } from 'react-router-dom';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import style from './style.module.scss';

// Species shown for each MOD corpus. The authoritative source is the paper's
// `mods_in_corpus` (set by the curator pipeline), not cross-reference prefixes.
// Note: the RGD (rat) corpus is intentionally displayed as Human per the curator.
const MOD_SPECIES = {
  MGI: 'Mus musculus',
  RGD: 'Homo sapiens',
  XB: 'Xenopus tropicalis',
  ZFIN: 'Danio rerio',
  FB: 'Drosophila melanogaster',
  WB: 'Caenorhabditis elegans',
  SGD: 'Saccharomyces cerevisiae',
};

// Map a paper's corpus membership to the species icon(s) to render. `AGR` (the
// Alliance central corpus) has no species of its own, so it is ignored; if no
// MOD corpus maps, fall back to Homo sapiens.
const speciesForCorpus = (modsInCorpus = []) => {
  const species = modsInCorpus.map((mod) => MOD_SPECIES[mod]).filter(Boolean);
  return species.length ? species : ['Homo sapiens'];
};

const PaperEntry = ({ reference }) => {
  if (!reference || !reference.curie) {
    return null;
  }
  const scale = 6 / 13;
  const species = speciesForCorpus(reference.mods_in_corpus);
  return (
    <div className={style.publicationEntry}>
      {species.map((sp, i) => (
        // Overlap adjacent corpus icons by ~one border-width so their baked-in
        // borders read as a single shared edge (honeycomb), not a doubled one.
        // The gap before the citation is handled by the Link's left margin.
        <div style={{ lineHeight: 0.9, marginLeft: i === 0 ? 0 : -1 }} key={`${reference.curie}-${sp}`}>
          <SpeciesIcon scale={scale} species={sp} />
        </div>
      ))}
      <Link
        to={`/reference/${reference.curie}`}
        style={{ marginLeft: 8 }}
        dangerouslySetInnerHTML={{ __html: reference.citation }}
      />
    </div>
  );
};

// The endpoint matches the disease name as free text against title + abstract,
// requiring all tokens. A trailing "disease" token therefore excludes on-topic
// papers that don't repeat the word (e.g. "Alzheimer's disease" misses papers
// titled "...Implications for Alzheimer") and lets the common word "disease"
// pull in tangential papers. Drop a trailing "disease" word so the query anchors
// on the distinctive part of the name. See RECENT_PAPERS_API.md.
const normalizeDiseaseQuery = (name) => {
  if (!name) {
    return name;
  }
  const trimmed = name.replace(/\s+disease$/i, '').trim();
  return trimmed || name;
};

const PapersSection = ({ diseaseName }) => {
  const query = normalizeDiseaseQuery(diseaseName);
  const url = query
    ? `/api/reference/latest-literature-by-disease-per-mod?disease=${encodeURIComponent(query)}&latest=1`
    : null;
  const { data, isLoading, isError } = usePageLoadingQuery(url);

  if (!diseaseName || isLoading) {
    return null;
  }
  if (isError) {
    return <NotFound />;
  }

  const results = data?.results || [];
  if (results.length === 0) {
    return <div className={style.publicationEntry}>No recent Alliance papers found for this disease.</div>;
  }

  return (
    <div>
      {results.map((result, index) => (
        <PaperEntry key={result.literatureSummary?.curie || index} reference={result.literatureSummary} />
      ))}
    </div>
  );
};

export default PapersSection;
