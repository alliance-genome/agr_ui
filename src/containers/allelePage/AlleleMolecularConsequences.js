import React, { useMemo } from 'react';
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
import style from './style.scss';
import useAllAlleleVariants from '../../hooks/useAlleleVariants';

const AlleleMolecularConsequences = ({
  alleleId,
  allele,
}) => {
  const {
    data,
    isLoading,
  } = useAllAlleleVariants(alleleId);

  // annotate variants with location and species information from the allele
  const variants = useMemo(() => {
    const gene = allele.gene || {};
    const { genomeLocations: geneLocations } = gene;
    const [geneLocation] = geneLocations || [];

    return data.map((variant) => ({
      ...variant,
      geneLocation,
      species: allele.species
    }));
  }, [data, allele]);

  if (isLoading) {
    return <LoadingSpinner />;
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
  allele: PropTypes.shape({
    gene: PropTypes.object,
    species: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  alleleId: PropTypes.string,
};

export default AlleleMolecularConsequences;
