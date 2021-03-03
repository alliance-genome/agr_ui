import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import {
  ReferenceCell,
  GeneCell,
  DataTable
} from '../dataTable';
import DataSourceLink from '../dataSourceLink';
import CommaSeparatedList from '../commaSeparatedList';
import {
  compareAlphabeticalCaseInsensitive,
  compareByFixedOrder
} from '../../lib/utils';
import {getDistinctFieldValue} from '../dataTable/utils';
import {SPECIES_NAME_ORDER} from '../../constants';
import useComparisonRibbonTableQuery
  from '../../hooks/useComparisonRibbonTableQuery';
import SpeciesName from '../SpeciesName';

const ExpressionAnnotationTable = ({
  focusGeneId,
  orthologGenes,
  term,
}) => {
  const {
    downloadUrl,
    resolvedData,
    data: results,
    ...tableProps
  } = useComparisonRibbonTableQuery('/api/expression', focusGeneId, orthologGenes, term);

  const columns = [
    {
      dataField: 'key',
      text: 'key',
      hidden: true,
    },
    {
      dataField: 'species',
      text: 'Species',
      formatter: s => <SpeciesName>{s}</SpeciesName>,
      filterable: getDistinctFieldValue(resolvedData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterFormatter: speciesName => <SpeciesName>{speciesName}</SpeciesName>,
      headerStyle: {width: '100px'},
      hidden: !orthologGenes || !orthologGenes.length,
    },
    {
      dataField: 'gene',
      text: 'Gene',
      formatter: GeneCell,
      filterable: true,
      headerStyle: {width: '120px'},
      hidden: !orthologGenes || !orthologGenes.length,
    },
    {
      dataField: 'term',
      text: 'Location',
      filterable: true,
      headerStyle: {width: '150px'},
    },
    {
      dataField: 'stage',
      text: 'Stage',
      filterable: true,
      headerStyle: {width: '130px'},
    },
    {
      dataField: 'assay',
      text: 'Assay',
      formatter: a => <span title={a.name}>{a.displaySynonym}</span>,
      filterable: true,
      headerStyle: {width: '150px'},
    },
    {
      dataField: 'source',
      text: 'Source',
      filterable: true,
      formatter: refs => refs && (
        <CommaSeparatedList>
          {refs
            .sort(compareAlphabeticalCaseInsensitive(ref => ref.name))
            .map(ref => <DataSourceLink key={ref.name} reference={ref} />)}
        </CommaSeparatedList>
      ),
      headerStyle: {width: '200px'},
    },
    {
      dataField: 'reference',
      text: 'References',
      formatter: ReferenceCell,
      filterable: true,
      headerStyle: {width: '150px'},
    }
  ];


  const data = results.map(result => ({
    key: hash(result),
    species: result.gene.species.name,
    gene: result.gene,
    term: result.termName,
    stage: result.stage && result.stage.stageID,
    assay: result.assay,
    source: result ? result.crossReferences: null,
    reference: result.publications,
  }));

  const sortOptions = [
    {
      value: 'species',
      label: 'Species',
    },
    {
      value: 'location',
      label: 'Location',
    },
    {
      value: 'assay',
      label: 'Assay',
    },
    {
      value: 'stage',
      label: 'Stage',
    },
    {
      value: 'gene',
      label: 'Gene',
    },
  ];

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={data}
      downloadUrl={downloadUrl}
      keyField='key'
      sortOptions={sortOptions}
    />
  );
};

ExpressionAnnotationTable.propTypes = {
  focusGeneId: PropTypes.string,
  orthologGenes: PropTypes.array,
  term: PropTypes.string,
};

export default ExpressionAnnotationTable;
