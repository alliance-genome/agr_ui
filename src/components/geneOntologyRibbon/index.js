import React, { Component } from 'react';
import Ribbon, { RibbonDataProvider } from 'gene-ontology-ribbon';
import '../../../node_modules/gene-ontology-ribbon/lib/index.css';

class GeneOntologyRibbon extends Component {
  render() {
    const {db, id} =  this.props;

    return (
      <RibbonDataProvider subject={id}>
      {({title, data, dataReceived, dataError}) => (
          <div>
          {
            dataReceived ? <Ribbon data={data} title={title} /> : null
          }
          {
            dataError ? <i className="text-muted">No Data Available</i> : null
          }
          {
            dataReceived || dataError ? null : 'Loading...'
          }
          </div>
        )
      }
      </RibbonDataProvider>
    );
  }
}

GeneOntologyRibbon.propTypes = {
  db: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired
};

export default GeneOntologyRibbon;
