import { cleanDelimitedField } from '../utils/stringUtils'

export const CONSEQUENCES_ENUM = {
  transcript_ablation: {
    impact: 'HIGH',
    color: '#ff0000',
  },
  splice_acceptor_variant: {
    impact: 'HIGH',
    color: '#ff581a',
  },
  splice_donor_variant: {
    impact: 'HIGH',
    color: '#ff581a',
  },
  stop_gained: {
    impact: 'HIGH',
    color: '#ff0000',
  },
  frameshift_variant: {
    impact: 'HIGH',
    color: '#9400D3',
  },
  stop_lost: {
    impact: 'HIGH',
    color: '#ff0000',
  },
  start_lost: {
    impact: 'HIGH',
    color: '#ffd700',
  },
  transcript_amplification: {
    impact: 'HIGH',
    color: '#ff69b4',
  },
  inframe_insertion: {
    impact: 'MODERATE',
    color: '#ff69b4',
  },
  inframe_deletion: {
    impact: 'MODERATE',
    color: '#ff69b4',
  },
  missense_variant: {
    impact: 'MODERATE',
    color: '#ffd700',
  },
  protein_altering_variant: {
    impact: 'MODERATE',
    color: '#ff0080',
  },
  splice_region_variant: {
    impact: 'LOW',
    color: '#ff7f50',
  },
  incomplete_terminal_codon_variant: {
    impact: 'LOW',
    color: '#ff00ff',
  },
  start_retained_variant: {
    impact: 'LOW',
    color: '#76ee00',
  },
  stop_retained_variant: {
    impact: 'LOW',
    color: '#76ee00',
  },
  synonymous_variant: {
    impact: 'LOW',
    color: '#76ee00',
  },
  coding_sequence_variant: {
    impact: 'MODIFIER',
    color: '#458b00',
  },
  mature_miRNA_variant: {
    impact: 'MODIFIER',
    color: '#458b00',
  },
  five_prime_UTR_variant: {
    impact: 'MODIFIER',
    color: '#7ac5cd',
  },
  three_prime_UTR_variant: {
    impact: 'MODIFIER',
    color: '#7ac5cd',
  },
  non_coding_transcript_exon_variant: {
    impact: 'MODIFIER',
    color: '#32cd32',
  },
  intron_variant: {
    impact: 'MODIFIER',
    color: '#02599c',
  },
  NMD_transcript_variant: {
    impact: 'MODIFIER',
    color: '#ff4500',
  },
  non_coding_transcript_variant: {
    impact: 'MODIFIER',
    color: '#32cd32',
  },
  upstream_gene_variant: {
    impact: 'MODIFIER',
    color: '#a2b5cd',
  },
  downstream_gene_variant: {
    impact: 'MODIFIER',
    color: '#a2b5cd',
  },
  TFBS_ablation: {
    impact: 'MODIFIER',
    color: '#a52a2a',
  },
  TFBS_amplification: {
    impact: 'MODIFIER',
    color: '#a52a2a',
  },
  TF_binding_site_variant: {
    impact: 'MODIFIER',
    color: '#a52a2a',
  },
  regulatory_region_ablation: {
    impact: 'MODERATE',
    color: '#a52a2a',
  },
  regulatory_region_amplification: {
    impact: 'MODIFIER',
    color: '#a52a2a',
  },
  feature_elongation: {
    impact: 'MODIFIER',
    color: '#7f7f7f',
  },
  regulatory_region_variant: {
    impact: 'MODIFIER',
    color: '#a52a2a',
  },
  feature_truncation: {
    impact: 'MODIFIER',
    color: '#7f7f7f',
  },
  intergenic_variant: {
    impact: 'MODIFIER',
    color: '#636363',
  },
} as const

export function getColorForConsequence(consequence: string) {
  if (!consequence) {
    return 'black'
  }

  // Strip brackets if present (extra safety measure)
  const cleanedConsequence = cleanDelimitedField(consequence)

  // Handle multiple consequences separated by | or space
  if (
    cleanedConsequence.split(' ').length > 1 ||
    cleanedConsequence.split('|').length > 1
  ) {
    // For multiple consequences, take the first one
    const firstConsequence = cleanedConsequence.includes('|')
      ? cleanedConsequence.split('|')[0].trim()
      : cleanedConsequence.split(' ')[0].trim()
    return getColorForConsequence(firstConsequence)
  }

  if (cleanedConsequence === 'UNKNOWN') {
    return 'gray'
  }

  const consequenceLookup =
    CONSEQUENCES_ENUM[cleanedConsequence as keyof typeof CONSEQUENCES_ENUM]

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (consequenceLookup) {
    return consequenceLookup.color
  } else if (cleanedConsequence === '5_prime_UTR_variant') {
    const color = CONSEQUENCES_ENUM.five_prime_UTR_variant.color
    return color
  } else if (cleanedConsequence === '3_prime_UTR_variant') {
    const color = CONSEQUENCES_ENUM.three_prime_UTR_variant.color
    return color
  }

  return '#f0f'
}
