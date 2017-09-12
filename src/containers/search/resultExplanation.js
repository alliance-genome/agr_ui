/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import { makeFieldDisplayName } from '../../lib/searchHelpers';
import ExplainNode from './explainNode';

class ResultExplanation extends Component {

  constructor () {
    super();
    this.state = {
      isHidden: true
    };
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    if (!this.props.explanation || this.props.explanation === '') { return '';}
    let field = 'score';
    return (
      <div>
        <div className={style.detailContainer}>
          <div className={style.detailLineContainer}>
            <span className={style.detailLabel}><strong>{makeFieldDisplayName(field)}:</strong> </span>
            <span className={style.detailValue}>{this.props.score}</span>
            <button className={`btn btn-outline-primary btn-sm ${style.explanationButton}`} onClick={this.toggleHidden.bind(this)} >
              scoring details
            </button>
          </div>

        </div>
        <div className={style.resultExplanation}>
          {!this.state.isHidden && <ExplainNode explanation={this.props.explanation} /> }
        </div>
      </div>
    );
  }
}

ResultExplanation.propTypes = {
  explanation: PropTypes.object,
  score: PropTypes.object

};

export default ResultExplanation;
