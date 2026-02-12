import type { Column, RowData } from '@tanstack/react-table';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

type DropdownCheckboxFilterProps<TData extends RowData> = {
  column: Column<TData>;
  filterValues: string[];
};

const DropdownCheckboxFilter = <TData extends RowData>({
  column,
  filterValues,
}: DropdownCheckboxFilterProps<TData>) => {
  const { filterFormatter } = column.columnDef.meta || {};
  const currentFilterValue: string[] = (column.getFilterValue() || []) as string[];

  return (
    <Form>
      <FormGroup>
        {filterValues.map((option) => (
          <FormGroup check key={option}>
            <Label check>
              <Input
                checked={currentFilterValue.indexOf(option) > -1}
                onChange={(e) =>
                  column.setFilterValue(
                    e.target.checked
                      ? [...currentFilterValue, option]
                      : currentFilterValue.filter((value) => value !== option)
                  )
                }
                type="checkbox"
                value={option}
              />{' '}
              {filterFormatter ? filterFormatter(option) : option}
            </Label>
          </FormGroup>
        ))}
      </FormGroup>
      <FormGroup className="d-flex justify-content-between">
        <Button onClick={(_) => column.setFilterValue([])} outline>
          Clear
        </Button>
      </FormGroup>
    </Form>
  );
};

export default DropdownCheckboxFilter;
