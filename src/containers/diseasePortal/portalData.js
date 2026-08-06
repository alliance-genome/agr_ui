import { DISEASE_ROOT_CURIE } from '../ontologyBrowser/ontologies.js';

// One entry per disease portal, keyed by the URL slug (/disease-portal/{slug}).
// Adding a portal here is all that is needed: the index on the root portal page
// builds itself from these entries, in this order, grouped by `group`.
//
//   doid       required. Drives every API call, link, and the ontology embed.
//              The entry whose doid is the ontology root (DISEASE_ROOT_CURIE) is
//              the root portal, whose page lists the portals below instead of
//              describing a disease.
//   pageName   required. Display title (page heading, meta title, side nav).
//              Not taken from the API: /api/disease/DOID:4 is named "disease",
//              and the title has to render before that query resolves.
//   group      parent-disease heading this portal appears under in the index.
//              Omit on the root entry.
//   listLabel  optional. Label in the index, when it differs from pageName.
//   resources  optional. Community Resources links.
export const data = {
  human: {
    doid: DISEASE_ROOT_CURIE,
    pageName: 'Disease',
    resources: [
      {
        title: 'Disease Portals - Rat Genome Database',
        url: 'https://rgd.mcw.edu/wg/portals/',
      },
      { title: 'FlyBase Human Disease Model Report Index', url: 'https://flybase.org/lists/FBhh/' },
      {
        title: 'Human Mouse Disease Connection',
        url: 'http://www.informatics.jax.org/mgihome/projects/aboutHMDC.shtml',
      },
      { title: 'Matchmaker Exchange', url: 'https://www.matchmakerexchange.org/' },
      { title: 'ModelMatcher', url: 'https://www.modelmatcher.net/' },
      { title: 'Online Mendelian Inheritance of Man (OMIM)', url: 'https://www.omim.org/' },
      { title: 'Portal Kids First DRC', url: 'https://portal.kidsfirstdrc.org/login?redirect_path=/data-exploration' },
    ],
  },
  'autism-spectrum-disorder': {
    doid: 'DOID:0060041',
    pageName: 'Autism Spectrum Disorder',
    group: 'Developmental disorder of mental health',
    listLabel: 'autism spectrum disorder',
    resources: [
      { title: 'Autism BrainNet', url: 'https://autismbrainnet.org/' },
      {
        title: 'NIH Autism Data Science Initiative (ADSI)',
        url: 'https://dpcpsi.nih.gov/autism-data-science-initiative/funded-research',
      },
      { title: 'NIMH Data Archive', url: 'https://nda.nih.gov/' },
      { title: 'SFARI Gene', url: 'https://gene.sfari.org/' },
      { title: 'SPARK (Simons Foundation Powering Autism Research)', url: 'https://sparkforautism.org/' },
    ],
  },
  'diabetes-mellitus': {
    doid: 'DOID:9351',
    pageName: 'Diabetes Mellitus',
    group: 'Disease of metabolism',
    listLabel: 'diabetes mellitus',
    resources: [
      { title: 'American Diabetes Association (ADA)', url: 'https://professional.diabetes.org/' },
      { title: 'Broad Institute - Diabetes', url: 'https://www.broadinstitute.org/diabetes' },
      {
        title: 'Centers for Disease Control and Prevention (CDC) - Diabetes',
        url: 'https://www.cdc.gov/diabetes/index.html',
      },
      { title: 'Common Metabolic Diseases Genome Atlas (CMDGA)', url: 'https://cmdga.org/' },
      { title: 'Common Metabolic Diseases Knowledge Portal', url: 'https://t2d.hugeamp.org/' },
      { title: 'Diabetes Disease Portal - Rat Genome Database', url: 'https://rgd.mcw.edu/rgdweb/portal/home.jsp?p=4' },
      {
        title: 'Human Mouse Disease Connection',
        url: 'https://www.informatics.jax.org/mgihome/projects/aboutHMDC.shtml',
      },
      {
        title: 'National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)',
        url: 'https://www.niddk.nih.gov/',
      },
      { title: 'World Health Organization (WHO) - Diabetes', url: 'https://www.who.int/health-topics/diabetes' },
    ],
  },
  ciliopathy: {
    doid: 'DOID:0060340',
    pageName: 'Ciliopathy',
    group: 'Genetic disease',
    listLabel: 'ciliopathy',
    resources: [
      { title: 'Ciliopathy Alliance', url: 'https://ciliopathyalliance.org/' },
      {
        title: 'NCI/NEI ciliopathy gene-therapy research news (NIH intramural)',
        url: 'https://www.nih.gov/news-events/news-releases/nih-researchers-develop-gene-therapy-rare-ciliopathy',
      },
      { title: 'PCD Research', url: 'https://pcdresearch.org/' },
      {
        title: 'Rare Diseases Clinical Research Network (RDCRN) - NIH/NCATS',
        url: 'https://www.rarediseasesnetwork.org/',
      },
      { title: 'TheRaCil (Therapies for Renal Ciliopathies)', url: 'https://theracil.eu/' },
    ],
  },
  'long-qt-syndrome': {
    doid: 'DOID:2843',
    pageName: 'Long QT Syndrome',
    group: 'Heart disease',
    listLabel: 'long QT syndrome',
    resources: [
      { title: 'Hearts in Rhythm Organization (HiRO)', url: 'https://heartsinrhythm.ca/' },
      {
        title: 'International LQTS Registry (University of Rochester)',
        url: 'https://www.urmc.rochester.edu/clinical-cardiovascular-research/lqts-registry',
      },
      { title: 'SADS Foundation (Sudden Arrhythmia Death Syndromes)', url: 'https://sads.org/' },
    ],
  },
  'alzheimers-disease': {
    doid: 'DOID:10652',
    pageName: "Alzheimer's Disease",
    group: 'Nervous system disease',
    listLabel: "Alzheimer's disease",
    resources: [
      {
        title: 'Age and Age-Related Disease Portal - Rat Genome Database',
        url: 'https://rgd.mcw.edu/rgdweb/portal/home.jsp?p=1',
      },
      { title: 'Alzheimers.gov', url: 'https://www.alzheimers.gov/' },
      { title: "Alzheimer's Association", url: 'https://www.alz.org/' },
      {
        title: "Alzheimer's Disease Clinical Trials",
        url: 'https://www.clinicaltrials.gov/search?cond=Alzheimer%20Disease',
      },
      { title: "Alzheimer's Foundation of America", url: 'https://alzfdn.org/' },
      { title: 'National Institute on Aging', url: 'https://www.nia.nih.gov/' },
      { title: 'NIAGADS', url: 'https://www.niagads.org/' },
      { title: 'OMIM', url: 'https://omim.org/entry/104300' },
    ],
  },
  epilepsy: {
    doid: 'DOID:1826',
    pageName: 'Epilepsy',
    group: 'Nervous system disease',
    listLabel: 'epilepsy',
    resources: [
      { title: 'American Epilepsy Society', url: 'https://aesnet.org' },
      {
        title: 'CURE Epilepsy - Epilepsy Genetics Initiative (EGI)',
        url: 'https://www.cureepilepsy.org/our-research/epilepsy-genetics-initiative/',
      },
      { title: 'Epi25 Collaborative', url: 'https://epi-25.org/' },
      {
        title: 'NINDS Focus on Epilepsy Research',
        url: 'https://www.ninds.nih.gov/current-research/focus-disorders/focus-epilepsy-research',
      },
    ],
  },
  'parkinsons-disease': {
    doid: 'DOID:14330',
    pageName: "Parkinson's Disease",
    group: 'Nervous system disease',
    listLabel: "Parkinson's disease",
    resources: [
      {
        title: 'Age and Age-Related Disease Portal - Rat Genome Database',
        url: 'https://rgd.mcw.edu/rgdweb/portal/home.jsp?p=1',
      },
      { title: 'National Institute on Aging', url: 'https://www.nia.nih.gov/' },
      {
        title: "Parkinson's Disease Clinical Trials",
        url: 'https://clinicaltrials.gov/search?cond=Parkinson%27s%20Disease&viewType=Card',
      },
      { title: "Parkinson's Precision Medicine Initiative", url: 'https://www.ppmi-info.org/' },
    ],
  },
};

// The root portal (the index page); every other entry is a disease portal.
export const isRootPortal = (portal) => portal?.doid === DISEASE_ROOT_CURIE;

// Portals for the index, grouped by parent disease. Group order and the order
// within each group both follow `data`.
export const portalsByGroup = () => {
  const groups = [];
  Object.entries(data).forEach(([slug, portal]) => {
    if (isRootPortal(portal)) {
      return;
    }
    const name = portal.group || 'Other';
    let group = groups.find((g) => g.name === name);
    if (!group) {
      group = { name, portals: [] };
      groups.push(group);
    }
    group.portals.push({ slug, label: portal.listLabel || portal.pageName });
  });
  return groups;
};
