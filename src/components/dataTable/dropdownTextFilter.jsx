import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input } from 'reactstrap';

const DropdownTextFilter = ({ column, defaultFilter = '', onFilter }) => {
  const [value, setValue] = useState(defaultFilter);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    onFilter(value.trim());
  };

  const handleClear = (event) => {
    event.preventDefault();
    setValue('');
    onFilter('');
  };

  return (
    <Form onSubmit={handleClick}>
      <FormGroup>
        <Input
          innerRef={inputRef}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Filter ${column.text}...`}
          style={{ width: '200px' }}
          type="text"
          value={value}
        />
      </FormGroup>
      <FormGroup className="d-flex justify-content-between">
        <Button onClick={handleClear} outline>
          Clear
        </Button>
        <Button color="primary" onClick={handleClick}>
          Apply
        </Button>
      </FormGroup>
    </Form>
  );
};

DropdownTextFilter.propTypes = {
  column: PropTypes.object,
  defaultFilter: PropTypes.string,
  onFilter: PropTypes.func,
};

export default DropdownTextFilter;
