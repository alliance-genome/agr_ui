import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  DiseaseNameCell,
  GeneticEntityCell,
  EvidenceCodesCell,
  ReferenceCell,
  RemoteDataTable,
  FilterSets
} from '../../components/dataTable';
import { selectDiseaseViaEmpirical } from '../../selectors/geneSelectors';
import { fetchDiseaseViaEmpirical } from '../../actions/genes';
import ExternalLink from '../externalLink';

import { fetchDiseaseSummary } from '../../actions/disease';
import { selectSummary } from '../../selectors/diseaseSelectors';
import GenericRibbon from '@geneontology/ribbon/lib/components/GenericRibbon';
import { POSITION, COLOR_BY } from '@geneontology/ribbon/lib/enums';

class GenePageDiseaseTable extends Component {

  componentDidMount() {
    const { dispatch, geneId, summary } = this.props;
    if (!summary) {
      dispatch(fetchDiseaseSummary(geneId));
    }
  }

  loadData(opts) {
    const { dispatch, geneId } = this.props;
    dispatch(fetchDiseaseViaEmpirical(geneId, opts));
  }

  diseaseGroupClicked(gene, disease) {
    // console.log('ITEM CLICK: ', gene , disease);
    return { gene , disease };
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
        dataField: 'geneticEntity',
        text: 'Genetic Entity',
        formatter: GeneticEntityCell,
        filterable: true,
        headerStyle: {width: '185px'},
      },
      {
        dataField: 'geneticEntityType',
        text: 'Genetic Entity Type',
        filterable: FilterSets.geneticEntityTypes,
        headerStyle: {width: '110px'},
      },
      {
        dataField: 'associationType',
        text: 'Association',
        filterable: true,
        headerStyle: {width: '120px'},
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

    const sortOptions = [
      {value: 'disease', label: 'Disease'},
      {value: 'geneticEntity', label: 'Genetic Entity'}
    ];

    return (
      <div>
        <div style={{ display: 'inline-block' }}>
          {
            (this.props.summary && this.props.summary.data) ?
              <GenericRibbon
                categories={this.props.summary.data.categories}
                classLabels={['disease','diseases']}
                colorBy={COLOR_BY.CLASS_COUNT}
                itemClick={this.diseaseGroupClicked.bind(this)}
                subjectLabelPosition={POSITION.NONE}
                subjects={this.props.summary.data.subjects}
              />
              : ''
          }
        </div>
        <RemoteDataTable
          columns={columns}
          data={data}
          downloadUrl={`/api/gene/${geneId}/diseases-by-experiment/download`}
          keyField='id'
          loading={diseases.loading}
          onUpdate={this.loadData.bind(this)}
          sortOptions={sortOptions}
          summaryProps={
            diseases.supplementalData ? {
              ...diseases.supplementalData.annotationSummary,
              entityType: 'disease'
            } : null
          }
          totalRows={diseases.total}
        />
      </div>
    );
  }

}

GenePageDiseaseTable.propTypes = {
  diseases: PropTypes.object,
  dispatch: PropTypes.func,
  filename: PropTypes.string,
  geneId: PropTypes.string.isRequired,
  summary: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  diseases: selectDiseaseViaEmpirical(state),
  summary: selectSummary(props.geneId)(state)
});

export default connect(mapStateToProps)(GenePageDiseaseTable);
