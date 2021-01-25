import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import SynonymList from '../../components/synonymList';
import {
  AlleleCell,
  BooleanLinkCell,
  DataTable,
} from '../../components/dataTable';
import VariantJBrowseLink from '../../components/variant/VariantJBrowseLink';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { getSingleGenomeLocation } from '../../lib/utils';
import VariantsSequenceViewer from '../genePage/VariantsSequenceViewer';

const GeneAlleleDetailsTable = ({geneId}) => {
  const { isLoading: isLoadingGene, isError: isErrorGene, data: gene } = usePageLoadingQuery(`/api/gene/${geneId}`);
  if (isLoadingGene || isErrorGene) {
    return null;
  }
  const geneLocation = getSingleGenomeLocation(gene.genomeLocations);

  const tableQuery = useDataTableQuery(`/api/gene/${geneId}/allele-variant-detail`);
  const columns = [
    {
      text: 'Allele / Variant Symbol',
      dataField: 'allele',
      formatter: (allele) => <AlleleCell allele={allele} />,
      filterable: true,
      filterName: 'symbol',
      headerStyle: {width: '100px'},
    },
    {
      text: 'Allele / Variant Synonyms',
      // missing data
      formatter: synonyms => synonyms && <SynonymList synonyms={synonyms}/>,
      filterable: true,
      filterName: 'synonym',
      headerStyle: {width: '100px'},
    },
    {
      text: 'Category',
      dataField: 'allele.category',
      filterable: true,
      filterName: 'category',
      headerStyle: {width: '100px'},
    },
    {
      text: 'Has Phenotype',
      dataField: 'allele.hasPhenotype',
      filterable: true,
      filterName: 'hasPhenotype',
      formatter: (hasPhenotype, row) => (
        <BooleanLinkCell
          to={`/allele/${row.allele && row.allele.id}#phenotypes`}
          value={hasPhenotype}
        />
      ),
      headerStyle: {width: '100px'},
    },
    {
      text: 'Has Disease',
      dataField: 'allele.hasDisease',
      filterable: true,
      filterName: 'hasDisease',
      formatter: (hasDisease, row) => (
        <BooleanLinkCell
          to={`/allele/${row.allele && row.allele.id}#disease-associations`}
          value={hasDisease}
        />
      ),
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
      dataField: 'consequence.type',
      headerStyle: {width: '100px'},
    },
    {
      text: 'Sequence feature associated gene',
      // missing data
      headerStyle: {width: '100px'},
    },
    {
      text: 'Variant Location',
      dataField: 'consequence.location',
      headerStyle: {width: '100px'},
    },
    {
      text: 'Molecular consequence',
      dataField: 'transcriptLevelConsequence',
      filterable: true,
      filterName: 'variantConsequence',
      headerStyle: {width: '120px'},
    },
    {
      text: 'VEP Impact',
      dataField: 'consequence.impact',
      filterable: true,
      filterName: 'impact',
      headerStyle: {width: '80px'},
    },
    {
      text: 'SIFT prediction',
      dataField: 'consequence.siftPrediction',
      filterable: true,
      filterName: 'siftPrediction',
      headerStyle: {width: '100px'},
    },
    {
      text: 'SIFT score',
      dataField: 'consequence.siftScore',
      headerStyle: {width: '100px'},
    },
    {
      text: 'PolyPhen prediction',
      dataField: 'consequence.polyphenPrediction',
      filterable: true,
      filterName: 'polyphenPrediction',
      headerStyle: {width: '100px'},
    },
    {
      text: 'PolyPhen score',
      dataField: 'consequence.polyphenScore',
      headerStyle: {width: '100px'},
    },
  ];

  const [alleleIdsSelected, setAlleleIdsSelected] = useState([]);
  const variantsSequenceViewerProps = useMemo(() => {
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
      alleles: [],
      allelesSelected: [],
      allelesVisible: [],
      onAllelesSelect: setAlleleIdsSelected,
    };
  }, [alleleIdsSelected, setAlleleIdsSelected]);

  return (
    <>
      <VariantsSequenceViewer {...variantsSequenceViewerProps} />
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
