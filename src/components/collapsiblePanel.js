/* eslint-disable react/no-set-state */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';

class CollapsiblePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expended: props.initiallyExpended
    };
  }

  handleToggle() {
    this.setState((prevState) => {
      return {
        expended: !prevState.expended
      };
    });
  }


  render() {
    return (
      <div
        className="card"
        style={{
          clear: 'both'
        }}
      >
        <div
          className={`card-header alert-${this.props.backgroundVariants}`}
          onClick={() => this.handleToggle()} role="tab"
        >
          <i
            aria-hidden="true"
            className={`fa fa-chevron-${this.state.expended ? 'up' : 'down'}`}
            style={{marginRight: '1em'}}
          />
          <span>{this.props.title}</span>
        </div>

        <Collapse in={this.state.expended}>
          <div role="tabpanel">
            <div className="card-block">
              {this.props.children}
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

CollapsiblePanel.propTypes = {
  backgroundVariants: PropTypes.string,
  children: PropTypes.element.isRequired,
  initiallyExpended: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

CollapsiblePanel.defaultProps = {
  backgroundVariants: 'info',
  initiallyExpended: false
};

export default CollapsiblePanel;
