
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getColumns } from './tableColumns';
import { RemoteDataTable} from '../dataTable';
/* eslint-disable no-debugger */
/* eslint-disable no-debugger */

/*
 * Disease ribbon-table
 * Listens to events in the disease-ribbon component
 */
class DiseaseAnnotationTable extends Component {
  constructor(props){
    super(props);
    this.tableRef = React.createRef();
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {annotations, geneId} = this.props; //this.props.diseaseAnnotations[1].results;
    const gene_id = this.props.geneId;
    //debugger;
    let columns = [];
    let data = [];
    if (annotations.data.length > 0) {
      columns = getColumns(annotations.data);
      data = annotations.data
        .map(result => ({
          id: `${result.disease.id}`,
          gene: result.gene,
          species: result.gene.species,
          based_on: result.gene.symbol,
          reference: result.publications,
          disease: result.disease,
          geneticEntityType: result.geneticEntityType,
          associationType: result.associationType
        }));
      const geneIdParams = annotations.data.map(g => `geneID=${g.gene.id}`).join('&');
      const downloadUrl = `/api/expression/download?termID=${gene_id}&${geneIdParams}`;
      console.log('ANNOATATION IS VALID: ', annotations);
      return (

        <RemoteDataTable
          columns={columns}
          data={data || []}
          downloadUrl={downloadUrl}
          keyField='id'
          loading={annotations.loading}
          onUpdate={this.props.onUpdate}
          ref={this.tableRef}
          totalRows={annotations.data.total? annotations.data.total: 0}
        />
      );
    }
    else{
      return('');
    }
  }
}

DiseaseAnnotationTable.propTypes = {
  annotations: PropTypes.object,
  dispatch: PropTypes.func,
  geneId: PropTypes.string.isRequired,
  genes: PropTypes.array,
  onUpdate: PropTypes.func,
  termId: PropTypes.string,


};

export default DiseaseAnnotationTable;
