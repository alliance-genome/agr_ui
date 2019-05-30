import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  DiseaseNameCell,
  EvidenceCodesCell,
  ReferenceCell,
  RemoteDataTable
} from '../../components/dataTable';
import { fetchDiseaseViaOrthology } from '../../actions/genes';
import { selectDiseaseViaOrthology } from '../../selectors/geneSelectors';
import ExternalLink from '../externalLink';

class GenePageDiseaseTable extends Component {

  loadData(opts) {
    const { dispatch, geneId } = this.props;
    dispatch(fetchDiseaseViaOrthology(geneId, opts));
  }

  render() {
    const { diseases, geneId } = this.props;

    const data = diseases.data && diseases.data.map(annotation => ({
      id: `${annotation.disease.id}-${annotation.associationType}-${annotation.orthologyGene.id}`,
      disease: annotation.disease,
      associationType: annotation.associationType.replace(/_/g, ' '),
      orthologyGene: annotation.orthologyGene,
      orthologyGeneSpecies: annotation.orthologyGene.species.name,
      source: annotation.source,
      evidenceCodes: annotation.evidenceCodes,
      publications: annotation.publications,
    }));

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
        filterable: true,
        headerStyle: {width: '150px'},
      },
      {
        dataField: 'associationType',
        text: 'Association',
        filterable: true,
        headerStyle: {width: '120px'},
      },
      {
        dataField: 'orthologyGene',
        text: 'Ortholog',
        formatter: ({id, symbol}) => <Link to={`/gene/${id}`}>{symbol}</Link>,
        filterable: true,
        headerStyle: {width: '110px'},
      },
      {
        dataField: 'orthologyGeneSpecies',
        text: 'Ortholog Species',
        formatter: (species) => species ? <i>{species}</i> : '',
        filterable: true,
        headerStyle: {width: '150px'},
      },
      {
        dataField: 'evidenceCodes',
        text: 'Evidence Code',
        formatter: EvidenceCodesCell,
        filterable: true,
        headerStyle: {width: '75px'},
      },
      {
        dataField: 'source',
        text: 'Source',
        formatter: ({name, url}) => <ExternalLink href={url}>{name}</ExternalLink>,
        filterable: true,
        headerStyle: {width: '85px'},
      },
      {
        dataField: 'publications',
        text: 'References',
        formatter: ReferenceCell,
        filterable: true,
        headerStyle: {width: '150px'},
      }
    ];

    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={`/api/gene/${geneId}/diseases-via-orthology/download`}
        keyField='id'
        loading={diseases.loading}
        onUpdate={this.loadData.bind(this)}
        summaryProps={
          diseases.supplementalData ? {
            ...diseases.supplementalData.annotationSummary,
            entityType: 'disease'
          } : null
        }
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
    diseases: selectDiseaseViaOrthology(state),
  };
}

export default connect(mapStateToProps)(GenePageDiseaseTable);
