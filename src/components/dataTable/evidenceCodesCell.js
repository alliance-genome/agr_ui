import React, {Fragment} from 'react';
import uniq from 'lodash.uniq';
import { UncontrolledTooltip } from 'reactstrap';
import uuidv4 from 'uuid/v4';

const EvidenceCodesCell = (publications) => {

  if (!publications || !publications.length) {
    return '';
  }

  const codes = publications
    .map(publication => publication.evidenceCodes)
    .reduce((a, b) => a.concat(b));

  const wrapped = uniq(codes)
    .sort()
    .map((child, idx, array) => {
      let randomId = uuidv4();
      let separator = ++idx < array.length ? ', ' : '';

      return (
        <Fragment key={idx}>
          <span id={`evidenceCodes-tooltip-${randomId}`}>{`${child}${separator}`}</span>
          <UncontrolledTooltip
            key={idx}
            placement='right'
            target={`evidenceCodes-tooltip-${randomId}`}
          >
            {child}
          </UncontrolledTooltip>
        </Fragment>
      );

    });

  return <Fragment>{wrapped}</Fragment>;
};

export default EvidenceCodesCell;
