
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getColumns } from './tableColumns';
import { RemoteDataTable} from '../dataTable';
import { fetchDiseaseAnnotation } from '../../actions/disease';
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDiseaseAnnotation('MGI:109583', 'DOID:162'));
  }

  render() {
    /* eslint-disable no-unused-vars */
    const annotations = this.props.diseaseAnnotations[1].results;
    const dObj = this.props.diseaseAnnotations[1];
    const gene_id = this.props.geneId;
    //debugger;
    let columns = [];
    let data = [];
    if (annotations) {
      columns = getColumns(annotations);
      data = annotations
        .map(result => ({
          id: `${result.gene.id}`,
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
          loading={dObj.loading}
          onUpdate={() => Math.random()}
          ref={this.tableRef}
          totalRows={annotations ? annotations.length: 0}
        />
      );
    }
    else{
      return(<p>No data</p>);
    }
  }
}

DiseaseAnnotationTable.propTypes = {
  dispatch: PropTypes.func,
  geneId: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    diseaseAnnotations: state.disease._root.entries[4]
  };

};

export default connect(mapStateToProps)(DiseaseAnnotationTable);
