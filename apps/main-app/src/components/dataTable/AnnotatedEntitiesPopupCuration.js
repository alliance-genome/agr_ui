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
import TypeCellCuration from './TypeCellCuration';
import StrainBackground from './StrainBackground';
import AssertedGenes from './AssertedGenes';
import RelatedNotes from './RelatedNotes';
import EvidenceCodesCellCuration from './evidenceCodesCellCuration';

function renderLink(entity) {
  // Console.log(entity);
  const url = getResourceUrl(entity.subject.curie, entity.subject.type, entity.subject.subtype)

  if (entity.type === 'AlleleDiseaseAnnotation') {
    const innerText = entity.subject.alleleSymbol ? entity.subject.alleleSymbol.displayText : entity.subject.name;
    const inner = <span dangerouslySetInnerHTML={{__html: innerText}}/>;
    return <Link to={`/allele/${entity.subject.curie}`}>{inner}</Link>;
  } else if(entity.type === 'GeneDiseaseAnnotation'){
      const innerText = entity.subject.geneSymbol ? entity.subject.geneSymbol.displayText : entity.subject.name;
      const inner = <span dangerouslySetInnerHTML={{__html: innerText}}/>;
      return <Link to={`/gene/${entity.subject.curie}`}>{inner}</Link>;
  } else {
      const inner = <span dangerouslySetInnerHTML={{__html: entity.subject.name}}/>;
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
                <th>Additional implicated genes</th>
                <th>Experimental condition</th>
                <th>Modifier</th>
                <th>Strain Background</th>
                <th>Genetic Sex</th>
                <th>Notes</th>
                <th>Annotation type</th>
                <th>Evidence Code</th>
                <th>Source</th>
                <th>References</th>
              </tr>
            </thead>
            <tbody>
              {
                entities.map(entity => (
                  <tr key={entity.subject.curie}>
                    <td>{renderLink(entity)}</td>
                    <td><TypeCellCuration subject={entity.subject}/></td>
                    <td>{entity.assertedGenes && AssertedGenes(entity.assertedGenes)}</td>
                    <td><ExperimentalConditionCellCuration conditions={entity.conditionRelations}/></td>
                    <td><ExperimentalConditionCellCuration conditions={entity.conditionModifiers}/></td>
                    <td>{entity.sgdStrainBackground && StrainBackground(entity.sgdStrainBackground)}</td>
                    <td>{entity.geneticSex && (entity.geneticSex.name ? entity.geneticSex.name: '')}</td>
                    <td>{entity.relatedNotes && RelatedNotes(entity.relatedNotes)}</td>
                    <td>{entity.annotationType && (entity.annotationType.name ? entity.annotationType.name: '')}</td>
                    <td>{entity.evidenceCodes && <EvidenceCodesCellCuration evidenceCodes={entity.evidenceCodes}/>}</td>
                    <td>{entity.dataProvider && (entity.dataProvider.abbreviation ?? '')}</td>
                    <td>{entity.singleReference && SingleReferenceCellCuration(entity.singleReference) }</td>
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
