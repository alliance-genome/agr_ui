import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

import style from './style.scss';

class ColumnHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filterValue: ''};
    this.handleApply = this.handleApply.bind(this);
  }

  handleApply(filterValue) {
    // eslint-disable-next-line react/no-set-state
    this.setState({filterValue});
  }

  render() {
    const {column, filterElement} = this.props;
    const augmentedFilter = filterElement && React.cloneElement(filterElement, {onApply: this.handleApply});
    const iconClass = this.state.filterValue ? 'text-primary' : 'text-muted';
    const classes = '';
    return (
      <div className={classes}>
        {column.text}
        {filterElement &&
          <UncontrolledButtonDropdown>
            <DropdownToggle className={style.filterToggle} color='link' tag='span'>
              <i className={`fa fa-filter ${iconClass}`} />
            </DropdownToggle>
            <DropdownMenu className='px-4 py-3' persist>
              {augmentedFilter}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        }
      </div>
    );
  }
}

ColumnHeader.propTypes = {
  column: PropTypes.object,
  filterElement: PropTypes.node,
};

export default ColumnHeader;
