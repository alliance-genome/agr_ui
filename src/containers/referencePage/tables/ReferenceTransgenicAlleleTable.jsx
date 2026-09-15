import React from 'react';
import { AlleleCell, SpeciesCell } from '../../../components/dataTable';
import DataSourceLinkCuration from '../../../components/dataSourceLinkCuration.jsx';
import SynonymListCuration from '../../../components/SynonymListCuration.jsx';
import CommaSeparatedGeneList from '../../allelePage/CommaSeparatedGeneList.jsx';
import createReferenceTable from './createReferenceTable.jsx';

const constructsRelatedGenesFormatter = (constructRelatedGenes) =>
  (constructRelatedGenes || []).map(({ id, genes }) => (
    <div key={id}>
      <CommaSeparatedGeneList genes={genes} />
    </div>
  ));

const columns = [
  {
    dataField: 'species',
    text: 'Species',
    headerNode: (
      <>
        Species
        <br />
        <small className="text-muted text-transform-none">(carrying the transgene)</small>
      </>
    ),
    headerStyle: { width: '100px' },
    formatter: (taxon) => taxon && <SpeciesCell taxon={taxon} />,
  },
  {
    dataField: 'allele',
    text: 'Allele symbol',
    headerStyle: { width: '185px' },
    formatter: (allele) => <AlleleCell allele={allele} usePeid={true} />,
  },
  {
    dataField: 'synonyms',
    text: 'Allele Synonyms',
    headerStyle: { width: '165px' },
    formatter: (synonyms) => <SynonymListCuration synonyms={synonyms} />,
  },
  {
    dataField: 'constructs',
    text: 'Transgenic construct',
    headerStyle: { width: '185px' },
    formatter: (constructs) =>
      (constructs || []).map(
        (tac) =>
          !tac.construct?.placeholder && (
            <div key={tac.construct?.primaryExternalId} className="text-break">
              <DataSourceLinkCuration reference={tac.construct?.dataProviderCrossReference}>
                {tac.construct?.constructSymbol?.displayText}
              </DataSourceLinkCuration>
            </div>
          )
      ),
  },
  {
    dataField: 'expressedGenes',
    text: 'Expressed components',
    headerStyle: { width: '150px' },
    formatter: constructsRelatedGenesFormatter,
  },
  {
    dataField: 'targetedGenes',
    text: 'Knock-down targets',
    headerStyle: { width: '140px' },
    formatter: constructsRelatedGenesFormatter,
  },
  {
    dataField: 'regulatoryGenes',
    text: 'Regulatory regions',
    headerStyle: { width: '140px' },
    formatter: constructsRelatedGenesFormatter,
  },
];

const ReferenceTransgenicAlleleTable = createReferenceTable({
  displayName: 'ReferenceTransgenicAlleleTable',
  endpoint: 'transgenic-alleles',
  columns,
  transform: (row) => {
    const constructs = row.transgenicAlleleConstructs || [];
    return {
      species: row.allele?.taxon,
      allele: row.allele,
      synonyms: row.allele?.alleleSynonyms,
      constructs,
      expressedGenes: constructs.map((tac) => ({ id: tac.construct?.primaryExternalId, genes: tac.expressedGenes })),
      targetedGenes: constructs.map((tac) => ({ id: tac.construct?.primaryExternalId, genes: tac.targetedGenes })),
      regulatoryGenes: constructs.map((tac) => ({ id: tac.construct?.primaryExternalId, genes: tac.regulatoryGenes })),
    };
  },
});

export default ReferenceTransgenicAlleleTable;
