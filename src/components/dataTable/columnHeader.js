import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

import style from './style.scss';

class ColumnHeader extends React.Component {
  render() {
    const {column, containerRef, filter, filterElement} = this.props;
    const iconClass = filter ? 'text-primary' : 'text-muted';
    const classes = '';
    return (
      <div className={classes}>
        {column.text}
        {filterElement &&
          <UncontrolledButtonDropdown>
            <DropdownToggle className={style.filterToggle} color='link' tag='span'>
              <i className={`fa fa-filter ${iconClass}`} />
            </DropdownToggle>
            <DropdownMenu className='px-4 py-3' modifiers={{preventOverflow: {boundariesElement: containerRef}}}>
              {filterElement}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        }
      </div>
    );
  }
}

ColumnHeader.propTypes = {
  column: PropTypes.object,
  containerRef: PropTypes.instanceOf(Element),
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  filterElement: PropTypes.node,
};

export default ColumnHeader;
