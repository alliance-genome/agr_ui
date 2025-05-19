import React from 'react';
import PropTypes from 'prop-types';
import {
  AttributeLabel,
  AttributeList,
  AttributeValue
} from '../../components/attribute';
import CommaSeparatedGeneList from './CommaSeparatedGeneList.jsx';
import NoData from '../../components/noData.jsx';
import {Link} from 'react-router-dom';
import ConstructLink from '../../components/ConstructLink.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const AlleleTransgenicConstructs = ({constructs}) => {
  if (!constructs || constructs.length === 0) {
    return <NoData />;
  }

  return (
    <>
      <span className="badge badge-secondary mb-3">
        This allele contains {constructs.length} transgenic construct{constructs.length !== 1 ? 's' : ''}
      </span>
      {constructs.map(construct => (
        <div className='mb-3' key={construct.id}>
          <AttributeList className='mb-0'>
            <AttributeLabel>Symbol</AttributeLabel>
            <AttributeValue>
              <ConstructLink construct={construct} />
            </AttributeValue>

            <AttributeLabel>Expressed Components</AttributeLabel>
            <AttributeValue placeholder='None'>
              {construct.expressedGenes?.length && (
                <CommaSeparatedGeneList genes={construct.expressedGenes} />
              )}
            </AttributeValue>

            <AttributeLabel>Knock-down Targets</AttributeLabel>
            <AttributeValue placeholder='None'>
              {construct.targetGenes?.length && (
                <CommaSeparatedGeneList genes={construct.targetGenes} />
              )}
            </AttributeValue>

            <AttributeLabel>Regulatory Regions</AttributeLabel>
            <AttributeValue placeholder='None'>
              {construct.regulatedByGenes?.length && (
                <CommaSeparatedGeneList genes={construct.regulatedByGenes} />
              )}
            </AttributeValue>
          </AttributeList>
          <Link to={`/search?category=allele&constructs=${construct.id}`}>
            All alleles with this construct <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </div>
      ))}
    </>
  );
};

AlleleTransgenicConstructs.propTypes = {
  constructs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    crossReferences: PropTypes.object,
  })),
};

export default AlleleTransgenicConstructs;
