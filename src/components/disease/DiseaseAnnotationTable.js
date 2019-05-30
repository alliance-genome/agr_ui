
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
    const {annotations, annotationObj, geneId} = this.props; //this.props.diseaseAnnotations[1].results;
    const dObj = annotationObj[1];
    const gene_id = this.props.geneId;
    //debugger;
    let columns = [];
    let data = [];
    if (annotations) {
      columns = getColumns(annotations);
      data = annotations
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
      const geneIdParams = annotations.map(g => `geneID=${g.gene.id}`).join('&');
      const downloadUrl = `/api/expression/download?termID=${gene_id}&${geneIdParams}`;
      return (
        <RemoteDataTable
          columns={columns}
          data={data || []}
          downloadUrl={downloadUrl}
          keyField='id'
          loading={false}
          onUpdate={() => Math.random()}
          ref={this.tableRef}
          totalRows={annotations ? annotations.length: 0}
        />
      );
    }
    else{
      return(<p></p>);
    }
  }
}

DiseaseAnnotationTable.propTypes = {
  annotationObj: PropTypes.object,
  annotations: PropTypes.array,
  dispatch: PropTypes.func,
  geneId: PropTypes.string.isRequired,
  genes: PropTypes.array,
  termId: PropTypes.string,

};

export default DiseaseAnnotationTable;
