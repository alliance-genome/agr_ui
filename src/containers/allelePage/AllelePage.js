import PropTypes from 'prop-types';

import {
  DataPage,
  PageData,
  PageHeader,
  PageNav
} from '../../components/dataPage';
import HeadMetaTags from '../../components/headMetaTags';
import Subsection from '../../components/subsection';
import NotFound from '../../components/notFound';
import ErrorBoundary from '../../components/errorBoundary';
import AlleleSummary from './AlleleSummary';
import AlleleSymbol from './AlleleSymbol';
import SpeciesIcon from '../../components/speciesIcon';
import PageNavEntity from '../../components/dataPage/PageNavEntity';
import DataSourceLink from '../../components/dataSourceLink';
import {Link} from 'react-router-dom';
import AlleleToPhenotypeTable from './AlleleToPhenotypeTable';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel';
import AlleleToDiseaseTable from './AlleleToDiseaseTable';
import AlleleSequenceView from './AlleleSequenceView';
import AlleleTransgenicConstructs from './AlleleTransgenicConstructs';
import AlleleMolecularConsequences from './AlleleMolecularConsequences';
import AlleleVariantsSummary from './AlleleVariantsSummary';
import MolecularConsequenceHelp from './MolecularConsequenceHelp';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import GeneSymbol from '../../components/GeneSymbol';
import SpeciesName from '../../components/SpeciesName';
import PhenotypeTable from "../genePage/phenotypeTable";
import React from "react";

const SUMMARY = 'Summary';
const PHENOTYPES = 'Phenotypes';
const DISEASE = 'Disease Associations';
const VARIANTS = 'Genomic Variant Information';
const CONSTRUCTS = 'Transgenic Constructs';
const MOLECULAR_CONSEQUENCE = 'Variant Molecular Consequences';

const SECTIONS = [
  {name: SUMMARY},
  {name: CONSTRUCTS},
  {name: VARIANTS},
  {name: MOLECULAR_CONSEQUENCE},
  {name: PHENOTYPES},
  {name: DISEASE}
];

const AllelePage = ({ alleleId }) => {
  const {
    data,
    isLoading,
    isError,
  } = usePageLoadingQuery(`/api/allele/${alleleId}`);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <NotFound/>;
  }

  if (!data || !Object.keys(data).length) {
    return null;
  }

  const title = `${data.symbolText} | ${data.species.name} allele`;

  return (
    <DataPage>
      <HeadMetaTags title={title}/>
      <PageNav sections={SECTIONS}>
        <PageNavEntity entityName={<AlleleSymbol allele={data} />} icon={<SpeciesIcon inNav scale={0.5} species={data.species.name} />} truncateName>
          <DataSourceLink reference={data.crossReferenceMap.primary} />
          {data.gene && <div>Allele of <Link to={`/gene/${data.gene.id}`}><GeneSymbol gene={data.gene} /></Link></div>}
          <SpeciesName>{data.species.name}</SpeciesName>
        </PageNavEntity>
      </PageNav>
      <PageData>
        <PageCategoryLabel category='allele' />
        <PageHeader><AlleleSymbol allele={data} /></PageHeader>

        <Subsection hideTitle title={SUMMARY}>
          <AlleleSummary allele={data} />
        </Subsection>

        <Subsection title={CONSTRUCTS}>
          <AlleleTransgenicConstructs constructs={data.constructs} />
        </Subsection>

        <Subsection title={VARIANTS}>
          <ErrorBoundary>
            <></>
            <AlleleVariantsSummary allele={data} alleleId={alleleId} />
            {/* <AlleleToVariantTable allele={data} alleleId={alleleId} /> */}
          </ErrorBoundary>
          <br />
          <ErrorBoundary>
            <AlleleSequenceView allele={data} />
          </ErrorBoundary>
        </Subsection>

        <Subsection help={<MolecularConsequenceHelp />} title={MOLECULAR_CONSEQUENCE}>
          <AlleleMolecularConsequences allele={data} alleleId={alleleId} />
        </Subsection>

         
        <Subsection title={PHENOTYPES}>
          <PhenotypeTable geneId={alleleId} entityType={'allele'} />
        </Subsection>

        <Subsection title={DISEASE}>
          <AlleleToDiseaseTable alleleId={alleleId} />
        </Subsection>

      </PageData>
    </DataPage>
  );
};

AllelePage.propTypes = {
  alleleId: PropTypes.string.isRequired,
};

export default AllelePage;
