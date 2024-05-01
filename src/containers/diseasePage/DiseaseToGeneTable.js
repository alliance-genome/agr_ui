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
import { buildProvidersWithUrl, getIsViaOrthology, getDistinctFieldValue, getIdentifier } from '../../components/dataTable/utils';
import { compareByFixedOrder } from '../../lib/utils';
import { SPECIES_NAME_ORDER } from '../../constants';
import SpeciesCell from '../../components/dataTable/SpeciesCell';
import SpeciesName from '../../components/SpeciesName';
import DiseaseLinkCuration from '../../components/disease/DiseaseLinkCuration';
import DiseaseQualifiersColumn from '../../components/dataTable/DiseaseQualifiersColumn';
import AnnotatedEntitiesPopupCuration from '../../components/dataTable/AnnotatedEntitiesPopupCuration';
import ReferenceCellViaOrthologyCuration from '../../components/dataTable/ReferencesCellViaOrthologyCuration';

const DiseaseToGeneTable = ({ id }) => {
  const {
    data: results,
    resolvedData,
    ...tableProps
  } = useDataTableQuery(`/api/disease/${id}/genes`, undefined, { sizePerPage: 10, }, {}, 60000);



  const columns = [
    {
      dataField: 'subject',
      text: 'Gene',
      formatter: (subject, row) => {
        const isViaOrthology = getIsViaOrthology(row);
        return (
          <React.Fragment>
            <div>
              <GeneCellCuration curie={getIdentifier(subject)} geneSymbol={subject.geneSymbol} />
            </div>
            {!isViaOrthology && (
              <small>
                <AnnotatedEntitiesPopupCuration
                  parentPage='disease'
                  entities={row.primaryAnnotations}
                  mainRowCurie={getIdentifier(subject)}
                  pubModIds={row.pubmedPubModIDs}
                >
                  Annotation details
                </AnnotatedEntitiesPopupCuration>
              </small>
            )}
          </React.Fragment>
        );
      },
      headerStyle: { width: '75px' },
      filterable: true,
      filterName: 'geneName',
    },
    {
      dataField: 'subject.taxon',
      text: 'Species',
      headerStyle: { width: '100px' },
      formatter: species => <SpeciesCell species={species} />,
      filterName: 'species',
      filterable: getDistinctFieldValue(resolvedData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterFormatter: speciesName => <SpeciesName>{speciesName}</SpeciesName>,
      filterType: 'checkbox',
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
      headerStyle: { width: '120px' },
      filterName: 'associationType',
      filterable: getDistinctFieldValue(resolvedData, 'associationType'),
      filterFormatter: type => <AssociationType type={type} />,
      filterType: 'checkbox',
    },
    {
      dataField: 'diseaseQualifiers',
      text: 'Disease Qualifier',
      headerStyle: { width: '100px' },
      formatter: diseaseQualifiers => <DiseaseQualifiersColumn qualifiers={diseaseQualifiers} />,
      filterable: getDistinctFieldValue(resolvedData, 'diseaseQualifiers'),
      filterName: 'diseaseQualifier',
      filterType: 'checkbox',
    },
    {
      dataField: 'disease',
      text: 'Disease',
      headerStyle: { width: '150px' },
      formatter: (curie, row) => <DiseaseLinkCuration disease={row.object} />,
      filterable: true,
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      helpPopupProps: {
        id: 'disease-page--gene-disease-associations-table--evidence-help',
        children: <span>Mouse-over to decipher the evidence code. The Alliance uses these <a href='https://www.alliancegenome.org/help#docodes'>evidence codes</a> to justify DO annotations.</span>,
      },
      headerStyle: { width: '100px' },
      formatter: (codes) => <EvidenceCodesCellCuration evidenceCodes={codes}/>,
      filterable: true,
      filterName: 'evidenceCode',
    },
    {
      dataField: 'basedOnGenes',
      text: 'Based On',
      helpPopupProps: {
        id: 'disease-page--gene-disease-associations-table--based-on-help',
        children: <span>SGD uses orthology to human genes to associate yeast genes with the disease. 
          The Based On column is also used for inferred via-orthology disease annotations to indicate the gene that was directly (experimentally) annotated to the disease
          </span>
      },
      headerStyle: { width: '100px' },
      formatter: BasedOnGeneCellCuration,
      filterable: true,
      filterName: 'basedOnGeneSymbol',
    },
    {
      dataField: 'providers',
      text: 'Source',
      formatter: providers => providers && <ProvidersCellCuration providers={providers} />,
      headerStyle: { width: '100px' },
      filterable: true,
      filterName: 'dataProvider',
    },
    {
      dataField: 'pubmedPubModIDs',
      text: 'References',
      headerStyle: { width: '150px' },
      formatter: (pubModIds, row) => {
        const isViaOrthology = getIsViaOrthology(row);
        if(!isViaOrthology) return <ReferencesCellCuration pubModIds={pubModIds}/>
        return <ReferenceCellViaOrthologyCuration/>
      },
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
      value: 'gene',
      label: 'Gene',
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
      downloadUrl={`/api/disease/${id}/genes/download`}
      keyField='primaryKey'
      sortOptions={sortOptions}
    />
  );
};

DiseaseToGeneTable.propTypes = {
  id: PropTypes.string,
};

export default DiseaseToGeneTable;
