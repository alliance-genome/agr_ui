import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import { SingleReferenceCellCuration } from './index';
import ExperimentalConditionCellCuration from './ExperimentalConditionCellCuration';

import style from './style.scss';
import ExternalLink from '../ExternalLink';
import { Link } from 'react-router-dom';
import { getResourceUrl } from "./getResourceUrl";

function renderLink(entity) {
  const url = getResourceUrl(entity.subject.curie, entity.subject.subtype || entity.subject.type)
  const innerText = entity.subject.geneSymbol ? entity.subject.geneSymbol.displayText : entity.subject.name;
  const inner = <span dangerouslySetInnerHTML={{__html: innerText}}/>;

  if (entity.type === 'AlleleDiseaseAnnotation') {
    return <Link to={`/allele/${entity.subject.curie}`}>{inner}</Link>;
  } else if(entity.type === 'GeneDiseaseAnnotation'){
      return inner;
  } else {
    return <ExternalLink href={url}>{inner}</ExternalLink>;
  }
}

function AnnotatedEntitiesPopupCuration(props) {
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
                  <tr key={entity.subject.curie}>
                    <td>{renderLink(entity)}</td>
                    <td className='text-capitalize'>{(entity.subject.subtype || entity.subject.type || '').toLowerCase()}</td>
                    <td>
                      <ExperimentalConditionCellCuration conditions={entity.conditionRelations} />
                    </td>
                    <td>
                      <ExperimentalConditionCellCuration conditions={entity.conditionModifiers} />
                    </td>
                    <td>{entity.singleReference &&
                      SingleReferenceCellCuration(entity.singleReference)
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

AnnotatedEntitiesPopupCuration.propTypes = {
  children: PropTypes.node,
  entities: PropTypes.array,
};

export default AnnotatedEntitiesPopupCuration;
