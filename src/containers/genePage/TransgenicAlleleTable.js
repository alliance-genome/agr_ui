import React from 'react';
import PropTypes from 'prop-types';
import { AlleleCell, DataTable, SpeciesCell } from '../../components/dataTable';
import SynonymList from '../../components/synonymList';
import ConstructLink from '../../components/ConstructLink';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import CommaSeparatedGeneList from '../allelePage/CommaSeparatedGeneList';
import RotatedHeaderCell from '../../components/dataTable/RotatedHeaderCell';
import BooleanLinkCell from '../../components/dataTable/BooleanLinkCell';

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
          <span className='text-muted'>(Carrying the transgene)</span>
        </>
      ),
      formatter: species => <SpeciesCell species={species} />,
      filterable: true,
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
      dataField: 'synonyms',
      text: 'Synonyms',
      formatter: synonyms => <SynonymList synonyms={synonyms}/>,
      headerStyle: {width: '165px'},
      filterable: true,
      filterName: 'synonym',
    },
    {
      dataField: 'constructs',
      text: 'Transgenic construct',
      formatter: constructs => constructs.map(construct => (
        <div key={construct.id}>
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
      headerFormatter: column => <RotatedHeaderCell>{column.text}</RotatedHeaderCell>,
      headerStyle: {
        width: '40px',
        height: '130px',
      },
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
      headerFormatter: column => <RotatedHeaderCell>{column.text}</RotatedHeaderCell>,
      headerStyle: {
        width: '40px',
        height: '140px',
      }
    },
  ];

  return (
    <DataTable
      {...tableProps}
      keyField='id'
      columns={columns}
      data={data}
    />
  );
};

TransgenicAlleleTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default TransgenicAlleleTable;
