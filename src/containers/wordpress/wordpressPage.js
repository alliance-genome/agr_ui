import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import style from './style.scss';
import Example from '../../components/carousel';

import {
  selectLoading,
  selectPage
} from '../../selectors/wordpressSelectors';

class WordpressPage extends Component {
  componentDidMount() {
    this.fetchPage();
  }


  render() {
    return (
      <div className={style.wordPressContainer}>
        <Example />
      </div>
    );
  }
}

WordpressPage.propTypes = {
  loading: PropTypes.bool,
  page: PropTypes.object,

};

const mapStateToProps = (state) => {
  return {
    loading: selectLoading(state),
    page: selectPage(state),
  };
};

export { WordpressPage as WordpressPage };
export default connect(mapStateToProps)(WordpressPage);
