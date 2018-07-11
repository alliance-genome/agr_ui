
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ribbon , { RibbonDataProvider } from '@geneontology/ribbon';
import '@geneontology/ribbon/lib/index.css';
import HorizontalScroll from '../horizontalScroll';
import NoData from '../noData';


class GeneOntologyRibbon extends Component {
  render() {
    const {id,slim} =  this.props;

    return (
      <RibbonDataProvider slim={slim} subject={id} >
      {({title, blocks, dataError, dataReceived}) => (
          <div>
          {
            dataReceived ?
              <HorizontalScroll width={800}>
                <Ribbon
                  blocks={blocks}
                  geneUrlFormatter={(geneId) => `/gene/${geneId}`}
                  showing={false}
                  subject={id}
                  title={title}
                />
              </HorizontalScroll>
               :
              null
          }
          {
            dataError ? <NoData /> : null
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
