import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const PageNavEntity = ({children, entityName, icon}) => {
  return (
    <div className={`${style.entity}`}>
      <div className='w-100'>
        <div className='d-flex flex-md-column align-items-center mb-md-2'>
          {icon && <span className='mb-md-1 mr-2 mr-md-0'>{icon}</span>}
          <h5>{entityName}</h5>
        </div>
        <div className='d-flex flex-column'>
          {children}
        </div>
      </div>
      <button className='navbar-toggler ml-auto' data-target='#data-page-nav' data-toggle='collapse' type='button'>
        <i className='fa fa-fw fa-bars' />
      </button>
    </div>
  );
};

PageNavEntity.propTypes = {
  children: PropTypes.node,
  entityName: PropTypes.node.isRequired,
  icon: PropTypes.node,
};

export default PageNavEntity;
