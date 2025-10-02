import { DataPage, PageData, PageHeader, PageNav } from '../../components/dataPage';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import Subsection from '../../components/subsection.jsx';
import NotFound from '../../components/notFound.jsx';
import ErrorBoundary from '../../components/errorBoundary.jsx';
import AlleleSummary from './AlleleSummary.jsx';
import AlleleSymbol from './AlleleSymbol.jsx';
import SpeciesIcon from '../../components/speciesIcon/index.jsx';
import PageNavEntity from '../../components/dataPage/PageNavEntity.jsx';
import DataSourceLink from '../../components/dataSourceLink.jsx';
import { Link, useParams } from 'react-router-dom';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel.jsx';
import AlleleToDiseaseTable from './AlleleToDiseaseTable.jsx';
import AlleleSequenceView from './AlleleSequenceView.jsx';
import AlleleTransgenicConstructs from './AlleleTransgenicConstructs.jsx';
import AlleleMolecularConsequences from './AlleleMolecularConsequences.jsx';
import AlleleVariantsSummary from './AlleleVariantsSummary.jsx';
import MolecularConsequenceHelp from './MolecularConsequenceHelp.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import SpeciesName from '../../components/SpeciesName.jsx';
import PhenotypeTable from '../genePage/phenotypeTable.jsx';
import React from 'react';
import GeneSymbolCuration from '../../components/GeneSymbolCuration.jsx';
import DataSourceLinkCuration from '../../components/dataSourceLinkCuration.jsx';
import { getSpeciesNameCorrected } from '../../lib/utils.js';

const SUMMARY = 'Summary';
const PHENOTYPES = 'Phenotypes';
const DISEASE = 'Disease Associations';
const VARIANTS = 'Genomic Variant Information';
const CONSTRUCTS = 'Transgenic Constructs';
const MOLECULAR_CONSEQUENCE = 'Variant Molecular Consequences';

const SECTIONS = [
  { name: SUMMARY },
  { name: CONSTRUCTS },
  { name: VARIANTS },
  { name: MOLECULAR_CONSEQUENCE },
  { name: PHENOTYPES },
  { name: DISEASE },
];

const AllelePage = () => {
  const { id: alleleId } = useParams();
  const { data, isLoading, isError } = usePageLoadingQuery(`/api/allele/${alleleId}`);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <NotFound />;
  }

  if (!data || !Object.keys(data).length) {
    return null;
  }

  const speciesName = getSpeciesNameCorrected(data.allele.taxon?.name);

  const title = `${data.allele.alleleSymbol?.formatText} | ${speciesName} allele`;

  return (
    <DataPage>
      <HeadMetaTags title={title} />
      <PageNav sections={SECTIONS}>
        <PageNavEntity
          entityName={<AlleleSymbol allele={data.allele} />}
          icon={<SpeciesIcon inNav scale={0.5} species={speciesName} />}
          truncateName
        >
          <DataSourceLinkCuration reference={data.allele.dataProviderCrossReference}>
            {data.allele?.dataProviderCrossReference?.referencedCurie}
          </DataSourceLinkCuration>
          {data.alleleOfGene && (
            <div>
              Allele of{' '}
              <Link to={`/gene/${data.alleleOfGene?.primaryExternalId}`}>
                <GeneSymbolCuration gene={data.alleleOfGene} />
              </Link>
            </div>
          )}
          <SpeciesName>{speciesName}</SpeciesName>
        </PageNavEntity>
      </PageNav>
      <PageData>
        <PageCategoryLabel category="allele" />
        <PageHeader>
          <AlleleSymbol allele={data.allele} />
        </PageHeader>

        <Subsection hideTitle title={SUMMARY}>
          <AlleleSummary
            allele={data.allele}
            category={data.category}
            description={data.description}
            crossReference={data.crossReference}
            alleleOfGene={data.alleleOfGene}
            constructSlimList={data.constructSlimList}
          />
        </Subsection>

        <Subsection title={CONSTRUCTS}>{<AlleleTransgenicConstructs alleleId={alleleId} />}</Subsection>

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

AllelePage.propTypes = {};

export default AllelePage;
