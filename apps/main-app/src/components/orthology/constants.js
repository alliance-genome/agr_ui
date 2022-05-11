const ALL_METHODS = {
  'Ensembl Compara': {
  },
  HGNC: {
  },
  Hieranoid: {
  },
  InParanoid: {
  },
  OMA: {
  },
  OrthoFinder: {
  },
  OrthoInspector: {
  },
  PANTHER: {
  },
  PhylomeDB: {
  },
  sonicParanoid: {
  },
  ZFIN: {
  }
};

const methodCellWidth = 25;

const methodHeaderStyle = {
  minWidth: methodCellWidth * Object.keys(ALL_METHODS).length,
  height: '100px',
};

const methodCellStyle = {
  width: methodCellWidth,
  display: 'inline-block',
  textAlign: 'center',
  lineHeight: '20px',
  cursor: 'default',
};

const methodHeaderCellStyle = {
  transform: 'translate(0px, 75px) rotate(-45deg)',
  whiteSpace: 'nowrap',
  width: methodCellWidth,
  display: 'inline-block',
};

const STRINGENCY_HIGH = 'high';
const STRINGENCY_MED = 'moderate';
const STRINGNECY_LOW = 'low';

export {
  ALL_METHODS,
  methodCellStyle,
  methodCellWidth,
  methodHeaderCellStyle,
  methodHeaderStyle,
  STRINGENCY_HIGH,
  STRINGENCY_MED,
  STRINGNECY_LOW
};
