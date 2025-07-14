/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import { SingleReferenceCellCuration } from './index';
import ExperimentalConditionCellCuration from './ExperimentalConditionCellCuration.jsx';
import hash from 'object-hash';

import style from './style.module.scss';
import ExternalLink from '../ExternalLink.jsx';
import { Link } from 'react-router-dom';
import { getResourceUrl } from "./getResourceUrl.jsx";
import TypeCellCuration from './TypeCellCuration.jsx';
import RelatedNotes from './RelatedNotes.jsx';
import EvidenceCodesCellCuration from './evidenceCodesCellCuration.jsx';
import ProviderCellCuration from './ProviderCellCuration.jsx';
import GeneticSex from './GeneticSex.jsx';
import AnnotationType from './AnnotationType.jsx';
import AssociationCellCuration from './AssociationCellCuration.jsx';
import AssertedGenes from './AssertedGenes.jsx';
import GeneticModifiersCellCuration from './GeneticModifiersCellCuration.jsx';
import { getAnnotationSubjectText, buildProviderWithUrl, getIdentifier, naturalSortByAnnotationSubject } from './utils.jsx';
import StrainBackground from './StrainBackground.jsx';

function renderLink(entity) {
  const identifier = getIdentifier(entity.diseaseAnnotationSubject);
  const url = getResourceUrl({
    identifier,
    type: entity.diseaseAnnotationSubject.type,
    subtype: entity.diseaseAnnotationSubject.subtype
  })

  const innerText = getAnnotationSubjectText(entity);
  const inner = <span dangerouslySetInnerHTML={{__html: innerText}}/>;

  if (entity.type === 'AlleleDiseaseAnnotation') {
    return <Link to={`/allele/${identifier}`}>{inner}</Link>;
  } else if(entity.type === 'GeneDiseaseAnnotation'){
      return <Link to={`/gene/${identifier}`}>{inner}</Link>;
  } else {
      return <ExternalLink href={url}>{inner}</ExternalLink>;
  }
}



function AnnotatedEntitiesPopupCuration({ children, entities, mainRowCurie, pubModIds, columnNameSet }) {

  if (!entities || !entities.length) {
    return null;
  }

  const sortedEntities = naturalSortByAnnotationSubject(entities);

  const popperModifiers = [
    {
      name: "preventOverflow",
      options: {
        rootBoundary: "viewport"
      }
    }
  ];

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
                {columnNameSet.has("Evidence Codes") && <th>Evidence Codes</th>}
                {columnNameSet.has("Source") && <th>Source</th>}
                {columnNameSet.has("References") && <th>References</th>}
              </tr>
            </thead>
            <tbody>
              {
                sortedEntities.map(entity => {
                  const provider = buildProviderWithUrl(entity);
                  const key = hash(entity);

                  var diseaseGeneticModifiers = entity.diseaseGeneticModifierAlleles;
                  if(entity.diseaseGeneticModifierGenes != null){
                    diseaseGeneticModifiers = entity.diseaseGeneticModifierGenes;
                  }
                  if(entity.diseaseGeneticModifierAgms != null){
                    diseaseGeneticModifiers = entity.diseaseGeneticModifierAgms;
                  }
                  var expCondition = entity.conditionRelations;
                  if(entity.conditionModifiers != null){
                    expCondition = entity.conditionModifiers;
                  }
                    return (
                    <tr key={key}>
                      {columnNameSet.has("Name") && <td>{renderLink(entity)}</td>}
                      {columnNameSet.has("Type") && <td><TypeCellCuration subject={entity.diseaseAnnotationSubject}/></td>}
                      {columnNameSet.has("Association") && <td><AssociationCellCuration association={entity.fullRelationString}/></td>}
                      {columnNameSet.has("Additional Implicated Genes") && <td><AssertedGenes assertedGenes={entity.assertedGenes} mainRowCurie={mainRowCurie}/></td>}
                      {columnNameSet.has("Experimental Condition") && <td><ExperimentalConditionCellCuration conditions={expCondition}/></td>}
                      {columnNameSet.has("Genetic Modifiers") && <td><GeneticModifiersCellCuration relation={entity.diseaseGeneticModifierRelation} modifiers={diseaseGeneticModifiers}/></td>}
                      {columnNameSet.has("Strain Background") && <td><StrainBackground strainBackground={entity.sgdStrainBackground}/></td>}
                      {columnNameSet.has("Genetic Sex") && <td><GeneticSex geneticSex={entity.geneticSex}/></td>}
                      {columnNameSet.has("Notes") && <td><RelatedNotes className={style.relatedNotes} relatedNotes={entity.relatedNotes}/></td>}
                      {columnNameSet.has("Annotation Type") && <td><AnnotationType annotationType={entity.annotationType}/></td>}
                      {columnNameSet.has("Evidence Codes") && <td><EvidenceCodesCellCuration evidenceCodes={entity.evidenceCodes}/></td>}
                      {columnNameSet.has("Source") && <td><ProviderCellCuration provider={provider} /></td>}
                      {columnNameSet.has("References") && <td><SingleReferenceCellCuration singleReference={entity.evidenceItem} pubModIds={pubModIds}/></td>}
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
  mainRowCurie: PropTypes.string,
  pubModIds: PropTypes.array,
  columnNameSet: PropTypes.object
};

export default AnnotatedEntitiesPopupCuration;
