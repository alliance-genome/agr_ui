import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  DataPage,
  PageData,
  PageHeader,
  PageNav
} from '../../components/dataPage';
import HeadMetaTags from '../../components/headMetaTags';
import Subsection from '../../components/subsection';
import {connect} from 'react-redux/src';
import {
  selectData,
  selectError,
  selectLoading
} from '../../selectors/alleleSelectors';
import {fetchAllele} from '../../actions/alleleActions';
import LoadingPage from '../../components/loadingPage';
import NotFound from '../../components/notFound';
import AlleleSummary from './AlleleSummary';
import AlleleSymbol from './AlleleSymbol';
import SpeciesIcon from '../../components/speciesIcon';
import PageNavEntity from '../../components/dataPage/PageNavEntity';
import DataSourceLink from '../../components/dataSourceLink';
import {Link} from 'react-router-dom';

const SUMMARY = 'Summary';
const SECTIONS = [
  {name: SUMMARY},
];

class AllelePage extends Component {
  componentDidMount() {
    this.props.dispatchFetchAllele();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.alleleId !== prevProps.match.params.alleleId) {
      this.props.dispatchFetchAllele();
    }
  }

  render() {
    const {data, loading, error} = this.props;

    if (loading) {
      return <LoadingPage/>;
    }

    if (error) {
      console.error(error);
      return <NotFound/>;
    }

    if (!data || !Object.keys(data).length) {
      return null;
    }

    const title = `${data.symbolText} allele`;

    return (
      <DataPage>
        <HeadMetaTags title={title}/>
        <PageNav sections={SECTIONS}>
          <PageNavEntity entityName={<AlleleSymbol allele={data} />} icon={<SpeciesIcon scale={0.5} species={data.species.name} />}>
            <DataSourceLink reference={data.crossReferences.primary} />
            <div>Gene: <Link to={`/gene/${data.gene.id}`}>{data.gene.symbol}</Link></div>
            <i>{data.species.name}</i>
          </PageNavEntity>
        </PageNav>
        <PageData>
          <PageHeader entityName={<AlleleSymbol allele={data} />}/>

          <Subsection hideTitle title={SUMMARY}>
            <AlleleSummary allele={data} />
          </Subsection>
        </PageData>
      </DataPage>
    );
  }
}

AllelePage.propTypes = {
  data: PropTypes.object,
  dispatchFetchAllele: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  data: selectData(state),
  loading: selectLoading(state),
  error: selectError(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  dispatchFetchAllele: () => dispatch(fetchAllele(props.match.params.alleleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllelePage);
