/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fetchData from '../../../lib/fetchData';
import { fetchWp, fetchWpSuccess, fetchWpFailure } from '../../../actions/wp';
import { selectWp } from '../../../selectors/wpSelectors';

import WordpressNews from './wordpressNews';
import WordpressPosts from './wordpressPosts';

import{ WP_POST_BASE_URL,WP_POST_URL } from '../../../constants';


class WordpressFeeds extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    this.getData(this.getCurrentRoute(this.props));
  }
  componentWillUpdate(nextProps, nextState){
    if(this.getCurrentRoute(this.props) != this.getCurrentRoute(nextProps)){
      this.getData(this.getCurrentRoute(nextProps));
    }
  }
  getCurrentRoute(props){
    return props.params.postId;
  }
  getData(currentRoute){
    this.props.dispatch(fetchWp());
    let homeUrl='';
    if (this.props.params.postId==='news') {
      homeUrl=WP_POST_BASE_URL;
    }
    else{ 
      homeUrl=WP_POST_URL+this.props.params.postId;
    }
    fetchData(homeUrl)
      .then(data => this.props.dispatch(fetchWpSuccess(data)))
      .catch(error => this.props.dispatch(fetchWpFailure(error)));
  }
  render() {
    if (this.props.loading) {
      return <span>loading...</span>;
    }

    if (this.props.error) {
      return <div className='alert alert-danger'>{this.props.error}</div>;
    }

    if (!this.props.data) {
      return null;
    }
    if(this.props.params.postId !=='news'){
      return (<WordpressPosts data={this.props.data[0]} />);
    }else{
      return (<WordpressNews data={this.props.data} path={this.props.params.url}  />);
    }
  }
}
WordpressFeeds.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  name: PropTypes.string,
  params: PropTypes.object,
};

function mapStateToProps(state) {
  return selectWp(state);
}

export { WordpressFeeds as WordpressFeeds };
export default connect(mapStateToProps)(WordpressFeeds);
