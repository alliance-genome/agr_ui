import WarningBanner from './WarningBanner.jsx';
import React, { useEffect, useState } from 'react';
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

const scrollToAnchor = (hash) => {
  // chrome works well without the timeout because it has a good scroll anchoring
  // implementation. the timeout helps other browsers get the scroll position right
  // a little more consistently
  setTimeout(() => {
    const element = document.getElementById(hash.substr(1));
    if (element) element.scrollIntoView();
  }, 500);
};

const Layout = ({ children, pageLoading }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Disable browser's automatic scroll restoration to prevent conflicts
  // with our custom scroll-to-hash logic (fixes KANBAN-632)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (location.hash) {
      scrollToAnchor(location.hash);
    }
    // mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-scroll when page-loading transitions from true to false while a hash is set
  const prevPageLoadingRef = React.useRef(pageLoading);
  const prevHashRef = React.useRef(location.hash);
  useEffect(() => {
    const prevPageLoading = prevPageLoadingRef.current;
    const prevHash = prevHashRef.current;
    prevPageLoadingRef.current = pageLoading;
    prevHashRef.current = location.hash;

    if (location.hash && prevPageLoading && !pageLoading) {
      scrollToAnchor(location.hash);
    }
    // Also handle hash changes during navigation (e.g., back button)
    if (location.hash && location.hash !== prevHash) {
      scrollToAnchor(location.hash);
    }
  }, [location.hash, pageLoading]);

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
              onClick={() => setMenuOpen((prev) => !prev)}
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

      <MenuItems currentRoute={location.pathname} menuOpen={menuOpen} onItemClick={() => setMenuOpen(false)} />

      <div className={style.loaderContentContainer}>
        <div className={style.content}>
          <Loader />
          <div className={style.contentContainer}>{children}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  pageLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  pageLoading: selectPageLoading(state),
});

export default connect(mapStateToProps)(Layout);
