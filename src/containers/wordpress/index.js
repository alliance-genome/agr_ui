/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fetchData from '../../lib/fetchData';
import { fetchWp, fetchWpSuccess, fetchWpFailure } from '../../actions/wp';
import { selectWp } from '../../selectors/wpSelectors';
import LoadingPage from '../../components/loadingPage';
import NotFound from '../../components/notFound';

import WordpressPage from './wordpressPage';

import{ WP_PAGE_BASE_URL} from '../../constants';


class Wordpress extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    let wpUrl = this.getCurrentRoute(this.props);
    this.getData(wpUrl);
  }
  componentWillUpdate(nextProps, nextState){
    let wpUrl = this.getCurrentRoute(this.props);
    let nextWpUrl = this.getCurrentRoute(nextProps);
    if(wpUrl !== nextWpUrl){
      this.getData(nextWpUrl);
    }
  }
  getCurrentRoute(props){
    return props.params.pageId;
  }
  getData(currentRoute){
    this.props.dispatch(fetchWp());
    let wpUrl=WP_PAGE_BASE_URL+currentRoute;
    fetchData(wpUrl)
      .then(data => {
        if (data && data[0]) {
          this.props.dispatch(fetchWpSuccess(data));
        } else {
          // throw our own error, since WP API doesn't return 404 when page is not found
          throw new Error('Page not found');
        }
      })
      .catch(error => this.props.dispatch(fetchWpFailure(error)));
  }
  render() {
    if (this.props.loading) {
      return <LoadingPage />;
    }

    if (this.props.error) {
      return <NotFound />;
    }

    if (!this.props.data) {
      return null;
    }
    return (<WordpressPage data={this.props.data[0]} />);
  }
}
Wordpress.propTypes = {
  data: PropTypes.array,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  pageId: PropTypes.string,
  params: PropTypes.object,
};

function mapStateToProps(state) {
  return selectWp(state);
}

export { Wordpress as Wordpress };
export default connect(mapStateToProps)(Wordpress);
