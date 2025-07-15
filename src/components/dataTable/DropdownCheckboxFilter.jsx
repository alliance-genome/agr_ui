import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const DropdownCheckboxFilter = ({
  formatter = (value) => value && value.replace(/_/g, ' '),
  onChange,
  options,
  value = [],
}) => {
  const handleChange = (event) => {
    let newValue;
    if (event.target.checked) {
      newValue = [...value, event.target.value];
    } else {
      newValue = value.filter((v) => v !== event.target.value);
    }
    onChange(newValue);
  };

  const handleClear = (event) => {
    event.preventDefault();
    onChange([]);
  };

  return (
    <Form>
      <FormGroup>
        {options.map((option) => (
          <FormGroup check key={option}>
            <Label check>
              <Input checked={value.indexOf(option) > -1} onChange={handleChange} type="checkbox" value={option} />{' '}
              {formatter ? formatter(option) : option}
            </Label>
          </FormGroup>
        ))}
      </FormGroup>
      <FormGroup className="d-flex justify-content-between">
        <Button onClick={handleClear} outline>
          Clear
        </Button>
      </FormGroup>
    </Form>
  );
};

DropdownCheckboxFilter.propTypes = {
  formatter: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.array,
};

export default DropdownCheckboxFilter;
