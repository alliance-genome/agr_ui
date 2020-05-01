{/* eslint-disable react/no-set-state */}
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import style from './style.scss';
import Loader from './loader/index';
import logo from './agrLogo.png';
import SearchBar from './searchBar';
import TopBar from './topBar';
import FooterBar from './footerBar';
import SiteMap from './siteMap';
import AgrTweets from './twitterWidget';
import { MenuItems } from './navigation';
import { selectWarningBanner } from '../../selectors/wordpressSelectors';
import { fetchWarningBanner } from '../../actions/wordpress';
import ReplaceLinks from '../wordpress/ReplaceLinks';
import { selectPageLoading } from '../../selectors/loadingSelector';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch(fetchWarningBanner());
    if (location.hash) {
      this.scrollToAnchor();
    }
  }

  componentDidUpdate(prevProps) {
    const { location, pageLoading } = this.props;
    if (location.hash && prevProps.pageLoading && !pageLoading) {
      this.scrollToAnchor();
    }
  }

  scrollToAnchor() {
    const element = document.getElementById(this.props.location.hash.substr(1));
    if (element) {
      // chrome works well without the timeout because it has a good scroll anchoring
      // implementation. the timeout helps other browsers get the scroll position right
      // a little more consistently
      setTimeout(() => element.scrollIntoView(), 400);
    }
  }

  render() {
    const { children, location, warningBanner } = this.props;
    const { menuOpen } = this.state;

    return (
      <div>
        {warningBanner &&
          <div className={style.warningBar}><ReplaceLinks html={warningBanner.content.rendered} /></div>
        }

        <div className='d-none d-md-block'>
          <TopBar />
        </div>

        <div className='container-fluid'>
          <div className='row align-items-center'>
            <div className='col-md d-flex justify-content-between'>
              <div className='navbar-brand d-flex align-items-end'>
                <Link to='/'>
                  <img className={`img-fluid ${style.agrLogo}`} src={logo} />
                </Link>
                <span className={style.version}>Release {process.env.RELEASE}</span>
              </div>
              <button className="navbar-toggler d-md-none" onClick={() => this.setState({menuOpen: !menuOpen})} type="button">
                <i className='fa fa-fw fa-bars' />
              </button>
            </div>
            <div className='col-md'>
              <SearchBar />
            </div>
          </div>
        </div>

        <MenuItems
          currentRoute={location.pathname}
          menuOpen={menuOpen}
          onItemClick={() => this.setState({menuOpen: false})}
        />

        <div className={style.loaderContentContainer}>
          <div className={style.content}>
            <Loader />
            <div className={style.contentContainer}>
              {children}
            </div>
          </div>
        </div>

        <div className={style.siteMapContainer}>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-6 col-md-6 col-12'>
                <div>
                  <h4>Recent Tweets</h4>
                </div>
                <div id='tweets'>
                  <AgrTweets />
                </div>
              </div>
              <div className='col-sm-6 col-md-6 col-12'>
                <SiteMap />
              </div>
            </div>
          </div>
        </div>
        <FooterBar />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  pageLoading: PropTypes.bool,
  warningBanner: PropTypes.object,
};

const mapStateToProps = state => ({
  warningBanner: selectWarningBanner(state),
  pageLoading: selectPageLoading(state),
});

export default withRouter(connect(mapStateToProps)(Layout));
