import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ribbon, {RibbonDataProvider} from '@geneontology/ribbon';
import HorizontalScroll from '../horizontalScroll';
import NoData from '../noData';


class GeneOntologyRibbon extends Component {

  static hasBlockData(blocks){
    for (let b of blocks) {
      if (b.uniqueIDs.length > 0) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { id } = this.props;
    return (
      <RibbonDataProvider subject={id}>
        {
          ({blocks, config, dataError, dataReceived, eco_list, title}) => (
            <div>
              {dataReceived && GeneOntologyRibbon.hasBlockData(blocks) ?
                <HorizontalScroll width={800}>
                  <Ribbon blocks={blocks}
                          config={config}
                          eco_list={eco_list}
                          showing={false}
                          subject={id}
                          title={title}
                  />
                </HorizontalScroll> :
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
};

export default GeneOntologyRibbon;
