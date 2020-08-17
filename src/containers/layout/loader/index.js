/*eslint-disable react/no-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import style from './style.scss';
import {selectPageLoading} from '../../../selectors/loadingSelector';

const FINISH_INTERVAL = 250;

const CLASS_NAMES = [
  style.done,
  style.pending,
  style.finishing,
];

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyState: 0 // 0=done, 1=pending, 2=finishing (transition from pending to complete so loading bar always finished, which is satisfying)
    };
  }

  componentDidUpdate(prevProps){
    // wasn't pending -> is pending
    if (!prevProps.isPending && this.props.isPending) {
      this.handleSetPending();
    // is pending -> not pending, setup quick animation to finish
    } else if (prevProps.isPending && !this.props.isPending) {
      this.handleSetFinishing();
    }
  }

  handleSetPending() {
    this.setState({ readyState: 1 });
  }

  handleSetFinishing() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this.setState({ readyState: 2 });
    this._timeout = setTimeout( () => {
      this.setState({ readyState: 0 });
    }, FINISH_INTERVAL);
  }

  render() {
    return (
      <div className={`${style.loader} ${CLASS_NAMES[this.state.readyState]}`} />
    );
  }
}

Loader.propTypes = {
  isPending: PropTypes.bool
};


function mapStateToProps(state) {
  return { isPending: selectPageLoading(state) };
}

export default connect(mapStateToProps)(Loader);
