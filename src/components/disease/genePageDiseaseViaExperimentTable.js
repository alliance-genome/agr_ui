import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  DiseaseNameCell,
  GeneticEntityCell,
  EvidenceCodesCell,
  ReferenceCell,
  RemoteDataTable
} from '../../components/dataTable';
import { customFilter } from 'react-bootstrap-table2-filter';
import { selectDiseaseViaEmpirical } from '../../selectors/geneSelectors';
import { fetchDiseaseViaEmpirical } from '../../actions/genes';
import ExternalLink from '../externalLink';
import DropdownTextFilter from '../dataTable/dropdownTextFilter';

class GenePageDiseaseTable extends Component {

  loadData(opts) {
    const { dispatch, geneId } = this.props;
    dispatch(fetchDiseaseViaEmpirical(geneId, opts));
  }

  render() {
    const { diseases, geneId } = this.props;

    const data = diseases.data && diseases.data.map(annotation => ({
      id: `${annotation.disease.id}-${annotation.allele ? annotation.allele.id : ''}`,
      disease: annotation.disease,
      geneticEntity: annotation.allele,
      associationType: annotation.associationType.replace(/_/g, ' '),
      geneticEntityType: annotation.geneticEntityType,
      source: annotation.source,
      evidenceCodes: annotation.evidenceCodes,
      publications: annotation.publications,
    }));

    const refsText = (refs) => {
      return refs.map(ref => ref.pubMedId || ref.pubModId || '').join(', ');
    };

    const columns = [
      {
        dataField: 'id',
        text: 'id',
        hidden: true,
      },
      {
        dataField: 'disease',
        text: 'Disease',
        formatter: DiseaseNameCell,
        filter: customFilter(),
        filterRenderer: (onFilter, column) => <DropdownTextFilter column={column} onFilter={onFilter} />,
        headerStyle: {width: '150px'},
      },
      {
        dataField: 'geneticEntity',
        text: 'Genetic Entity',
        formatter: GeneticEntityCell,
        headerStyle: {width: '185px'},
      },
      {
        dataField: 'geneticEntityType',
        text: 'Genetic Entity Type',
        headerStyle: {width: '110px'},
      },
      {
        dataField: 'associationType',
        text: 'Association',
        headerStyle: {width: '110px'},
      },
      {
        dataField: 'evidenceCodes',
        text: 'Evidence Code',
        formatter: EvidenceCodesCell,
        headerStyle: {width: '75px'},
      },
      {
        dataField: 'source',
        text: 'Source',
        formatter: ({name, url}) => <ExternalLink href={url}>{name}</ExternalLink>,
        headerStyle: {width: '75px'},
      },
      {
        dataField: 'publications',
        text: 'References',
        formatter: ReferenceCell,
        asText: refsText,
        headerStyle: {width: '150px'},
      }
    ];

    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={`/api/gene/${geneId}/diseases-by-experiment/download`}
        keyField='id'
        loading={diseases.loading}
        onUpdate={this.loadData.bind(this)}
        totalRows={diseases.total}
      />
    );
  }
}

GenePageDiseaseTable.propTypes = {
  diseases: PropTypes.object,
  dispatch: PropTypes.func,
  filename: PropTypes.string,
  geneId: PropTypes.string.isRequired,
};

function mapStateToProps (state) {
  return {
    diseases: selectDiseaseViaEmpirical(state),
  };
}

export default connect(mapStateToProps)(GenePageDiseaseTable);
