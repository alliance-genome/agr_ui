import React from 'react';
import PropTypes from 'prop-types';
import {
  SpeciesCell,
  GeneCell,
  ReferenceCell,
  EvidenceCodesCell,
  BasedOnGeneCell,
  DataTable,
} from '../dataTable';
import AnnotatedEntitiesPopup from '../dataTable/AnnotatedEntitiesPopup';
import DiseaseLink from './DiseaseLink';
import {getDistinctFieldValue} from '../dataTable/utils';
import { compareByFixedOrder } from '../../lib/utils';
import { SPECIES_NAME_ORDER } from '../../constants';
import ProvidersCell from '../dataTable/ProvidersCell';
import useComparisonRibbonTableQuery
  from '../../hooks/useComparisonRibbonTableQuery';
import SpeciesName from '../SpeciesName';
import AssociationType from '../AssociationType';

/*
 * Disease ribbon-table
 * Listens to events in the disease-ribbon component
 */
const DiseaseAnnotationTable = ({
  focusGeneId,
  includeNotAnnotations,
  orthologGenes,
  term,
}) => {
  const params = {};
  if (includeNotAnnotations) {
    params.includeNegation = true;
  }
  const {
    downloadUrl,
    data: results,
    resolvedData,
    ...tableProps
  } = useComparisonRibbonTableQuery('/api/disease', focusGeneId, orthologGenes, term, params);

  let columns = [
    {
      dataField: 'species',
      text: 'Species',
      filterable: getDistinctFieldValue(resolvedData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterFormatter: speciesName => <SpeciesName>{speciesName}</SpeciesName>,
      headerStyle: {width: '100px'},
      formatter: species => <SpeciesCell species={species} />,
      hidden: !orthologGenes || !orthologGenes.length
    },
    {
      dataField: 'gene',
      text: 'Gene',
      formatter:  (gene, row) => (
        <React.Fragment>
          <div>{GeneCell(gene)}</div>
          <small>
            <AnnotatedEntitiesPopup entities={row.primaryAnnotatedEntities}>
                Based on inferences
            </AnnotatedEntitiesPopup>
          </small>
        </React.Fragment>
      ),
      filterable: true,
      headerStyle: {width: '75px'},
    },
    {
      dataField: 'associationType',
      text: 'Association',
      formatter: type => <AssociationType type={type} />,
      filterable: getDistinctFieldValue(resolvedData, 'associationType'),
      filterFormatter: type => <AssociationType type={type} />,
      headerStyle: {width: '120px'},
    },
    {
      dataField: 'disease',
      text: 'Disease',
      filterable: true,
      headerStyle: {width: '150px'},
      formatter: disease => <DiseaseLink disease={disease} />,
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      filterable: true,
      headerStyle: {width: '100px'},
      formatter: codes => <EvidenceCodesCell evidenceCodes={codes} />,
      filterName: 'evidenceCode',
    },
    {
      dataField: 'providers',
      text: 'Source',
      formatter: providers => providers && <ProvidersCell providers={providers} />,
      filterable: true,
      headerStyle: {width: '100px'},
      filterName: 'provider',
    },
    {
      dataField: 'orthologyGenes',
      text: 'Based On',
      filterable: true,
      filterName: 'basedOnGeneSymbol',
      headerStyle: {width: '100px'},
      formatter: BasedOnGeneCell,
    },
    {
      dataField: 'publications',
      text: 'References',
      filterable: true,
      filterName: 'reference',
      headerStyle: {width: '150px'},
      formatter: ReferenceCell,
    }
  ];

  const data = results.map(annotation => ({
    species: annotation.gene.species,
    ...annotation,
  }));

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={data}
      downloadUrl={downloadUrl}
      keyField='primaryKey'
    />
  );
};

DiseaseAnnotationTable.propTypes = {
  focusGeneId: PropTypes.string,
  includeNotAnnotations: PropTypes.bool,
  orthologGenes: PropTypes.array,
  term: PropTypes.string
};

export default DiseaseAnnotationTable;
