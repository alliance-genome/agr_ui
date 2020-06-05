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
import VariantToTranscriptDetails from './VariantToTranscriptDetails';
import useAlleleVariant from './useAlleleVariants';

const MOLECULAR_CONSEQUENCE_DETAILS = 'Genomic Variants Molecular Consequences Details';

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
          const {id: variantId, location, type = {}, geneLocation = {}, species = {}} = variant;
          return (
            <React.Fragment key={`consequnce-summary-${variantId}`}>
              <AttributeList>
                <AttributeLabel>Variant:</AttributeLabel>
                <AttributeValue>
                  <VariantJBrowseLink
                    geneLocation={geneLocation}
                    location={location}
                    species={species.name}
                    type={type.name}
                  >
                    <span className="text-break">{variantId}</span>
                  </VariantJBrowseLink>
                </AttributeValue>
                <AttributeLabel>
                  Variant type:
                </AttributeLabel>
                <AttributeValue>
                  {type.name}
                </AttributeValue>
              </AttributeList>
              <VariantToTranscriptTable variant={variant} />
            </React.Fragment>
          );
        })
      }
      <br />
      <h4>{MOLECULAR_CONSEQUENCE_DETAILS}</h4>
      {
        variants.map((variant) => {
          const {id: variantId} = variant;
          return (
            <React.Fragment key={`consequnce-details-${variantId}`}>
              <VariantToTranscriptDetails variant={variant} />
            </React.Fragment>
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
