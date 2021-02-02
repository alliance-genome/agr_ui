import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  AlleleCell,
  BooleanLinkCell,
  DataTable,
  VEPTextCell,
} from '../../components/dataTable';
import VariantJBrowseLink from '../../components/variant/VariantJBrowseLink';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { getSingleGenomeLocation, findFminFmax } from '../../lib/utils';
import VariantsSequenceViewer from '../genePage/VariantsSequenceViewer';

const GeneAlleleDetailsTable = ({geneId}) => {
  const { isLoading: isLoadingGene, isError: isErrorGene, data: gene } = usePageLoadingQuery(`/api/gene/${geneId}`);
  if (isLoadingGene || isErrorGene) {
    return null;
  }
  const geneLocation = getSingleGenomeLocation(gene.genomeLocations);

  const tableQuery = useDataTableQuery(`/api/gene/${geneId}/allele-variant-detail`, undefined, {
    sizePerPage: 100,
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
      formatter: synonyms => (synonyms || []).join(', '),
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
      headerStyle: {width: '150px'},
    },
    {
      text: 'Sequence feature type',
      dataField: 'consequence.sequenceFeatureType',
      formatter: VEPTextCell,
      filterable: true,
      filterName: 'consequenceType',
      headerStyle: {width: '200px'},
    },
    {
      text: 'Sequence feature associated gene',
      // missing data
      headerStyle: {width: '150px'},
    },
    {
      text: 'Variant Location',
      dataField: 'consequence.location',
      headerStyle: {width: '100px'},
    },
    {
      text: 'Molecular consequence',
      dataField: 'consequence.molecularConsequence',
      formatter: VEPTextCell,
      filterable: true,
      filterName: 'variantConsequence',
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
      formatter: VEPTextCell,
      filterable: true,
      filterName: 'variantSift',
      headerStyle: {width: '200px'},
    },
    {
      text: 'SIFT score',
      dataField: 'consequence.siftScore',
      headerStyle: {width: '100px'},
    },
    {
      text: 'PolyPhen prediction',
      dataField: 'consequence.polyphenPrediction',
      formatter: VEPTextCell,
      filterable: true,
      filterName: 'variantPolyphen',
      headerStyle: {width: '180px'},
    },
    {
      text: 'PolyPhen score',
      dataField: 'consequence.polyphenScore',
      headerStyle: {width: '150px'},
    },
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
      {
        isLoading || isLoadingGene ?
          null :
          variantsSequenceViewerProps.hasVariants ?
            <VariantsSequenceViewer {...variantsSequenceViewerProps} /> :
            <NoData>No mapped variant information available</NoData>
      }
      <DataTable
        {...tableQuery}
        columns={columns}
        keyField='id'
      />
    </>
  );
};

GeneAlleleDetailsTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default GeneAlleleDetailsTable;
