import React from 'react';
import PropTypes from 'prop-types';
import {
  AlleleCell,
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
import { getAlleleObject, buildProvidersWithUrl } from '../../components/dataTable/utils';

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
      formatter: (subject) => {
        const allele = getAlleleObject(subject);
        return(
          <React.Fragment>
            <AlleleCell allele={allele}/>
          </React.Fragment>
        )
      },
      headerStyle: { width: '75px' },
      filterable: true,
      filterName: 'alleleName',
    },
    {
      dataField: 'subject.taxon',
      text: 'Species',
      formatter: species => <SpeciesCell species={species}/>,
      filterable: getDistinctFieldValue(resolvedData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterFormatter: speciesName => <SpeciesName>{speciesName}</SpeciesName>,
      headerStyle: {width: '100px'},
    },
    {
      dataField: 'generatedRelationString',
      text: 'Association',
      formatter: type => <AssociationType type={type} />,
      headerStyle: {width: '110px'},
      filterable: getDistinctFieldValue(resolvedData, 'associationType'),
      filterFormatter: type => <AssociationType type={type} />,
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

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={rows}
      keyField='primaryKey'
    />
  );
};

DiseaseToAlleleTable.propTypes = {
  id: PropTypes.string,
};

export default DiseaseToAlleleTable;
