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
import DataSourceLinkCuration from "../../components/dataSourceLinkCuration.jsx";

const AlleleTransgenicConstructs = ({ alleleId }) => {
  const { data, isLoading, isError } = useTransgenicAllele(alleleId);

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
              <DataSourceLinkCuration reference={transgenicAlleleConstruct.construct.dataProviderCrossReference}>
                {transgenicAlleleConstruct.construct.constructSymbol.displayText}
              </DataSourceLinkCuration>
            </AttributeValue>

            <AttributeLabel>Expressed Components</AttributeLabel>
            <AttributeValue placeholder="None">
              {transgenicAlleleConstruct.expressedGenes?.length && (
                <CommaSeparatedGeneList genes={transgenicAlleleConstruct.expressedGenes} />
              )}
            </AttributeValue>

            <AttributeLabel>Knock-down Targets</AttributeLabel>
            <AttributeValue placeholder="None">
              {transgenicAlleleConstruct.targetGenes?.length && (
                <CommaSeparatedGeneList genes={transgenicAlleleConstruct.targetGenes} />
              )}
            </AttributeValue>

            <AttributeLabel>Regulatory Regions</AttributeLabel>
            <AttributeValue placeholder="None">
              {transgenicAlleleConstruct.regulatedByGenes?.length && (
                <CommaSeparatedGeneList genes={transgenicAlleleConstruct.regulatedByGenes} />
              )}
            </AttributeValue>
          </AttributeList>
          <Link to={`/search?category=allele&constructs=${transgenicAlleleConstruct.id}`}>
            All alleles with this construct <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </div>
      ))}
    </>
  );
};

AlleleTransgenicConstructs.propTypes = {
  alleleId: PropTypes.string,
};

export default AlleleTransgenicConstructs;
