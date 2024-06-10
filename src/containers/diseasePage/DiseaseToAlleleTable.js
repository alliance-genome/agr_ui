import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  EvidenceCodesCellCuration,
  ReferencesCellCuration,
  SpeciesCell
} from '../../components/dataTable';
import ProvidersCellCuration from '../../components/dataTable/ProvidersCellCuration';
import DiseaseLinkCuration from '../../components/disease/DiseaseLinkCuration';
import {getDistinctFieldValue} from '../../components/dataTable/utils';
import {compareByFixedOrder} from '../../lib/utils';
import {SPECIES_NAME_ORDER} from '../../constants';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import SpeciesName from '../../components/SpeciesName';
import AssociationType from '../../components/AssociationType';
import DiseaseQualifiersColumn from '../../components/dataTable/DiseaseQualifiersColumn';
import { getIdentifier, buildProvidersWithUrl } from '../../components/dataTable/utils';
import AnnotatedEntitiesPopupCuration from '../../components/dataTable/AnnotatedEntitiesPopupCuration';
import { ALLELE_DETAILS_COLUMNS } from '../../components/dataTable/constants';
import AlleleCellCuration from '../../components/dataTable/AlleleCellCuration';

const DiseaseToAlleleTable = ({id}) => {
  const {
    data: results,
    resolvedData,
    ...tableProps
  } = useDataTableQuery(`/api/disease/${id}/alleles`, undefined, { sizePerPage: 10, }, {}, 60000);

  const columns = [
    {
      dataField: 'subject',
      text: 'Allele',
      formatter: (subject, rowData) => {
        return(
          <>
            <div>
              <AlleleCellCuration
                identifier={getIdentifier(subject)}
                alleleSymbol={subject?.alleleSymbol}
              />
            </div>
            <small>
              <AnnotatedEntitiesPopupCuration
                entities={rowData.primaryAnnotations}
                mainRowCurie={getIdentifier(subject)}
                pubModIds={rowData.pubmedPubModIDs}
                columnNameSet={ALLELE_DETAILS_COLUMNS}
              >
                Annotation details
              </AnnotatedEntitiesPopupCuration>
            </small>
          </>
        )
      },
      headerStyle: { width: '210px' },
      filterable: true,
      filterName: 'alleleName',
    },
    {
      dataField: 'subject.taxon',
      text: 'Species',
      formatter: species => <SpeciesCell species={species}/>,
      filterName: 'species',
      filterable: getDistinctFieldValue(resolvedData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterFormatter: speciesName => <SpeciesName>{speciesName}</SpeciesName>,
      filterType: 'checkbox',
      headerStyle: {width: '100px'},
    },
    {
      dataField: 'generatedRelationString',
      text: 'Association',
      formatter: type => <AssociationType type={type} />,
      headerStyle: {width: '110px'},
      filterName: 'associationType',
      filterable: getDistinctFieldValue(resolvedData, 'associationType'),
      filterFormatter: type => <AssociationType type={type} />,
      filterType: 'checkbox',
    },
    {
      dataField: 'diseaseQualifiers',
      text: 'Disease Qualifier',
      headerStyle: { width: '110px' },
      formatter: diseaseQualifiers => <DiseaseQualifiersColumn qualifiers={diseaseQualifiers} />,
      filterable: getDistinctFieldValue(resolvedData, 'diseaseQualifiers'),
      filterName: 'diseaseQualifier',
      filterType: 'checkbox',
    },
    {
      dataField: 'object',
      text: 'Disease',
      formatter: object => <DiseaseLinkCuration disease={object} />,
      headerStyle: {width: '120px'},
      filterName: 'disease',
      filterable: true,
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      helpPopupProps: {
        id: 'disease-page--allele-disease-associations-table--evidence-help',
        children: <span>Mouse-over to decipher the evidence code. The Alliance uses these <a href='https://www.alliancegenome.org/help#docodes'>evidence codes</a> to justify DO annotations.</span>,
      },
      formatter: codes => <EvidenceCodesCellCuration evidenceCodes={codes} />,
      headerStyle: {width: '100px'},
      filterable: true,
      filterName: 'evidenceCode',
    },
    {
      dataField: 'providers',
      text: 'Source',
      formatter: providers => providers && <ProvidersCellCuration providers={providers} />,
      headerStyle: {width: '100px'},
      filterable: true,
      filterName: 'dataProvider',
    },
    {
      dataField: 'pubmedPubModIDs',
      text: 'References',
      formatter: (pubmedPubModIDs) => {
        return <ReferencesCellCuration pubModIds={pubmedPubModIDs}/>
      },
      headerStyle: {width: '150px'},
      filterable: true,
      filterName: 'reference',
    }
  ];

  const rows = results.map(association => ({
    species: association.subject.taxon,
    providers: buildProvidersWithUrl(association.primaryAnnotations),
    ...association,
  }));

  const sortOptions = [
    {
      value: 'disease',
      label: 'Disease',
    },
    {
      value: 'allele',
      label: 'Allele',
    },
    {
      value: 'species',
      label: 'Species',
    },
  ];

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={rows}
      downloadUrl={`/api/disease/${id}/alleles/download`}
      keyField='primaryKey'
      sortOptions={sortOptions}
    />
  );
};

DiseaseToAlleleTable.propTypes = {
  id: PropTypes.string,
};

export default DiseaseToAlleleTable;
