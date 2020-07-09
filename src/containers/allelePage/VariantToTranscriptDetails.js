import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
// import { selectVariants } from '../../selectors/alleleSelectors';
// import { fetchAlleleVariants } from '../../actions/alleleActions';
import LoadingSpinner from '../../components/loadingSpinner';
import VariantEffectDetails from './VariantEffectDetails';
import useVariantTranscripts from './useVariantTranscripts';

const VariantToTranscriptDetails = ({variant}) => {
  const {id: variantId} = variant;
  const { data = [], loading, error, fetchData } = useVariantTranscripts(variantId); //useFetchData(`/api/variant/${variantId}/transcripts`);

  useEffect(() => {
    fetchData({page: 1, limit: 1000});
  }, [variantId]);

  if (error) {
    throw error;
  } else if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  return (
    <>
      {
        data.map(({
          consequences = [],
          ...transcript
        }) => (
          consequences.map((consequence, index) => (
            <VariantEffectDetails
              consequence={consequence}
              key={`${transcript.id}-${index}`}
              transcript={transcript}
              variant={variant}
            />
          ))
        ))
      }
    </>
  );
};
VariantToTranscriptDetails.propTypes = {
  variant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.object,
  }).isRequired,
};

export default VariantToTranscriptDetails;
