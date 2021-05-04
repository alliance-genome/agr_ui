import React  from 'react';
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
// import AlleleToVariantTable from './AlleleToVariantTable';
import AlleleSequenceView from './AlleleSequenceView';
import AlleleTransgenicConstructs from './AlleleTransgenicConstructs';
import AlleleMolecularConsequences from './AlleleMolecularConsequences';
import VariantSummary from './VariantSummry2';
import VariantToTranscriptTable from './VariantToTranscriptTable';
import MolecularConsequenceHelp from './MolecularConsequenceHelp';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import GeneSymbol from '../../components/GeneSymbol';
import SpeciesName from '../../components/SpeciesName';

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

const VariantPage = ({ variantId }) => {
  const {
    data,
    isLoading,
    isError,
  } = usePageLoadingQuery(`/api/variant/${variantId}`);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <NotFound/>;
  }

  if (!data || !Object.keys(data).length) {
    return null;
  }

  const title = `${data.displayName} | ${data.species && data.species.name} allele`;

  return (
    <DataPage>
      <HeadMetaTags title={title}/>
      <PageNav sections={SECTIONS}>
        <PageNavEntity entityName={data.displayName} icon={<SpeciesIcon inNav scale={0.5} species={data.species && data.species.name} />} truncateName>
          <DataSourceLink reference={data.crossReferences.primary} />
          {data.gene && <div>Allele of <Link to={`/gene/${data.gene.id}`}><GeneSymbol gene={data.gene} /></Link></div>}
          <SpeciesName>{data.species && data.species.name}</SpeciesName>
        </PageNavEntity>
      </PageNav>
      <PageData>
        <PageCategoryLabel category='allele' />
        <PageHeader>{data.displayName}</PageHeader>

        <Subsection hideTitle title={SUMMARY}>
          <VariantSummary variant={data} variantId={variantId} />
        </Subsection>

        <Subsection title={CONSTRUCTS}>
          <AlleleTransgenicConstructs constructs={data.constructs} />
        </Subsection>

        <Subsection title={VARIANTS} hasData={false}>{/* TODO: remove hasData={false*/}
          {null}
        </Subsection>

        <Subsection help={<MolecularConsequenceHelp />} title={MOLECULAR_CONSEQUENCE}>
          <VariantToTranscriptTable variant={data} />
        </Subsection>

        <Subsection title={PHENOTYPES}>
          <AlleleToPhenotypeTable variantId={variantId} />
        </Subsection>

        <Subsection title={DISEASE}>
          <AlleleToDiseaseTable variantId={variantId} />
        </Subsection>

      </PageData>
    </DataPage>
  );
};

VariantPage.propTypes = {
  variantId: PropTypes.string.isRequired,
};

export default VariantPage;
