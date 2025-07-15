import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';
import { AttributeLabel, AttributeList, AttributeValue } from '../../components/attribute';
import LoadingSpinner from '../../components/loadingSpinner.jsx';
import NoData from '../../components/noData.jsx';
// import { VariantJBrowseLink } from '../../components/variant';
import Subsection from '../../components/subsection.jsx';
import VariantToTranscriptTable from './VariantToTranscriptTable.jsx';
import style from './style.module.scss';
import useAllAlleleVariants from '../../hooks/useAlleleVariants';
import { makeId } from '../../lib/utils';

export const sectionTitle = (variant) => {
  const { id } = variant || {};
  return `Predicted effect of ${id}`;
};

export const sectionAnchor = (variant) => {
  return '#' + makeId(sectionTitle(variant));
};

const AlleleMolecularConsequences = ({ alleleId, allele }) => {
  const { data, isLoading } = useAllAlleleVariants(alleleId);

  // annotate variants with location and species information from the allele
  const variants = useMemo(() => {
    const gene = allele.gene || {};
    const { genomeLocations: geneLocations } = gene;
    const [geneLocation] = geneLocations || [];

    return data?.map((variant) => ({
      ...variant,
      geneLocation,
      species: allele.species,
    }));
  }, [data, allele]);

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!variants || !variants.length) {
    return <NoData />;
  }

  return (
    <>
      {variants.map((variant) => {
        const {
          id: variantId,
          // location,
          variantType: type = {},
        } = variant;
        return (
          <Subsection title={sectionTitle(variant)} level={1} key={`consequnce-summary-${variantId}`}>
            <AttributeList className={style.attributeList}>
              <AttributeLabel>Variant</AttributeLabel>
              <AttributeValue>
                {/*
                      <VariantJBrowseLink
                        geneLocation={variant.geneLocation}
                        location={location}
                        species={variant.species && variant.species.name}
                        type={type && type.name}
                      >
                        <span className="text-break">{variantId}</span>
                      </VariantJBrowseLink>
                    */}
                <HashLink to={`#${makeId(variantId)}`}>{variantId}</HashLink>
              </AttributeValue>
              <AttributeLabel>Variant type:</AttributeLabel>
              <AttributeValue>{type.name}</AttributeValue>
            </AttributeList>
            <VariantToTranscriptTable variant={variant} />
          </Subsection>
        );
      })}
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
