
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
    this.state = {
      annotations: props.annotations,
      geneId: props.geneId,
      genes: props.genes,
      onUpdate: props.onUpdate,
      termId: props.termId
    };
  }

  componentWillReceiveProps(nextProps){
    // console.log("GRSS::componentWillReceiveProps: " , nextProps);
    this.setState({
      annotations: nextProps.annotations,
      geneId: nextProps.geneId,
      genes: nextProps.genes,
      onUpdate: nextProps.onUpdate,
      termId: nextProps.termId
    });
  }


  render() {
    /* eslint-disable no-unused-vars */
    const annotations = this.state.annotations;
    const gene_id = this.state.geneId;
    const term_id = this.state.termId;
    console.log('annotation table: ', annotations);

    //debugger;
    let columns = [];
    let data = [];
    if (annotations.data.length > 0) {
      columns = getColumns(annotations.data);
      console.log('columns: ', columns);
      data = annotations.data
        .map((result, index) => ({
          key: `disease_row_${index}`,
          gene: result.gene,
          species: result.gene.species,
          based_on: result.gene.symbol,
          reference: result.publications,
          disease: result.disease,
          geneticEntityType: result.geneticEntityType,
          associationType: result.associationType
        }));
      const geneIdParams = annotations.data.map(g => `geneID=${g.gene.id}`).join('&');
      const downloadUrl = '/api/disease/download?' + (term_id ? 'termID=' + term_id : '') + '&' + geneIdParams;
      console.log('ANNOATATION IS VALID: ', downloadUrl);
        
      return (
        <div>
          {(annotations) ?
            <RemoteDataTable
              columns={columns}
              data={data || []}
              downloadUrl={downloadUrl}
              keyField='key'
              loading={annotations.loading}
              onUpdate={this.props.onUpdate}
              ref={this.tableRef}
              totalRows={annotations.total > 0 ? annotations.total: 0}
            />: ''
          }
        </div>
      );
    }
    else{
      return('');
    }
  }
}

DiseaseAnnotationTable.propTypes = {
  annotations: PropTypes.object,
  geneId: PropTypes.string.isRequired,
  genes: PropTypes.array,
  onUpdate: PropTypes.func,
  termId: PropTypes.string,


};

export default DiseaseAnnotationTable;
