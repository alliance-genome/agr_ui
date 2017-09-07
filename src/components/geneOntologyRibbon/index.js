import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ribbon, { RibbonDataProvider } from 'gene-ontology-ribbon';
import '../../../node_modules/gene-ontology-ribbon/lib/index.css';
import fixRibbonPlacement from './fixRibbonPlacement';

const PlacedRibbon = fixRibbonPlacement(Ribbon);

class GeneOntologyRibbon extends Component {
  render() {
    const {id} =  this.props;

    return (
      <RibbonDataProvider subject={id}>
      {({title, data, dataReceived, dataError, queryID}) => (
          <div>
          {
            dataReceived ? <PlacedRibbon data={data} queryID={queryID} title={title} /> : null
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
  id: PropTypes.string.isRequired
};

export default GeneOntologyRibbon;
