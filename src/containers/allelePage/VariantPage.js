import React  from 'react';
import PropTypes from 'prop-types';

import {
  DataPage,
  PageData,
  PageHeader,
  PageNav
} from '../../components/dataPage';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import HeadMetaTags from '../../components/headMetaTags';
import Subsection from '../../components/subsection';
import NotFound from '../../components/notFound';
// import AlleleSymbol from './AlleleSymbol';
import SpeciesIcon from '../../components/speciesIcon';
import PageNavEntity from '../../components/dataPage/PageNavEntity';
import DataSourceLink from '../../components/dataSourceLink';
import {Link} from 'react-router-dom';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel';
// import AlleleToPhenotypeTable from './AlleleToPhenotypeTable';
// import AlleleToDiseaseTable from './AlleleToDiseaseTable';
// import AlleleToVariantTable from './AlleleToVariantTable';
// import AlleleSequenceView from './AlleleSequenceView';
import VariantSummary from './VariantSummary';
import VariantSequenceView from './VariantSequenceView';
import VariantToTranscriptTable from './VariantToTranscriptTable';
import MolecularConsequenceHelp from './MolecularConsequenceHelp';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import GeneSymbol from '../../components/GeneSymbol';
import SpeciesName from '../../components/SpeciesName';
import ErrorBoundary from '../../components/errorBoundary';

const SUMMARY = 'Summary';
const MOLECULAR_CONSEQUENCE = 'Variant Molecular Consequences';

const SECTIONS = [
  {name: SUMMARY},
  {name: MOLECULAR_CONSEQUENCE},
];

const VariantPage = ({ variantId }) => {
  // TODO: enable this one instead of the mock data
  // Comment out this section, if trying out the mock data.
  const {
    data,
    isLoading,
    isError,
  } = usePageLoadingQuery(`/api/variant/${variantId}`);
  // END: real data

  // TODO: remove these mock data
  // Uncomment this section, if trying out the mock data.
  /* const {
    data: alleleVariants, // TODO: enable this one instead of the mock data
    isLoading,
    isError,
  } = usePageLoadingQuery('/api/allele/WB:WBVar00092405/variants');
  let data = alleleVariants ? alleleVariants.results[0] : {};
  data = {
    ...data,
    species: {
      name: 'Caenorhabditis elegans',
      shortName: 'Cel',
      dataProviderFullName: 'WormBase',
      dataProviderShortName: 'WB',
      commonNames: '["worm", "cel"]',
      taxonId: 'NCBITaxon:6239'
    },
  }; */
  // End: of mock data

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <NotFound/>;
  }

  if (!data || !Object.keys(data).length) {
    return null;
  }

  const variantSymbol = data.symbol || data.displayName || data.id;

  const title = `${variantSymbol} | ${data.species && data.species.name} allele`;

  return (
    <DataPage>
      <HeadMetaTags title={title}/>
      <PageNav sections={SECTIONS}>
        <PageNavEntity entityName={variantSymbol} icon={<SpeciesIcon inNav scale={0.5} species={data.species && data.species.name} />} truncateName>
          <DataSourceLink reference={data.crossReferences.primary} />
          {data.gene && <div>Variant overlaps <Link to={`/gene/${data.gene.id}`}><GeneSymbol gene={data.gene} /></Link></div>}
          <SpeciesName>{data.species && data.species.name}</SpeciesName>
        </PageNavEntity>
      </PageNav>
      <PageData>
        <PageCategoryLabel category='allele' />
        <PageHeader>{variantSymbol}</PageHeader>

        <Subsection hideTitle title={SUMMARY}>
          <ErrorBoundary>
            <AttributeList className='mb-0'>
              <AttributeLabel>Species</AttributeLabel>
              <AttributeValue>{data.species && <SpeciesName>{data.species.name}</SpeciesName>}</AttributeValue>
              <VariantSummary variant={data} variantId={variantId} />
            </AttributeList>
          </ErrorBoundary>
          <hr />
          <ErrorBoundary>
            <VariantSequenceView variant={data} />
          </ErrorBoundary>
        </Subsection>

        <Subsection help={<MolecularConsequenceHelp />} title={MOLECULAR_CONSEQUENCE}>
          <VariantToTranscriptTable variant={data} />
        </Subsection>

      </PageData>
    </DataPage>
  );
};

VariantPage.propTypes = {
  variantId: PropTypes.string.isRequired,
};

export default VariantPage;
