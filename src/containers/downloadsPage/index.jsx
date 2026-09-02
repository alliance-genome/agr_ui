import React from 'react';
import ExternalLink from '../../components/ExternalLink.jsx';
import Subsection from '../../components/subsection.jsx';
import { DataPage, PageData, PageHeader, PageNav } from '../../components/dataPage';

import DownloadFileTable from './downloadFileTable.jsx';
import HelpPopup from '../../components/helpPopup.jsx';
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
const PHENOTYPES = 'Phenotypes';
const MOLECULAR_INTERACTIONS = 'Molecular Interactions';
const GENETIC_INTERACTIONS = 'Genetic Interactions';
const GENE_DESCRIPTIONS = 'Genes';
const ORTHOLOGY = 'Orthology';
const VARIANTS = 'Variants (VCF)';
const VARIANT_ALLELE = 'Variants/Alleles';
const SECTIONS = [
  { name: DISEASE },
  { name: EXPRESSION },
  { name: PHENOTYPES },
  { name: GENE_DESCRIPTIONS },
  { name: MOLECULAR_INTERACTIONS },
  { name: GENETIC_INTERACTIONS },
  { name: ORTHOLOGY },
  { name: VARIANTS },
  { name: VARIANT_ALLELE },
];
const TITLE = 'Downloads';
const SPECIES_SUBTYPES = [
  { species: 'Caenorhabditis elegans', subType: 'WB' },
  { species: 'Danio rerio', subType: 'ZFIN' },
  { species: 'Drosophila melanogaster', subType: 'FB' },
  { species: 'Homo sapiens', subType: 'HUMAN' },
  { species: 'Mus musculus', subType: 'MGI' },
  { species: 'Rattus norvegicus', subType: 'RGD' },
  { species: 'Saccharomyces cerevisiae', subType: 'SGD' },
  { species: 'Xenopus laevis', subType: 'XBXL' },
  { species: 'Xenopus tropicalis', subType: 'XBXT' },
];
const DownloadsPage = () => {
  const { isLoading: isLoadingRelease } = useRelease();

  const { data: files, isLoading } = usePageLoadingQuery(`/api/downloads`);

  if (isLoadingRelease || isLoading) {
    return null;
  }

  const getFilesForDataType = (dataType, dataSubType) => {
    return files.filter((file) => file.dataType === dataType && file.dataSubType === dataSubType);
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
              description="All disease associations"
              files={getFilesForDataType('DISEASE-ALLIANCE', 'COMBINED')}
            />
            {SPECIES_SUBTYPES.map((speciesSubType) => (
              <DownloadFileRow
                description={
                  <>
                    <SpeciesName>{speciesSubType.species}</SpeciesName> associations
                  </>
                }
                key={speciesSubType.species}
                files={getFilesForDataType('DISEASE-ALLIANCE', speciesSubType.subType)}
              />
            ))}
          </DownloadFileTable>
        </Subsection>

        <Subsection title={EXPRESSION}>
          <DownloadFileTable>
            <DownloadFileRow
              description="All expression annotations"
              files={getFilesForDataType('EXPRESSION-ALLIANCE', 'COMBINED')}
            />
            {SPECIES_SUBTYPES.filter(({ subType }) => subType !== 'HUMAN').map((speciesSubType) => (
              <DownloadFileRow
                description={
                  <>
                    <SpeciesName>{speciesSubType.species}</SpeciesName> annotations
                  </>
                }
                key={speciesSubType.species}
                files={getFilesForDataType('EXPRESSION-ALLIANCE', speciesSubType.subType)}
              />
            ))}
          </DownloadFileTable>
        </Subsection>

        <Subsection title={PHENOTYPES}>
          <DownloadFileTable>
            <DownloadFileRow
              description="All phenotype annotations"
              files={getFilesForDataType('PHENOTYPE-ALLIANCE', 'COMBINED')}
            />
            {SPECIES_SUBTYPES.filter(({ subType }) => subType !== 'HUMAN').map((speciesSubType) => (
              <DownloadFileRow
                description={
                  <>
                    <SpeciesName>{speciesSubType.species}</SpeciesName> annotations
                  </>
                }
                key={speciesSubType.species}
                files={getFilesForDataType('PHENOTYPE-ALLIANCE', speciesSubType.subType)}
              />
            ))}
          </DownloadFileTable>
        </Subsection>

        <Subsection title={GENE_DESCRIPTIONS}>
          <DownloadFileTable>
            <DownloadFileRow description="All genes" files={getFilesForDataType('GENE', 'COMBINED')} />
            {SPECIES_SUBTYPES.map((speciesSubType) => (
              <DownloadFileRow
                description={
                  <>
                    <SpeciesName>{speciesSubType.species}</SpeciesName> genes
                  </>
                }
                key={speciesSubType.species}
                files={getFilesForDataType('GENE', speciesSubType.subType)}
              />
            ))}
          </DownloadFileTable>
        </Subsection>

        <Subsection title={MOLECULAR_INTERACTIONS}>
          <DownloadFileTable>
            <DownloadFileRow
              description={
                <span>
                  All molecular interactions{' '}
                  <HelpPopup id="interactions-help">
                    This file provides a set of annotations of molecular interactions for genes and gene products for
                    all Alliance species (human, rat, mouse, zebrafish, fruit fly, nematode, and yeast). The file is in
                    the{' '}
                    <ExternalLink href="https://github.com/HUPO-PSI/miTab/blob/master/PSI-MITAB27Format.md">
                      PSI-MI TAB 2.7 format
                    </ExternalLink>
                    , a tab-delimited format established by the{' '}
                    <ExternalLink href="http://www.psidev.info">HUPO Proteomics Standards Initiative</ExternalLink>{' '}
                    Molecular Interactions (PSI-MI) working group. The interaction data is sourced from Alliance members
                    WormBase and FlyBase, as well as the{' '}
                    <ExternalLink href="http://www.imexconsortium.org">IMEx consortium</ExternalLink>
                    {' and the '}
                    <ExternalLink href="https://thebiogrid.org">BioGRID database</ExternalLink>.
                  </HelpPopup>
                </span>
              }
              files={getFilesForDataType('INTERACTION-MOL', 'COMBINED')}
            />
            {SPECIES_SUBTYPES.map((speciesSubType) => (
              <DownloadFileRow
                description={
                  <>
                    <SpeciesName>{speciesSubType.species}</SpeciesName> molecular interactions
                  </>
                }
                key={speciesSubType.species}
                files={getFilesForDataType('INTERACTION-MOL', speciesSubType.subType)}
              />
            ))}
            <DownloadFileRow
              description="SARS-CoV-2 molecular interactions"
              files={getFilesForDataType('INTERACTION-MOL', 'SARS-CoV-2')}
            />
          </DownloadFileTable>
        </Subsection>

        <Subsection help={<GeneticInteractionsHelp />} title={GENETIC_INTERACTIONS}>
          <DownloadFileTable>
            <DownloadFileRow
              description="All genetic interactions"
              files={getFilesForDataType('INTERACTION-GEN', 'COMBINED')}
            />
            {SPECIES_SUBTYPES.map((speciesSubType) => (
              <DownloadFileRow
                description={
                  <>
                    <SpeciesName>{speciesSubType.species}</SpeciesName> genetic interactions
                  </>
                }
                key={speciesSubType.species}
                files={getFilesForDataType('INTERACTION-GEN', speciesSubType.subType)}
              />
            ))}
          </DownloadFileTable>
        </Subsection>

        <Subsection title={ORTHOLOGY}>
          <DownloadFileTable>
            <DownloadFileRow
              description="Alliance combined orthology data"
              files={getFilesForDataType('ORTHOLOGY-ALLIANCE', 'COMBINED')}
            />
          </DownloadFileTable>
        </Subsection>

        <Subsection help={<VariantsHelp />} title={VARIANTS}>
          <DownloadFileTable>
            <DownloadFileRow
              description={
                <>
                  <SpeciesName>Caenorhabditis elegans</SpeciesName> variants
                </>
              }
              files={getFilesForDataType('VARIANT-CONSEQUENCE', 'WB')}
            />
            <DownloadFileRow
              description={
                <>
                  <SpeciesName>Danio rerio</SpeciesName> variants
                </>
              }
              files={getFilesForDataType('VARIANT-CONSEQUENCE', 'ZFIN')}
            />
            <DownloadFileRow
              description={
                <>
                  <SpeciesName>Drosophila melanogaster</SpeciesName> variants
                </>
              }
              files={getFilesForDataType('VARIANT-CONSEQUENCE', 'FB')}
            />
            <DownloadFileRow
              description={
                <>
                  <SpeciesName>Mus musculus</SpeciesName> variants
                </>
              }
              files={getFilesForDataType('VARIANT-CONSEQUENCE', 'MGI')}
            />
            <DownloadFileRow
              description={
                <>
                  <SpeciesName>Rattus norvegicus</SpeciesName> variants
                </>
              }
              files={getFilesForDataType('VARIANT-CONSEQUENCE', 'RGD')}
            />
          </DownloadFileTable>
        </Subsection>

        <Subsection title={VARIANT_ALLELE}>
          <DownloadFileTable>
            {SPECIES_SUBTYPES.map((speciesSubType) => (
              <DownloadFileRow
                description={
                  <>
                    <SpeciesName>{speciesSubType.species}</SpeciesName> variants/alleles
                  </>
                }
                key={speciesSubType.species}
                files={getFilesForDataType('VARIANT-ALLELE', speciesSubType.subType)}
              />
            ))}
          </DownloadFileTable>
        </Subsection>
      </PageData>
    </DataPage>
  );
};

export default DownloadsPage;
