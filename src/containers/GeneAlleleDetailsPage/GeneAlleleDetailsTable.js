import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  AlleleCell,
  BooleanLinkCell,
  DataTable,
  GeneCell,
  VEPTextCell,
} from '../../components/dataTable';
import SynonymList from '../../components/synonymList';
import NoData from '../../components/noData';
import VariantJBrowseLink from '../../components/variant/VariantJBrowseLink';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { getSingleGenomeLocation, findFminFmax } from '../../lib/utils';
import VariantsSequenceViewer from '../genePage/VariantsSequenceViewer';
import ErrorBoundary from '../../components/errorBoundary';

const getSiftStyle = (sift) => {
  switch (sift && sift.toLowerCase()) {
  case 'tolerated':
    return 'text-success';
  case 'tolerated_low_confidence':
    return 'text-success';
  case 'deleterious_low_confidence':
    return 'text-warning';
  case 'deleterious':
    return 'text-danger';
  default:
    return 'text-muted';
  }
};

const getPolyphenStyle = (polyphen) => {
  switch (polyphen && polyphen.toLowerCase()) {
  case 'benign':
    return 'text-success';
  case 'possibly_damaging':
    return 'text-warning';
  case 'probably_damaging':
    return 'text-danger';
  default:
    return 'text-muted';
  }
};

const GeneAlleleDetailsTable = ({geneId}) => {
  const { isLoading: isLoadingGene, isError: isErrorGene, data: gene } = usePageLoadingQuery(`/api/gene/${geneId}`);
  if (isLoadingGene || isErrorGene) {
    return null;
  }
  const geneLocation = getSingleGenomeLocation(gene.genomeLocations);

  const tableQuery = useDataTableQuery(`/api/gene/${geneId}/allele-variant-detail`, undefined, {
    sizePerPage: 25,
  });
  const { data, isLoading } = tableQuery;
  const columns = [
    {
      text: 'Allele / Variant Symbol',
      dataField: 'allele',
      formatter: (allele) => <AlleleCell allele={allele} />,
      filterable: true,
      filterName: 'symbol',
      headerStyle: {width: '200px'},
    },
    {
      text: 'Allele / Variant Synonyms',
      dataField: 'allele.synonyms',
      formatter: synonyms => <SynonymList synonyms={synonyms} />,
      filterable: true,
      filterName: 'synonyms',
      headerStyle: {width: '200px'},
    },
    {
      text: 'Category',
      dataField: 'allele.category',
      filterable: true,
      filterName: 'alleleCategory',
      headerStyle: {width: '250px'},
    },
    {
      text: 'Has Phenotype',
      dataField: 'allele.hasPhenotype',
      formatter: (hasPhenotype, row) => (
        <BooleanLinkCell
          to={`/allele/${row.allele && row.allele.id}#phenotypes`}
          value={hasPhenotype}
        />
      ),
      filterName: 'hasPhenotype',
      filterable: ['true', 'false'],
      filterFormatter: val => val === 'true' ? 'Yes' : 'No',
      headerStyle: {width: '100px'},
    },
    {
      text: 'Has Disease',
      dataField: 'allele.hasDisease',
      formatter: (hasDisease, row) => (
        <BooleanLinkCell
          to={`/allele/${row.allele && row.allele.id}#disease-associations`}
          value={hasDisease}
        />
      ),
      filterName: 'hasDisease',
      filterable: ['true', 'false'],
      filterFormatter: val => val === 'true' ? 'Yes' : 'No',
      headerStyle: {width: '80px'},
    },
    {
      text: 'Variant HGVS.g name',
      dataField: 'variant',
      formatter: (variant) => variant ? (
        <div className="text-truncate">
          <VariantJBrowseLink
            geneLocation={geneLocation}
            geneSymbol={gene.symbol}
            location={variant.location}
            species={gene.species && gene.species.name}
            type={variant.variantType && variant.variantType.name}
          >{variant.displayName}</VariantJBrowseLink>
        </div>
      ) : null,
      headerStyle: {width: '300px'},
      filterable: true,
      filterName: 'hgvsgName',
    },
    {
      text: 'Variant Type',
      dataField: 'variant.variantType.name',
      formatter: VEPTextCell,
      filterable: true,
      filterName: 'variantType',
      headerStyle: {width: '150px'},
    },
    {
      text: 'Sequence feature',
      dataField: 'consequence.transcriptName',
      headerStyle: {width: '250px'},
      filterable: true,
      filterName: 'sequenceFeature',
    },
    {
      text: 'Sequence feature type',
      dataField: 'consequence.sequenceFeatureType',
      formatter: VEPTextCell,
      filterable: true,
      filterName: 'sequenceFeatureType',
      headerStyle: {width: '200px'},
    },
    {
      text: 'Sequence feature associated gene',
      dataField: 'consequence.associatedGene',
      formatter: GeneCell,
      filterable: true,
      filterName: 'associatedGeneSymbol',
      headerStyle: {width: '150px'},
    },
    {
      text: 'Variant Location',
      dataField: 'consequence.location',
      headerStyle: {width: '100px'},
      filterable: true,
      filterName: 'variantLocation',
    },
    {
      text: 'Molecular consequence',
      dataField: 'consequence.molecularConsequence',
      formatter: VEPTextCell,
      filterable: true,
      filterName: 'molecularConsequence',
      headerStyle: {width: '350px'},
    },
    {
      text: 'VEP Impact',
      dataField: 'consequence.impact',
      filterable: true,
      filterName: 'variantImpact',
      headerStyle: {width: '120px'},
    },
    {
      text: 'SIFT prediction',
      dataField: 'consequence.siftPrediction',
      formatter: (siftPrediction) => (
        <span className={getSiftStyle(siftPrediction)}>{siftPrediction && siftPrediction.replace(/_/g, ' ')}</span>
      ),
      filterable: true,
      filterName: 'variantSift',
      headerStyle: {width: '200px'},
    },
    {
      text: 'SIFT score',
      dataField: 'consequence.siftScore',
      formatter: (siftScore, { consequence }) => (
        <span className={getSiftStyle(consequence && consequence.siftPrediction)}>{siftScore}</span>
      ),
      headerStyle: {width: '100px'},
    },
    {
      text: 'PolyPhen prediction',
      dataField: 'consequence.polyphenPrediction',
      formatter: (polyphenPrediction) => (
        <span className={getPolyphenStyle(polyphenPrediction)}>{polyphenPrediction && polyphenPrediction.replace(/_/g, ' ')}</span>
      ),
      filterable: true,
      filterName: 'variantPolyphen',
      headerStyle: {width: '180px'},
    },
    {
      text: 'PolyPhen score',
      dataField: 'consequence.polyphenScore',
      formatter: (polyphenScore, { consequence }) => (
        <span className={getPolyphenStyle(consequence && consequence.polyphenPrediction)}>{polyphenScore}</span>
      ),
      headerStyle: {width: '150px'},
    },
  ];

  const sortOptions = [
    {
      value: 'variantHgvsName',
      label: 'Variant HGVS.g'
    },
    {
      value: 'variant',
      label: 'Allele/variant symbol',
    },
    {
      value: 'variantType',
      label: 'Variant type',
    },
    {
      value: 'molecularConsequence',
      label: 'Molecular consequence',
    },
    {
      value: 'transcript',
      label: 'Transcripts'
    }
  ];

  const [alleleIdsSelected, setAlleleIdsSelected] = useState([]);
  const variantsSequenceViewerProps = useMemo(() => {

    const variants = data ?
      data.map(
        row => (row && row.variant) || []
      ) :
      [];
    const variantLocations = variants.map(variant => variant && variant.location);
    const { fmin, fmax } = findFminFmax([geneLocation, ...variantLocations]);

    /*
       Warning!
       The data format here should be agreed upon by the maintainers of the VariantsSequenceViewer.
       Changes might break the VariantsSequenceViewer.
    */
    // const formatAllele = (alleleId) => (
    //   {
    //     id: alleleId,
    //   }
    // );
    return {
      gene: gene,
      fmin: fmin,
      fmax: fmax,
      hasVariants: isLoading ? undefined : Boolean(variants && variants.length),
      allelesSelected: [],
      allelesVisible: [],
      onAllelesSelect: setAlleleIdsSelected,
    };
  }, [isLoading, data, alleleIdsSelected, setAlleleIdsSelected]);


  return (
    <>
      <ErrorBoundary>
        {
          isLoading || isLoadingGene ?
            null :
            variantsSequenceViewerProps.hasVariants ?
              <VariantsSequenceViewer {...variantsSequenceViewerProps} /> :
              <NoData>No mapped variant information available</NoData>
        }
      </ErrorBoundary>
      <hr />
      <ErrorBoundary>
        <DataTable
          {...tableQuery}
          columns={columns}
          downloadUrl={`/api/gene/${geneId}/allele-variant-detail/download`}
          sortOptions={sortOptions}
          keyField='id'
        />
      </ErrorBoundary>
    </>
  );
};

GeneAlleleDetailsTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default GeneAlleleDetailsTable;
