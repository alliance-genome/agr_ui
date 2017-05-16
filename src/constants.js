export const SEARCH_API_ERROR_MESSAGE = 'There was a problem connecting to the server. Please refresh the page.  If you continue to see this message, please contact alliance-software@lists.stanford.edu';
export const LARGE_COL_CLASS = 'col-sm-8 col-md-8 col-xs-12';
export const SMALL_COL_CLASS = 'col-sm-4 col-md-4 col-xs-12';
export const WP_REST_API_BASE_URL = 'https://public-api.wordpress.com/wp/v2/sites/alliancegenome.wordpress.com/pages?slug=';

export const CATEGORIES = [
  {
    name: 'all',
    displayName: 'All'
  },
  {
    name: 'gene',
    displayName: 'Genes'
  },
  {
    name: 'go',
    displayName: 'Gene Ontology'
  }
];

export const MENU = {
  home: {
    title: 'Home - Alliance of Genome Resources',
    label: 'Home',
    slug: 'home',
    path: 'home'
  },
  about: {
    title: 'About Us - Alliance of Genome Resources',
    label: 'About Us',
    slug: 'about-us',
    path: 'about'
  },
  contact: {
    title: 'Contact Us - Alliance of Genome Resources',
    label: 'Contact Us',
    slug: 'contact-us',
    path: 'contact'
  },
  projects: {
    title: 'Projects, Work Pruduct, Publications - Alliance of Genome Resources',
    label: 'Projects, Work Pruduct, Publications',
    slug: 'projects-work-products-publications',
    path: 'projects'
  }
};
export const SUB_MENU= {
  about: {
    organization: {
      title: 'Organization and Governance - Alliance of Genome Resources',
      label: 'Organization and Governance',
      slug: 'organization-and-governance',
      path: 'organization'
    },
    faq:{
      title: 'FREQUENTLY ASKED QUESTIONS - Alliance of Genome Resources',
      label: 'Frequently Asked Questions',
      slug: 'frequently-asked-questions',
      path: 'faq'
    },
    funding: {
      title: 'FUNDING - Alliance of Genome Resources',
      label: 'FUNDING',
      slug: 'funding',
      path: 'funding'
    }
  },
  projects: {
    goups: {
      title: 'Projects, Work Product, Publications - Alliance of Genome Resources',
      label: 'Projects, Work Product, Publications',
      slug: 'projects-work-products-publications',
      path: 'projects'
    },
    publications:{
      title: 'Publications - Alliance of Genome Resources',
      label: 'Publications',
      slug: 'publications',
      path: 'publications'
    }
  }
};
export const NON_HIGHLIGHTED_FIELDS = ['sourceHref', 'href', 'category', 'homologs', 'paralogs', 'orthologs', 'homologs.symbol', 'homologs.panther_family'];
