
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ribbon , { RibbonDataProvider } from '@geneontology/ribbon';
import '../../../node_modules/@geneontology/ribbon/lib/index.css';
import HorizontalScroll from '../horizontalScroll';


class GeneOntologyRibbon extends Component {
  render() {
    const {id,slim} =  this.props;

    return (
      <RibbonDataProvider slim={slim} subject={id} >
      {({title, data, dataError, dataReceived}) => (
          <div>
          {
            dataReceived ?
              <HorizontalScroll width={800}>
                <Ribbon
                  geneUrlFormatter={(geneId) => `/gene/${geneId}`}
                  showing={false}
                  slimlist={data}
                  subject={id}
                  title={title}
                />
              </HorizontalScroll>
               :
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
