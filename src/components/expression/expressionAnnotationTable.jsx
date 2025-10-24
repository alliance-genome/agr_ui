import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { ReferenceCell, GeneCell, DataTable } from '../dataTable';
import DataSourceLink from '../dataSourceLink.jsx';
import CommaSeparatedList from '../commaSeparatedList.jsx';
import { compareAlphabeticalCaseInsensitive, compareByFixedOrder } from '../../lib/utils';
import { getResourceUrl } from '../dataTable/getResourceUrl.jsx';
import { getIdentifier, getSingleReferenceUrl } from '../dataTable/utils.jsx';
import { getDistinctFieldValue } from '../dataTable/utils.jsx';
import { SPECIES_NAME_ORDER } from '../../constants';
import useComparisonRibbonTableQuery from '../../hooks/useComparisonRibbonTableQuery';
import SpeciesName from '../SpeciesName.jsx';
import ExternalLink from '../ExternalLink.jsx';

const ExpressionAnnotationTable = ({ focusGeneId, focusTaxonId, orthologGenes, term }) => {
  const params = {};
  const {
    downloadUrl,
    supplementalData,
    downloadBody,
    data: results,
    ...tableProps
  } = useComparisonRibbonTableQuery('/api/expression', focusGeneId, focusTaxonId, orthologGenes, term, params);

  const columns = [
    {
      dataField: 'key',
      text: 'key',
      hidden: true,
    },
    {
      dataField: 'species',
      text: 'Species',
      formatter: (s) => <SpeciesName>{s}</SpeciesName>,
      filterable: getDistinctFieldValue(supplementalData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterFormatter: (speciesName) => <SpeciesName>{speciesName}</SpeciesName>,
      headerStyle: { width: '100px' },
      hidden: !orthologGenes || !orthologGenes.length,
    },
    {
      dataField: 'gene',
      text: 'Gene',
      formatter: (geneCell) => {
        if (!geneCell) {
          return null;
        }
        return <GeneCell id={geneCell.primaryExternalId} symbol={geneCell.geneSymbol.displayText} />;
      },
      filterable: true,
      headerStyle: { width: '120px' },
      hidden: !orthologGenes || !orthologGenes.length,
    },
    {
      dataField: 'location',
      text: 'Location',
      filterable: true,
      headerStyle: { width: '150px' },
    },
    {
      dataField: 'stage',
      text: 'Stage',
      filterable: true,
      headerStyle: { width: '130px' },
    },
    {
      dataField: 'assay',
      text: 'Assay',
      formatter: (assayCell) => {
        if (!assayCell) return null;
        const assayName = assayCell.name;
        const displaySynonym = assayCell.synonyms?.find((synonym) => synonym.isDisplaySynonym)?.name;
        return <span title={assayName}>{displaySynonym}</span>;
      },
      filterable: true,
      headerStyle: { width: '150px' },
    },
    {
      dataField: 'source',
      text: 'Source',
      formatter: (crossReferences = ([] = {})) => (
        <div>
          {crossReferences?.map(({ referencedCurie, displayName } = {}) => (
            <div key={referencedCurie}>
              <ExternalLink
                href={getResourceUrl({
                  identifier: referencedCurie.toUpperCase(),
                  type: 'gene/expression/annotation/detail',
                })}
              >
                {displayName}
              </ExternalLink>
            </div>
          ))}
        </div>
      ),
      headerStyle: { width: '200px' },
      filterable: true,
      filterName: 'source',
    },
    {
      dataField: 'reference',
      text: 'Reference',
      formatter: (referenceId) => {
        return (
          <ExternalLink href={getSingleReferenceUrl(referenceId).url} key={referenceId} title={referenceId}>
            {referenceId}
          </ExternalLink>
        );
      },
      headerStyle: { width: '150px' },
      filterable: true,
      filterName: 'reference',
    },
  ];

  const data = results?.map((result) => ({
    key: hash(result),
    species: result.geneExpressionAnnotation.expressionAnnotationSubject.taxon.name,
    gene: result.geneExpressionAnnotation.expressionAnnotationSubject,
    location: result.geneExpressionAnnotation.whereExpressedStatement,
    stage: result.geneExpressionAnnotation.whenExpressedStageName,
    assay: result.geneExpressionAnnotation.expressionAssayUsed,
    source: result.geneExpressionAnnotation.crossReferences ? result.geneExpressionAnnotation.crossReferences : null,
    reference: result.referenceId,
  }));

  const sortOptions = [
    {
      value: 'species',
      label: 'Species',
    },
    {
      value: 'location',
      label: 'Location',
    },
    {
      value: 'assay',
      label: 'Assay',
    },
    {
      value: 'stage',
      label: 'Stage',
    },
    {
      value: 'gene',
      label: 'Gene',
    },
  ];

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={data || []}
      downloadUrl={downloadUrl}
      downloadBody={downloadBody}
      downloadMethod="POST"
      keyField="key"
      sortOptions={sortOptions}
    />
  );
};

ExpressionAnnotationTable.propTypes = {
  focusGeneId: PropTypes.string,
  orthologGenes: PropTypes.array,
  term: PropTypes.string,
};

export default ExpressionAnnotationTable;
