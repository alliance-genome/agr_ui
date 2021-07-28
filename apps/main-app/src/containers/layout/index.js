import WarningBanner from './WarningBanner';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import style from './style.scss';
import Loader from './loader/index';
import SearchBar from './searchBar';
import ReleaseBanner from './ReleaseBanner';
import { selectPageLoading } from '../../selectors/loadingSelector';
import { AppShell } from '@alliancegenome/app-shell';

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

    return (
      <AppShell renderHeaderActions={() => (
        <>
          <ReleaseBanner />
          <div style={{flex: '1 1 auto'}}></div>
          <div className={style.headerSearchContainer}>
            {location.pathname !== '/' && location.pathname !== '/search' && <SearchBar />}
          </div>
        </>
      )}>
        <WarningBanner />

        <div className={style.loaderContentContainer}>
          <div className={style.content}>
            <Loader />
            <div className={style.contentContainer}>
              {children}
            </div>
          </div>
        </div>

      </AppShell>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  pageLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  pageLoading: selectPageLoading(state),
});

export default withRouter(connect(mapStateToProps)(Layout));
