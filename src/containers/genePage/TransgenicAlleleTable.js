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

  const data = results?.map(result => ({
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
      helpPopupProps: {
        id: 'gene-page--transgenetic-allele-table--transgenic-construct-help',
        children: <span>The symbol of the construct (following species specific guidelines). This represents the construct independent of the host organism.</span>,
      },
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
      helpPopupProps: {
        id: 'gene-page--transgenetic-allele-table--expressed-components-help',
        children: <span>The genetic elements expressed by the construct. These may be full or partial genes and may include both protein coding and non-protein coding genes.</span>,
      },
      formatter: constructsRelatedGenesFormatter,
      headerStyle: {width: '130px'},
      filterable: true,
    },
    {
      dataField: 'constructTargetedGene',
      text: 'Knock-down targets',
      helpPopupProps: {
        id: 'gene-page--transgenetic-allele-table--knock-down-targets-help',
        children: <span>If the transgenic construct contains elements designed to interfere with expression of another gene, then those genes are listed here.</span>,
      },
      formatter: constructsRelatedGenesFormatter,
      headerStyle: {width: '120px'},
      filterable: true,
    },
    {
      dataField: 'constructRegulatedGene',
      text: 'Regulatory regions',
      helpPopupProps: {
        id: 'gene-page--transgenetic-allele-table--regulatory-regions-help',
        children: <span>The genetic elements driving expression of the other elements in the construct. Examples are: upstream activation sequence (UAS), human cytomegalovirus (CMV), and in worm, daf-16.</span>,
      },
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
    />
  );
};

TransgenicAlleleTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default TransgenicAlleleTable;
