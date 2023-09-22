const sitemap = [
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
        route: '/api/swagger-ui',
      },
      {
        label: 'Tools and Prototypes',
        route: '/prototypes',
      },
      {
        label: 'AllianceMine',
        route: '/bluegenes',
      },
      {
        label: 'JBrowse',
        route: '/jbrowse?data=data%2FHomo%20sapiens',
      }
    ],
  },
  {
    label: 'News',
    sub: [
      {
        label: 'News and Events',
        route: '/news',
      },
      {
        label: 'Release Notes',
        route: '/release-notes',
      },
    ],
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
        route: '/funding',
      },
      {
        label: 'Organization and Governance',
        route: '/organization-and-governance',
      },
      {
        label: 'Privacy, Warranty, and Licensing',
        route: '/privacy-warranty-licensing',
      },
      {
        label: 'Publications',
        route: '/publications',
      },
    ],
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
        route: '/faq',
      },
      {
        label: 'Glossary',
        route: '/glossary',
      },
      {
        label: 'Tutorials',
        route: '/tutorials',
      },
      {
        label: 'User Documentation',
        route: '/help',
      },
    ],
  },
  {
    label: 'Community',
    sub: [
      {
        label: 'Alliance User Community',
        route: 'https://groups.google.com/a/alliancegenome.org/g/community',
      },
      {
        label: 'Twitter',
        route: 'https://twitter.com/alliancegenome',
      },
    ],
  },
  {
    label: 'Contact Us',
    route: '/contact-us',
  },
  {
    label: 'Cite Us',
    route: '/cite-us',
  },
];

export default sitemap;
