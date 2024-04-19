/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
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
import RelatedNotes from './RelatedNotes';
import EvidenceCodesCellCuration from './evidenceCodesCellCuration';
import ProviderCellCuration from './ProviderCellCuration';
import GeneticSex from './GeneticSex';
import AnnotationType from './AnnotationType';
import AssociationCellCuration from './AssociationCellCuration';
import AssertedGenes from './AssertedGenes';
import GeneticModifiersCellCuration from './GeneticModifiersCellCuration';
import { buildProviderWithUrl, getIdentifier } from './utils';
import StrainBackground from './StrainBackground';

function renderLink(entity) {
  const curie = getIdentifier(entity.diseaseAnnotationSubject);
  const url = getResourceUrl(curie, entity.diseaseAnnotationSubject.type, entity.diseaseAnnotationSubject.subtype)

  if (entity.type === 'AlleleDiseaseAnnotation') {
    const innerText = entity.diseaseAnnotationSubject.alleleSymbol ? entity.diseaseAnnotationSubject.alleleSymbol.displayText : entity.diseaseAnnotationSubject.name;
    const inner = <span dangerouslySetInnerHTML={{__html: innerText}}/>;
    return <Link to={`/allele/${curie}`}>{inner}</Link>;
  } else if(entity.type === 'GeneDiseaseAnnotation'){
      const innerText = entity.diseaseAnnotationSubject.geneSymbol ? entity.diseaseAnnotationSubject.geneSymbol.displayText : entity.diseaseAnnotationSubject.name;
      const inner = <span dangerouslySetInnerHTML={{__html: innerText}}/>;
      return <Link to={`/gene/${curie}`}>{inner}</Link>;
  } else {
      const inner = <span dangerouslySetInnerHTML={{__html: entity.diseaseAnnotationSubject.name}}/>;
      return <ExternalLink href={url}>{inner}</ExternalLink>;
  }
}



function AnnotatedEntitiesPopupCuration({ children, entities, parentPage, mainRowCurie, pubModIds }) {

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
                { parentPage === 'gene' || parentPage === 'disease' ? <th>Additional implicated genes</th> : <></> }
                <th>Experimental condition</th>
                <th></th>
                <th>Genetic Modifiers</th>
                { parentPage === 'gene' || parentPage === 'disease' ? <th>Strain Background</th> : <></> }
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
                      <td><TypeCellCuration subject={entity.diseaseAnnotationSubject}/></td>
                      <td><AssociationCellCuration association={entity.relation?.name}/></td>
                      { parentPage === 'gene' || parentPage === 'disease' ?  <td><AssertedGenes assertedGenes={entity.assertedGenes} mainRowCurie={mainRowCurie}/></td> : <></>}
                      <td><ExperimentalConditionCellCuration conditions={entity.conditionRelations}/></td>
                      <td><ExperimentalConditionCellCuration conditions={entity.conditionModifiers}/></td>
                      <td><GeneticModifiersCellCuration relation={entity.diseaseGeneticModifierRelation} modifiers={entity.diseaseGeneticModifiers}/></td>
                      { parentPage === 'gene' || parentPage === 'disease' ? <td><StrainBackground strainBackground={entity.sgdStrainBackground}/></td> : <></> }
                      <td><GeneticSex geneticSex={entity.geneticSex}/></td>
                      <td><RelatedNotes className={style.relatedNotes} relatedNotes={entity.relatedNotes}/></td>
                      <td><AnnotationType  annotationType={entity.annotationType}/></td>
                      <td><EvidenceCodesCellCuration evidenceCodes={entity.evidenceCodes}/></td>
                      <td><ProviderCellCuration provider={provider} /></td>
                      <td><SingleReferenceCellCuration singleReference={entity.singleReference} pubModIds={pubModIds}/></td>
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
  parentPage: PropTypes.string
};

export default AnnotatedEntitiesPopupCuration;
