import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ribbon, {RibbonDataProvider} from '@geneontology/ribbon';
import HorizontalScroll from '../horizontalScroll';
import NoData from '../noData';


class GeneOntologyRibbon extends Component {

  static hasBlockData(blocks){
    for(let b of blocks ){
      if(b.uniqueIDs.length>0){
        return true ;
      }
    }
    return false ;
  }

  render() {
    const {id, slim} = this.props;

    return (
      <RibbonDataProvider heatColorArray={[6, 100, 100]}
                          heatLevels={48}
                          slim={slim}
                          subject={id}
      >
        {({title, blocks, dataError, dataReceived}) => (
          <div>
            {
              dataReceived && GeneOntologyRibbon.hasBlockData(blocks) ?
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
              <NoData />
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
