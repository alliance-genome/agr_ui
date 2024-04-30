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



function AnnotatedEntitiesPopupCuration({ children, entities, parentPage, mainRowCurie, pubModIds, columnNameSet }) {

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
                {columnNameSet.has("Name") && <th>Name</th>}
                {columnNameSet.has("Type") && <th>Type</th>}
                {columnNameSet.has("Association") && <th className={style.associationCell}>Association</th>}
                {columnNameSet.has("Additional Implicated Genes") && <th>Additional implicated genes</th>}
                {columnNameSet.has("Experimental Condition") && <th>Experimental condition</th>}
                {columnNameSet.has("Genetic Modifiers") && <th>Genetic Modifiers</th>}
                {columnNameSet.has("Strain Background") && <th>Strain Background</th>}
                {columnNameSet.has("Genetic Sex") && <th>Genetic Sex</th>}
                {columnNameSet.has("Notes") && <th className={style.relatedNotes}>Notes</th>}
                {columnNameSet.has("Annotation Type") && <th>Annotation type</th>}
                {columnNameSet.has("Evidence Code") && <th>Evidence Code</th>}
                {columnNameSet.has("Source") && <th>Source</th>}
                {columnNameSet.has("References") && <th>References</th>}
              </tr>
            </thead>
            <tbody>
              {
                entities.map(entity => {
                  const provider = buildProviderWithUrl(entity);
                  return (
                    <tr key={entity.id}>
                      {columnNameSet.has("Name") && <td>{renderLink(entity)}</td>}
                      {columnNameSet.has("Type") && <td><TypeCellCuration subject={entity.diseaseAnnotationSubject}/></td>}
                      {columnNameSet.has("Association") && <td><AssociationCellCuration association={entity.relation?.name}/></td>}
                      {columnNameSet.has("Additional Implicated Genes") && <td><AssertedGenes assertedGenes={entity.assertedGenes} mainRowCurie={mainRowCurie}/></td>}
                      {(columnNameSet.has("Experimental Condition") && entity.conditionRelations) && <td><ExperimentalConditionCellCuration conditions={entity.conditionRelations}/></td>}
                      {(columnNameSet.has("Experimental Condition") && entity.conditionModifiers) && <td><ExperimentalConditionCellCuration conditions={entity.conditionModifiers}/></td>}
                      {columnNameSet.has("Genetic Modifiers") && <td><GeneticModifiersCellCuration relation={entity.diseaseGeneticModifierRelation} modifiers={entity.diseaseGeneticModifiers}/></td>}
                      {columnNameSet.has("Strain Background") && <td><StrainBackground strainBackground={entity.sgdStrainBackground}/></td>}
                      {columnNameSet.has("Genetic Sex") && <td><GeneticSex geneticSex={entity.geneticSex}/></td>}
                      {columnNameSet.has("Notes") && <td><RelatedNotes className={style.relatedNotes} relatedNotes={entity.relatedNotes}/></td>}
                      {columnNameSet.has("Annotation Type") && <td><AnnotationType  annotationType={entity.annotationType}/></td>}
                      {columnNameSet.has("Evidence Code") && <td><EvidenceCodesCellCuration evidenceCodes={entity.evidenceCodes}/></td>}
                      {columnNameSet.has("Source") && <td><ProviderCellCuration provider={provider} /></td>}
                      {columnNameSet.has("References") && <td><SingleReferenceCellCuration singleReference={entity.singleReference} pubModIds={pubModIds}/></td>}
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
