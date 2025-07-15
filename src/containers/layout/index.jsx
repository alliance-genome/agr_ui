import WarningBanner from './WarningBanner.jsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import style from './style.module.scss';
import Loader from './loader/index.jsx';
import logo from '../../assets/images/alliance_logo_agr.png';
import SearchBar from './searchBar/index.jsx';
import { MenuItems } from './navigation/index.jsx';
import ReleaseBanner from './ReleaseBanner.jsx';
import WordpressInject from '../wordpress/wordpressInject.jsx';
import { selectPageLoading } from '../../selectors/loadingSelector';
import Footer from './Footer.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  componentDidMount() {
    const { location } = this.props;
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
    // chrome works well without the timeout because it has a good scroll anchoring
    // implementation. the timeout helps other browsers get the scroll position right
    // a little more consistently
    setTimeout(() => {
      const element = document.getElementById(this.props.location.hash.substr(1));
      if (element) {
        element.scrollIntoView();
      }
    }, 500);
  }

  render() {
    const { children, location } = this.props;
    const { menuOpen } = this.state;

    return (
      <div>
        <WarningBanner />

        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md d-flex justify-content-between">
              <div className="navbar-brand d-flex align-items-end">
                <Link to="/">
                  <img alt="" className={style.agrLogo} width="200" src={logo} />
                </Link>
                <ReleaseBanner />
                <WordpressInject slug="agr-topbar" />
              </div>
              <button
                className="navbar-toggler d-md-none"
                onClick={() => this.setState({ menuOpen: !menuOpen })}
                type="button"
              >
                <FontAwesomeIcon icon={faBars} fixedWidth />
              </button>
            </div>
            <div className="col-md d-flex justify-content-md-end">
              <div className={style.headerSearchContainer}>
                {location.pathname !== '/' && location.pathname !== '/search' && <SearchBar />}
              </div>
            </div>
          </div>
        </div>

        <MenuItems
          currentRoute={location.pathname}
          menuOpen={menuOpen}
          onItemClick={() => this.setState({ menuOpen: false })}
        />

        <div className={style.loaderContentContainer}>
          <div className={style.content}>
            <Loader />
            <div className={style.contentContainer}>{children}</div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  pageLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  pageLoading: selectPageLoading(state),
});

/*
 * TODO: convert component to functional component utilizing useLocation
 *
 * The wrapper component is simply a stop-gap solution since converting the component
 * is non-trivial and would stand in the way of completing the vite/react upgrade.
 * */

const LayoutWithLocation = (props) => {
  const location = useLocation();
  return <Layout location={location} {...props} />;
};

LayoutWithLocation.propTypes = {
  children: PropTypes.node,
  pageLoading: PropTypes.bool,
};

//TODO: withRouter - test
export default connect(mapStateToProps)(LayoutWithLocation);
