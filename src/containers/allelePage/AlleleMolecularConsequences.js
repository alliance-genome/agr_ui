import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AttributeLabel,
  AttributeList,
  AttributeValue
} from '../../components/attribute';
import LoadingSpinner from '../../components/loadingSpinner';
import NoData from '../../components/noData';
import { VariantJBrowseLink } from '../../components/variant';
import VariantToTranscriptTable from './VariantToTranscriptTable';
// import VariantToTranscriptDetails from './VariantToTranscriptDetails';
import useAlleleVariant from './useAlleleVariants';
import style from './style.scss';

// const MOLECULAR_CONSEQUENCE_DETAILS = 'Genomic Variants Molecular Consequences Details';

const AlleleMolecularConsequences = ({
  alleleId,
}) => {
  const { data: variants = [], loading, fetchData } = useAlleleVariant(alleleId);

  useEffect(() => {
    fetchData({page: 1, limit: 1000});
  }, [alleleId]);

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  } else if (!variants || !variants.length) {
    return <NoData />;
  }

  return (
    <>
      {
        variants.map((variant) => {
          const {id: variantId, location, type = {}} = variant;
          return (
            <div className={style.summaryRow} key={`consequnce-summary-${variantId}`}>
              <h5>Predicted effect of{' '}
                <VariantJBrowseLink
                  geneLocation={variant.geneLocation}
                  location={location}
                  species={variant.species && variant.species.name}
                  type={variant.type && variant.type.name}
                >
                  <span className="text-break">{variant.id}</span>
                </VariantJBrowseLink></h5>
              <AttributeList className={style.attributeList}>
                <AttributeLabel>
                  Variant type:
                </AttributeLabel>
                <AttributeValue>
                  {type.name}
                </AttributeValue>
              </AttributeList>
              <VariantToTranscriptTable variant={variant} />
            </div>
          );
        })
      }
    </>
  );
};

AlleleMolecularConsequences.propTypes = {
  alleleId: PropTypes.string,
};

export default AlleleMolecularConsequences;
