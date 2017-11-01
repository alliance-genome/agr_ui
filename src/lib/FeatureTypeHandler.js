
class FeatureTypeHandler {

  constructor(){}

  // TODO: make a call to an SO provider
  getTranscriptTypes() {
    let transcriptTypes = [];
    transcriptTypes.pushAll(
      'mRNA', 'ncRNA', 'piRNA_gene'
      , 'Inc_RNA'
      , 'miRNA_gene'
    );

    transcriptTypes.pushAll(
      'protein_coding_gene'
      ,'gene'
      ,'pseudogene'
      ,'ncRNA_gene'
      ,'piRNA_gene'
      ,'protein_coding'
      ,'lnc_RNA'
      ,'ORF'
      ,'lincRNA_gene'
      ,'miRNA_gene'
      ,'heritable_phenotypic_marker'
      ,'non_protein_coding'
      ,'snoRNA_gene'
      ,'antisense_lncRNA'
      ,'tRNA_gene'
      ,'snRNA_gene'
      ,'gene_segment'
      ,'rRNA_gene'
      ,'engineered_fusion_gene'
      ,'pseudogene_attribute'
      ,'tRNA_encoding'
      ,'snoRNA_encoding'
      ,'intronic_lncRNA'
      ,'miRNA_encoding'
      ,'ARS'
      ,'transposable_element_gene'
      ,'rRNA_encoding'
      ,'polymorphic_pseudogene'
      ,'LTR_retrotransposon'
      ,'engineered_tag'
      ,'region'
      ,'snRNA_encoding'
      ,'repeat_region'
      ,'ribozyme'
      ,'centromere'
      ,'long_terminal_repeat'
      ,'regulatory_region'
      ,'SRP_RNA_gene'
      ,'origin_of_replication'
      ,'insulator'
      ,'nuclear_gene'
      ,'scRNA_gene'
      ,'blocked_reading_frame'
      ,'gene_group'
      ,'RNase_P_RNA_gene'
      ,'engineered_foreign_gene'
      ,'engineered_foreign_region'
      ,'engineered_region'
      ,'satellite_DNA'
      ,'silent_mating_type_cassette_array'
      ,'telomerase_RNA_gene'
      ,'RNase_MRP_RNA_gene'
      ,'gene_with_polycistronic_transcript'
      ,'intein_encoding_region'
      ,'mating_type_region'
      ,'mitochondrial_sequence'
    );


    return transcriptTypes;
  }

  isTranscriptType(type){
    return this.getTranscriptTypes().indexOf(type) >= 0;
  }

  // TODO: make a call to an internal SO provider
  getCodingType(){
    let proteinCodingTypes = [];
    proteinCodingTypes.pushAll(
      'gene'
      , 'protein_coding_gene'
      , 'protein_coding'
      , 'ORF'
    );
    return proteinCodingTypes ;
  }

  // TODO: make a call to an internal types provider?
  getAll(){
    let allTypes= [];
    allTypes.pushAll(
      'protein_coding_gene'
      ,'gene'
      ,'pseudogene'
      ,'ncRNA_gene'
      ,'piRNA_gene'
      ,'protein_coding'
      ,'lnc_RNA'
      ,'ORF'
      ,'lincRNA_gene'
      ,'miRNA_gene'
      ,'heritable_phenotypic_marker'
      ,'non_protein_coding'
      ,'snoRNA_gene'
      ,'antisense_lncRNA'
      ,'tRNA_gene'
      ,'snRNA_gene'
      ,'gene_segment'
      ,'rRNA_gene'
      ,'engineered_fusion_gene'
      ,'pseudogene_attribute'
      ,'tRNA_encoding'
      ,'snoRNA_encoding'
      ,'intronic_lncRNA'
      ,'miRNA_encoding'
      ,'ARS'
      ,'transposable_element_gene'
      ,'rRNA_encoding'
      ,'polymorphic_pseudogene'
      ,'LTR_retrotransposon'
      ,'engineered_tag'
      ,'region'
      ,'snRNA_encoding'
      ,'repeat_region'
      ,'ribozyme'
      ,'centromere'
      ,'long_terminal_repeat'
      ,'regulatory_region'
      ,'SRP_RNA_gene'
      ,'origin_of_replication'
      ,'insulator'
      ,'nuclear_gene'
      ,'scRNA_gene'
      ,'blocked_reading_frame'
      ,'gene_group'
      ,'RNase_P_RNA_gene'
      ,'engineered_foreign_gene'
      ,'engineered_foreign_region'
      ,'engineered_region'
      ,'satellite_DNA'
      ,'silent_mating_type_cassette_array'
      ,'telomerase_RNA_gene'
      ,'RNase_MRP_RNA_gene'
      ,'gene_with_polycistronic_transcript'
      ,'intein_encoding_region'
      ,'mating_type_region'
      ,'mitochondrial_sequence'
    );

    return allTypes ;

  }

  isCodingType() {
    return this.getCodingType().indexOf(this.props.biotype) >= 0;
  }
}

export default FeatureTypeHandler;
