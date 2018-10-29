/* eslint-disable react/no-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { STRINGENCY_HIGH, STRINGENCY_MED, STRINGNECY_LOW } from './constants';

class StringencySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stringencyLevel: this.props.defaultLevel
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newLevel = event.target.value;
    this.setState({stringencyLevel: newLevel});
    this.props.onChange(newLevel);
  }

  renderStringencyOption(stringencyLevel, label) {
    const labelStyle = {
      margin: '0em 1em 0em 0',
      lineHeight: '2em',
    };
    const inputStyle = {
      margin: '0 0.5em'
    };
    return (
      <label style={labelStyle}>
        <input
          checked={stringencyLevel === this.state.stringencyLevel}
          onChange={this.handleChange}
          style={inputStyle}
          type="radio"
          value={stringencyLevel}
        />
        {label}
      </label>
    );
  }

  render() {
    return (
      <div>
        <span>Stringency:</span>
        {this.renderStringencyOption(STRINGENCY_HIGH, 'Stringent')}
        {this.renderStringencyOption(STRINGENCY_MED, 'Moderate')}
        {this.renderStringencyOption(STRINGNECY_LOW, 'No filter')}
      </div>
    );
  }
}

StringencySelector.propTypes = {
  defaultLevel: PropTypes.string,
  onChange: PropTypes.func,
};

export default StringencySelector;
