import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ribbon, {RibbonDataProvider} from '@geneontology/ribbon';
import HorizontalScroll from '../horizontalScroll';
import NoData from '../noData';


class GeneOntologyRibbon extends Component {
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
              dataReceived && blocks.reduce((accumulator, block) => { return ( accumulator + block.uniqueIDs.length ); } , 0) ?
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
