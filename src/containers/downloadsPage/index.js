import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ExternalLink from '../../components/externalLink';
import Subsection from '../../components/subsection';
import { DataPage, PageData, PageHeader, PageNav } from '../../components/dataPage';

import DownloadFileTable from './downloadFileTable';
import DownloadFileLink from './downloadFileLink';
import HelpPopup from '../../components/helpPopup';
import GeneDescriptionsHelp from './geneDescriptionsHelp';
import GeneticInteractionsHelp from './geneticInteractionsHelp';
import VariantsHelp from './variantsHelp';
import HeadMetaTags from '../../components/headMetaTags';
import {selectFiles} from '../../selectors/fileManagementSystemSelectors';
import {fetchReleaseFiles} from '../../actions/fileManagementSystemActions';
import DownloadFileRow from './DownloadFileRow';
import {setPageLoading} from '../../actions/loadingActions';
import PageNavEntity from '../../components/dataPage/PageNavEntity';

const DOWNLOAD_HOST = 'http://download.alliancegenome.org';

class DownloadsPage extends React.Component {
  componentDidMount() {
    const { dispatchFetchFiles, setPageLoading } = this.props;
    setPageLoading(true);
    dispatchFetchFiles().finally(() => setPageLoading(false));
  }

  getUrlForDataType(dataType, dataSubType) {
    const file = this.props.files.data.find(file => (
      file.dataType.name === dataType && file.dataSubType.name === dataSubType
    ));
    return file ? DOWNLOAD_HOST + '/' + file.s3Path : undefined;
  }

  renderRow(description, dataType, dataSubType, fileType) {
    const url = this.getUrlForDataType(dataType, dataSubType);
    if (!url) {
      return null;
    }
    return (
      <tr>
        <td>{description}</td>
        <td><DownloadFileLink fileType={fileType} url={url} /></td>
      </tr>
    );
  }

  render() {
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

    const speciesSubTypes = [
      {species: 'Caenorhabditis elegans', subType: 'WB'},
      {species: 'Danio rerio', subType: 'ZFIN'},
      {species: 'Drosophila melanogaster', subType: 'FB'},
      {species: 'Homo sapiens', subType: 'HUMAN'},
      {species: 'Mus musculus', subType: 'MGI'},
      {species: 'Rattus norvegicus', subType: 'RGD'},
      {species: 'Saccharomyces cerevisiae', subType: 'SGD'}
    ];

    return (
      <DataPage>
        <HeadMetaTags title={TITLE} />
        <PageNav sections={SECTIONS}>
          <PageNavEntity entityName={TITLE} />
        </PageNav>
        <PageData>
          <PageHeader entityName={TITLE} />

          <Subsection title={DISEASE}>
            <DownloadFileTable>
              <DownloadFileRow
                description='All disease associations'
                url={[
                  this.getUrlForDataType('DISEASE-ALLIANCE-JSON', 'COMBINED'),
                  this.getUrlForDataType('DISEASE-ALLIANCE', 'COMBINED'),
                ]}
              />
              {speciesSubTypes.map(speciesSubType => (
                <DownloadFileRow
                  description={<span><i>{speciesSubType.species}</i> associations</span>}
                  key={speciesSubType.species}
                  url={[
                    this.getUrlForDataType('DISEASE-ALLIANCE-JSON', speciesSubType.subType),
                    this.getUrlForDataType('DISEASE-ALLIANCE', speciesSubType.subType),
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
                  this.getUrlForDataType('EXPRESSION-ALLIANCE-JSON', 'COMBINED'),
                  this.getUrlForDataType('EXPRESSION-ALLIANCE', 'COMBINED'),
                ]}
              />
              {speciesSubTypes.filter(({subType}) => subType !== 'HUMAN').map(speciesSubType => (
                <DownloadFileRow
                  description={<span><i>{speciesSubType.species}</i> annotations</span>}
                  key={speciesSubType.species}
                  url={[
                    this.getUrlForDataType('EXPRESSION-ALLIANCE-JSON', speciesSubType.subType),
                    this.getUrlForDataType('EXPRESSION-ALLIANCE', speciesSubType.subType),
                  ]}
                />
              ))}
            </DownloadFileTable>
          </Subsection>

          <Subsection help={<GeneDescriptionsHelp />} title={GENE_DESCRIPTIONS}>
            <DownloadFileTable>
              {speciesSubTypes.map(speciesSubType => (
                <DownloadFileRow
                  description={<span><i>{speciesSubType.species}</i> genes</span>}
                  key={speciesSubType.species}
                  url={[
                    this.getUrlForDataType('GENE-DESCRIPTION-JSON', speciesSubType.subType),
                    this.getUrlForDataType('GENE-DESCRIPTION-TSV', speciesSubType.subType),
                    this.getUrlForDataType('GENE-DESCRIPTION-TXT', speciesSubType.subType),
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
                url={this.getUrlForDataType('INTERACTION-MOL', 'COMBINED')}
              />
              {speciesSubTypes.map(speciesSubType => (
                <DownloadFileRow
                  description={<span><i>{speciesSubType.species}</i> molecular interactions</span>}
                  key={speciesSubType.species}
                  url={this.getUrlForDataType('INTERACTION-MOL', speciesSubType.subType)}
                />
              ))}
            </DownloadFileTable>
          </Subsection>

          <Subsection help={<GeneticInteractionsHelp />} title={GENETIC_INTERACTIONS}>
            <DownloadFileTable>
              <DownloadFileRow
                description='All genetic interactions'
                url={this.getUrlForDataType('INTERACTION-GEN', 'COMBINED')}
              />
              {speciesSubTypes.map(speciesSubType => (
                <DownloadFileRow
                  description={<span><i>{speciesSubType.species}</i> genetic interactions</span>}
                  key={speciesSubType.species}
                  url={this.getUrlForDataType('INTERACTION-GEN', speciesSubType.subType)}
                />
              ))}
            </DownloadFileTable>
          </Subsection>

          <Subsection title={ORTHOLOGY}>
            <DownloadFileTable>
              <DownloadFileRow
                description='Alliance combined orthology data'
                url={[
                  this.getUrlForDataType('ORTHOLOGY-ALLIANCE', 'COMBINED'),
                  this.getUrlForDataType('ORTHOLOGY-ALLIANCE-JSON', 'COMBINED'),
                ]}
              />
            </DownloadFileTable>
          </Subsection>

          <Subsection help={<VariantsHelp />} title={VARIANTS}>
            <DownloadFileTable>
              <DownloadFileRow
                description={<span><i>Caenorhabditis elegans</i> variants</span>}
                url={this.getUrlForDataType('VCF', 'WBcel235')}
              />
              <DownloadFileRow
                description={<span><i>Danio rerio</i> variants</span>}
                url={this.getUrlForDataType('VCF', 'GRCz11')}
              />
              <DownloadFileRow
                description={<span><i>Drosophila melanogaster</i> variants</span>}
                url={this.getUrlForDataType('VCF', 'R6')}
              />
              <DownloadFileRow
                description={<span><i>Mus musculus</i> variants</span>}
                url={this.getUrlForDataType('VCF', 'GRCm38')}
              />
              <DownloadFileRow
                description={<span><i>Rattus norvegicus</i> variants</span>}
                url={this.getUrlForDataType('VCF', 'Rnor60')}
              />
            </DownloadFileTable>
          </Subsection>
        </PageData>
      </DataPage>
    );
  }
}

DownloadsPage.propTypes = {
  dispatchFetchFiles: PropTypes.func,
  files: PropTypes.object,
  setPageLoading: PropTypes.func,
};

const mapStateToProps = state => ({
  files: selectFiles(state),
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchFiles: () => dispatch(fetchReleaseFiles(process.env.RELEASE)),
  setPageLoading: loading => dispatch(setPageLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadsPage);
