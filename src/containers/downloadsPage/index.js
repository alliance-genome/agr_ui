import React from 'react';
import { AttributeList, AttributeLabel, AttributeValue } from '../../components/attribute';
import { UncontrolledCollapse } from 'reactstrap';
import ExternalLink from '../../components/externalLink';

class DownloadsPage extends React.Component {
  render() {
    return (
      <div className='container'>
        <h1>
          Downloads
          <hr />
        </h1>
        <AttributeList>
          <AttributeLabel>Interactions</AttributeLabel>
          <AttributeValue>
            <a href='https://mod-datadumps.s3.amazonaws.com/INT/Alliance_molecular_interactions.tar.gz'>
              Alliance_molecular_interactions.tar.gz
            </a>
            <i className='fa fa-fw fa-question-circle text-primary'
               id='interactions-help'
               style={{cursor: 'pointer', marginLeft: '1rem'}}
            />
            <UncontrolledCollapse toggler='#interactions-help'>
              <p>
                This provides a set of annotations of molecular interactions for
                genes and gene products for all Alliance species (human, rat, mouse, zebrafish, fruit fly, nematode, and
                yeast). The file is in the <ExternalLink href='https://github.com/HUPO-PSI/miTab'>PSI-MI TAB format</ExternalLink>,
                a tab-delimited format established by the <ExternalLink href='http://www.psidev.info'>HUPO Proteomics Standards
                Initiative</ExternalLink> Molecular Interactions (PSI-MI) working group. The interaction data is sourced from
                Alliance members WormBase and FlyBase, as well as the <ExternalLink href='http://www.imexconsortium.org'>IMEx
                consortium</ExternalLink> and the <ExternalLink href='https://thebiogrid.org'>BioGRID database</ExternalLink>.
              </p>
            </UncontrolledCollapse>
          </AttributeValue>
        </AttributeList>
      </div>
    );
  }
}

export default DownloadsPage;
