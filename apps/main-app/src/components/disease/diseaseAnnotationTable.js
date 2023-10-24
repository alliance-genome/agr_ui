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
import { getDistinctFieldValue, buildProvidersWithUrl } from '../dataTable/utils';
import {compareByFixedOrder} from '../../lib/utils';
import {SPECIES_NAME_ORDER} from '../../constants';
import ProvidersCellCuration from '../dataTable/ProvidersCellCuration';
import useComparisonRibbonTableQuery from '../../hooks/useComparisonRibbonTableQuery';
import SpeciesName from '../SpeciesName';
import AssociationType from '../AssociationType';
import DiseaseLinkCuration from './DiseaseLinkCuration';
import DiseaseQualifiersColumn from "../dataTable/DiseaseQualifiersColumn";


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
    resolvedData,
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
            <AnnotatedEntitiesPopupCuration entities={row.primaryAnnotations} mainRowCurie={row.subject.curie}>
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
      dataField: 'relationNegation',
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
      filterable: getDistinctFieldValue(resolvedData, 'associationType'),
      filterFormatter: type => <AssociationType type={type} />,
      headerStyle: {width: '120px'},
    },
    {
      dataField: 'diseaseQualifiers',
      text: 'Disease Qualifier',
      filterable: getDistinctFieldValue(resolvedData, 'diseaseQualifiers'),
      filterName: 'diseaseQualifier',
      filterType: 'checkbox',
      headerStyle: {width: '100px'},
      formatter: diseaseQualifiers => <DiseaseQualifiersColumn qualifiers={diseaseQualifiers} />,
    },
    {
      dataField: 'object.curie',
      text: 'Disease',
      filterable: true,
      headerStyle: {width: '150px'},
      formatter: (curie, row) => <DiseaseLinkCuration disease={row.object} />,
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
    providers: buildProvidersWithUrl(annotation.primaryAnnotations),
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
