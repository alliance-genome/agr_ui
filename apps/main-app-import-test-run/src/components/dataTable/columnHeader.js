import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import HelpPopup from '../helpPopup';

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
    const active = Array.isArray(filter) ? filter.length > 0 : filter;
    const { helpPopupProps } = column;
    return (
      <div className={classes}>
        {column.headerNode || column.text}
        {filterElement &&
          <UncontrolledButtonDropdown>
            <DropdownToggle className={`${style.filterToggle} ${active ? style.active : ''}`} color='link' tag='span'>
              <i className={'fa fa-filter'} />
            </DropdownToggle>
            <DropdownMenu className='shadow-sm px-4 py-3' modifiers={popperModifiers} positionFixed>
              {filterElement}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        }
        {
          helpPopupProps ? <div className="btn-group"><span className={style.helpIconWrapper}><HelpPopup {...helpPopupProps} /></span></div> : null
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
