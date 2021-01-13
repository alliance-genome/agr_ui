import React from 'react';
import ExternalLink from '../../components/ExternalLink';
import Subsection from '../../components/subsection';
import { DataPage, PageData, PageHeader, PageNav } from '../../components/dataPage';

import DownloadFileTable from './downloadFileTable';
import HelpPopup from '../../components/helpPopup';
import GeneDescriptionsHelp from './geneDescriptionsHelp';
import GeneticInteractionsHelp from './geneticInteractionsHelp';
import VariantsHelp from './variantsHelp';
import HeadMetaTags from '../../components/headMetaTags';
import DownloadFileRow from './DownloadFileRow';
import PageNavEntity from '../../components/dataPage/PageNavEntity';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import SpeciesName from '../../components/SpeciesName';

const DOWNLOAD_HOST = 'http://download.alliancegenome.org';
const DISEASE = 'Disease';
const EXPRESSION = 'Expression';
const MOLECULAR_INTERACTIONS = 'Molecular Interactions';
const GENETIC_INTERACTIONS = 'Genetic Interactions';
const GENE_DESCRIPTIONS = 'Gene Descriptions';
const ORTHOLOGY = 'Orthology';
const VARIANTS = 'Variants';
const SECTIONS = [
  {name: DISEASE},
  {name: EXPRESSION},
  {name: GENE_DESCRIPTIONS},
  {name: MOLECULAR_INTERACTIONS},
  {name: GENETIC_INTERACTIONS},
  {name: ORTHOLOGY},
  {name: VARIANTS},
];
const TITLE = 'Downloads';
const SPECIES_SUBTYPES = [
  {species: 'Caenorhabditis elegans', subType: 'WB'},
  {species: 'Danio rerio', subType: 'ZFIN'},
  {species: 'Drosophila melanogaster', subType: 'FB'},
  {species: 'Homo sapiens', subType: 'HUMAN'},
  {species: 'Mus musculus', subType: 'MGI'},
  {species: 'Rattus norvegicus', subType: 'RGD'},
  {species: 'Saccharomyces cerevisiae', subType: 'SGD'}
];

const DownloadsPage = () => {
  const {
    data: files,
    isLoading,
  } = usePageLoadingQuery( `https://fms.alliancegenome.org/api/datafile/by/release/${process.env.ALLIANCE_RELEASE}?latest=true`);

  if (isLoading) {
    return null;
  }

  const getUrlForDataType = (dataType, dataSubType) => {
    const file = files.find(file => (
      file.dataType.name === dataType && file.dataSubType.name === dataSubType
    ));
    return file ? DOWNLOAD_HOST + '/' + file.s3Path : undefined;
  };

  return (
    <DataPage>
      <HeadMetaTags title={TITLE} />
      <PageNav sections={SECTIONS}>
        <PageNavEntity entityName={TITLE} />
      </PageNav>
      <PageData>
        <PageHeader>{TITLE}</PageHeader>

        <Subsection title={DISEASE}>
          <DownloadFileTable>
            <DownloadFileRow
              description='All disease associations'
              url={[
                getUrlForDataType('DISEASE-ALLIANCE-JSON', 'COMBINED'),
                getUrlForDataType('DISEASE-ALLIANCE', 'COMBINED'),
              ]}
            />
            {SPECIES_SUBTYPES.map(speciesSubType => (
              <DownloadFileRow
                description={<><SpeciesName>{speciesSubType.species}</SpeciesName> associations</>}
                key={speciesSubType.species}
                url={[
                  getUrlForDataType('DISEASE-ALLIANCE-JSON', speciesSubType.subType),
                  getUrlForDataType('DISEASE-ALLIANCE', speciesSubType.subType),
                ]}
              />
            ))}
          </DownloadFileTable>
        </Subsection>

        <Subsection title={EXPRESSION}>
          <DownloadFileTable>
            <DownloadFileRow
              description='All expression annotations'
              url={[
                getUrlForDataType('EXPRESSION-ALLIANCE-JSON', 'COMBINED'),
                getUrlForDataType('EXPRESSION-ALLIANCE', 'COMBINED'),
              ]}
            />
            {SPECIES_SUBTYPES.filter(({subType}) => subType !== 'HUMAN').map(speciesSubType => (
              <DownloadFileRow
                description={<><SpeciesName>{speciesSubType.species}</SpeciesName> annotations</>}
                key={speciesSubType.species}
                url={[
                  getUrlForDataType('EXPRESSION-ALLIANCE-JSON', speciesSubType.subType),
                  getUrlForDataType('EXPRESSION-ALLIANCE', speciesSubType.subType),
                ]}
              />
            ))}
          </DownloadFileTable>
        </Subsection>

        <Subsection help={<GeneDescriptionsHelp />} title={GENE_DESCRIPTIONS}>
          <DownloadFileTable>
            {SPECIES_SUBTYPES.map(speciesSubType => (
              <DownloadFileRow
                description={<><SpeciesName>{speciesSubType.species}</SpeciesName> genes</>}
                key={speciesSubType.species}
                url={[
                  getUrlForDataType('GENE-DESCRIPTION-JSON', speciesSubType.subType),
                  getUrlForDataType('GENE-DESCRIPTION-TSV', speciesSubType.subType),
                  getUrlForDataType('GENE-DESCRIPTION-TXT', speciesSubType.subType),
                ]}
              />
            ))}
          </DownloadFileTable>
        </Subsection>

        <Subsection title={MOLECULAR_INTERACTIONS}>
          <DownloadFileTable>
            <DownloadFileRow
              description={
                <span>All molecular interactions <HelpPopup id='interactions-help'>
                    This file provides a set of annotations of molecular interactions for
                    genes and gene products for all Alliance species (human, rat, mouse, zebrafish, fruit fly, nematode, and
                    yeast). The file is in the <ExternalLink href='https://github.com/HUPO-PSI/miTab/blob/master/PSI-MITAB27Format.md'>PSI-MI TAB 2.7 format</ExternalLink>,
                    a tab-delimited format established by the <ExternalLink href='http://www.psidev.info'>HUPO Proteomics Standards
                    Initiative</ExternalLink> Molecular Interactions (PSI-MI) working group. The interaction data is sourced from
                    Alliance members WormBase and FlyBase, as well as the <ExternalLink href='http://www.imexconsortium.org'>IMEx
                    consortium</ExternalLink> and the <ExternalLink href='https://thebiogrid.org'>BioGRID database</ExternalLink>.
                </HelpPopup></span>}
              url={getUrlForDataType('INTERACTION-MOL', 'COMBINED')}
            />
            {SPECIES_SUBTYPES.map(speciesSubType => (
              <DownloadFileRow
                description={<><SpeciesName>{speciesSubType.species}</SpeciesName> molecular interactions</>}
                key={speciesSubType.species}
                url={getUrlForDataType('INTERACTION-MOL', speciesSubType.subType)}
              />
            ))}
            <DownloadFileRow
              description='SARS-CoV-2 molecular interactions'
              url={getUrlForDataType('INTERACTION-MOL', 'SARS-CoV-2')}
            />
          </DownloadFileTable>
        </Subsection>

        <Subsection help={<GeneticInteractionsHelp />} title={GENETIC_INTERACTIONS}>
          <DownloadFileTable>
            <DownloadFileRow
              description='All genetic interactions'
              url={getUrlForDataType('INTERACTION-GEN', 'COMBINED')}
            />
            {SPECIES_SUBTYPES.map(speciesSubType => (
              <DownloadFileRow
                description={<><SpeciesName>{speciesSubType.species}</SpeciesName> genetic interactions</>}
                key={speciesSubType.species}
                url={getUrlForDataType('INTERACTION-GEN', speciesSubType.subType)}
              />
            ))}
          </DownloadFileTable>
        </Subsection>

        <Subsection title={ORTHOLOGY}>
          <DownloadFileTable>
            <DownloadFileRow
              description='Alliance combined orthology data'
              url={[
                getUrlForDataType('ORTHOLOGY-ALLIANCE', 'COMBINED'),
                getUrlForDataType('ORTHOLOGY-ALLIANCE-JSON', 'COMBINED'),
              ]}
            />
          </DownloadFileTable>
        </Subsection>

        <Subsection help={<VariantsHelp />} title={VARIANTS}>
          <DownloadFileTable>
            <DownloadFileRow
              description={<><SpeciesName>Caenorhabditis elegans</SpeciesName> variants</>}
              url={getUrlForDataType('VCF', 'WBcel235')}
            />
            <DownloadFileRow
              description={<><SpeciesName>Danio rerio</SpeciesName> variants</>}
              url={getUrlForDataType('VCF', 'GRCz11')}
            />
            <DownloadFileRow
              description={<><SpeciesName>Drosophila melanogaster</SpeciesName> variants</>}
              url={getUrlForDataType('VCF', 'R6')}
            />
            <DownloadFileRow
              description={<><SpeciesName>Mus musculus</SpeciesName> variants</>}
              url={getUrlForDataType('VCF', 'GRCm38')}
            />
            <DownloadFileRow
              description={<><SpeciesName>Rattus norvegicus</SpeciesName> variants</>}
              url={getUrlForDataType('VCF', 'Rnor60')}
            />
          </DownloadFileTable>
        </Subsection>
      </PageData>
    </DataPage>
  );
};

export default DownloadsPage;
