import React from 'react';
import ExternalLink from '../../components/ExternalLink.jsx';
import Subsection from '../../components/subsection.jsx';
import { DataPage, PageData, PageHeader, PageNav } from '../../components/dataPage';

import DownloadFileTable from './downloadFileTable.jsx';
import HelpPopup from '../../components/helpPopup.jsx';
import GeneDescriptionsHelp from './geneDescriptionsHelp.jsx';
import GeneticInteractionsHelp from './geneticInteractionsHelp.jsx';
import VariantsHelp from './variantsHelp.jsx';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import DownloadFileRow from './DownloadFileRow.jsx';
import PageNavEntity from '../../components/dataPage/PageNavEntity.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import SpeciesName from '../../components/SpeciesName.jsx';
import { useRelease } from '../../hooks/ReleaseContextProvider.jsx';

const DISEASE = 'Disease';
const EXPRESSION = 'Expression';
const MOLECULAR_INTERACTIONS = 'Molecular Interactions';
const GENETIC_INTERACTIONS = 'Genetic Interactions';
const GENE_DESCRIPTIONS = 'Gene Descriptions';
const ORTHOLOGY = 'Orthology';
const VARIANTS = 'Variants (VCF)';
const VARIANT_ALLELE = 'Variants/Alleles';
const SECTIONS = [
  {name: DISEASE},
  {name: EXPRESSION},
  {name: GENE_DESCRIPTIONS},
  {name: MOLECULAR_INTERACTIONS},
  {name: GENETIC_INTERACTIONS},
  {name: ORTHOLOGY},
  {name: VARIANTS},
  {name: VARIANT_ALLELE},
];
const TITLE = 'Downloads';
const SPECIES_SUBTYPES = [
  {species: 'Caenorhabditis elegans', subType: 'WB'},
  {species: 'Danio rerio', subType: 'ZFIN'},
  {species: 'Drosophila melanogaster', subType: 'FB'},
  {species: 'Homo sapiens', subType: 'HUMAN'},
  {species: 'Mus musculus', subType: 'MGI'},
  {species: 'Rattus norvegicus', subType: 'RGD'},
  {species: 'Saccharomyces cerevisiae', subType: 'SGD'},
  {species: 'Xenopus laevis', subType: 'XBXL'},
  {species: 'Xenopus tropicalis', subType: 'XBXT'}
];
const TAXON_SUBTYPES = [
  {species: 'Caenorhabditis elegans', subType: 'NCBITaxon6239'},
  {species: 'Danio rerio', subType: 'NCBITaxon7955'},
  {species: 'Drosophila melanogaster', subType: 'NCBITaxon7227'},
  {species: 'Mus musculus', subType: 'NCBITaxon10090'},
  {species: 'Rattus norvegicus', subType: 'NCBITaxon10116'},
  {species: 'Saccharomyces cerevisiae', subType: 'NCBITaxon559292'},
];

const DownloadsPage = () => {
  const {
    data: dataRelease,
    isLoading: isLoadingRelease,
  } = useRelease();

  const { releaseVersion } = dataRelease || {};

  const {
    data: files,
    isLoading,
  } = usePageLoadingQuery( `https://fms.alliancegenome.org/api/datafile/by/release/${releaseVersion}?latest=true`);

  if (isLoadingRelease || isLoading) {
    return null;
  }

  const getFileForDataType = (dataType, dataSubType) => {
    return files.find(file => (
      file.dataType.name === dataType && file.dataSubType.name === dataSubType
    ));
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
              files={[
                getFileForDataType('DISEASE-ALLIANCE-JSON', 'COMBINED'),
                getFileForDataType('DISEASE-ALLIANCE', 'COMBINED'),
              ]}
            />
            {SPECIES_SUBTYPES.map(speciesSubType => (
              <DownloadFileRow
                description={<><SpeciesName>{speciesSubType.species}</SpeciesName> associations</>}
                key={speciesSubType.species}
                files={[
                  getFileForDataType('DISEASE-ALLIANCE-JSON', speciesSubType.subType),
                  getFileForDataType('DISEASE-ALLIANCE', speciesSubType.subType),
                ]}
              />
            ))}
          </DownloadFileTable>
        </Subsection>

        <Subsection title={EXPRESSION}>
          <DownloadFileTable>
            <DownloadFileRow
              description='All expression annotations'
              files={[
                getFileForDataType('EXPRESSION-ALLIANCE-JSON', 'COMBINED'),
                getFileForDataType('EXPRESSION-ALLIANCE', 'COMBINED'),
              ]}
            />
            {SPECIES_SUBTYPES.filter(({subType}) => subType !== 'HUMAN').map(speciesSubType => (
              <DownloadFileRow
                description={<><SpeciesName>{speciesSubType.species}</SpeciesName> annotations</>}
                key={speciesSubType.species}
                files={[
                  getFileForDataType('EXPRESSION-ALLIANCE-JSON', speciesSubType.subType),
                  getFileForDataType('EXPRESSION-ALLIANCE', speciesSubType.subType),
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
                files={[
                  getFileForDataType('GENE-DESCRIPTION-JSON', speciesSubType.subType),
                  getFileForDataType('GENE-DESCRIPTION-TSV', speciesSubType.subType),
                  getFileForDataType('GENE-DESCRIPTION-TXT', speciesSubType.subType),
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
              files={[getFileForDataType('INTERACTION-MOL', 'COMBINED')]}
            />
            {SPECIES_SUBTYPES.map(speciesSubType => (
              <DownloadFileRow
                description={<><SpeciesName>{speciesSubType.species}</SpeciesName> molecular interactions</>}
                key={speciesSubType.species}
                files={[getFileForDataType('INTERACTION-MOL', speciesSubType.subType)]}
              />
            ))}
            <DownloadFileRow
              description='SARS-CoV-2 molecular interactions'
              files={[getFileForDataType('INTERACTION-MOL', 'SARS-CoV-2')]}
            />
          </DownloadFileTable>
        </Subsection>

        <Subsection help={<GeneticInteractionsHelp />} title={GENETIC_INTERACTIONS}>
          <DownloadFileTable>
            <DownloadFileRow
              description='All genetic interactions'
              files={[getFileForDataType('INTERACTION-GEN', 'COMBINED')]}
            />
            {SPECIES_SUBTYPES.map(speciesSubType => (
              <DownloadFileRow
                description={<><SpeciesName>{speciesSubType.species}</SpeciesName> genetic interactions</>}
                key={speciesSubType.species}
                files={[getFileForDataType('INTERACTION-GEN', speciesSubType.subType)]}
              />
            ))}
          </DownloadFileTable>
        </Subsection>

        <Subsection title={ORTHOLOGY}>
          <DownloadFileTable>
            <DownloadFileRow
              description='Alliance combined orthology data'
              files={[
                getFileForDataType('ORTHOLOGY-ALLIANCE', 'COMBINED'),
                getFileForDataType('ORTHOLOGY-ALLIANCE-JSON', 'COMBINED'),
              ]}
            />
          </DownloadFileTable>
        </Subsection>

        <Subsection help={<VariantsHelp />} title={VARIANTS}>
          <DownloadFileTable>
            <DownloadFileRow
              description={<><SpeciesName>Caenorhabditis elegans</SpeciesName> variants</>}
              files={[getFileForDataType('VCF', 'WBcel235')]}
            />
            <DownloadFileRow
              description={<><SpeciesName>Danio rerio</SpeciesName> variants</>}
              files={[getFileForDataType('VCF', 'GRCz11')]}
            />
            <DownloadFileRow
              description={<><SpeciesName>Drosophila melanogaster</SpeciesName> variants</>}
              files={[getFileForDataType('VCF', 'R6')]}
            />
            <DownloadFileRow
              description={<><SpeciesName>Mus musculus</SpeciesName> variants</>}
              files={[getFileForDataType('VCF', 'GRCm39')]}
            />
            <DownloadFileRow
              description={<><SpeciesName>Rattus norvegicus</SpeciesName> variants</>}
              files={[getFileForDataType('VCF', 'mRatBN7.2')]}
            />
          </DownloadFileTable>
        </Subsection>

        <Subsection title={VARIANT_ALLELE}>
          <DownloadFileTable>
            {TAXON_SUBTYPES.map(taxonSubType => (
              <DownloadFileRow
                description={<><SpeciesName>{taxonSubType.species}</SpeciesName> variants/alleles</>}
                key={taxonSubType.species}
                files={[
                  getFileForDataType('VARIANT-ALLELE-JSON', taxonSubType.subType),
                  getFileForDataType('VARIANT-ALLELE', taxonSubType.subType),
                ]}
              />
            ))}
          </DownloadFileTable>
        </Subsection>
      </PageData>
    </DataPage>
  );
};

export default DownloadsPage;
