import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import parse, { domToReact } from 'html-react-parser';

import style from './style.scss';
import HeadMetaTags from '../../components/headMetaTags';
import LoadingPage from '../../components/loadingPage';
import SecondaryNav from './secondaryNav';

import { fetchWordpressPage } from '../../actions/wordpress';

import {
  selectLoading,
  selectPage
} from '../../selectors/wordpressSelectors';
import NotFound from '../../components/notFound';
import { HashLink } from 'react-router-hash-link';
import {Link} from 'react-router-dom';

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
    const { loading, page, slug } = this.props;

    if (loading) {
      return <LoadingPage />;
    }

    if (!page) {
      return <NotFound />;
    }

    const title = page.title.rendered;
    let parentId = (page.parent > 0) ? page.parent : page.id;
    return (
      <div className={style.wordPressContainer}>
        <HeadMetaTags title={title} />
        {slug !== 'home' && <SecondaryNav parent={parentId} title={title} type='page' />}
        {slug !== 'home' && <div>
          {parse(page.content.rendered, {
            replace: node => {
              if (node.name === 'a' && node.attribs.href) {
                if (node.attribs.href.charAt(0) === '#') {
                  return <HashLink to={node.attribs.href}>{domToReact(node.children)}</HashLink>;
                }
                if (node.attribs.href.charAt(0) === '/' && (!node.attribs.target || node.attribs.target === '_self')) {
                  return <Link to={node.attribs.href}>{domToReact(node.children)}</Link>;
                }
              }
            }
          })}
        </div>}
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
