const FIXTURE_HREF = 'https://google.com';

export const FIXTURE_SEARCH_STATE = {
  query: 'huntington\'s',
  results: [
    {
      symbol: 'NTPCR',
      name: 'RADiation sensitive',
      geneId: 'MGI:12345678',
      href: FIXTURE_HREF,
      sourceHref: FIXTURE_HREF,
      synonyms: 'geneA, geneB',
      geneType: 'ORF',
      genomicStartCoordinates: 100,
      genomicStopCoordinates: 1000,
      relativeStartCoordinates: 100,
      relativeStopCoordinates: 1000,
      species: 'Mus musculus',
      disease: 'lore ipsum <mark>huntington\'s</mark> sit onsectetur adipiscing elit, sed do eiusmod',
      highlight: {
        disease: ['lorem ipsum <mark>huntington\'s</mark> sit onsectetur adipiscing elit, sed do eiusmod']
      }
    },
    {
      symbol: 'Ctag2',
      name: 'RADiation sensitive',
      geneId: 'MGI:12345678',
      href: FIXTURE_HREF,
      sourceHref: FIXTURE_HREF,
      synonyms: 'geneA, geneB',
      geneType: 'ORF',
      genomicStartCoordinates: 100,
      genomicStopCoordinates: 1000,
      relativeStartCoordinates: 100,
      relativeStopCoordinates: 1000,
      species: 'Mus musculus',
      disease: 'lorem ipsum <mark>huntington\'s</mark> sit onsectetur adipiscing elit, sed do eiusmod',
      highlight: {
        disease: ['lorem ipsum <mark>huntington\'s</mark> sit onsectetur adipiscing elit, sed do eiusmod']
      }
    }
  ],
  activeCategory: 'gene',
  aggregations: [
    {
      name: 'species',
      displayName: 'Species',
      values: [
        {
          name: 'Mus musculus',
          displayName: 'Mus musculus',
          total: 2,
          isActive: true
        },
        {
          name: 'Danio rerio',
          displayName: 'Danio rerio',
          total: 2,
          isActive: false
        },
        {
          name: 'Saccharomyces cerevisiae',
          displayName: 'Saccharomyces cerevisiae',
          total: 1,
          isActive: false
        }
      ]
    },
    {
      name: 'go',
      displayName: 'GO (Gene Ontology)',
      values: [
        {
          name: 'mediator complex',
          displayName: 'Mediator Complex',
          total: 3,
          isActive: false
        },
        {
          name: 'mitochondrial inner membrane',
          displayName: 'Mitochondrial Inner Membrane',
          total: 1,
          isActive: false
        },
        {
          name: 'cell periphery',
          displayName: 'Cell Periphery',
          total: 1,
          isActive: false
        }
      ]
    },
    {
      name: 'disease',
      displayName: 'Disease',
      values: [
        {
          name: 'huntington\'s Disease',
          displayName: 'Huntington\'s disease',
          total: 5,
          isActive: false
        }
      ]
    },
    {
      name: 'ortholog groups',
      displayName: 'Ortholog Groups',
      values: [
        {
          name: 'group A',
          displayName: 'group A',
          total: 3,
          isActive: false
        },
        {
          name: 'group B',
          displayName: 'group B',
          total: 1,
          isActive: false
        }
      ]
    }
  ],
  total: 2,
  isPending: false
};