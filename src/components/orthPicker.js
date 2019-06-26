/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Button } from 'reactstrap';

import { StringencySelection } from './orthology';

class OrthPicker extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let {
      closeMenuOnSelect,
      getOptionLabel,
      getOptionValue,
      isMulti,
      maxHeight,
      options,
      placeholder,
      selectedOrthologs,
      stringency
    } = this.props;
    return(
      <div>
        <b>Compare to ortholog genes</b>
        <StringencySelection level={stringency} onChange={s => this.props.onStringencyChange(s)} />
        <div className='d-flex align-items-baseline'>
          <div className='flex-grow-1'>
            <Select
              closeMenuOnSelect={closeMenuOnSelect}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              isMulti={isMulti}
              maxHeight={maxHeight}
              onChange={this.props.onPickerChange}
              options={options}
              placeholder={placeholder}
              value={selectedOrthologs}
            />
          </div>
          <span className='px-2'>or</span>
          <Button
            color='primary'
            disabled={options.length === 0}
            onClick={()=>this.props.onBtnChange(options)}
          >
            Add all
          </Button>
        </div>
      </div>
    );
  }
}

OrthPicker.propTypes = {
  closeMenuOnSelect: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  handleOrthologBtnChange: PropTypes.func,
  isMulti: PropTypes.bool,
  maxHeight: PropTypes.string,
  onBtnChange: PropTypes.func,
  onPickerChange: PropTypes.func,
  onStringencyChange: PropTypes.func,
  optionaLabel: PropTypes.string,
  optionalValue: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  selectedOrthologs: PropTypes.array,
  selectedTerm: PropTypes.string,
  stringency: PropTypes.string,

};


export default OrthPicker;
