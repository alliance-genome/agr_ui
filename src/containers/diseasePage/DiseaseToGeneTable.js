/* eslint-disable react/no-set-state */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {fetchGeneAssociations} from '../../actions/diseaseActions';
import {selectAssociations} from '../../selectors/diseaseSelectors';

import ExternalLink from '../../components/externalLink';
import {CollapsibleList} from '../../components/collapsibleList';
import {
  DiseaseNameCell,
  EvidenceCodesCell,
  FilterSets,
  GeneCell,
  ReferenceCell,
  RemoteDataTable,
  SpeciesCell
} from '../../components/dataTable';
import {shortSpeciesName} from '../../lib/utils';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';

const DiseaseToGeneTable = ({associations, fetchAssociations, id}) => {
  const columns = [
    {
      dataField: 'gene',
      text: 'Gene',
      formatter: (gene, row) => (
        <React.Fragment>
          <div>{GeneCell(gene)}</div>
          <small>
            <AnnotatedEntitiesPopup entities={row.primaryAnnotatedEntities}>
              Based on inferences
            </AnnotatedEntitiesPopup>
          </small>
        </React.Fragment>
      ),
      filterable: true,
      filterName: 'geneName',
      headerStyle: {width: '120px'},
    },
    {
      dataField: 'species',
      text: 'Species',
      formatter: species => <SpeciesCell species={species} />,
      filterable: FilterSets.species,
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
      dataField: 'evidenceCodes',
      text: 'Evidence',
      formatter: EvidenceCodesCell,
      filterable: true,
      filterName: 'evidenceCode',
      headerStyle: {width: '95px'},
    },
    {
      dataField: 'orthologyGenes',
      text: 'Based On',
      formatter: genes => genes && (
        <CollapsibleList collapsedSize={genes.length}>
          {genes.map(gene => (<Link key={gene.id} to={`/gene/${gene.id}`}>
            {gene.symbol} ({shortSpeciesName(gene.species.taxonId)})
          </Link>))}
        </CollapsibleList>
      ),
      filterable: true,
      filterName: 'basedOnGeneSymbol',
      headerStyle: {width: '120px'},
    },
    {
      dataField: 'source',
      text: 'Source',
      formatter: source => <ExternalLink href={source.url}>{source.name}</ExternalLink>,
      filterable: true,
      headerStyle: {width: '85px'},
    },
    {
      dataField: 'publications',
      text: 'References',
      formatter: ReferenceCell,
      filterable: true,
      filterName: 'reference',
      headerStyle: {width: '150px'},
    },
  ];

  // need to pull out species in a separate field because we can't have
  // two columns based on the gene field
  const data = associations.data.map(association => ({
    species: association.gene.species,
    ...association,
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
        downloadUrl={`/api/disease/${id}/genes/download`}
        keyField='primaryKey'
        loading={associations.loading}
        onUpdate={fetchAssociations}
        sortOptions={sortOptions}
        totalRows={associations.total}
      />
    </div>
  );
};

DiseaseToGeneTable.propTypes = {
  associations: PropTypes.object,
  fetchAssociations: PropTypes.func,
  id: PropTypes.string,
};

const mapStateToProps = state => ({
  associations: selectAssociations(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchAssociations: (opts) => dispatch(fetchGeneAssociations(props.id, opts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiseaseToGeneTable);
