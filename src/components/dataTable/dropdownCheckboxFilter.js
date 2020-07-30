/* eslint-disable react/no-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { List } from 'immutable';

class DropdownCheckboxFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: List(props.defaultFilter)};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  fireCallbacks() {
    this.props.onFilter(this.state.value.toArray());
  }

  handleChange(event) {
    let { value } = this.state;
    if (event.target.checked) {
      value = value.push(event.target.value);
    } else {
      value = value.delete(value.indexOf(event.target.value));
    }
    this.setState({value}, () => this.fireCallbacks());
  }

  handleClick(event) {
    event.preventDefault();
    this.fireCallbacks();
  }

  handleClear(event) {
    event.preventDefault();
    this.setState({value: List()}, () => this.fireCallbacks());
  }

  render() {
    const { labelClassName, options } = this.props;
    return (
      <Form onSubmit={this.handleClick}>
        <FormGroup>
          {options.map(option => (
            <FormGroup check key={option}>
              <Label check className={labelClassName}>
                <Input
                  checked={this.state.value.indexOf(option) > -1}
                  onChange={this.handleChange}
                  type='checkbox'
                  value={option}
                /> {option}
              </Label>
            </FormGroup>
          ))}
        </FormGroup>
        <FormGroup className='d-flex justify-content-between'>
          <Button onClick={this.handleClear} outline>Clear</Button>
        </FormGroup>
      </Form>
    );
  }
}

DropdownCheckboxFilter.propTypes = {
  defaultFilter: PropTypes.array,
  labelClassName: PropTypes.string,
  onFilter: PropTypes.func,
  options: PropTypes.array,
};

DropdownCheckboxFilter.defaultProps = {
  defaultFilter: [],
};

export default DropdownCheckboxFilter;
