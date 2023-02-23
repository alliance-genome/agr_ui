import React from 'react';
import PropTypes from 'prop-types';
import {
  BasedOnGeneCellCuration,
  DataTable,
  EvidenceCodesCellCuration,
  GeneCellCuration,
  ReferencesCellCuration,
  SpeciesCell,
} from '../dataTable';
import AnnotatedEntitiesPopupCuration from '../dataTable/AnnotatedEntitiesPopupCuration';
import DiseaseLink from './DiseaseLink';
import {getDistinctFieldValue} from '../dataTable/utils';
import {compareByFixedOrder} from '../../lib/utils';
import {SPECIES_NAME_ORDER} from '../../constants';
import ProvidersCellCuration from '../dataTable/ProvidersCellCuration';
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

  const buildProviders = (annotation) => {
    return annotation.primaryAnnotations.map(primaryAnnotation => {
      return {
        dataProvider: primaryAnnotation.dataProvider,
        secondaryDataProvider: primaryAnnotation.secondaryDataProvider
      }
    });
  }

  const buildWith = (annotation) => {
    const filteredPrimaryAnnotations = annotation.primaryAnnotations.filter(primaryAnnotation => primaryAnnotation.with);
    const withArray = filteredPrimaryAnnotations.map(primaryAnnotation => primaryAnnotation.with);
    return withArray.flat(1);
  }

  let columns = [
    {
      dataField: 'subject.taxon',
      text: 'Species',
      filterName: 'species',
      filterable: getDistinctFieldValue(resolvedData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
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
      filterName: 'subject.symbol',
    },
    {
      dataField: 'diseaseRelationNegation',
      text: 'Association',
      formatter: type => <AssociationType type={type} />,
      filterName: 'associationType',
      filterable: getDistinctFieldValue(resolvedData, 'associationType'),
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
      formatter: providers => providers && <ProvidersCellCuration providers={providers} />,
      filterable: true,
      headerStyle: {width: '100px'},
      filterName: 'dataProvider',
    },
    {
      dataField: 'basedOn',
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
    providers: buildProviders(annotation),
    basedOn: buildWith(annotation),
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
