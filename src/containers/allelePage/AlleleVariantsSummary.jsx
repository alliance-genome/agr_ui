import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  AttributeList,
} from '../../components/attribute';
import { DownloadButton } from '../../components/dataTable';
import Subsection from '../../components/subsection.jsx';
import NoData from '../../components/noData.jsx';
import useAllAlleleVariants from '../../hooks/useAlleleVariants';
import VariantSummary from './VariantSummary.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const AlleleVariantsSummary = ({allele, alleleId}) => {
  const {
    data
  } = useAllAlleleVariants(alleleId);

  const { gene, species } = allele;

  return (
    <>
      {
        data && data.map(variant => {
          const {
            displayName,
          } = variant || {};
          return (
            <Subsection title={displayName} level={1} key={displayName}>
              <AttributeList className='mb-0'>
                <VariantSummary variant={{
                  ...variant,
                  gene: gene,
                  species: species
                }}
                />
              </AttributeList>
              <Link to={`/search?q=${displayName}`}>All alleles with this variant <FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
            </Subsection>
          );
        })
      }
      {
        data && data.length ?
          (
            <div className='mb-5'>
              <DownloadButton downloadUrl={`/api/allele/${alleleId}/variants/download`} text='Download Variants Data' />
            </div>
          ) : <NoData />
      }
    </>
  );
};

AlleleVariantsSummary.propTypes = {
  alleleId: PropTypes.string.isRequired,
  allele: PropTypes.shape({
      gene: PropTypes.any,
      species: PropTypes.any
    })
};

export default AlleleVariantsSummary;
