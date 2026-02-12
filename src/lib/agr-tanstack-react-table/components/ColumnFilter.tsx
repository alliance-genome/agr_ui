import type { Column, RowData } from '@tanstack/react-table';
import { getDistinctFieldValue } from '../../../components/dataTable/utils';
import { DropdownMenu, type DropdownMenuProps, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import style from '../../../components/dataTable/style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import DropdownTextFilter from './DropdownTextFilter.tsx';
import DropdownCheckboxFilter from './DropdownCheckboxFilter.tsx';

type ColumnFilterProps<TData extends RowData> = {
  column: Column<TData>;
  supplementalData?: { distinctFieldValues: { [key: string]: string[] } };
};

const popperModifiers = [
  {
    name: 'preventOverflow',
    options: {
      rootBoundary: 'viewport',
    },
  },
];

const ColumnFilter = <TData extends RowData>({ column, supplementalData }: ColumnFilterProps<TData>) => {
  const { filterOptions, filterKey } = column.columnDef.meta || {};
  const filterValues: string[] = filterOptions || getDistinctFieldValue(supplementalData, `filter.${filterKey}`);

  if (filterValues.length === 1) {
    return null;
  }

  const showCheckboxes = filterValues.length > 1;

  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle
        className={`${style.filterToggle} ${column.getIsFiltered() ? style.active : ''}`}
        color="link"
        tag="span"
      >
        <FontAwesomeIcon icon={faFilter} />
      </DropdownToggle>
      <DropdownMenu
        className="shadow-sm px-4 py-3"
        modifiers={popperModifiers as any as DropdownMenuProps['modifiers']}
        strategy="fixed"
      >
        {showCheckboxes && <DropdownCheckboxFilter column={column} filterValues={filterValues} />}
        {!showCheckboxes && <DropdownTextFilter column={column} />}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
};

export default ColumnFilter;
