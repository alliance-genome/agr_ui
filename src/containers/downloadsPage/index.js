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
import HeadMetaTags from '../../components/headMetaTags';
import {selectFiles} from '../../selectors/fileManagementSystemSelectors';
import {fetchReleaseFiles} from '../../actions/fileManagementSystemActions';
import DownloadFileRow from './DownloadFileRow';

const DOWNLOAD_HOST = 'http://download.alliancegenome.org';

class DownloadsPage extends React.Component {
  componentDidMount() {
    this.props.dispatchFetchFiles();
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
    const INTERACTIONS = 'Interactions';
    const GENE_DESCRIPTIONS = 'Gene Descriptions';
    const VARIANTS = 'Variants';
    const SECTIONS = [
      {name: DISEASE},
      {name: EXPRESSION},
      {name: GENE_DESCRIPTIONS},
      {name: INTERACTIONS},
      {name: VARIANTS},
    ];
    const TITLE = 'Downloads';
    return (
      <DataPage>
        <HeadMetaTags title={TITLE} />
        <PageNav entityName={TITLE} sections={SECTIONS} />
        <PageData>
          <PageHeader entityName={TITLE} />

          <Subsection title={DISEASE}>
            <DownloadFileTable>
              <DownloadFileRow
                description='Disease associations'
                url={this.getUrlForDataType('DISEASE-ALLIANCE', 'COMBINED')}
              />
            </DownloadFileTable>
          </Subsection>

          <Subsection title={EXPRESSION}>
            <DownloadFileTable>
              <DownloadFileRow
                description='Expression annotations'
                url={this.getUrlForDataType('EXPRESSION-ALLIANCE', 'COMBINED')}
              />
            </DownloadFileTable>
          </Subsection>

          <Subsection help={<GeneDescriptionsHelp />} title={GENE_DESCRIPTIONS}>
            <DownloadFileTable>
              <DownloadFileRow
                description={<span><i>Caenorhabditis elegans</i> genes</span>}
                url={[
                  'http://reports.alliancegenome.org/gene-descriptions/WB_gene_desc_latest.json',
                  'http://reports.alliancegenome.org/gene-descriptions/WB_gene_desc_latest.tsv',
                  'http://reports.alliancegenome.org/gene-descriptions/WB_gene_desc_latest.txt',
                ]}
              />
              <DownloadFileRow
                description={<span><i>Danio rerio</i> genes</span>}
                url={[
                  'http://reports.alliancegenome.org/gene-descriptions/ZFIN_gene_desc_latest.json',
                  'http://reports.alliancegenome.org/gene-descriptions/ZFIN_gene_desc_latest.tsv',
                  'http://reports.alliancegenome.org/gene-descriptions/ZFIN_gene_desc_latest.txt',
                ]}
              />
              <DownloadFileRow
                description={<span><i>Drosophila melanogaster</i> genes</span>}
                url={[
                  'http://reports.alliancegenome.org/gene-descriptions/FB_gene_desc_latest.json',
                  'http://reports.alliancegenome.org/gene-descriptions/FB_gene_desc_latest.tsv',
                  'http://reports.alliancegenome.org/gene-descriptions/FB_gene_desc_latest.txt',
                ]}
              />
              <DownloadFileRow
                description={<span><i>Homo sapiens</i> genes</span>}
                url={[
                  'http://reports.alliancegenome.org/gene-descriptions/HUMAN_gene_desc_latest.json',
                  'http://reports.alliancegenome.org/gene-descriptions/HUMAN_gene_desc_latest.tsv',
                  'http://reports.alliancegenome.org/gene-descriptions/HUMAN_gene_desc_latest.txt',
                ]}
              />
              <DownloadFileRow
                description={<span><i>Mus musculus</i> genes</span>}
                url={[
                  'http://reports.alliancegenome.org/gene-descriptions/MGI_gene_desc_latest.json',
                  'http://reports.alliancegenome.org/gene-descriptions/MGI_gene_desc_latest.tsv',
                  'http://reports.alliancegenome.org/gene-descriptions/MGI_gene_desc_latest.txt',
                ]}
              />
              <DownloadFileRow
                description={<span><i>Rattus norvegicus</i> genes</span>}
                url={[
                  'http://reports.alliancegenome.org/gene-descriptions/RGD_gene_desc_latest.json',
                  'http://reports.alliancegenome.org/gene-descriptions/RGD_gene_desc_latest.tsv',
                  'http://reports.alliancegenome.org/gene-descriptions/RGD_gene_desc_latest.txt',
                ]}
              />
              <DownloadFileRow
                description={<span><i>Saccharomyces cerevisiae</i> genes</span>}
                url={[
                  'http://reports.alliancegenome.org/gene-descriptions/SGD_gene_desc_latest.json',
                  'http://reports.alliancegenome.org/gene-descriptions/SGD_gene_desc_latest.tsv',
                  'http://reports.alliancegenome.org/gene-descriptions/SGD_gene_desc_latest.txt',
                ]}
              />
            </DownloadFileTable>
          </Subsection>

          <Subsection title={INTERACTIONS}>
            <DownloadFileTable>
              <DownloadFileRow
                description={
                  <span>Molecular interactions <HelpPopup id='interactions-help'>
                    This file provides a set of annotations of molecular interactions for
                    genes and gene products for all Alliance species (human, rat, mouse, zebrafish, fruit fly, nematode, and
                    yeast). The file is in the <ExternalLink href='https://github.com/HUPO-PSI/miTab'>PSI-MI TAB format</ExternalLink>,
                    a tab-delimited format established by the <ExternalLink href='http://www.psidev.info'>HUPO Proteomics Standards
                    Initiative</ExternalLink> Molecular Interactions (PSI-MI) working group. The interaction data is sourced from
                    Alliance members WormBase and FlyBase, as well as the <ExternalLink href='http://www.imexconsortium.org'>IMEx
                    consortium</ExternalLink> and the <ExternalLink href='https://thebiogrid.org'>BioGRID database</ExternalLink>.
                  </HelpPopup></span>}
                fileType='TSV'
                url='https://download.alliancegenome.org/INT/Alliance_molecular_interactions.tar.gz'
              />
            </DownloadFileTable>
          </Subsection>

          <Subsection title={VARIANTS}>
            <DownloadFileTable>
              <DownloadFileRow
                description={<span><i>Caenorhabditis elegans</i> VCF</span>}
                url={this.getUrlForDataType('VCF', 'WBcel235')}
              />
              <DownloadFileRow
                description={<span><i>Danio rerio</i> VCF</span>}
                url={this.getUrlForDataType('VCF', 'GRCz11')}
              />
              <DownloadFileRow
                description={<span><i>Drosophila melanogaster</i> VCF</span>}
                url={this.getUrlForDataType('VCF', 'R6')}
              />
              <DownloadFileRow
                description={<span><i>Mus musculus</i> VCF</span>}
                url={this.getUrlForDataType('VCF', 'GRCm38')}
              />
              <DownloadFileRow
                description={<span><i>Rattus norvegicus</i> VCF</span>}
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
};

const mapStateToProps = state => ({
  files: selectFiles(state),
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchFiles: () => dispatch(fetchReleaseFiles(process.env.RELEASE)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadsPage);
