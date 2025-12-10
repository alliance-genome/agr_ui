import React from 'react';
import PropTypes from 'prop-types';
import { AttributeLabel, AttributeList, AttributeValue } from '../../components/attribute';
import CommaSeparatedGeneList from './CommaSeparatedGeneList.jsx';
import NoData from '../../components/noData.jsx';
import { Link } from 'react-router-dom';
import ConstructLink from '../../components/ConstructLink.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useTransgenicAllele from '../../hooks/useTransgenicAllele.js';
import DataSourceLinkCuration from '../../components/dataSourceLinkCuration.jsx';

const AlleleTransgenicConstructs = ({ data, isLoading, isError }) => {
  if (isLoading) {
    return null;
  }

  if (isError || !data.transgenicAlleleConstructs) {
    return <NoData />;
  }

  return (
    <>
      <span className="badge badge-secondary mb-3">
        This allele contains {data.transgenicAlleleConstructs.length} transgenic construct
        {data.transgenicAlleleConstructs.length !== 1 ? 's' : ''}
      </span>
      {data.transgenicAlleleConstructs.map((transgenicAlleleConstruct) => (
        <div className="mb-3" key={transgenicAlleleConstruct.id}>
          <AttributeList className="mb-0">
            <AttributeLabel>Symbol</AttributeLabel>
            <AttributeValue>
              {!transgenicAlleleConstruct.construct.placeholder && (
                <DataSourceLinkCuration
                  key={transgenicAlleleConstruct.construct.primaryExternalId}
                  reference={transgenicAlleleConstruct.construct.dataProviderCrossReference}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: transgenicAlleleConstruct.construct.constructSymbol?.displayText,
                    }}
                  />
                </DataSourceLinkCuration>
              )}
            </AttributeValue>

            <AttributeLabel>Expressed Components</AttributeLabel>
            <AttributeValue placeholder="None">
              {transgenicAlleleConstruct.expressedGenes?.length && (
                <CommaSeparatedGeneList genes={transgenicAlleleConstruct.expressedGenes} />
              )}
            </AttributeValue>

            <AttributeLabel>Knock-down Targets</AttributeLabel>
            <AttributeValue placeholder="None">
              {transgenicAlleleConstruct.targetedGenes?.length && (
                <CommaSeparatedGeneList genes={transgenicAlleleConstruct.targetedGenes} />
              )}
            </AttributeValue>

            <AttributeLabel>Regulatory Regions</AttributeLabel>
            <AttributeValue placeholder="None">
              {transgenicAlleleConstruct.regulatoryGenes?.length && (
                <CommaSeparatedGeneList genes={transgenicAlleleConstruct.regulatoryGenes} />
              )}
            </AttributeValue>
          </AttributeList>
          <Link to={`/search?category=allele&constructs=${transgenicAlleleConstruct.construct.primaryExternalId}`}>
            All alleles with this construct <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </div>
      ))}
    </>
  );
};

AlleleTransgenicConstructs.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.boolean,
  isError: PropTypes.boolean,
};

export default AlleleTransgenicConstructs;
