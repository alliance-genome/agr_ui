import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import { UncontrolledTooltip } from 'reactstrap';

const PageNavEntity = ({children, entityName, icon, truncateName}) => {

  // this is to ensure that we don't put the tooltip on the title element unless
  // it really was truncated
  const [attachTooltip, setAttachTooltip] = useState(false);
  const titleRef = useCallback(node => {
    if (truncateName && node !== null) {
      setAttachTooltip(node.scrollWidth > node.clientWidth);
    }
  }, [entityName, truncateName]);

  return (
    <>
      <div className='d-flex align-items-center'>
        {icon && <span className='mr-2'>{icon}</span>}
        <h5 className={truncateName ? 'text-truncate' : ''} id='PageNavEntityTitle' ref={titleRef}>{entityName}</h5>
        {truncateName && attachTooltip &&
          <UncontrolledTooltip innerClassName={style.titleTooltip} placement='bottom' target='PageNavEntityTitle'>
            {entityName}
          </UncontrolledTooltip>
        }
      </div>
      <div className='d-flex flex-column'>
        {children}
      </div>
    </>
  );
};

PageNavEntity.propTypes = {
  children: PropTypes.node,
  entityName: PropTypes.node.isRequired,
  icon: PropTypes.node,
  truncateName: PropTypes.bool
};

export default PageNavEntity;
