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
import NotFound from '../../components/notFound';
import AlleleSummary from './AlleleSummary';
import AlleleSymbol from './AlleleSymbol';
import SpeciesIcon from '../../components/speciesIcon';
import PageNavEntity from '../../components/dataPage/PageNavEntity';
import DataSourceLink from '../../components/dataSourceLink';
import {Link} from 'react-router-dom';
import {setPageLoading} from '../../actions/loadingActions';

const SUMMARY = 'Summary';
const SECTIONS = [
  {name: SUMMARY},
];

class AllelePage extends Component {
  componentDidMount() {
    this.props.dispatchFetchAllele();
  }

  componentDidUpdate(prevProps) {
    if (this.props.alleleId !== prevProps.alleleId) {
      this.props.dispatchFetchAllele();
    }
  }

  render() {
    const {data, error} = this.props;

    if (error) {
      return <NotFound/>;
    }

    if (!data || !Object.keys(data).length) {
      return null;
    }

    const title = `${data.symbolText} | ${data.species.name} allele`;

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
  alleleId: PropTypes.string.isRequired,
  data: PropTypes.object,
  dispatchFetchAllele: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  data: selectData(state),
  loading: selectLoading(state),
  error: selectError(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  dispatchFetchAllele: () => {
    dispatch(setPageLoading(true));
    dispatch(fetchAllele(props.alleleId)).finally(() => dispatch(setPageLoading(false)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllelePage);
