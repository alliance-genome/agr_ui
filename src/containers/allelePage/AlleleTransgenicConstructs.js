import React from 'react';
import PropTypes from 'prop-types';
import {
  AttributeLabel,
  AttributeList,
  AttributeValue
} from '../../components/attribute';
import DataSourceLink from '../../components/dataSourceLink';
// import {Link} from 'react-router-dom';
import CommaSeparatedGeneList from './CommaSeparatedGeneList';
import NoData from '../../components/noData';

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
        <>
          <AttributeList className='mb-3' key={construct.id}>
            <AttributeLabel>Symbol</AttributeLabel>
            <AttributeValue>
              <DataSourceLink reference={construct.crossReferences.primary}>
                <span dangerouslySetInnerHTML={{__html: construct.name}} />
              </DataSourceLink>
            </AttributeValue>

            <AttributeLabel>Expressed Components</AttributeLabel>
            <AttributeValue placeholder='None'>
              {construct.expressedGenes.length && (
                <CommaSeparatedGeneList genes={construct.expressedGenes} />
              )}
            </AttributeValue>

            <AttributeLabel>Knock-down Targets</AttributeLabel>
            <AttributeValue placeholder='None'>
              {construct.targetGenes.length && (
                <CommaSeparatedGeneList genes={construct.targetGenes} />
              )}
            </AttributeValue>

            <AttributeLabel>Regulatory Regions</AttributeLabel>
            <AttributeValue placeholder='None'>
              {construct.regulatedByGenes.length && (
                <CommaSeparatedGeneList genes={construct.regulatedByGenes} />
              )}
            </AttributeValue>
          </AttributeList>
          {/*<Link to={`/search?q=${construct.id}`}>*/}
          {/*  <i className='fa fa-search' />Other alleles with this construct*/}
          {/*</Link>*/}
        </>
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
