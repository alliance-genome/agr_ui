const ALL_METHODS = {
  compara: {
    name: 'Compara',
    icon: 'http://static.ensembl.org/i/ensembl-favicon.png'
  },
  // eggnog: {
  //   name: 'eggNOG'
  // },
  hgnc: {
    name: 'HGNC',
    icon: 'http://www.genenames.org/sites/genenames.org/files/genenames_favicon_0.ico'
  },
  // homologene: {
  //   name: 'Homologene',
  //   icon: 'https://www.ncbi.nlm.nih.gov/favicon.ico'
  // },
  inparanoid: {
    name: 'Inparanoid',
    icon: 'http://inparanoid.sbc.su.se/favicon.ico'
  },
  // isobase: {
  //   name: 'Isobase',
  // },
  oma: {
    name: 'OMA',
    icon: 'https://omictools.com/img/apple-touch-icon.png'
  },
  // orthodb: {
  //   name: 'OrthoDB',
  // },
  // orthomcl: {
  //   name: 'orthoMCL',
  //   icon: 'http://orthomcl.org/orthomcl/images/OrthoMCL/favicon.ico'
  // },
  panther: {
    name: 'Panther',
    icon: 'http://www.pantherdb.org/favicon.ico'
  },
  phylome: {
    name: 'Phylome',
    icon: 'http://phylomedb.org/sites/default/files/images/phylomedb.ico'
  },
  roundup: {
    name: 'RoundUp'
  },
  treefam: {
    name: 'TreeFam',
    icon: 'http://www.treefam.org/static/images/favicon.png'
  },
  zfin: {
    name: 'ZFIN',
    icon: 'https://zfin.org/images/zfinlogo.png'
//    icon: 'https://zfin.org/favicon.ico'
  }
};

const methodCellWidth = 25;

const methodHeaderStyle = {
  minWidth: methodCellWidth * Object.keys(ALL_METHODS).length,
  height: '70px',
};

const methodCellStyle = {
  width: methodCellWidth,
  display: 'inline-block',
  textAlign: 'center',
  lineHeight: '20px',
};

const methodHeaderCellStyle = {
  transform: 'translate(0px, 45px) rotate(-45deg)',
  width: methodCellWidth,
  display: 'inline-block',
};

export {
  ALL_METHODS,
  methodCellStyle,
  methodCellWidth,
  methodHeaderCellStyle,
  methodHeaderStyle,
};
