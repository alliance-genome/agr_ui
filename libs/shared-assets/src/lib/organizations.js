import { func } from 'prop-types';
import {
  allianceLogoHgncBase64,
  allianceLogoMgdBase64,
  allianceLogoSgdBase64,
  allianceLogoZfinBase64,
  allianceLogoFlybaseBase64,
  allianceLogoRgdBase64,
  allianceLogoWormbaseBase64,
  allianceLogoGocBase64,
} from './assets';

const organizations = [
  {
    id: 'hgnc',
    name: 'HGNC',
    abbreviation: 'HGNC',
    logo: allianceLogoHgncBase64,
  },
  {
    id: 'mgd',
    name: 'Mouse Genome Informatics',
    abbreviation: 'MGD',
    logo: allianceLogoMgdBase64,
  },
  {
    id: 'sgd',
    name: 'Saccharomyces Genome Database',
    abbreviation: 'SGD',
    logo: allianceLogoSgdBase64,
  },
  {
    id: 'zfin',
    name: 'Zebrafish Information Network',
    abbreviation: 'ZFIN',
    logo: allianceLogoZfinBase64,
  },
  {
    id: 'flybase',
    name: 'FlyBase',
    abbreviation: 'FlyBase',
    logo: allianceLogoFlybaseBase64,
  },
  {
    id: 'rgd',
    name: 'Rat Genome Database',
    abbreviation: 'RGD',
    logo: allianceLogoRgdBase64,
  },
  {
    id: 'wormbase',
    name: 'WormBase',
    abbreviation: 'WormBase',
    logo: allianceLogoWormbaseBase64,
  },
  {
    id: 'goc',
    name: 'Gene Ontology Consortium',
    abbreviation: 'GOC',
    logo: allianceLogoGocBase64,
  },
];

export function getAllMembers() {
  return organizations.filter(({ id }) => id !== 'hgnc');
}

export function getAllSpecies() {
  return organizations.filter(({ id }) => id !== 'goc');
}

export function getOrganizationById(id) {
  const [org] = organizations.filter((org) => {
    return org.id === id;
  });
  return org;
}

export default organizations;
