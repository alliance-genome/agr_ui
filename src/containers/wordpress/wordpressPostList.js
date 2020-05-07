import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import style from './style.scss';
import SecondaryNav from './secondaryNav';
import HeadMetaTags from '../../components/headMetaTags';

import { fetchWordpressPostList } from '../../actions/wordpress';

import {
  selectLoading,
  selectPostList
} from '../../selectors/wordpressSelectors';
import {setPageLoading} from '../../actions/loadingActions';
import TwitterFeed from '../../components/TwitterFeed';
import LoadingSpinner from '../../components/loadingSpinner';

class WordpressPostList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setPageLoading(true));
    dispatch(fetchWordpressPostList()).finally(() => dispatch(setPageLoading(false)));
  }

  render() {
    const title = 'News and Events';
    const { loading, postList } = this.props;

    return (
      <div className={style.wordPressContainer}>
        <HeadMetaTags title={title} />
        <SecondaryNav title={title} type='post' />
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              {loading && <LoadingSpinner />}
              {
                postList && postList.map(post => {
                  if (post.status !== 'publish') { return; }
                  const link = `/news/${post.slug}`;
                  return (
                    <div className={style.postContainer} key={post.id}>
                      <Link to={link}>
                        <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered}} />
                      </Link>
                      <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered}} />
                    </div>
                  );
                })
              }
            </div>
            <div className='col-md-4 border-left'>
              <TwitterFeed />
            </div>
          </div>
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
