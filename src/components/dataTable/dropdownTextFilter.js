import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input } from 'reactstrap';

class DropdownTextFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    // eslint-disable-next-line react/no-set-state
    this.setState({value: event.target.value});
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onFilter(this.state.value);
    this.props.onApply(this.state.value);
  }

  render() {
    return (
      <Form>
        <FormGroup row>
          <Input onChange={this.handleChange} style={{width: '200px'}} type='text' value={this.state.value} />
        </FormGroup>
        <FormGroup row>
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
