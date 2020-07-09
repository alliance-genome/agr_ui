import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  AlleleCell,
  EvidenceCodesCell,
  ReferenceCell,
  RemoteDataTable,
  SpeciesCell
} from '../../components/dataTable';
import {fetchAlleleAssociations} from '../../actions/diseaseActions';
import {selectAlleleAssociations} from '../../selectors/diseaseSelectors';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';
import DiseaseLink from '../../components/disease/DiseaseLink';
import {getDistinctFieldValue} from '../../components/dataTable/utils';
import {compareByFixedOrder} from '../../lib/utils';
import {SPECIES_NAME_ORDER} from '../../constants';

const DiseaseToAlleleTable = ({associations, fetchAssociations, id}) => {
  const data = associations.data.map(association => ({
    ...association,
    species: association.allele.species,
  }));
  const columns = [
    {
      dataField: 'allele',
      text: 'Allele',
      formatter: (allele, row) => (
        <React.Fragment>
          <div><AlleleCell allele={allele}/></div>
          <small>
            <AnnotatedEntitiesPopup entities={row.primaryAnnotatedEntities}>
              Based on inferences
            </AnnotatedEntitiesPopup>
          </small>
        </React.Fragment>
      ),
      headerStyle: {width: '185px'},
      filterable: true,
      filterName: 'alleleName',
    },
    {
      dataField: 'species',
      text: 'Species',
      formatter: species => <SpeciesCell species={species}/>,
      filterable: getDistinctFieldValue(associations, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterLabelClassName: 'species-name',
      headerStyle: {width: '105px'},
    },
    {
      dataField: 'associationType',
      text: 'Association',
      formatter: (type) => type.replace(/_/g, ' '),
      headerStyle: {width: '110px'},
      filterable: getDistinctFieldValue(associations, 'associationType').map(type => type.replace(/_/g, ' ')),
    },
    {
      dataField: 'disease',
      text: 'Disease',
      formatter: disease => <DiseaseLink disease={disease} />,
      headerStyle: {width: '150px'},
      filterable: true,
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      formatter: EvidenceCodesCell,
      headerStyle: {width: '100px'},
      filterable: true,
      filterName: 'evidenceCode',
    },
    {
      dataField: 'source',
      text: 'Source',
      formatter: source => source.name,
      headerStyle: {width: '100px'},
      filterable: true,
    },
    {
      dataField: 'publications',
      text: 'References',
      formatter: ReferenceCell,
      headerStyle: {width: '150px'},
      filterable: true,
      filterName: 'reference',
    }
  ];

  const sortOptions = [
    {
      value: 'disease',
      label: 'Disease',
    },
    {
      value: 'allele',
      label: 'Allele',
    },
    {
      value: 'species',
      label: 'Species',
    },
  ];

  return (
    <RemoteDataTable
      columns={columns}
      data={data}
      downloadUrl={`/api/disease/${id}/alleles/download`}
      key={id}
      keyField='primaryKey'
      loading={associations.loading}
      onUpdate={fetchAssociations}
      sortOptions={sortOptions}
      totalRows={associations.total}
    />
  );
};

DiseaseToAlleleTable.propTypes = {
  associations: PropTypes.object,
  fetchAssociations: PropTypes.func,
  id: PropTypes.string,
};

const mapStateToProps = state => ({
  associations: selectAlleleAssociations(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchAssociations: (opts) => dispatch(fetchAlleleAssociations(props.id, opts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiseaseToAlleleTable);
