/* eslint-disable react/no-set-state */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {fetchGeneAssociations} from '../../actions/diseaseActions';
import { selectGeneAssociations } from '../../selectors/diseaseSelectors';

import {CollapsibleList} from '../../components/collapsibleList';
import {
  EvidenceCodesCell,
  GeneCell,
  ReferenceCell,
  RemoteDataTable,
  SpeciesCell
} from '../../components/dataTable';
import {
  compareByFixedOrder,
  shortSpeciesName
} from '../../lib/utils';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';
import DiseaseLink from '../../components/disease/DiseaseLink';
import {getDistinctFieldValue} from '../../components/dataTable/utils';
import {SPECIES_NAME_ORDER} from '../../constants';
import ProvidersCell from '../../components/dataTable/ProvidersCell';

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
      filterable: getDistinctFieldValue(associations, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterLabelClassName: 'species-name',
      headerStyle: {width: '105px'},
    },
    {
      dataField: 'associationType',
      text: 'Association',
      formatter: (type) => type.replace(/_/g, ' '),
      filterable: getDistinctFieldValue(associations, 'associationType').map(type => type.replace(/_/g, ' ')),
      headerStyle: {width: '110px'},
    },
    {
      dataField: 'disease',
      text: 'Disease',
      formatter: disease => <DiseaseLink disease={disease} />,
      filterable: true,
      headerStyle: {width: '150px'},
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
      dataField: 'providers',
      text: 'Source',
      formatter: providers => providers && <ProvidersCell providers={providers} />,
      filterable: true,
      headerStyle: {width: '85px'},
      filterName: 'provider',
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
    <RemoteDataTable
      columns={columns}
      data={data}
      downloadUrl={`/api/disease/${id}/genes/download`}
      key={id}
      keyField='primaryKey'
      loading={associations.loading}
      onUpdate={fetchAssociations}
      sortOptions={sortOptions}
      totalRows={associations.total}
    />
  );
};

DiseaseToGeneTable.propTypes = {
  associations: PropTypes.object,
  fetchAssociations: PropTypes.func,
  id: PropTypes.string,
};

const mapStateToProps = state => ({
  associations: selectGeneAssociations(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchAssociations: (opts) => dispatch(fetchGeneAssociations(props.id, opts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiseaseToGeneTable);
