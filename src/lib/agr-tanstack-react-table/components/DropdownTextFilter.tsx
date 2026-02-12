import { getDisplayName } from '@agr-tanstack-react-table/AllianceInteractiveTable.tsx';
import type { Column, RowData } from '@tanstack/react-table';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useEffect, useRef, useState } from 'react';

type DropdownTextFilterProps<TData extends RowData> = {
  column: Column<TData>;
};

const DropdownTextFilter = <TData extends RowData>({ column }: DropdownTextFilterProps<TData>) => {
  const [inputValue, setInputValue] = useState(((column.getFilterValue() as string[]) || [''])[0]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  const handleSubmit = () => column.setFilterValue([inputValue]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          innerRef={inputRef}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Filter ${getDisplayName(column)}...`}
          style={{ width: '200px' }}
          type="text"
          value={inputValue}
        />
      </FormGroup>
      <FormGroup className="d-flex justify-content-between">
        <Button
          onClick={(_) => {
            column.setFilterValue(undefined);
            setInputValue('');
          }}
          outline
        >
          Clear
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Apply
        </Button>
      </FormGroup>
    </Form>
  );
};

export default DropdownTextFilter;
