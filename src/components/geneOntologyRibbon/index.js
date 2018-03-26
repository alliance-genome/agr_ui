
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Ribbon from 'gene-ontology-ribbon/src/Ribbon';
// import RibbonDataProvider from 'gene-ontology-ribbon/src/RibbonDataProvider';
import Ribbon , { RibbonDataProvider } from 'gene-ontology-ribbon';
// import Ribbon, { RibbonDataProvider } from '@sibyl229/gene-ontology-ribbon';
import '../../../node_modules/gene-ontology-ribbon/lib/index.css';


class GeneOntologyRibbon extends Component {
  render() {
    const {id,slim} =  this.props;

    return (
      <RibbonDataProvider slim={slim} subject={id} >
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
  id: PropTypes.string.isRequired,
  slim: PropTypes.string.isRequired,
};

export default GeneOntologyRibbon;
