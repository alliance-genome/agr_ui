import React from 'react';
import PropTypes from 'prop-types';

import ExternalLink from '../externalLink';

const DiseasePageHeader = ({disease}) => {
  return (
    <h1>
      {disease.name}
      {' '}
      <small>
        (<ExternalLink href={'http://www.disease-ontology.org/?id=' + disease.doId}>
          {disease.doId}
        </ExternalLink>)
      </small>
      <hr />
    </h1>
  );
};

DiseasePageHeader.propTypes = {
  disease: PropTypes.object,
};

export default DiseasePageHeader;
