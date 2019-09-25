import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import {ReferenceCell} from './index';


function AnnotatedEntitiesPopup(props) {
  const {children, entities} = props;

  if (!entities || !entities.length) {
    return null;
  }

  const popperModifiers = {
    preventOverflow: {
      boundariesElement: 'window',
    }
  };

  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle tag='span'>
        <a href='#' onClick={e => e.preventDefault()}>{children || 'View'}</a>
      </DropdownToggle>
      <DropdownMenu className='shadow-sm' modifiers={popperModifiers} positionFixed style={{maxHeight: '500px', overflowY: 'scroll'}}>
        <div style={{width: '400px'}}>
          <table className='table table-sm'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>References</th>
              </tr>
            </thead>
            <tbody>
              {
                entities.map(entity => (
                  <tr key={entity.id}>
                    <td><span dangerouslySetInnerHTML={{__html: entity.name}}/>
                    </td>
                    <td>{entity.type}</td>
                    <td>{ReferenceCell(entity.publicationEvidenceCodes.map(pec => pec.publication))}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}

AnnotatedEntitiesPopup.propTypes = {
  children: PropTypes.node,
  entities: PropTypes.array,
};

export default AnnotatedEntitiesPopup;
