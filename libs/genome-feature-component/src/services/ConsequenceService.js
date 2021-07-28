/**
 * https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html#consequences
 * @type {Readonly<{start_retained_variant: {impact: string}, intergenic_variant: {impact: string}, frameshift_variant: {impact: string}, splice_acceptor_variant: {impact: string}, intron_variant: {impact: string}, splice_region_variant: {impact: string}, transcript_amplification: {impact: string}, upstream_gene_variant: {impact: string}, stop_gained: {impact: string}, non_coding_transcript_exon_variant: {impact: string}, non_coding_transcript_variant: {impact: string}, regulatory_region_amplification: {impact: string}, start_lost: {impact: string}, transcript_ablation: {impact: string}, splice_donor_variant: {impact: string}, NMD_transcript_variant: {impact: string}, synonymous_variant: {impact: string}, TFBS_amplification: {impact: string}, missense_variant: {impact: string}, regulatory_region_ablation: {impact: string}, feature_elongation: {impact: string}, mature_miRNA_variant: {impact: string}, stop_lost: {impact: string}, 5_prime_UTR_variant: {impact: string}, feature_truncation: {impact: string}, 3_prime_UTR_variant: {impact: string}, regulatory_region_variant: {impact: string}, downstream_gene_variant: {impact: string}, TFBS_ablation: {impact: string}, stop_retained_variant: {impact: string}, TF_binding_site_variant: {impact: string}, coding_sequence_variant: {impact: string}, inframe_deletion: {impact: string}, protein_altering_variant: {impact: string}, inframe_insertion: {impact: string}, incomplete_terminal_codon_variant: {impact: string}}>}
 */

export const CONSEQUENCES_ENUM = Object.freeze({
  transcript_ablation: { impact: 'HIGH', color: '#ff0000'},
  splice_acceptor_variant: { impact: 'HIGH', color: '#ff581a'},
  splice_donor_variant: { impact: 'HIGH', color: '#ff581a'},
  stop_gained: { impact: 'HIGH', color: '#ff0000'},
  frameshift_variant: { impact: 'HIGH', color: '#9400D3'},
  stop_lost: { impact: 'HIGH', color: '#ff0000'},
  start_lost: { impact: 'HIGH', color: '#ffd700'},
  transcript_amplification: { impact: 'HIGH', color: '#ff69b4'},
  inframe_insertion: { impact: 'MODERATE', color: '#ff69b4'},
  inframe_deletion: { impact: 'MODERATE', color: '#ff69b4'},
  missense_variant: { impact: 'MODERATE', color: '#ffd700'},
  protein_altering_variant: { impact: 'MODERATE', color: '#ff0080'},
  splice_region_variant: { impact: 'LOW', color: '#ff7f50'},
  incomplete_terminal_codon_variant: { impact: 'LOW', color: '#ff00ff'},
  start_retained_variant: { impact: 'LOW', color: '#76ee00'},
  stop_retained_variant: { impact: 'LOW', color: '#76ee00'},
  synonymous_variant: { impact: 'LOW', color: '#76ee00'},
  coding_sequence_variant: { impact: 'MODIFIER', color: '#458b00'},
  mature_miRNA_variant: { impact: 'MODIFIER', color: '#458b00'},
  five_prime_UTR_variant: { impact: 'MODIFIER', color: '#7ac5cd'},
  three_prime_UTR_variant: { impact: 'MODIFIER', color: '#7ac5cd'},
  non_coding_transcript_exon_variant: { impact: 'MODIFIER', color: '#32cd32'},
  intron_variant: { impact: 'MODIFIER', color: '#02599c'},
  NMD_transcript_variant: { impact: 'MODIFIER', color: '#ff4500'},
  non_coding_transcript_variant: { impact: 'MODIFIER', color: '#32cd32'},
  upstream_gene_variant: { impact: 'MODIFIER', color: '#a2b5cd'},
  downstream_gene_variant: { impact: 'MODIFIER', color: '#a2b5cd'},
  TFBS_ablation: { impact: 'MODIFIER', color: '#a52a2a'},
  TFBS_amplification: { impact: 'MODIFIER', color: '#a52a2a'},
  TF_binding_site_variant: { impact: 'MODIFIER', color: '#a52a2a'},
  regulatory_region_ablation: { impact: 'MODERATE', color: '#a52a2a'},
  regulatory_region_amplification: { impact: 'MODIFIER', color: '#a52a2a'},
  feature_elongation: { impact: 'MODIFIER', color: '#7f7f7f'},
  regulatory_region_variant: { impact: 'MODIFIER', color: '#a52a2a'},
  feature_truncation: { impact: 'MODIFIER', color: '#7f7f7f'},
  intergenic_variant: { impact: 'MODIFIER', color: '#636363'},
});

export function getColorForConsequence(consequence) {

  if(!consequence) return 'black';

  if(consequence.split(" ").length>1) return 'hotpink';
  if(consequence==='UNKNOWN') return 'gray';

  const consequenceLookup = CONSEQUENCES_ENUM[consequence]
  if(consequenceLookup){
    return consequenceLookup.color;
  }
  else if(consequence === '5_prime_UTR_variant'){
    return CONSEQUENCES_ENUM['five_prime_UTR_variant'].color;
  }
  else if(consequence === '3_prime_UTR_variant'){
    return CONSEQUENCES_ENUM['three_prime_UTR_variant'].color;
  }
  else{
    console.warn('Consequence ',consequence,'not found')
  }

}
