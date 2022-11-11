import React from 'react';
import PropTypes from 'prop-types';
import {
  SpeciesCell,
  GeneCellCuration,
  ReferenceCell,
  EvidenceCodesCellCuration,
  BasedOnGeneCellCuration,
  DataTable, ReferenceCellCuration, ReferencesCellCuration,
} from '../dataTable';
import AnnotatedEntitiesPopupCuration from '../dataTable/AnnotatedEntitiesPopupCuration';
import DiseaseLink from './DiseaseLink';
import {getDistinctFieldValue} from '../dataTable/utils';
import { compareByFixedOrder } from '../../lib/utils';
import { SPECIES_NAME_ORDER } from '../../constants';
import ProvidersCell from '../dataTable/ProvidersCell';
import useComparisonRibbonTableQuery from '../../hooks/useComparisonRibbonTableQuery';
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
      dataField: 'subject.taxon',
      text: 'Species',
      filterable: getDistinctFieldValue(resolvedData, 'subject.taxon').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterFormatter: speciesName => <SpeciesName>{speciesName}</SpeciesName>,
      headerStyle: {width: '100px'},
      formatter: species => <SpeciesCell species={species} />,
      hidden: !orthologGenes || !orthologGenes.length
    },
    {
      dataField: 'subject.curie',
      text: 'Gene',
      formatter:  (curie, row) => (
        <React.Fragment>
          <div>{GeneCellCuration(row.subject)}</div>
          <small>
            <AnnotatedEntitiesPopupCuration entities={row.primaryAnnotations}>
              Annotation details
            </AnnotatedEntitiesPopupCuration>
          </small>
        </React.Fragment>
      ),
      filterable: true,
      headerStyle: {width: '75px'},
    },
    {
      dataField: 'diseaseRelation.name',
      text: 'Association',
      formatter: type => <AssociationType type={type} />,
      filterable: getDistinctFieldValue(resolvedData, 'diseaseRelation.name'),
      filterFormatter: type => <AssociationType type={type} />,
      headerStyle: {width: '120px'},
    },
    {
      dataField: 'object.curie',
      text: 'Disease',
      filterable: true,
      headerStyle: {width: '150px'},
      formatter: (curie, row) => <DiseaseLink disease={row.object} />,
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      filterable: true,
      headerStyle: {width: '100px'},
      formatter: codes => <EvidenceCodesCellCuration evidenceCodes={codes} />,
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
      dataField: 'primaryAnnotations[0].with',
      text: 'Based On',
      filterable: true,
      filterName: 'basedOnGeneSymbol',
      headerStyle: {width: '100px'},
      formatter: BasedOnGeneCellCuration,
    },
    {
      dataField: 'references',
      text: 'References',
      filterable: true,
      filterName: 'reference',
      headerStyle: {width: '150px'},
      formatter: ReferencesCellCuration,
    }
  ];

  const data = results.map(annotation => ({
    species: annotation.subject.taxon,
    ...annotation,
  }));

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={data}
      downloadUrl={downloadUrl}
      keyField='id'
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
