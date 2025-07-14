/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import {ReferenceCell} from './index';
import ExperimentalConditionCell from './ExperimentalConditionCell.jsx';

import style from './style.module.scss';
import ExternalLink from '../ExternalLink.jsx';
import {Link} from 'react-router-dom';
import hash from 'object-hash';

function renderLink(entity) {
  const inner = <span dangerouslySetInnerHTML={{__html: entity.name}} />;
  const entityType = entity.type.toLowerCase();
  if (entityType === 'allele') {
    return <Link to={`/${entityType}/${entity.id}`}>{inner}</Link>;
  } else if (entityType === 'gene') {
    return entity.name;
  } else {
    return <ExternalLink href={entity.url}>{inner}</ExternalLink>;
  }
}

function AnnotatedEntitiesPopup(props) {
  const {children, entities} = props;

  if (!entities || !entities.length) {
    return null;
  }

  // const popperModifiers = {
  //   preventOverflow: {
  //     boundariesElement: 'window',
  //   }
  // };

  const popperModifiers = [
    {
      name: "preventOverflow",
      options: {
        rootBoundary: "viewport"
      }
    }
  ]

  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle tag='span'>
        <a href='#' onClick={e => e.preventDefault()}>{children || 'View'}</a>
      </DropdownToggle>
      <DropdownMenu className={`shadow-sm ${style.tablePopup}`} modifiers={popperModifiers} strategy="fixed">
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
                entities.map(entity => {
                  const key = hash(entity);
                  return (
                    <tr key={key}>
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
                )})
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
