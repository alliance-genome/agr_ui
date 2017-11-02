// TODO: make a call to an SO provider
export const getTranscriptTypes = function () {
  let transcriptTypes = [
    'mRNA', 'ncRNA', 'piRNA'
    , 'lincRNA'
    , 'miRNA'
    , 'pre_miRNA'
    , 'snoRNA'
    , 'lnc_RNA'
    , 'tRNA'
    , 'snRNA'
    , 'rRNA'
    , 'ARS'


    , 'C_gene_segment'
    , 'V_gene_segment'
    , 'pseudogene_attribute'
    ,'snoRNA_gene'
  ];

  return transcriptTypes;
};


// TODO: make a call to an internal SO provider
export const getCodingType = function () {
  let proteinCodingTypes = [];
  proteinCodingTypes.pushAll(
    'gene'
    , 'protein_coding_gene'
    , 'protein_coding'
    , 'ORF'
  );
  return proteinCodingTypes;
};


export const isCodingType = function (type) {
  return this.getCodingType().indexOf(type) >= 0;
};

