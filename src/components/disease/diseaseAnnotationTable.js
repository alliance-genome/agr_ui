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
import { getIdentifier, getDistinctFieldValue, buildProvidersWithUrl } from '../dataTable/utils';
import {compareByFixedOrder} from '../../lib/utils';
import {SPECIES_NAME_ORDER} from '../../constants';
import ProvidersCellCuration from '../dataTable/ProvidersCellCuration';
import useComparisonRibbonTableQuery from '../../hooks/useComparisonRibbonTableQuery';
import SpeciesName from '../SpeciesName';
import AssociationType from '../AssociationType';
import DiseaseLinkCuration from './DiseaseLinkCuration';
import DiseaseQualifiersColumn from "../dataTable/DiseaseQualifiersColumn";
import { GENE_DETAILS_COLUMNS } from '../dataTable/constants';

import hash from 'object-hash';


/*
 * Disease ribbon-table
 * Listens to events in the disease-ribbon component
 */
const DiseaseAnnotationTable = ({
  focusGeneId,
  focusTaxonId,
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
    supplementalData,
    ...tableProps
  } = useComparisonRibbonTableQuery('/api/disease', focusGeneId, focusTaxonId, orthologGenes, term, params);


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
      filterable: getDistinctFieldValue(supplementalData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterFormatter: speciesName => <SpeciesName>{speciesName}</SpeciesName>,
      filterType: 'checkbox',
      headerStyle: {width: '100px'},
      formatter: species => <SpeciesCell species={species} />,
      hide: !orthologGenes || !orthologGenes.length
    },
    {
      dataField: 'subject',
      text: 'Gene',
      formatter:  (subject, row) => (
        <React.Fragment>
          <GeneCellCuration curie={getIdentifier(subject)} geneSymbol={subject.geneSymbol} />
          <small>
            <AnnotatedEntitiesPopupCuration
              entities={row.primaryAnnotations}
              mainRowCurie={getIdentifier(subject)}
              pubModIds={row.pubmedPubModIDs}
              columnNameSet={GENE_DETAILS_COLUMNS}
            >
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
      dataField: 'generatedRelationString',
      text: 'Association',
      helpPopupProps: {
        id: 'gene-page--disease-associations-table--association-help',
        children: <div>
          <p>"Is Implicated in" means that some variant of the gene is shown to function in causing or modifying a disease (for human) or a disease model state.</p>
          <p>"Is a marker for" is used when there is evidence of an association but insufficient evidence to establish causality and does not necessarily imply that the existence of, or change in the biomarker is causal for the disease, but rather may result from it.</p>
        </div>,
      },
      formatter: type => <AssociationType type={type} />,
      filterName: 'associationType',
      filterable: getDistinctFieldValue(supplementalData, 'associationType'),
      filterFormatter: type => <AssociationType type={type} />,
      headerStyle: {width: '120px'},
    },
    {
      dataField: 'diseaseQualifiers',
      text: 'Disease Qualifier',
      filterable: getDistinctFieldValue(supplementalData, 'diseaseQualifiers'),
      filterName: 'diseaseQualifier',
      filterType: 'checkbox',
      headerStyle: {width: '100px'},
      formatter: diseaseQualifiers => <DiseaseQualifiersColumn qualifiers={diseaseQualifiers} />,
    },
    {
      //kept as disease instead of object so that the filter works
      dataField: 'disease',
      text: 'Disease',
      filterable: true,
      headerStyle: {width: '150px'},
      formatter: disease => <DiseaseLinkCuration disease={disease} />,
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      helpPopupProps: {
        id: 'gene-page--disease-associations-table--evidence-help',
        children: <span>Mouse-over to decipher the evidence code. The Alliance uses these <a href='https://www.alliancegenome.org/help#docodes'>evidence codes</a> to justify DO annotations.</span>,
      },
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
      helpPopupProps: {
        id: 'gene-page--disease-associations-table--based-on-help',
        children: <span>SGD uses orthology to human genes to associate yeast genes with the disease.</span>
      },
      filterable: true,
      filterName: 'basedOnGeneSymbol',
      headerStyle: {width: '100px'},
      formatter: BasedOnGeneCellCuration,
    },
    {
      dataField: 'pubmedPubModIDs',
      text: 'References',
      filterable: true,
      filterName: 'reference',
      headerStyle: {width: '150px'},
      formatter: (pubModIds) => <ReferencesCellCuration pubModIds={pubModIds}/>,
    }
  ];

  const data = results?.map(annotation => ({
    species: annotation.subject.taxon,
    providers: buildProvidersWithUrl(annotation.primaryAnnotations),
    basedOn: buildWith(annotation),
    id: hash(annotation),
    disease: annotation.object,
    ...annotation,
  }));

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={data || []}
      supplementalData={supplementalData}
      //temporarily remove download button due to bug see SCRUM-5109
      //downloadUrl={downloadUrl}
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
