import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {selectModels} from '../../selectors/geneSelectors';
import {fetchModels} from '../../actions/geneActions';
import {RemoteDataTable} from '../../components/dataTable';
import ExternalLink from '../../components/externalLink';
import CollapsibleList from '../../components/collapsibleList/collapsibleList';
import {Link} from 'react-router-dom';

const GeneModelsTable = ({dispatchFetchModels, id, models}) => {
  const columns = [
    {
      dataField: 'name',
      text: 'Model name',
      formatter: (name, row) => (
        <ExternalLink href={row.url}>
          <span dangerouslySetInnerHTML={{__html: name}} />
        </ExternalLink>
      ),
      filterable: true,
      filterName: 'modelName',
    },
    {
      dataField: 'diseases',
      text: 'Associated Human Diseases',
      formatter: diseases => diseases && (
        <CollapsibleList collapsedSize={diseases.length}>
          {diseases.map(disease => <Link key={disease.id} to={`/disease/${disease.id}`}>{disease.name}</Link>)}
        </CollapsibleList>
      ),
      filterable: true,
      filterName: 'disease',
    },
    {
      dataField: 'phenotypes',
      text: 'Associated Phenotypes',
      formatter: phenotypes => phenotypes && (
        <CollapsibleList collapsedSize={2} showBullets>
          {phenotypes.map(phenotype => (
            <span dangerouslySetInnerHTML={{__html: phenotype}} key={phenotype} />
          ))}
        </CollapsibleList>
      ),
      filterable: true,
      filterName: 'phenotype',
    },
    {
      dataField: 'source',
      text: 'Source',
      formatter: source => source && source.name,
      headerStyle: {width: '100px'},
      filterable: true,
    },
  ];

  const sortOptions = [

  ];

  return (
    <RemoteDataTable
      columns={columns}
      data={models.data}
      key={id}
      keyField='id'
      loading={models.loading}
      onUpdate={dispatchFetchModels}
      sortOptions={sortOptions}
      totalRows={models.total}
    />
  );
};

GeneModelsTable.propTypes = {
  dispatchFetchModels: PropTypes.func,
  id: PropTypes.string.isRequired,
  models: PropTypes.object,
};

const mapStateToProps = state => ({
  models: selectModels(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  dispatchFetchModels: opts => dispatch(fetchModels(props.id, opts))
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneModelsTable);
