/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DropdownMenu, DropdownToggle, ButtonDropdown } from 'reactstrap';
import { SingleReferenceCellCuration } from './index';
import ExperimentalConditionCellCuration from './ExperimentalConditionCellCuration';
import hash from 'object-hash';

import style from './style.module.scss';
import ExternalLink from '../ExternalLink';
import { Link } from 'react-router-dom';
import { getResourceUrl } from './getResourceUrl';
import TypeCellCuration from './TypeCellCuration';
import RelatedNotes from './RelatedNotes';
import EvidenceCodesCellCuration from './evidenceCodesCellCuration';
import ProviderCellCuration from './ProviderCellCuration';
import GeneticSex from './GeneticSex';
import AnnotationType from './AnnotationType';
import AssociationCellCuration from './AssociationCellCuration';
import AssertedGenes from './AssertedGenes';
import GeneticModifiersCellCuration from './GeneticModifiersCellCuration';
import { getAnnotationSubjectText, buildProviderWithUrl, getIdentifier, naturalSortByAnnotationSubject } from './utils';
import usePopupQuery from '../../hooks/usePopupQuery';
import StrainBackground from './StrainBackground';
import LoadingSpinner from '../loadingSpinner';

function renderLink(entity) {
  const identifier = getIdentifier(entity.diseaseAnnotationSubject);
  const url = getResourceUrl({
    identifier,
    type: entity.diseaseAnnotationSubject.type,
    subtype: entity.diseaseAnnotationSubject.subtype,
  });

  const innerText = getAnnotationSubjectText(entity);
  const inner = <span dangerouslySetInnerHTML={{ __html: innerText }} />;

  if (entity.type === 'AlleleDiseaseAnnotation') {
    return <Link to={`/allele/${identifier}`}>{inner}</Link>;
  } else if (entity.type === 'GeneDiseaseAnnotation') {
    return <Link to={`/gene/${identifier}`}>{inner}</Link>;
  } else {
    return <ExternalLink href={url}>{inner}</ExternalLink>;
  }
}

function AnnotatedEntitiesPopupCurationGenePage({ countId, children, mainRowCurie, pubModIds, columnNameSet }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const { data, isLoading, error } = usePopupQuery(`/api/disease/${countId}/primaryannotations`, isOpen, pagination);

  const entities = data?.results;
  const totalRecords = data?.total || 0;
  const totalPages = Math.ceil(totalRecords / pagination.limit);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit) => {
    setPagination({ page: 1, limit: newLimit });
  };

  if (!isOpen) {
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleOpen();
        }}
      >
        {children || 'View'}
      </a>
    );
  }

  const popperModifiers = {
    preventOverflow: {
      boundariesElement: 'window',
    },
  };

  if (isLoading) {
    return (
      <ButtonDropdown isOpen={isOpen} toggle={toggleDropdown}>
        <DropdownToggle tag="span">
          <a href="#" onClick={(e) => e.preventDefault()}>
            {children || 'View'}
          </a>
        </DropdownToggle>
        <DropdownMenu
          className={`shadow-sm ${style.tablePopupWithStickyFooter}`}
          modifiers={popperModifiers}
          strategy="fixed"
        >
          <div className={style.tablePopupInnerWithStickyFooter}>
            <div className={`${style.tableContainer} d-flex`}>
              <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '200px' }}>
                <LoadingSpinner size="3x" />
              </div>
            </div>
          </div>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }

  if (error) {
    return (
      <ButtonDropdown isOpen={isOpen} toggle={toggleDropdown}>
        <DropdownToggle tag="span">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleOpen();
            }}
          >
            {children || 'View'}
          </a>
        </DropdownToggle>
        <DropdownMenu
          className={`shadow-sm ${style.tablePopupWithStickyFooter}`}
          modifiers={popperModifiers}
          strategy="fixed"
        >
          <div className={style.tablePopupInnerWithStickyFooter}>
            <div className={style.tableContainer}>
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                Error loading data
              </div>
            </div>
          </div>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }

  const sortedEntities = naturalSortByAnnotationSubject(entities || []);

  return (
    <ButtonDropdown isOpen={isOpen} toggle={toggleDropdown}>
      <DropdownToggle tag="span">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleOpen();
          }}
        >
          {children || 'View'}
        </a>
      </DropdownToggle>
      <DropdownMenu
        className={`shadow-sm ${style.tablePopupWithStickyFooter}`}
        modifiers={popperModifiers}
        strategy="fixed"
      >
        <div className={style.tablePopupInnerWithStickyFooter}>
          {sortedEntities.length === 0 ? (
            <div>No annotation details available</div>
          ) : (
            <>
              <div className={style.tableContainer}>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      {columnNameSet.has('Name') && <th>Name</th>}
                      {columnNameSet.has('Type') && <th>Type</th>}
                      {columnNameSet.has('Association') && <th className={style.associationCell}>Association</th>}
                      {columnNameSet.has('Additional Implicated Genes') && <th>Additional implicated genes</th>}
                      {columnNameSet.has('Experimental Condition') && <th>Experimental condition</th>}
                      {columnNameSet.has('Genetic Modifiers') && <th>Genetic Modifiers</th>}
                      {columnNameSet.has('Strain Background') && <th>Strain Background</th>}
                      {columnNameSet.has('Genetic Sex') && <th>Genetic Sex</th>}
                      {columnNameSet.has('Notes') && <th className={style.relatedNotes}>Notes</th>}
                      {columnNameSet.has('Annotation Type') && <th>Annotation type</th>}
                      {columnNameSet.has('Evidence Codes') && <th>Evidence Codes</th>}
                      {columnNameSet.has('Source') && <th>Source</th>}
                      {columnNameSet.has('References') && <th>References</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedEntities.map((entity) => {
                      const provider = buildProviderWithUrl(entity);
                      const key = hash(entity);

                      var diseaseGeneticModifiers = entity.diseaseGeneticModifierAlleles;
                      if (entity.diseaseGeneticModifierGenes != null) {
                        diseaseGeneticModifiers = entity.diseaseGeneticModifierGenes;
                      }
                      if (entity.diseaseGeneticModifierAgms != null) {
                        diseaseGeneticModifiers = entity.diseaseGeneticModifierAgms;
                      }
                      var expCondition = entity.conditionRelations;
                      if (entity.conditionModifiers != null) {
                        expCondition = entity.conditionModifiers;
                      }
                      return (
                        <tr key={key}>
                          {columnNameSet.has('Name') && <td>{renderLink(entity)}</td>}
                          {columnNameSet.has('Type') && (
                            <td>
                              <TypeCellCuration subject={entity.diseaseAnnotationSubject} />
                            </td>
                          )}
                          {columnNameSet.has('Association') && (
                            <td>
                              <AssociationCellCuration association={entity.fullRelationString} />
                            </td>
                          )}
                          {columnNameSet.has('Additional Implicated Genes') && (
                            <td>
                              <AssertedGenes assertedGenes={entity.assertedGenes} mainRowCurie={mainRowCurie} />
                            </td>
                          )}
                          {columnNameSet.has('Experimental Condition') && (
                            <td>
                              <ExperimentalConditionCellCuration conditions={expCondition} />
                            </td>
                          )}
                          {columnNameSet.has('Genetic Modifiers') && (
                            <td>
                              <GeneticModifiersCellCuration
                                relation={entity.diseaseGeneticModifierRelation}
                                modifiers={diseaseGeneticModifiers}
                              />
                            </td>
                          )}
                          {columnNameSet.has('Strain Background') && (
                            <td>
                              <StrainBackground strainBackground={entity.sgdStrainBackground} />
                            </td>
                          )}
                          {columnNameSet.has('Genetic Sex') && (
                            <td>
                              <GeneticSex geneticSex={entity.geneticSex} />
                            </td>
                          )}
                          {columnNameSet.has('Notes') && (
                            <td>
                              <RelatedNotes className={style.relatedNotes} relatedNotes={entity.relatedNotes} />
                            </td>
                          )}
                          {columnNameSet.has('Annotation Type') && (
                            <td>
                              <AnnotationType annotationType={entity.annotationType} />
                            </td>
                          )}
                          {columnNameSet.has('Evidence Codes') && (
                            <td>
                              <EvidenceCodesCellCuration evidenceCodes={entity.evidenceCodes} />
                            </td>
                          )}
                          {columnNameSet.has('Source') && (
                            <td>
                              <ProviderCellCuration provider={provider} />
                            </td>
                          )}
                          {columnNameSet.has('References') && (
                            <td>
                              <SingleReferenceCellCuration
                                singleReference={entity.evidenceItem}
                                pubModIds={pubModIds}
                              />
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className={`d-flex justify-content-between align-items-center ${style.stickyFooter} px-2`}>
                  <div className="d-flex align-items-center">
                    <span className="mr-2">Show:</span>
                    <select
                      className="form-control form-control-sm"
                      style={{ width: 'auto' }}
                      value={pagination.limit}
                      onChange={(e) => handleLimitChange(parseInt(e.target.value))}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                    <span className="ml-2">entries</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-secondary mr-1"
                      disabled={pagination.page === 1}
                      onClick={() => handlePageChange(pagination.page - 1)}
                    >
                      Previous
                    </button>
                    <span className="mx-2">
                      Page {pagination.page} of {totalPages} ({totalRecords} total)
                    </span>
                    <button
                      className="btn btn-sm btn-outline-secondary ml-1"
                      disabled={pagination.page >= totalPages}
                      onClick={() => handlePageChange(pagination.page + 1)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

AnnotatedEntitiesPopupCurationGenePage.propTypes = {
  children: PropTypes.node,
  entities: PropTypes.array,
  mainRowCurie: PropTypes.string,
  pubModIds: PropTypes.array,
  columnNameSet: PropTypes.object,
};

export default AnnotatedEntitiesPopupCurationGenePage;
