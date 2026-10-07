import React from 'react';
import PropTypes from 'prop-types';
import { STRINGENCY_HIGH, STRINGENCY_MED, STRINGNECY_LOW } from './constants';

const LABEL_STYLE = { margin: '0em 1em 0em 0', lineHeight: '2em' };
const INPUT_STYLE = { margin: '0 0.5em' };

const StringencySelection = ({ level, onChange }) => {
  const handleChange = (event) => onChange(event.target.value);

  const renderOption = (stringencyLevel, label) => (
    <label style={LABEL_STYLE}>
      <input
        checked={stringencyLevel === level}
        onChange={handleChange}
        style={INPUT_STYLE}
        type="radio"
        value={stringencyLevel}
      />
      {label}
    </label>
  );

  return (
    <div style={{ display: 'inline' }}>
      <span>Stringency:</span>
      {renderOption(STRINGENCY_HIGH, 'Stringent')}
      {renderOption(STRINGENCY_MED, 'Moderate')}
      {renderOption(STRINGNECY_LOW, 'No filter')}
    </div>
  );
};

StringencySelection.propTypes = {
  level: PropTypes.string,
  onChange: PropTypes.func,
};

export default StringencySelection;
