/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import hash from 'object-hash';

import { fetchAssociations } from '../../actions/disease';
import { selectAssociations } from '../../selectors/diseaseSelectors';

import ExternalLink from '../../components/externalLink';
import { CollapsibleList } from '../../components/collapsibleList';
import {
  RemoteDataTable,
  DiseaseNameCell,
  ReferenceCell,
  GeneticEntityCell,
  EvidenceCodesCell,
  FilterSets,
  GeneCell
} from '../../components/dataTable';
import { shortSpeciesName } from '../../lib/utils';

class DiseasePageAssociationsTable extends Component {
  loadAssociations(opts) {
    const { dispatch, id } = this.props;
    dispatch(fetchAssociations(id, opts));
  }

  render() {
    const { associations, id } = this.props;

    const columns = [
      {
        dataField: 'id',
        text: 'id',
        hidden: true,
      },
      {
        dataField: 'geneName',
        text: 'Gene',
        formatter: GeneCell,
        filterable: true,
        headerStyle: {width: '120px'},
      },
      {
        dataField: 'species',
        text: 'Species',
        formatter: (species) => <i>{species}</i>,
        filterable: FilterSets.species,
        headerStyle: {width: '105px'},
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
        headerStyle: {width: '105px'},
      },
      {
        dataField: 'associationType',
        text: 'Association Type',
        formatter: (type) => type.replace(/_/g, ' '),
        filterable: FilterSets.associationTypesWithOrthology,
        headerStyle: {width: '110px'},
      },
      {
        dataField: 'disease',
        text: 'Disease',
        formatter: DiseaseNameCell,
        filterable: true,
        headerStyle: {width: '175px'},
      },
      {
        dataField: 'evidenceCode',
        text: 'Evidence',
        formatter: EvidenceCodesCell,
        filterable: true,
        headerStyle: {width: '95px'},
      },
      {
        dataField: 'basedOnGeneSymbol',
        text: 'Based On',
        formatter: genes => genes && (
          <CollapsibleList collapsedSize={genes.length}>
            {genes.map(gene => (<Link key={gene.id} to={`/gene/${gene.id}`}>
              {gene.symbol} ({shortSpeciesName(gene.species.taxonId)})
            </Link>))}
          </CollapsibleList>
        ),
        filterable: true,
        headerStyle: {width: '120px'},
      },
      {
        dataField: 'source',
        text: 'Source',
        formatter: ({name, url}) => <ExternalLink href={url}>{name}</ExternalLink>,
        filterable: true,
        headerStyle: {width: '85px'},
      },
      {
        dataField: 'reference',
        text: 'References',
        formatter: ReferenceCell,
        filterable: true,
        headerStyle: {width: '150px'},
      },
    ];

    const data = associations.data && associations.data.map(association => ({
      id: hash(association),
      geneName: association.gene,
      species: association.gene.species.name,
      geneticEntity: association.allele,
      geneticEntityType: association.geneticEntityType,
      associationType: association.associationType,
      disease: association.disease,
      evidenceCode: association.evidenceCodes,
      source: association.source,
      reference: association.publications,
      basedOnGeneSymbol: association.orthologyGenes,
    }));

    const sortOptions = [
      {
        value: 'disease',
        label: 'Disease',
      },
      {
        value: 'gene',
        label: 'Gene',
      },
      {
        value: 'species',
        label: 'Species',
      },
    ];

    return (
      <div>
        <RemoteDataTable
          columns={columns}
          data={data}
          downloadUrl={`/api/disease/${id}/associations/download`}
          keyField='id'
          loading={associations.loading}
          onUpdate={this.loadAssociations.bind(this)}
          sortOptions={sortOptions}
          totalRows={associations.total}
        />
      </div>
    );
  }
}

DiseasePageAssociationsTable.propTypes = {
  associations: PropTypes.object,
  dispatch: PropTypes.func,
  id: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    associations: selectAssociations(state),
  };
};

export { DiseasePageAssociationsTable as DiseasePageAssociationsTable };
export default connect(mapStateToProps)(DiseasePageAssociationsTable);
