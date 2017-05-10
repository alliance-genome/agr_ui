import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchData from '../../lib/fetchData';
import { fetchWp, fetchWpSuccess, fetchWpFailure } from '../../actions/wp';
import { selectWp } from '../../selectors/wpSelectors';

import HeadMetaTags from '../../components/headMetaTags';
import{ WP_REST_API_BASE_URL, MENU } from '../../constants';


class Wordpress extends Component {
  constructor(props){
    super(props);
    this.currentRoute='';
  }
  componentDidMount() {
    let currentRoute=this.getCurrentRoute(this.props);
    this.currentRoute=currentRoute;
    this.getData(currentRoute);
  }
  componentWillUpdate(nextProps, nextState){
    let currentRoute=this.getCurrentRoute(nextProps);
    if(this.currentRoute != currentRoute){
      this.currentRoute=currentRoute;
      this.currentState=nextState;
      this.getData(currentRoute);
    }
  } 
  getCurrentRoute(props){
    let currentRoute=props.location.pathname.replace('/','');
    currentRoute=currentRoute==''?'home' : currentRoute;
    return currentRoute;
  }
  getData(currentRoute){
    this.props.dispatch(fetchWp());
    let homeUrl= WP_REST_API_BASE_URL+MENU[currentRoute].slug;
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
    let title= MENU[this.currentRoute].title; 
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
};

function mapStateToProps(state) {
  return selectWp(state);
}

export { Wordpress as Wordpress };
export default connect(mapStateToProps)(Wordpress);
