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

class Layout extends Component {
  componentDidMount() {
    this.props.dispatch(fetchWarningBanner());
  }

  render() {
    const { children, location, warningBanner } = this.props;
    return (
      <div>
        {warningBanner &&
          <div className={style.warningBar} dangerouslySetInnerHTML={{ __html: warningBanner.content.rendered}} />
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
              <button
                aria-controls="exCollapsingNavbar2" aria-expanded="false" aria-label="Toggle navigation"
                className="navbar-toggler d-md-none" data-target="#exCollapsingNavbar2"
                data-toggle="collapse" type="button"
              >
                <i className='fa fa-fw fa-bars' />
              </button>
            </div>
            <div className='col-md'>
              <SearchBar />
            </div>
          </div>
        </div>

        <MenuItems currentRoute={location.pathname} />

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
  warningBanner: PropTypes.object,
};

const mapStateToProps = state => ({
  warningBanner: selectWarningBanner(state),
});

export default withRouter(connect(mapStateToProps)(Layout));
