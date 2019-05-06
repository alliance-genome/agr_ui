import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Ribbon, {RibbonDataProvider} from '@geneontology/ribbon';
import { POSITION } from '@geneontology/ribbon/lib/enums';
import HorizontalScroll from '../horizontalScroll';
import NoData from '../noData';
import LoadingSpinner from '../loadingSpinner';


class GeneOntologyRibbon extends Component {

  static hasBlockData(entities){
    for (let entity of entities) {
      if(entity.blocks && entity.blocks.length > 0) {
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
          ({entities, config, dataError, dataReceived}) => {
            if (!dataReceived) {
              return <LoadingSpinner />;
            }
            if (dataError || !GeneOntologyRibbon.hasBlockData(entities)) {
              return <NoData />;
            }
            return (
              <HorizontalScroll width={800}>
                <div className='pb-4'>
                  <Ribbon
                    borderBottom
                    config={config}
                    entities={entities}
                    entityLabel={POSITION.NONE}
                    maxColor={[37, 152, 197]}
                    oddEvenColor={false}
                    showing={false}
                    subject={id}
                    tableLabel=''
                  />
                </div>
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
