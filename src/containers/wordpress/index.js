/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchData from '../../lib/fetchData';
import { fetchWp, fetchWpSuccess, fetchWpFailure } from '../../actions/wp';
import { selectWp } from '../../selectors/wpSelectors';

import HeadMetaTags from '../../components/headMetaTags';
import WordpressNews from './wordpressNews';
import WordpressPosts from './wordpressPosts';
import NewsSubMenu from './newsSubMenu';
import{ WP_POST_BASE_URL,WP_POST_URL } from '../../constants';
import{ WP_PAGE_BASE_URL,WP_PAGES } from '../../constants';


class Wordpress extends Component {
  constructor(props){
    super(props);
    this.wp_type='page';
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
    if(props.params.pageId){
      if(props.params.pageId==='posts')this.wp_type='posts';
      else this.wp_type='page';
      return props.params.pageId;
    }
    else{
      this.wp_type='posts';
      return props.params.postId;
    }
  }
  getData(currentRoute){
    this.props.dispatch(fetchWp());
    let homeUrl='';
    if(this.wp_type==='posts'){
      if(!this.props.params.postId) homeUrl=WP_POST_BASE_URL;
      else homeUrl=WP_POST_URL+this.props.params.postId;
    }else{
      homeUrl=WP_PAGE_BASE_URL+WP_PAGES[currentRoute].slug;
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
    if (this.wp_type==='posts'){    
      let title= 'News & Events';
      if(this.props.params.postId){
        title=this.props.data[0].title.rendered; 
        return (
          <div>
            <HeadMetaTags title={title} />
            <NewsSubMenu title={title} />
            <WordpressPosts data={this.props.data[0]} />
          </div>
        );
      }
      else{
        return (
          <div>
            <HeadMetaTags title={title} />
            <NewsSubMenu title={title} />
            <WordpressNews data={this.props.data}  />
          </div>
        );
      }
    } 
    let title = this.props.data[0].title.rendered;
   
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
  name: React.PropTypes.string,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  return selectWp(state);
}

export { Wordpress as Wordpress };
export default connect(mapStateToProps)(Wordpress);
