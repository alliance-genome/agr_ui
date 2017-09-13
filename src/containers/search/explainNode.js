import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

class ExplainNode extends Component {

  render() {
    if (!this.props.explanation || this.props.explanation === null) { return null;}

    return (
      <ul className={style.explanationList}>
        <li> <strong>{this.props.explanation.value}</strong>: {this.props.explanation.match || ''}
          {this.props.explanation.description}
        </li>
        <li>
          {this.props.explanation.details.map(function(detail, i){
            return <ExplainNode explanation={detail} key={i} />;
          })}
        </li>
      </ul>
    );
  }

}

ExplainNode.propTypes = {
  explanation: PropTypes.object
};

export default ExplainNode;
