
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ribbon , { RibbonDataProvider } from '@nathandunn/gene-ontology-ribbon';
import '../../../node_modules/@nathandunn/gene-ontology-ribbon/lib/index.css';


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
                subject={id}
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
