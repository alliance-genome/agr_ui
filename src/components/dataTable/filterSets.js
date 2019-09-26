import {SPECIES} from '../../constants';

export default {
  moleculeTypes: [
    'DNA',
    'dsDNA',
    'dsRNA',
    'gene',
    'mRNA',
    'nucleic acid',
    'peptide',
    'protein',
    'RNA',
  ],
  species: SPECIES.map(s => s.fullName),
  associationTypesWithOrthology: [
    'biomarker via orthology',
    'implicated via orthology',
    'is implicated in',
    'is marker of',
  ],
  associationTypes: [
    'is implicated in',
    'is marker of',
  ],
  geneticEntityTypes: [
    'allele',
    'gene',
  ]
};
