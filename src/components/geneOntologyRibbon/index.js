
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ribbon, { RibbonDataProvider } from '@sibyl229/gene-ontology-ribbon';
import '../../../node_modules/@sibyl229/gene-ontology-ribbon/lib/index.css';


class GeneOntologyRibbon extends Component {
  render() {
    const {id} =  this.props;

    return (
      <RibbonDataProvider subject={id}>
      {({title, data, dataError, dataReceived}) => (
          <div>
          {
            dataReceived ?
              <Ribbon
                geneUrlFormatter={(geneId) => `/gene/${geneId}`}
                slimlist={data}
                title={title}
              /> :
              null
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
