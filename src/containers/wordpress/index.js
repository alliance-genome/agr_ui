/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchData from '../../lib/fetchData';
import { fetchWp, fetchWpSuccess, fetchWpFailure } from '../../actions/wp';
import { selectWp } from '../../selectors/wpSelectors';

import HeadMetaTags from '../../components/headMetaTags';
import{ WP_PAGE_BASE_URL, WP_PAGES } from '../../constants';


class Wordpress extends Component {
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
    return props.params.pageId;
  }
  getData(currentRoute){
    this.props.dispatch(fetchWp());
    let homeUrl= WP_PAGE_BASE_URL+WP_PAGES[currentRoute].slug;
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
    let title = WP_PAGES[this.getCurrentRoute(this.props)].title;
    return (
      <div>
        <HeadMetaTags title={title} />
        <div dangerouslySetInnerHTML={{ __html: this.props.data[0].content.rendered}} />
      </div>
    );
  }
}
Wordpress.propTypes = {
  data: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  error: React.PropTypes.object,
  loading: React.PropTypes.bool,
  location: React.PropTypes.object,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  return selectWp(state);
}

export { Wordpress as Wordpress };
export default connect(mapStateToProps)(Wordpress);
