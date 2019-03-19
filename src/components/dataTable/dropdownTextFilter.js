/* eslint-disable react/no-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input } from 'reactstrap';

class DropdownTextFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  fireCallbacks() {
    this.props.onFilter(this.state.value);
    this.props.onApply(this.state.value);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(event) {
    event.preventDefault();
    this.fireCallbacks();
  }

  handleClear(event) {
    event.preventDefault();
    this.setState({value: ''}, () => this.fireCallbacks());
  }

  render() {
    return (
      <Form onSubmit={this.handleClick}>
        <FormGroup>
          <Input onChange={this.handleChange} placeholder={`Filter ${this.props.column.text}...`} style={{width: '200px'}} type='text' value={this.state.value} />
        </FormGroup>
        <FormGroup className='d-flex justify-content-between'>
          <Button onClick={this.handleClear} outline>Clear</Button>
          <Button color='primary' onClick={this.handleClick}>Apply</Button>
        </FormGroup>
      </Form>
    );
  }
}

DropdownTextFilter.propTypes = {
  column: PropTypes.object,
  onApply: PropTypes.func,
  onFilter: PropTypes.func
};

export default DropdownTextFilter;
