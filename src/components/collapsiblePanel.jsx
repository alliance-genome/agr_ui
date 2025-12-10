import { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import classNames from 'classnames';

const CollapsiblePanel = ({ backgroundVariants = 'info', children, initiallyExpanded = false, title }) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  return (
    <div
      className="card"
      style={{
        clear: 'both',
      }}
    >
      <div
        className={`card-header alert-${backgroundVariants}`}
        onClick={() => setExpanded(!expanded)}
        role="tab"
        style={{ cursor: 'pointer' }}
      >
        <i
          aria-hidden="true"
          className={classNames('fa', {
            'fa-chevron-up': expanded,
            'fa-chevron-down': !expanded,
          })}
          style={{ marginRight: '1em' }}
        />
        <span>{title}</span>
      </div>

      <Collapse isOpen={expanded}>
        <div role="tabpanel">
          <div className="card-body">{children}</div>
        </div>
      </Collapse>
    </div>
  );
};

CollapsiblePanel.propTypes = {
  backgroundVariants: PropTypes.string,
  children: PropTypes.element.isRequired,
  initiallyExpanded: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default CollapsiblePanel;
