import React from 'react';

import { DataPage, PageData, PageHeader, PageNav } from '../../components/dataPage';
import { AttributeList, AttributeLabel, AttributeValue } from '../../components/attribute';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import Subsection from '../../components/subsection.jsx';
import NotFound from '../../components/notFound.jsx';
// import AlleleSymbol from './AlleleSymbol';
import SpeciesIcon from '../../components/speciesIcon/index.jsx';
import PageNavEntity from '../../components/dataPage/PageNavEntity.jsx';
import DataSourceLink from '../../components/dataSourceLink.jsx';
import { Link, useParams } from 'react-router-dom';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel.jsx';
// import AlleleToPhenotypeTable from './AlleleToPhenotypeTable';
// import AlleleToDiseaseTable from './AlleleToDiseaseTable';
// import AlleleToVariantTable from './AlleleToVariantTable';
// import AlleleSequenceView from './AlleleSequenceView';
import VariantSequenceView from './VariantSequenceView.jsx';
import VariantToTranscriptTable from './VariantToTranscriptTable.jsx';
import MolecularConsequenceHelp from './MolecularConsequenceHelp.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import SpeciesName from '../../components/SpeciesName.jsx';
import ErrorBoundary from '../../components/errorBoundary.jsx';
import VariantSummaryCuration from './VariantSummaryCuration.jsx';
import { VARIANT_CATEGORY } from '../../constants';

const SUMMARY = 'Summary';
const MOLECULAR_CONSEQUENCE = 'Variant Molecular Consequences';

const SECTIONS = [{ name: SUMMARY }, { name: MOLECULAR_CONSEQUENCE }];

const VariantPage = () => {
  const { id: variantId } = useParams();
  // TODO: enable this one instead of the mock data
  // Comment out this section, if trying out the mock data.
  const { data, isLoading, isError } = usePageLoadingQuery(`/api/variant/${variantId}`);
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
    return <NotFound />;
  }

  if (!data || !Object.keys(data).length) {
    return null;
  }

  const variant = data.variants && data.variants[0];
  const variantLocation =
    variant && variant.curatedVariantGenomicLocations && variant.curatedVariantGenomicLocations[0];
  const variantSymbol = variantLocation?.hgvs || variant?.curie || data.symbol || data.displayName || data.id;
  const reference = data.crossReferenceMap ? data.crossReferenceMap.primary : null;
  const title = `${variantSymbol} | ${variant?.taxon?.name} allele`;

  return (
    <DataPage>
      <HeadMetaTags title={title} />
      <PageNav sections={SECTIONS}>
        <PageNavEntity
          entityName={variantSymbol}
          icon={<SpeciesIcon inNav scale={0.5} species={data.species && data.species.name} />}
          truncateName
        >
          <DataSourceLink reference={reference} />
          {variantLocation?.overlapGenes?.length > 0 && (
            <div>
              Variant overlaps{' '}
              {variantLocation.overlapGenes.map((gene, index) => (
                <span key={gene.curie || gene.primaryExternalId}>
                  <Link to={`/gene/${gene.curie || gene.primaryExternalId}`}>{gene.geneSymbol?.displayText}</Link>
                  {index < variantLocation.overlapGenes.length - 1 && ', '}
                </span>
              ))}
            </div>
          )}
          <SpeciesName>{variant?.taxon?.name}</SpeciesName>
        </PageNavEntity>
      </PageNav>
      <PageData>
        <PageCategoryLabel category={VARIANT_CATEGORY} />
        <PageHeader>{variantSymbol}</PageHeader>

        <Subsection hideTitle title={SUMMARY}>
          <ErrorBoundary>
            <AttributeList className="mb-0">
              <AttributeLabel>Species</AttributeLabel>
              <AttributeValue>
                {variant?.taxon?.curie && <SpeciesName>{variant.taxon.name}</SpeciesName>}
              </AttributeValue>
              <VariantSummaryCuration variant={data} variantId={variantId} />
            </AttributeList>
          </ErrorBoundary>
          <hr />
          <ErrorBoundary>
            <VariantSequenceView variant={data} />
          </ErrorBoundary>
        </Subsection>

        <Subsection help={<MolecularConsequenceHelp />} title={MOLECULAR_CONSEQUENCE}>
          <VariantToTranscriptTable
            variant={variantLocation}
            variantHgvs={variantId}
            variantType={variant?.variantType}
          />
        </Subsection>
      </PageData>
    </DataPage>
  );
};

VariantPage.propTypes = {};

export default VariantPage;
