import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import { SingleReferenceCellCuration } from './index';
import ExperimentalConditionCellCuration from './ExperimentalConditionCellCuration';

import style from './style.module.scss';
import ExternalLink from '../ExternalLink';
import { Link } from 'react-router-dom';
import { getResourceUrl } from "./getResourceUrl";
import TypeCellCuration from './TypeCellCuration';
import StrainBackground from './StrainBackground';
import AssertedGenes from './AssertedGenes';
import RelatedNotes from './RelatedNotes';
import EvidenceCodesCellCuration from './evidenceCodesCellCuration';
import ProviderCellCuration from './ProviderCellCuration';
import GeneticSex from './GeneticSex';
import AnnotationType from './AnnotationType';
import AssociationCellCuration from './AssociationCellCuration';
import GeneticModifiersCellCuration from './GeneticModifiersCellCuration';
import { buildProviderWithUrl } from './utils';

function renderLink(entity) {
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
  const {children, entities, mainRowCurie} = props;

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
                <th className={style.associationCell}>Association</th>
                <th>Experimental condition</th>
                <th></th>
                <th>Genetic Modifiers</th>
                <th>Genetic Sex</th>
                <th className={style.relatedNotes}>Notes</th>
                <th>Annotation type</th>
                <th>Evidence Code</th>
                <th>Source</th>
                <th>References</th>
              </tr>
            </thead>
            <tbody>
              {
                entities.map(entity => {
                  const provider = buildProviderWithUrl(entity);
                  return (
                    <tr key={entity.id}>
                      <td>{renderLink(entity)}</td>
                      <td><TypeCellCuration subject={entity.subject}/></td>
                      <td><AssociationCellCuration association={entity.relation?.name}/></td>
                      <td><ExperimentalConditionCellCuration conditions={entity.conditionRelations}/></td>
                      <td><ExperimentalConditionCellCuration conditions={entity.conditionModifiers}/></td>
                      <td><GeneticModifiersCellCuration relation={entity.diseaseGeneticModifierRelation} modifiers={entity.diseaseGeneticModifiers}/></td>
                      <td><GeneticSex geneticSex={entity.geneticSex}/></td>
                      <td><RelatedNotes className={style.relatedNotes} relatedNotes={entity.relatedNotes}/></td>
                      <td><AnnotationType  annotationType={entity.annotationType}/></td>
                      <td><EvidenceCodesCellCuration evidenceCodes={entity.evidenceCodes}/></td>
                      <td><ProviderCellCuration provider={provider} /></td>
                      <td><SingleReferenceCellCuration singleReference={entity.singleReference}/></td>
                    </tr>
                )
              })
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