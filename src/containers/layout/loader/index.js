/*eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style.css';
import { selectIsPending } from '../../../selectors/searchSelectors';

const FINISH_INTERVAL = 250;

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
    if (this._timeout) clearTimeout(this._timeout);
    this.setState({ readyState: 2 });
    this._timeout = setTimeout( () => {
      this.setState({ readyState: 0 });
    }, FINISH_INTERVAL);
  }

  render() {
    if (this.state.readyState === 0) return null;
    let animateClass = (this.state.readyState === 1) ? style.animatedPending : style.animatedFinishing;
    let _className = `${style.loader} ${animateClass}`;
    return (
      <div className={_className} />
    );
  }
}

Loader.propTypes = {
  isPending: React.PropTypes.bool
};


function mapStateToProps(state) {
  return { isPending: selectIsPending(state) };
}

export default connect(mapStateToProps)(Loader);
