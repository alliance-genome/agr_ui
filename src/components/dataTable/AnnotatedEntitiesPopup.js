/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import {ReferenceCell} from './index';
import ExperimentalConditionCell from './ExperimentalConditionCell';

import style from './style.module.scss';
import ExternalLink from '../ExternalLink';
import {Link} from 'react-router-dom';

function renderLink(entity) {
  const inner = <span dangerouslySetInnerHTML={{__html: entity.name}} />;
  if (entity.type === 'ALLELE') {
    return <Link to={`/allele/${entity.id}`}>{inner}</Link>;
  } else {
    return <ExternalLink href={entity.url}>{inner}</ExternalLink>;
  }
}

function AnnotatedEntitiesPopup(props) {
  const {children, entities} = props;

  if (!entities || !entities.length) {
    return null;
  }

  const popperModifiers = {
    preventOverflow: {
      boundariesElement: 'window',
    }
  };

  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle tag='span'>
        <a href='#' onClick={e => e.preventDefault()}>{children || 'View'}</a>
      </DropdownToggle>
      <DropdownMenu className={`shadow-sm ${style.tablePopup}`} modifiers={popperModifiers} positionFixed>
        <div className={style.tablePopupInner}>
          <table className='table table-sm'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Experimental condition</th>
                <th>Modifier</th>
                <th>References</th>
              </tr>
            </thead>
            <tbody>
              {
                entities.map(entity => (
                  <tr key={entity.id}>
                    <td>{renderLink(entity)}</td>
                    <td className='text-capitalize'>{(entity.type || '').toLowerCase()}</td>
                    <td>
                      <ExperimentalConditionCell conditions={entity.conditions} />
                    </td>
                    <td>
                      <ExperimentalConditionCell conditions={entity.conditionModifiers} />
                    </td>
                    <td>{entity.publicationEvidenceCodes &&
                      ReferenceCell(entity.publicationEvidenceCodes.map(pec => pec.publication))
                    }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}

AnnotatedEntitiesPopup.propTypes = {
  children: PropTypes.node,
  entities: PropTypes.array,
};

export default AnnotatedEntitiesPopup;
