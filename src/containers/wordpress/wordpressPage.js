import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import style from './style.css';
import HeadMetaTags from '../../components/headMetaTags';
import LoadingPage from '../../components/loadingPage';
import SecondaryNav from './secondaryNav';

import { fetchWordpressPage } from '../../actions/wordpress';

import {
  selectLoading,
  selectPage
} from '../../selectors/wordpressSelectors';

class WordpressPage extends Component {
  componentDidMount() {
    this.fetchPage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.slug !== prevProps.slug) {
      this.fetchPage();
    }
  }

  fetchPage() {
    const { dispatch, slug } = this.props;
    dispatch(fetchWordpressPage(slug));
  }

  render() {
    const { loading, page } = this.props;

    if (loading) {
      return <LoadingPage />;
    }

    if (!page) {
      return null;
    }

    const title = page.title.rendered;
    let parentId = (page.parent > 0) ? page.parent : page.id;
    return (
      <div className={style.wordPressContainer}>
        <HeadMetaTags title={title} />
        <SecondaryNav id={page.id} parent={parentId} title={title} type='page' />
        <div dangerouslySetInnerHTML={{ __html: page.content.rendered}} />
      </div>
    );
  }
}

WordpressPage.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  page: PropTypes.object,
  slug: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    loading: selectLoading(state),
    page: selectPage(state),
  };
};

export { WordpressPage as WordpressPage };
export default connect(mapStateToProps)(WordpressPage);
