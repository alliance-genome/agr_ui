import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

import style from './style.scss';

class ColumnHeader extends React.Component {
  render() {
    const {column, filter, filterElement} = this.props;
    const classes = '';
    const popperModifiers = {
      preventOverflow: {
        boundariesElement: 'window',
      }
    };
    return (
      <div className={classes}>
        {column.text}
        {filterElement &&
          <UncontrolledButtonDropdown>
            <DropdownToggle className={`${style.filterToggle} ${filter ? style.active : ''}`} color='link' tag='span'>
              <i className={'fa fa-filter'} />
            </DropdownToggle>
            <DropdownMenu className='px-4 py-3' modifiers={popperModifiers} positionFixed>
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
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  filterElement: PropTypes.node,
};

export default ColumnHeader;
