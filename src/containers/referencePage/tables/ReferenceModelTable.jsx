import React from 'react';
import { SpeciesCell } from '../../../components/dataTable';
import ExternalLink from '../../../components/ExternalLink.jsx';
import createReferenceTable from './createReferenceTable.jsx';

const columns = [
  {
    dataField: 'species',
    text: 'Species',
    headerStyle: { width: '130px' },
    formatter: (species) => species && <SpeciesCell species={species} />,
  },
  {
    dataField: 'name',
    text: 'Name',
    headerStyle: { width: '400px' },
    formatter: (n) => n && <span dangerouslySetInnerHTML={{ __html: n }} />,
  },
  { dataField: 'type', text: 'Type', headerStyle: { width: '120px' } },
  {
    dataField: 'source',
    text: 'Source',
    headerStyle: { width: '140px' },
    formatter: (source, row) =>
      row.sourceUrl ? <ExternalLink href={row.sourceUrl}>{row.curie}</ExternalLink> : row.curie,
  },
];

const ReferenceModelTable = createReferenceTable({
  displayName: 'ReferenceModelTable',
  endpoint: 'models',
  columns,
  transform: (agm) => ({
    species: agm.taxon,
    name: agm.agmFullName?.displayText || agm.name,
    type: agm.subtype?.name,
    curie: agm.primaryExternalId,
    sourceUrl: agm.dataProviderCrossReference?.resourceDescriptorPage
      ? (agm.dataProviderCrossReference.resourceDescriptorPage.urlTemplate || '').replace(
          '[%s]',
          agm.dataProviderCrossReference.referencedCurie?.replace(/^[^:]+:/, '') || ''
        )
      : null,
    source: agm.dataProviderCrossReference?.resourceDescriptorPage?.resourceDescriptor?.name,
  }),
});

export default ReferenceModelTable;
