import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ribbon, {RibbonDataProvider} from '@geneontology/ribbon';
import HorizontalScroll from '../horizontalScroll';
import NoData from '../noData';
import LoadingSpinner from '../loadingSpinner';


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
          ({blocks, config, dataError, dataReceived, eco_list, title}) => {
            if (!dataReceived) {
              return <LoadingSpinner />;
            }
            if (dataError || !GeneOntologyRibbon.hasBlockData(blocks)) {
              return <NoData />;
            }
            return (
              <HorizontalScroll width={800}>
                <Ribbon blocks={blocks}
                        config={config}
                        eco_list={eco_list}
                        showing={false}
                        subject={id}
                        title={title}
                />
              </HorizontalScroll>
            );
          }
        }
      </RibbonDataProvider>
    );
  }
}

GeneOntologyRibbon.propTypes = {
  id: PropTypes.string.isRequired,
};

export default GeneOntologyRibbon;
