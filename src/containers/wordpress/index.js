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

import{ WP_PAGE_BASE_URL,WP_PAGES } from '../../constants';


class Wordpress extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    let wpUrl = this.getCurrentRoute(this.props) || '/home';
    this.getData(wpUrl);
  }
  componentWillUpdate(nextProps, nextState){
    let wpUrl = this.getCurrentRoute(this.props) || '/home';
    let nextWpUrl = this.getCurrentRoute(nextProps) || '/home';
    if(wpUrl !== nextWpUrl){
      this.getData(nextWpUrl);
    }
  }
  getCurrentRoute(props){
    return props.pageId;
  }
  getData(currentRoute){
    this.props.dispatch(fetchWp());
    let page_slug= WP_PAGES[currentRoute].slug;
    if( (typeof page_slug) ==='undefined'){ page_slug= currentRoute;}
    let homeUrl=WP_PAGE_BASE_URL+page_slug;
    fetchData(homeUrl)
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
  data: PropTypes.object,
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
