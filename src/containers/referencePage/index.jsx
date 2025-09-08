import React from 'react';
import NotFound from '../../components/notFound.jsx';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import Subsection from '../../components/subsection.jsx';
import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import PageNavEntity from '../../components/dataPage/PageNavEntity.jsx';
import ExternalLink from '../../components/ExternalLink.jsx';
import { CollapsibleList } from '../../components/collapsibleList';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import ReferenceSummary from './ReferenceSummary.jsx';
import { useParams } from 'react-router-dom';

const MODS = 'Mods';
const CITATION = 'Citation';
const SUMMARY = 'Summary';
const ABSTRACT = 'Abstract';
const SECTIONS = [{ name: SUMMARY }, { name: ABSTRACT }];
const SourceList = ({ sources }) => {
  return (
    sources && (
      <div style={{ textIndent: 5 }}>
        <CollapsibleList>
          {sources.map((ref) => {
            return (
              <ExternalLink href={ref.url} key={ref.curie} className="text-success" title={ref.curie}>
                {ref.curie}
              </ExternalLink>
            );
          })}
        </CollapsibleList>
      </div>
    )
  );
};

const ReferencePage = () => {
  const { id: referenceId } = useParams();
  const { data, isLoading, isError } = usePageLoadingQuery(`/api/literature/${referenceId}`);

  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return null; // the main page loading bar is sufficient
  }

  const ref = data.literatureSummary;
  const modMap = {
    FB: 'flybase',
    MGI: 'mgd',
    RGI: 'rgd',
    SGD: 'sgd',
    WB: 'wormbase',
    Xenbase: 'xenbase',
    ZFIN: 'zfin',
  };
  /*const ref = {
    curie: 'AGRKB:101000000633872',
    title: 'The ClC-K2 Chloride Channel Is Critical for Salt Handling in the Distal Nephron',
    authors: [
      { name: 'J Christopher Hennings' },
      { name: 'Olga Andrini' },
      { name: 'Nicolas Picard' },
      { name: 'Marc Paulais' },
      { name: 'Antje K Huebner' },
      { name: 'Irma Karen Lopez Cayuqueo' },
      { name: 'Yohan Bignon' },
      { name: 'Mathilde Keck' },
      { name: 'Nicolas Cornière' },
      { name: 'David Böhm' },
      { name: 'Thomas J Jentsch' },
      { name: 'Régine Chambrey' },
      { name: 'Jacques Teulon' },
      { name: 'Christian A Hübner' },
      { name: 'Dominique Eladari' },
    ],
    category: 'Research_Article',
    citation: 'Hennings et al (2017) J Am Soc Nephrol 28(1):209-217',
    abstract:
      'Chloride transport by the renal tubule is critical for blood pressure (BP), acid-base, and potassium homeostasis. Chloride uptake from the urinary fluid is mediated by various apical transporters, whereas basolateral chloride exit is thought to be mediated by ClC-Ka/K1 and ClC-Kb/K2, two chloride channels from the ClC family, or by KCl cotransporters from the SLC12 gene family. Nevertheless, the localization and role of ClC-K channels is not fully resolved. Because inactivating mutations in ClC-Kb/K2 cause Bartter syndrome, a disease that mimics the effects of the loop diuretic furosemide, ClC-Kb/K2 is assumed to have a critical role in salt handling by the thick ascending limb. To dissect the role of this channel in detail, we generated a mouse model with a targeted disruption of the murine ortholog ClC-K2. Mutant mice developed a Bartter syndrome phenotype, characterized by renal salt loss, marked hypokalemia, and metabolic alkalosis. Patch-clamp analysis of tubules isolated from knockout (KO) mice suggested that ClC-K2 is the main basolateral chloride channel in the thick ascending limb and in the aldosterone-sensitive distal nephron. Accordingly, ClC-K2 KO mice did not exhibit the natriuretic response to furosemide and exhibited a severely blunted response to thiazide. We conclude that ClC-Kb/K2 is critical for salt absorption not only by the thick ascending limb, but also by the distal convoluted tubule.',
    cross_references: [
      { curie: 'PMCID:PMC5198284', is_obsolete: 'false' },
      { curie: 'PMID:27335120', is_obsolete: 'false' },
      { curie: 'DOI:10.1681/ASN.2016010085', is_obsolete: 'false' },
    ],
    publisher: 'J Am Soc Nephrol',
    date_published: '2017-01-13',
    issue_name: '1',
    volume: '28',
    page_range: '209-217',
    // fields below are not present in ES (cerebro) return payload
    // crossRefs: { PMID: '27335120', PMCID: 'PMC5198284', DOI: '10.1681/ASN.2016010085', etc: '' },
    // modRefs: { flybase: '', mgd: 'MGI:6200350', rgd: '', sgd: '', wormbase: '', xenbase: '', zfin: '' },
    modRefs: { mgd: 'MGI:6200350', rgd: '' },
    // shortCitation: 'Hennings et al (2017) J Am Soc Nephrol 28(1):209-217',
    // longCitation: '',
  };*/
  //  ref.crossRefs = ref.cross_references.map((xrefObj) => xrefObj.curie);

  // separate xrefs into mod xrefs and external xrefs here, and attach them to ref object
  ref.modXrefs = [];
  ref.extXrefs = [];
  const prefs = ref.cross_references.map((xref) => xref.curie.substring(0, xref.curie.indexOf(':')));
  for (let xr = 0; xr < ref.cross_references.length; xr++) {
    if (modMap[ref.cross_references[xr].curie.substring(0, ref.cross_references[xr].curie.indexOf(':'))])
      ref.modXrefs.push(ref.cross_references[xr]);
    else ref.extXrefs.push(ref.cross_references[xr]);
  }

  const ModIcons = ({ xrefs, size }) => {
    const wth = size || 40;
    const prefs = xrefs.map((xref) => xref.curie.substring(0, xref.curie.indexOf(':')));
    let mods = [];
    for (let i = 0; i < prefs.length; i++) {
      if (modMap[prefs[i]]) mods.push(modMap[prefs[i]]);
    }
    return (
      <div style={{ textIndent: wth / 2 }}>
        {mods.map((mid) => (
          <img
            width={wth}
            src={`/src/assets/images/alliance_logo_${mid}.png`}
            style={{ marginTop: -wth / 4 }}
            key={`${mid}-icon`}
          />
        ))}
      </div>
    );
  };
  // SpeciesIcon component does something similar, but won't stack.  Consider adding to it.

  return (
    <DataPage>
      <HeadMetaTags title={ref.title} />
      <PageNav sections={SECTIONS}>
        <PageNavEntity>
          <ModIcons xrefs={ref.modXrefs} size="48" />
        </PageNavEntity>
        <PageNavEntity entityName={ref.citation}>
          <SourceList sources={ref.modXrefs} />
        </PageNavEntity>
      </PageNav>

      <PageData>
        <PageCategoryLabel category="reference" />
        <PageHeader>{ref.curie}</PageHeader>

        <Subsection hideTitle title={SUMMARY}>
          {<ReferenceSummary ref={ref} />}
        </Subsection>

        <Subsection title={ABSTRACT}>{ref.abstract}</Subsection>
      </PageData>
    </DataPage>
  );
};

export default ReferencePage;
