import React from 'react';
import PropTypes from 'prop-types';
import SynonymList from '../../components/synonymList';
import {
  AlleleCell,
  DataTable,
} from '../../components/dataTable';

import useDataTableQuery from '../../hooks/useDataTableQuery';

const GeneAlleleDetailsTable = ({geneId}) => {
  const tableQuery = useDataTableQuery(`/api/gene/${geneId}/allele-variant-detail`);
  const columns = [
    {
      text: 'Allele / Variant Symbol',
      dataField: 'allele',
      formatter: (allele) => <AlleleCell allele={allele} />,
      headerStyle: {width: '100px'},
    },
    {
      text: 'Allele / Variant Synonyms',
      // missing data
      formatter: synonyms => synonyms && <SynonymList synonyms={synonyms}/>,
      headerStyle: {width: '100px'},
    },
    {
      text: 'Category',
      dataField: 'allele.category',
      headerStyle: {width: '100px'},
    },
    {
      text: 'Has Phenotype',
      dataField: 'allele.hasPhenotype',
      headerStyle: {width: '100px'},
    },
    {
      text: 'Has Disease',
      dataField: 'allele.hasDisease',
      headerStyle: {width: '100px'},
    },
    {
      text: 'Variant HGVS.g name',
      dataField: 'variant.displayName',
      headerStyle: {width: '300px'},
    },
    {
      text: 'Variant Type',
      dataField: 'variant.variantType.name',
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
      headerStyle: {width: '100px'},
    },
    {
      text: 'VEP Impact',
      dataField: 'consequence.impact',
      headerStyle: {width: '100px'},
    },
    {
      text: 'SIFT prediction',
      dataField: 'consequence.siftPrediction',
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
      headerStyle: {width: '100px'},
    },
    {
      text: 'PolyPhen score',
      dataField: 'consequence.polyphenScore',
      headerStyle: {width: '100px'},
    },
  ];

  return (
    <DataTable
      {...tableQuery}
      columns={columns}
      keyField='id'
    />
  );
};

GeneAlleleDetailsTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default GeneAlleleDetailsTable;
