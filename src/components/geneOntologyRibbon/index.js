import React, { Component } from 'react';
import Ribbon, { RibbonDataProvider } from 'gene-ontology-ribbon';

class GeneOntologyRibbon extends Component {
  render() {
    const {db, id} =  this.props;
    return (
      <RibbonDataProvider db={db} id={id}>
      {({title, data, dataReceived, dataError}) => (
          <div>
          {
            dataReceived ? <Ribbon data={data} title={title} /> : null
          }
          {
            dataError ? <i className="text-muted">No Data Available</i> : null
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
