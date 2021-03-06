import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  AttributeList,
} from '../../components/attribute';
import { DownloadButton } from '../../components/dataTable';
import Subsection from '../../components/subsection';
import NoData from '../../components/noData';
import useAllAlleleVariants from '../../hooks/useAlleleVariants';
import VariantSummary from './VariantSummary';

const AlleleVariantsSummary = ({allele, alleleId}) => {
  const {
    data
  } = useAllAlleleVariants(alleleId);

  const { gene, species } = allele;

  return (
    <>
      {
        data.map(variant => {
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
              <Link to={`/search?q=${displayName}`}>All alleles with this variant <i className='fa fa-search' /></Link>
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
  allele: {
    gene: {
      genomeLocations: PropTypes.any,
    },
    species: {
      name: PropTypes.string
    },
  }
};

export default AlleleVariantsSummary;
