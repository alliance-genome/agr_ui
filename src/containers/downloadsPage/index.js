import React from 'react';
import { UncontrolledCollapse } from 'reactstrap';
import ExternalLink from '../../components/externalLink';
import Subsection from '../../components/subsection';
import { DataPage, PageData, PageHeader, PageNav } from '../../components/dataPage';

import SubmissionSystemFiles from './submissionSystemFiles';
import DownloadFileTable from './downloadFileTable';
import DownloadFileLink from './downloadFileLink';

class DownloadsPage extends React.Component {
  render() {
    const INTERACTIONS = 'Interactions';
    const GENE_DESCRIPTIONS = 'Gene Descriptions';
    const INGEST_FILES = 'Ingested Files';
    const DATABASE_DUMP = 'Database Dump';
    const SECTIONS = [
      {name: GENE_DESCRIPTIONS}, 
      {name: INTERACTIONS}, 
      {name: INGEST_FILES},
      {name: DATABASE_DUMP},
    ];
    const TITLE = 'Downloads';
    return (
      <DataPage title={TITLE}>
        <PageNav entityName={TITLE} sections={SECTIONS} />
        <PageData>
          <PageHeader entityName={TITLE} />
          <Subsection title={GENE_DESCRIPTIONS}>
            <DownloadFileTable>
              <tr>
                <td><i>Caenorhabditis elegans</i> genes</td>
                <td>
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/WB_gene_desc_latest.json' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/WB_gene_desc_latest.tsv' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/WB_gene_desc_latest.txt' />
                </td>
              </tr>
              <tr>
                <td><i>Danio rerio</i> genes</td>
                <td>
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/ZFIN_gene_desc_latest.json' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/ZFIN_gene_desc_latest.tsv' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/ZFIN_gene_desc_latest.txt' />
                </td>
              </tr>
              <tr>
                <td><i>Drosophila melanogaster</i> genes</td>
                <td>
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/FB_gene_desc_latest.json' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/FB_gene_desc_latest.tsv' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/FB_gene_desc_latest.txt' />
                </td>
              </tr>
              <tr>
                <td><i>Homo sapiens</i> genes</td>
                <td>
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/HUMAN_gene_desc_latest.json' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/HUMAN_gene_desc_latest.tsv' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/HUMAN_gene_desc_latest.txt' />
                </td>
              </tr>
              <tr>
                <td><i>Mus musculus</i> genes</td>
                <td>
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/MGI_gene_desc_latest.json' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/MGI_gene_desc_latest.tsv' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/MGI_gene_desc_latest.txt' />
                </td>
              </tr>
              <tr>
                <td><i>Rattus norvegicus</i> genes</td>
                <td>
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/RGD_gene_desc_latest.json' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/RGD_gene_desc_latest.tsv' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/RGD_gene_desc_latest.txt' />
                </td>
              </tr>
              <tr>
                <td><i>Saccharomyces cerevisiae</i> genes</td>
                <td>
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/SGD_gene_desc_latest.json' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/SGD_gene_desc_latest.tsv' />
                  <DownloadFileLink url='http://reports.alliancegenome.org/gene-descriptions/SGD_gene_desc_latest.txt' />
                </td>
              </tr>
            </DownloadFileTable>
          </Subsection>

          <Subsection title={INTERACTIONS}>
            <DownloadFileTable>
              <tr>
                <td>
                  Molecular interactions
                  <i
                    className='fa fa-fw fa-question-circle text-primary'
                    id='interactions-help'
                    style={{cursor: 'pointer', marginLeft: '1rem'}}
                  />
                  <UncontrolledCollapse toggler='#interactions-help'>
                    <p>
                      This file provides a set of annotations of molecular interactions for
                      genes and gene products for all Alliance species (human, rat, mouse, zebrafish, fruit fly, nematode, and
                      yeast). The file is in the <ExternalLink href='https://github.com/HUPO-PSI/miTab'>PSI-MI TAB format</ExternalLink>,
                      a tab-delimited format established by the <ExternalLink href='http://www.psidev.info'>HUPO Proteomics Standards
                      Initiative</ExternalLink> Molecular Interactions (PSI-MI) working group. The interaction data is sourced from
                      Alliance members WormBase and FlyBase, as well as the <ExternalLink href='http://www.imexconsortium.org'>IMEx
                      consortium</ExternalLink> and the <ExternalLink href='https://thebiogrid.org'>BioGRID database</ExternalLink>.
                    </p>
                  </UncontrolledCollapse>
                </td>
                <td>
                  <DownloadFileLink fileType='TXT' url='https://download.alliancegenome.org/INT/Alliance_molecular_interactions.tar.gz' />
                </td>
              </tr>
            </DownloadFileTable>
          </Subsection>

          <Subsection title={INGEST_FILES}>
            <SubmissionSystemFiles />
          </Subsection>

          <Subsection title={DATABASE_DUMP}>
            <DownloadFileTable>
              <tr>
                <td>Full Alliance database dump</td>
                <td>
                  <DownloadFileLink url='https://s3.amazonaws.com/agr-db-backups/alliance-prod-2.1.0-neo4j-backup.tar.gz' />
                </td>
              </tr>
            </DownloadFileTable>
          </Subsection>
        </PageData>
      </DataPage>
    );
  }
}

export default DownloadsPage;
