import React from 'react';
import PropTypes from 'prop-types';
import { AlleleCell, DataTable, SpeciesCell } from '../../components/dataTable';
import ConstructLink from '../../components/ConstructLink';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import CommaSeparatedGeneList from '../allelePage/CommaSeparatedGeneList';
import RotatedHeaderCell from '../../components/dataTable/RotatedHeaderCell';
import BooleanLinkCell from '../../components/dataTable/BooleanLinkCell';
import { getDistinctFieldValue } from '../../components/dataTable/utils';
import { compareByFixedOrder } from '../../lib/utils';
import { SPECIES_NAME_ORDER } from '../../constants';
import SpeciesName from '../../components/SpeciesName';

const constructsRelatedGenesFormatter = constructRelatedGenes => (
  constructRelatedGenes.map(({id, genes}) => (
    <div key={id}>
      <CommaSeparatedGeneList genes={genes} />
    </div>
  ))
);

const TransgenicAlleleTable = ({geneId}) => {
  const {
    data: results,
    resolvedData,
    ...tableProps
  } = useDataTableQuery(`/api/gene/${geneId}/transgenic-alleles`);

  const data = results.map(result => ({
    ...result,
    constructExpressedGene: result.constructs.map(construct => ({
      id: construct.id,
      genes: construct.expressedGenes,
    })),
    constructTargetedGene: result.constructs.map(construct => ({
      id: construct.id,
      genes: construct.targetGenes,
    })),
    constructRegulatedGene: result.constructs.map(construct => ({
      id: construct.id,
      genes: construct.regulatedByGenes,
    })),
  }));

  const columns = [
    {
      dataField: 'species',
      text: 'Species',
      headerNode: (
        <>
          Species
          <br />
          <small className='text-muted text-transform-none'>(carrying the transgene)</small>
        </>
      ),
      formatter: species => <SpeciesCell species={species} />,
      filterable: getDistinctFieldValue(resolvedData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterFormatter: speciesName => <SpeciesName>{speciesName}</SpeciesName>,
      headerStyle: {width: '100px'},
    },
    {
      dataField: 'symbol',
      text: 'Allele symbol',
      formatter: (_, allele) => <AlleleCell allele={allele} />,
      headerStyle: {width: '185px'},
      filterable: true,
      filterName: 'allele',
    },
    {
      dataField: 'constructs',
      text: 'Transgenic construct',
      formatter: constructs => constructs.map(construct => (
        <div key={construct.id} className='text-break'>
          <ConstructLink construct={construct} />
        </div>
      )),
      headerStyle: {width: '185px'},
      filterable: true,
      filterName: 'construct',
    },
    {
      dataField: 'constructExpressedGene',
      text: 'Expressed components',
      formatter: constructsRelatedGenesFormatter,
      headerStyle: {width: '120px'},
      filterable: true,
    },
    {
      dataField: 'constructTargetedGene',
      text: 'Knock-down targets',
      formatter: constructsRelatedGenesFormatter,
      headerStyle: {width: '120px'},
      filterable: true,
    },
    {
      dataField: 'constructRegulatedGene',
      text: 'Regulatory regions',
      formatter: constructsRelatedGenesFormatter,
      headerStyle: {width: '120px'},
      filterable: true,
    },
    {
      dataField: 'hasDisease',
      text: 'Has Disease Annotations',
      formatter: (hasDisease, allele) => (
        <BooleanLinkCell
          to={`/allele/${allele.id}#disease-associations`}
          value={hasDisease}
        />
      ),
      headerNode: <RotatedHeaderCell>Has Disease Annotations</RotatedHeaderCell>,
      headerStyle: {
        width: '50px',
        height: '130px',
      },
      filterable: ['true', 'false'],
      filterFormatter: val => val === 'true' ? 'Yes' : 'No',
    },
    {
      dataField: 'hasPhenotype',
      text: 'Has Phenotype Annotations',
      formatter: (hasPhenotype, allele) => (
        <BooleanLinkCell
          to={`/allele/${allele.id}#phenotypes`}
          value={hasPhenotype}
        />
      ),
      headerNode: <RotatedHeaderCell>Has Phenotype Annotations</RotatedHeaderCell>,
      headerStyle: {
        width: '115px', // wider because this one is on the end!
        height: '145px',
      },
      filterable: ['true', 'false'],
      filterFormatter: val => val === 'true' ? 'Yes' : 'No',
    },
  ];

  return (
    <DataTable
      {...tableProps}
      keyField='id'
      columns={columns}
      data={data}
      downloadUrl={`/api/gene/${geneId}/transgenic-alleles/download`}
      rowStyle={{cursor: 'pointer'}}
    />
  );
};

TransgenicAlleleTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default TransgenicAlleleTable;
