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
        label: 'AllianceMine',
        route: '/bluegenes/alliancemine',
        external: true,
      },
      {
        label: 'JBrowse 2',
        route: '/jbrowse2/',
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
        label: 'Mastodon',
        route: 'https://genomic.social/@AllianceGenome',
        external: true,
      },
      {
        label: 'Bluesky',
        route: 'https://bsky.app/profile/alliancegenome.bsky.social',
        external: true,
      },
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

export const SPECIES = [
  {
    taxonId: 'NCBITaxon:9606',
    fullName: 'Homo sapiens',
    shortName: 'Hsa',
    apolloName: 'human',
    apolloTrack: '/All%20Genes/',
    jBrowseName: 'Homo sapiens',
    jBrowsenclistbaseurltemplate: `https://s3.amazonaws.com/agrjbrowse/docker/{release}/human/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000001405.40_GRCh38.p14_genomic.fna.gz',
    jBrowsetracks: '_all_genes,_ht_variants',
    jBrowseOrthologyTracks: 'Homo_sapiens_all_genes,human2fly.filter.anchors,human2mouse.filter.anchors,human2rat.filter.anchors,human2worm.filter.anchors,human2xenopuslaevis.filter.anchors,human2xenopustropicalis.filter.anchors,human2yeast.filter.anchors,human2zebrafish.filter.anchors',
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
    jBrowsenclistbaseurltemplate: `https://s3.amazonaws.com/agrjbrowse/docker/{release}/MGI/mouse/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000001635.27_GRCm39_genomic.fna.gz',
    jBrowsetracks: '_all_genes,_ht_variants,_variants,_multiple-variant_alleles',
    jBrowseOrthologyTracks:'Mus_musculus_all_genes,human2mouse.filter.anchors,mouse2fly.filter.anchors,mouse2worm.filter.anchors,mouse2xenopustropicalis.filter.anchors,mouse2yeast.filter.anchors,mouse2zebrafish.filter.anchors,rat2mouse.filter.anchors',
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
    jBrowsenclistbaseurltemplate: `https://s3.amazonaws.com/agrjbrowse/docker/{release}/RGD/rat/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_015227675.2_mRatBN7.2_genomic.fna.gz',
    jBrowsetracks: '_all_genes,_ht_variants,_variants',
    jBrowseOrthologyTracks:'Rattus_norvegicus_all_genes,human2rat.filter.anchors,rat2fly.filter.anchors,rat2mouse.filter.anchors,rat2worm.filter.anchors,rat2xenopustropicalis.filter.anchors,rat2yeast.filter.anchors,rat2zebrafish.filter.anchors',
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
    jBrowsenclistbaseurltemplate: `https://s3.amazonaws.com/agrjbrowse/docker/{release}/XenBase/x_laevis/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/XENLA_9.2_genome.fa.gz',
    jBrowsetracks: '_all_genes',
    jBrowseOrthologyTracks:'Xenopus_laevis_all_genes,human2xenopuslaevis.filter.anchors,xenopuslaevis2xenopustropicalis.filter.anchors',
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
    jBrowsenclistbaseurltemplate: `https://s3.amazonaws.com/agrjbrowse/docker/{release}/XenBase/x_tropicalis/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/XENTR_9.1_genome.fa.gz',
    jBrowsetracks: '_all_genes',
    jBrowseOrthologyTracks:'Xenopus_tropicalis_all_genes,human2xenopustropicalis.filter.anchors,mouse2xenopustropicalis.filter.anchors,rat2xenopustropicalis.filter.anchors,xenopuslaevis2xenopustropicalis.filter.anchors,xenopustropicalis2fly.filter.anchors,xenopustropicalis2worm.filter.anchors,xenopustropicalis2yeast.filter.anchors,zebrafish2xenopustropicalis.filter.anchors',
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
    jBrowsenclistbaseurltemplate: `https://s3.amazonaws.com/agrjbrowse/docker/{release}/zfin/zebrafish-11/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000002035.6_GRCz11_genomic.fna.gz',
    jBrowsetracks: '_all_genes,_ht_variants,_variants',
    jBrowseOrthologyTracks:'Danio_rerio_all_genes,human2zebrafish.filter.anchors,mouse2zebrafish.filter.anchors,rat2zebrafish.filter.anchors,zebrafish2fly.filter.anchors,zebrafish2worm.filter.anchors,zebrafish2xenopustropicalis.filter.anchors,zebrafish2yeast.filter.anchors',
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
    jBrowsenclistbaseurltemplate: `https://s3.amazonaws.com/agrjbrowse/docker/{release}/FlyBase/fruitfly/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000001215.4_Release_6_plus_ISO1_MT_genomic.fna.gz',
    jBrowsetracks: '_all_genes,_ht_variants,_variants,_multiple-variant_alleles',
    jBrowseOrthologyTracks:'Drosophila_melanogaster_all_genes,fly2yeast.filter.anchors,human2fly.filter.anchors,mouse2fly.filter.anchors,rat2fly.filter.anchors,worm2fly.filter.anchors,xenopustropicalis2fly.filter.anchors,zebrafish2fly.filter.anchors',
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
    jBrowsenclistbaseurltemplate: `https://s3.amazonaws.com/agrjbrowse/docker/{release}/WormBase/c_elegans_PRJNA13758/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000002985.6_WBcel235_genomic.fna.gz',
    jBrowsetracks: '_all_genes,_ht_variants,_variants',
    jBrowseOrthologyTracks:'Caenorhabditis_elegans_all_genes,human2worm.filter.anchors,mouse2worm.filter.anchors,rat2worm.filter.anchors,worm2fly.filter.anchors,worm2yeast.filter.anchors,xenopustropicalis2worm.filter.anchors,zebrafish2worm.filter.anchors',
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
    jBrowsenclistbaseurltemplate: `https://s3.amazonaws.com/agrjbrowse/docker/{release}/SGD/yeast/`,
    jBrowseurltemplate: 'tracks/All_Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000146045.2_R64_genomic.fna.gz',
    jBrowsetracks: '_all_genes,_ht_variants',
    jBrowseOrthologyTracks:'Saccharomyces_cerevisiae_all_genes,fly2yeast.filter.anchors,human2yeast.filter.anchors,mouse2yeast.filter.anchors,rat2yeast.filter.anchors,worm2yeast.filter.anchors,xenopustropicalis2yeast.filter.anchors,zebrafish2yeast.filter.anchors',
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
    jBrowsenclistbaseurltemplate: `https://s3.amazonaws.com/agrjbrowse/docker/3.2.0/SARS-CoV-2/`,
    jBrowseurltemplate: 'tracks/All Genes/{refseq}/trackData.jsonz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000001405.40_GRCh38.p14_genomic.fna.gz',
    jBrowsetracks: '_all_genes',
    jBrowseOrthologyTracks:'',
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

export const DOWNLOAD_BUTTON_THRESHOLD = 90000;
