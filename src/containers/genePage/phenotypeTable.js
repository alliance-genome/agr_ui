import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import {
  ReferenceCell,
  DataTable, ReferencesCellCuration, GeneCellCuration
} from '../../components/dataTable';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import {getIdentifier} from "../../components/dataTable/utils";
import AnnotatedPhenotypePopupCuration from "../../components/dataTable/AnnotatedPhenotypePopupCuration";
import {GENE_DETAILS_COLUMNS} from "../../components/dataTable/constants";

const PhenotypeTable = ({geneId, entityType}) => {
  const {
    data: results,
    ...tableProps
  } = useDataTableQuery(`/api/${entityType}/${geneId}/phenotypes`);

  const data = results?.map(record => ({
    ...record,
    id: hash(record),
  }));

  const columns = [
    {
      dataField: 'phenotypeStatement',
      text: 'Phenotype Term',
      formatter: (term) => <span dangerouslySetInnerHTML={{__html: term}}/>,
      headerStyle: {width: '120px'},
      filterable: true,
      filterName: 'termName',
    },
    {
      dataField: 'primaryAnnotations',
      text: 'Annotation details',
      formatter:  (subject, row) => (
          <React.Fragment>
            <GeneCellCuration curie={getIdentifier(subject)} geneSymbol={subject.geneSymbol} />
            <small>
              <AnnotatedPhenotypePopupCuration
                  entities={row.primaryAnnotations}
                  mainRowCurie={getIdentifier(subject)}
                  pubModIds={row.pubmedPubModIDs}
                  columnNameSet={GENE_DETAILS_COLUMNS}
              >
                View
              </AnnotatedPhenotypePopupCuration>
            </small>
          </React.Fragment>
      ),
      headerStyle: {width: '90px'},
    },
    {
      dataField: 'pubmedPubModIDs',
      text: 'References',
      filterable: true,
      filterName: 'reference',
      headerStyle: {width: '150px'},
      formatter: (pubModIds) => <ReferencesCellCuration pubModIds={pubModIds}/>,
    }
  ];

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={data}
      downloadUrl={`/api/gene/${geneId}/phenotypes/download`}
      keyField='id'
      summaryProps={
        (data && data.supplementalData) ? {
          ...data.supplementalData.annotationSummary,
          entityType: 'phenotype'
        } : null
      }
    />
  );
};

PhenotypeTable.propTypes = {
  geneId: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
};

export default PhenotypeTable;
