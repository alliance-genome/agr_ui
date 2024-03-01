import React from 'react';
import PropTypes from 'prop-types';
import {
  BasedOnGeneCellCuration,
  DataTable,
  EvidenceCodesCellCuration,
  GeneCellCuration,
  ReferencesCellCuration,
} from '../../components/dataTable';

import ProvidersCellCuration from '../../components/dataTable/ProvidersCellCuration';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import AssociationType from '../../components/AssociationType';
import { buildProvidersWithUrl } from '../../components/dataTable/utils';
import SpeciesCell from '../../components/dataTable/SpeciesCell';
import DiseaseLinkCuration from '../../components/disease/DiseaseLinkCuration';
import DiseaseQualifiersColumn from '../../components/dataTable/DiseaseQualifiersColumn';
import AnnotatedEntitiesPopupCuration from '../../components/dataTable/AnnotatedEntitiesPopupCuration';

//TODO: once tickets SCRUM-3647, SCRUM-3648, and SCRUM-3649 are complete, refactor this and the diseaseAnnotationTable component
//if needed
const DiseaseToGeneTable = ({id}) => {
  const {
    data: results,
    resolvedData,
    ...tableProps
  } = useDataTableQuery(`/api/disease/${id}/genes`, undefined, { sizePerPage: 10, }, {}, 60000);

  const columns = [
    {
      dataField: 'subject.curie',
      text: 'Gene',
      formatter:  (curie, row) => (
        <React.Fragment>
          <div>{GeneCellCuration(row.subject)}</div>
          <small>
            <AnnotatedEntitiesPopupCuration parentPage='disease' entities={row.primaryAnnotations} mainRowCurie={row.subject.curie}>
              Annotation details
            </AnnotatedEntitiesPopupCuration>
          </small>
        </React.Fragment>
      ),
      headerStyle: {width: '75px'},
    },
    {
      dataField: 'subject.taxon',
      text: 'Species',
      headerStyle: {width: '100px'},
      formatter: species => <SpeciesCell species={species} />,
    },
    {
      dataField: 'generatedRelationString',
      text: 'Association',
      helpPopupProps: {
        id: 'disease-page--gene-disease-associations-table--association-help',
        children: <div>
          <p>"Is Implicated in" means that some variant of the gene is shown to function in causing or modifying a disease (for human) or a disease model state.</p>
          <p>"Is a marker for" is used when there is evidence of an association but insufficient evidence to establish causality and does not necessarily imply that the existence of, or change in the biomarker is causal for the disease, but rather may result from it.</p>
        </div>,
      },
      formatter: type => <AssociationType type={type} />,
      headerStyle: {width: '120px'},
    },
    {
      dataField: 'diseaseQualifiers',
      text: 'Disease Qualifier',
      headerStyle: {width: '100px'},
      formatter: diseaseQualifiers => <DiseaseQualifiersColumn qualifiers={diseaseQualifiers} />,
    },
    {
      dataField: 'object.curie',
      text: 'Disease',
      headerStyle: {width: '150px'},
      formatter: (curie, row) => <DiseaseLinkCuration disease={row.object} />,
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      helpPopupProps: {
        id: 'disease-page--gene-disease-associations-table--evidence-help',
        children: <span>Mouse-over to decipher the evidence code. The Alliance uses these <a href='https://www.alliancegenome.org/help#docodes'>evidence codes</a> to justify DO annotations.</span>,
      },
      headerStyle: {width: '100px'},
      formatter: codes => <EvidenceCodesCellCuration evidenceCodes={codes} />,
    },
    {
      dataField: 'basedOnGenes',
      text: 'Based On',
      helpPopupProps: {
        id: 'disease-page--gene-disease-associations-table--based-on-help',
        children: <span>SGD uses orthology to human genes to associate yeast genes with the disease.</span>
      },
      headerStyle: {width: '100px'},
      formatter: BasedOnGeneCellCuration,
    },
    {
      dataField: 'providers',
      text: 'Source',
      formatter: providers => providers && <ProvidersCellCuration providers={providers} />,
      headerStyle: {width: '100px'},
    },
    {
      dataField: 'references',
      text: 'References',
      headerStyle: {width: '150px'},
      formatter: ReferencesCellCuration,
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

DiseaseToGeneTable.propTypes = {
  id: PropTypes.string,
};

export default DiseaseToGeneTable;
