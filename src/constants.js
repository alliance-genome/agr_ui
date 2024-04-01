export const HELP_EMAIL = 'help@alliancegenome.org';
export const SEARCH_API_ERROR_MESSAGE = `There was a problem connecting to the server. Please refresh the page. If you continue to see this message, please contact ${HELP_EMAIL}`;
export const LARGE_COL_CLASS = 'col-md-8 col-12';
export const SMALL_COL_CLASS = 'col-md-4 col-12';

/* Wordpress REST API connection setting */
export const WORDPRESS_REST_API_BASE = 'https://public-api.wordpress.com/wp/v2/sites/alliancegenome.wordpress.com';
export const WORDPRESS_PAGE_BASE_URL = WORDPRESS_REST_API_BASE + '/pages?slug=';
export const WORDPRESS_POST_BASE_URL = WORDPRESS_REST_API_BASE + '/posts';
export const WORDPRESS_POST_URL = WORDPRESS_POST_BASE_URL + '?slug=';
export const WARNING_BANNER_SLUG = 'warning-banner';

//the order in this array matters for the category icons
export const CATEGORIES = [
  {
    name: 'all',
    displayName: 'All'
  },
  {
    name: 'gene',
    displayName: 'Gene',
    displayFields: ['name', 'synonyms', 'primaryKey', 'biotype'],
  },
  {
    name: 'go',
    displayName: 'Gene Ontology',
    displayFields: ['primaryKey', 'collapsible_synonyms', 'branch']
  },
  {
    name: 'disease',
    displayName: 'Disease',
    displayFields: ['primaryKey', 'definition'],
  },
  {
    name: 'allele',
    displayName: 'Allele/Variant',
    displayFields: ['primaryKey','genes', 'synonyms','variantType','molecularConsequence', 'diseases', 'variantName'],
  },
  {
    name: 'model',
    displayName: 'Model',
    displayFields: ['primaryKey','synonyms'],
  },
  {
    name: 'dataset',
    displayName: 'HTP Dataset Index',
    displayFields: ['dataProviderNote', 'idCollection', 'tags', 'summary']
  },
];

export const NON_HIGHLIGHTED_FIELDS = [
  'sourceHref',
  'href',
  'category',
  'homologs',
  'paralogs',
  'primaryKey',
  'orthologs',
  'homologs.symbol',
  'homologs.panther_family'
];

//show these fields in both the highlight section and their normal spot
export const DUPLICATE_HIGHLIGHTED_FIELDS = [
  'crossReferences',
  'synonyms'
];

export const NAV_MENU = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Data and Tools',
    sub: [
      {
        label: 'Downloads',
        route: '/downloads',
      },
      {
        label: 'API',
        route: '/swagger-ui',
        external: true,
      },
      {
        label: 'Submit Data',
        route: '/submit-data',
      },
      {
        label: 'Textpresso',
        route: '/textpresso',
      },
      {
        label: 'Tools and Prototypes',
        route: '/prototypes',
      },
      {
        label: 'COVID-19 Information',
        route: '/coronavirus-resources',
      },
      {
        label: 'AllianceMine',
        route: '/bluegenes/alliancemine',
        external: true,
      },
      {
        label: 'JBrowse',
        route: '/jbrowse/?data=data%2FHomo%20sapiens',
        external: true,
      }
    ]
  },
  {
    label: 'Members',
    sub: [
      {
        label: 'FlyBase',
        shortLabel: 'FlyBase',
        route: '/members/flybase'
      },
      {
        label: 'Mouse Genome Database',
        shortLabel: 'MGD',
        route: '/members/mgd'
      },
      {
        label: 'Rat Genome Database',
        shortLabel: 'RGD',
        route: '/members/rgd'
      },
      {
        label: 'Saccharomyces Genome Database',
        shortLabel: 'SGD',
        route: '/members/sgd'
      },
      {
        label: 'WormBase',
        shortLabel: 'WormBase',
        route: '/members/wormbase'
      },
      {
        label: 'Xenbase',
        shortLabel: 'Xenbase',
        route: '/members/xenbase'
      },
      {
        label: 'Zebrafish Information Network',
        shortLabel: 'ZFIN',
        route: '/members/zfin'
      },
      {
        label: 'Gene Ontology Consortium',
        shortLabel: 'GOC',
        route: '/members/goc'
      }
    ]
  },
  {
    label: 'News',
    sub: [
      {
        label: 'News and Events',
        route: '/news'
      },
      {
        label: 'Release Notes',
        route: '/release-notes'
      }
    ]
  },
  {
    label: 'About',
    sub: [
      {
        label: 'About Us',
        route: '/about-us',
      },
      {
        label: 'Funding',
        route: '/funding'
      },
      {
        label: 'Publications',
        route: '/publications',
      },
      {
        label: 'Organization and Governance',
        route: '/organization-and-governance'
      },
      {
        label: 'Privacy, Warranty, Licensing, and Data Preservation Commitment',
        route: '/privacy-warranty-licensing'
      },
    ]
  },
  {
    label: 'Working Groups',
    route: '/working-groups',
  },
  {
    label: 'Help',
    sub: [
      {
        label: 'FAQ / Known Issues',
        route: '/faq'
      },
      {
        label: 'Glossary',
        route: '/glossary'
      },
      {
        label: 'Tutorials',
        route: '/tutorials'
      },
      {
        label: 'User Documentation',
        route: '/help'
      },
    ]
  },
  {
    label: 'Community',
    sub: [
      {
        label: 'Alliance User Community',
        route: 'https://community.alliancegenome.org/categories',
        external: true,
      },
      {
        label: 'Twitter',
        route: 'https://twitter.com/alliancegenome',
        external: true,
      }
    ]
  },
  {
    label: 'Contact Us',
    route: '/contact-us',
  },
  {
    label: 'Cite Us',
    route: '/cite-us',
  }
];

export const DEFAULT_TABLE_STATE = {
  page: 1,
  sizePerPage: 10,
  sort: '',
  filters: {},
};

const RELEASE = '7.0.0';

export const SPECIES = [
  {
    taxonId: 'NCBITaxon:9606',
    fullName: 'Homo sapiens',
    shortName: 'Hsa',
    apolloName: 'human',
    apolloTrack: '/All%20Genes/',
    jBrowseName: 'Homo sapiens',
    jBrowsenclistbaseurl: `https://s3.amazonaws.com/agrjbrowse/docker/${RELEASE}/human/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000001405.40_GRCh38.p14_genomic.fna.gz',
    vertebrate: true,
    enableSingleCellExpressionAtlasLink: true,
    enableOrthologComparison: true,
  },
  {
    taxonId: 'NCBITaxon:10090',
    fullName: 'Mus musculus',
    shortName: 'Mmu',
    apolloName: 'mouse',
    apolloTrack: '/All%20Genes/',
    jBrowseName: 'Mus musculus',
    jBrowsenclistbaseurl: `https://s3.amazonaws.com/agrjbrowse/docker/${RELEASE}/MGI/mouse/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000001635.27_GRCm39_genomic.fna.gz',
    vertebrate: true,
    enableSingleCellExpressionAtlasLink: true,
    enableOrthologComparison: true,
  },
  {
    taxonId: 'NCBITaxon:10116',
    fullName: 'Rattus norvegicus',
    shortName: 'Rno',
    apolloName: 'rat',
    apolloTrack: '/All%20Genes/',
    jBrowseName: 'Rattus norvegicus',
    jBrowsenclistbaseurl: `https://s3.amazonaws.com/agrjbrowse/docker/${RELEASE}/RGD/rat/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_015227675.2_mRatBN7.2_genomic.fna.gz',
    vertebrate: true,
    enableSingleCellExpressionAtlasLink: true,
    enableOrthologComparison: true,
  },
  {
    taxonId: 'NCBITaxon:8355',
    fullName: 'Xenopus laevis',
    shortName: 'Xla',
    apolloName: 'x_laevis',
    apolloTrack: '/All%20Genes/',
    jBrowseName: 'Xenopus laevis',
    jBrowsenclistbaseurl: `https://s3.amazonaws.com/agrjbrowse/docker/${RELEASE}/XenBase/x_laevis/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/XENLA_9.2_genome.fa.gz',
    vertebrate: true,
    enableSingleCellExpressionAtlasLink: false,
    enableOrthologComparison: true,
  },
  {
    taxonId: 'NCBITaxon:8364',
    fullName: 'Xenopus tropicalis',
    shortName: 'Xtr',
    apolloName: 'x_tropicalis',
    apolloTrack: '/All%20Genes/',
    jBrowseName: 'Xenopus tropicalis',
    jBrowsenclistbaseurl: `https://s3.amazonaws.com/agrjbrowse/docker/${RELEASE}/XenBase/x_tropicalis/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/XENTR_9.1_genome.fa.gz',
    vertebrate: true,
    enableSingleCellExpressionAtlasLink: false,
    enableOrthologComparison: true,
  },
  {
    taxonId: 'NCBITaxon:7955',
    fullName: 'Danio rerio',
    shortName: 'Dre',
    apolloName: 'zebrafish',
    apolloTrack: '/All%20Genes/',
    jBrowseName: 'Danio rerio',
    jBrowsenclistbaseurl: `https://s3.amazonaws.com/agrjbrowse/docker/${RELEASE}/zfin/zebrafish-11/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000002035.6_GRCz11_genomic.fna.gz',
    vertebrate: true,
    enableSingleCellExpressionAtlasLink: true,
    enableOrthologComparison: true,
  },
  {
    taxonId: 'NCBITaxon:7227',
    fullName: 'Drosophila melanogaster',
    shortName: 'Dme',
    apolloName: 'fly',
    apolloTrack: '/All%20Genes/',
    jBrowseName: 'Drosophila melanogaster',
    jBrowsenclistbaseurl: `https://s3.amazonaws.com/agrjbrowse/docker/${RELEASE}/FlyBase/fruitfly/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000001215.4_Release_6_plus_ISO1_MT_genomic.fna.gz',
    vertebrate: false,
    enableSingleCellExpressionAtlasLink: true,
    enableOrthologComparison: true,
  },
  {
    taxonId: 'NCBITaxon:6239',
    fullName: 'Caenorhabditis elegans',
    shortName: 'Cel',
    apolloName: 'worm',
    apolloTrack: '/All%20Genes/',
    jBrowseName: 'Caenorhabditis elegans',
    jBrowsenclistbaseurl: `https://s3.amazonaws.com/agrjbrowse/docker/${RELEASE}/WormBase/c_elegans_PRJNA13758/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000002985.6_WBcel235_genomic.fna.gz',
    vertebrate: false,
    enableSingleCellExpressionAtlasLink: true,
    enableOrthologComparison: true,
  },
  {
    taxonId: 'NCBITaxon:559292',
    fullName: 'Saccharomyces cerevisiae',
    shortName: 'Sce',
    apolloName: 'yeast',
    apolloTrack: '/All%20Genes/',
    jBrowseName: 'Saccharomyces cerevisiae',
    jBrowsenclistbaseurl: `https://s3.amazonaws.com/agrjbrowse/docker/${RELEASE}/SGD/yeast/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000146045.2_R64_genomic.fna.gz',
    vertebrate: false,
    enableSingleCellExpressionAtlasLink: true,
    enableOrthologComparison: true,
  },
  {
    taxonId: 'NCBITaxon:2697049',
    fullName: 'Severe acute respiratory syndrome coronavirus 2',
    shortName: 'SARS-CoV-2',
    apolloName: 'SARS-CoV-2',
    apolloTrack: '/Mature%20peptides/',
    jBrowseName: 'SARS-CoV-2',
    jBrowsenclistbaseurl: `https://s3.amazonaws.com/agrjbrowse/docker/3.2.0/SARS-CoV-2/`,
    jBrowseurltemplate: 'tracks/All Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000001405.40_GRCh38.p14_genomic.fna.gz',
    suppressFlatten: true,
    vertebrate: false,
    enableSingleCellExpressionAtlasLink: false,
    enableOrthologComparison: false,
    geneSynopsisProvider: 'UniProt',
  }
];

export const TAXON_ORDER = SPECIES.map(s => s.taxonId);

export const SPECIES_NAME_ORDER = SPECIES.map(s => s.fullName);

export const GA_PROPERTY_ID_UA = 'UA-98765810-1';
export const GA_PROPERTY_ID_GA4 = 'G-H3F65KGJDR';

export const GA_EVENT_CATEGORY = {
  AUTOCOMPLETE: 'Autocomplete',
  TABLE: 'Table',
};

export const GA_EVENT_ACTION = {
  GO_TO_PAGE: 'Go to page',
  GO_TO_SEARCH_RESULTS: 'Go to search results',
  SET_PAGE_SIZE: 'Set page size'
};

