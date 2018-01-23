import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import style from './style.css';
import SecondaryNav from './secondaryNav';
import HeadMetaTags from '../../components/headMetaTags';

import { fetchWordpressPostList } from '../../actions/wordpress';

import {
  selectLoading,
  selectPostList
} from '../../selectors/wordpressSelectors';
import LoadingPage from '../../components/loadingPage';

class WordpressPostList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchWordpressPostList());
  }

  render() {
    const title = 'News & Events';
    const { loading, postList } = this.props;

    if (loading) {
      return <LoadingPage />;
    }

    if (!postList) {
      return null;
    }

    return (
      <div className={style.wordPressContainer}>
        <HeadMetaTags title={title} />
        <SecondaryNav title={title} type='post' />
        <div className='container'>
          {
            this.props.postList.map(post => {
              if (post.status !== 'publish') { return; }
              const link = `/posts/${post.slug}`;
              return (
                <div className={`row ${style.postContainer}`} key={post.id}>
                  <div className='col-xs-12 col-sm-4'>
                    <Link href={link}>
                      <img className='img-fluid' src={post.featured_media_url} />
                    </Link>
                  </div>
                  <div className='col-xs-12 col-sm-8'>
                    <Link to={link}>
                      <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered}} />
                    </Link>
                    <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered}} />
                  </div>
                 </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

WordpressPostList.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  postList: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    loading: selectLoading(state),
    postList: selectPostList(state),
  };
};

export { WordpressPostList as WordpressPostList };
export default connect(mapStateToProps)(WordpressPostList);
