import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import style from './style.scss';
import HeadMetaTags from '../../components/headMetaTags';
import LoadingPage from '../../components/loadingPage';
import SecondaryNav from './secondaryNav';

import { fetchWordpressPost } from '../../actions/wordpress';

import {
  selectLoading,
  selectPost
} from '../../selectors/wordpressSelectors';

class WordpressPost extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      this.fetch();
    }
  }

  fetch() {
    const { dispatch } = this.props;
    dispatch(fetchWordpressPost(this.props.match.params.slug));
  }

  render() {
    const { loading, post } = this.props;

    if (loading) {
      return <LoadingPage />;
    }

    if (!post) {
      return null;
    }

    const title = post.title.rendered;
    return (
      <div className={style.wordPressContainer}>
        <HeadMetaTags title={title} />
        <SecondaryNav  title={title} type='post' />
        <div className='container'>
          <div className='row'>
            <div className={`col-12 col-sm-5 ${style.floatLeft}`}>
              <img className='img-fluid' src={post.featured_media_url}  />
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered}} />
          </div>
        </div>
      </div>
    );
  }
}

WordpressPost.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  post: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    loading: selectLoading(state),
    post: selectPost(state),
  };
};

export { WordpressPost as WordpressPost };
export default connect(mapStateToProps)(WordpressPost);
