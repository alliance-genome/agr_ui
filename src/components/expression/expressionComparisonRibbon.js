/* eslint-disable react/no-set-state */
import React from 'react';
import ControlsContainer from '../controlsContainer';
import { StringencySelector } from '../orthology';
import { STRINGENCY_HIGH } from '../orthology/constants';

class ExpressionComparisonRibbon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stringency: STRINGENCY_HIGH
    };
  }

  render() {
    return (
      <React.Fragment>
        <ControlsContainer>
          <b>Compare to ortholog genes</b>
          <StringencySelector defaultLevel={this.state.stringency} onChange={s => this.setState({stringency: s})} />
        </ControlsContainer>
      </React.Fragment>
    );
  }
}

export default ExpressionComparisonRibbon;
