/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import { SingleReferenceCellCuration } from './index';
import ExperimentalConditionCellCuration from './ExperimentalConditionCellCuration.jsx';

import style from './style.module.scss';
import ExternalLink from '../ExternalLink.jsx';
import { Link } from 'react-router-dom';
import { getResourceUrl } from './getResourceUrl.jsx';
import TypeCellCuration from './TypeCellCuration.jsx';
import { getAnnotationSubjectText, getIdentifier, naturalSortByAnnotationSubject } from './utils.jsx';

function renderLink(entity) {
  const identifier = getIdentifier(entity.phenotypeAnnotationSubject);
  const url = getResourceUrl({
    identifier,
    type: entity.phenotypeAnnotationSubject.type,
    subtype: entity.phenotypeAnnotationSubject.subtype,
  });

  const innerText = getAnnotationSubjectText(entity);
  const inner = <span dangerouslySetInnerHTML={{ __html: innerText }} />;

  if (entity.type === 'AllelePhenotypeAnnotation') {
    return <Link to={`/allele/${identifier}`}>{inner}</Link>;
  } else if (entity.type === 'GenePhenotypeAnnotation') {
    return <Link to={`/gene/${identifier}`}>{inner}</Link>;
  } else {
    return <ExternalLink href={url}>{inner}</ExternalLink>;
  }
}

function AnnotatedPhenotypePopupCuration({ children, entities, mainRowCurie, pubModIds, columnNameSet }) {
  if (!entities || !entities.length) {
    return null;
  }

  const sortedEntities = naturalSortByAnnotationSubject(entities);

  const popperModifiers = [
    {
      name: 'preventOverflow',
      options: {
        rootBoundary: 'viewport',
      },
    },
  ];

  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle tag="span">
        <a href="#" onClick={(e) => e.preventDefault()}>
          {children || 'View'}
        </a>
      </DropdownToggle>
      <DropdownMenu className={`shadow-sm ${style.tablePopup}`} modifiers={popperModifiers} positionFixed>
        <div className={style.tablePopupInner}>
          <table className="table table-sm">
            <thead>
              <tr>
                {columnNameSet.has('Name') && <th>Name</th>}
                {columnNameSet.has('Type') && <th>Type</th>}
                {columnNameSet.has('Experimental Condition') && <th>Experimental condition</th>}
                {columnNameSet.has('References') && <th>References</th>}
              </tr>
            </thead>
            <tbody>
              {sortedEntities.map((entity) => {
                var expCondition = entity.conditionRelations;
                if (entity.conditionModifiers != null) {
                  expCondition = entity.conditionModifiers;
                }
                return (
                  <tr key={entity.id}>
                    {columnNameSet.has('Name') && <td>{renderLink(entity)}</td>}
                    {columnNameSet.has('Type') && (
                      <td>
                        <TypeCellCuration subject={entity.phenotypeAnnotationSubject} />
                      </td>
                    )}
                    {columnNameSet.has('Experimental Condition') && (
                      <td>
                        <ExperimentalConditionCellCuration conditions={expCondition} />
                      </td>
                    )}
                    {columnNameSet.has('References') && (
                      <td>
                        <SingleReferenceCellCuration singleReference={entity.evidenceItem} pubModIds={pubModIds} />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}

AnnotatedPhenotypePopupCuration.propTypes = {
  children: PropTypes.node,
  entities: PropTypes.array,
  mainRowCurie: PropTypes.string,
  pubModIds: PropTypes.array,
  columnNameSet: PropTypes.object,
};

export default AnnotatedPhenotypePopupCuration;
