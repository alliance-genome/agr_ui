import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';
import { makeId } from '../lib/utils';

import NoData from './noData';
import ErrorBoundary from './errorBoundary';
import HelpPopup from './helpPopup';

class Subsection extends Component {
  render() {
    const id = this.props.title && makeId(this.props.title);
    const target = <a className={style.target} id={id} />;
    const helpPopup = this.props.help && (
      <span className='small ml-3'>
        <HelpPopup id={`help-${this.props.title}`}>
          {this.props.help}
        </HelpPopup>
      </span>
    );

    let renderTitle;
    switch (this.props.level) {
    case 1:
      renderTitle = <h4>{this.props.isMeta && target}{this.props.title}{helpPopup}</h4>;
      break;
    case 2:
      renderTitle = <h5>{this.props.isMeta && target}{this.props.title}{helpPopup}</h5>;
      break;
    default:
      renderTitle = <h3>{this.props.isMeta && target}{this.props.title}{helpPopup}</h3>;
    }

    return (
      <div className={style.subsection}>
        {!this.props.isMeta && target}
        {this.props.hardcoded && <span className='badge badge-danger'>Hardcoded Example Data</span>}
        {this.props.title && !this.props.hideTitle && renderTitle}
        {typeof this.props.hasData !== 'undefined' && !this.props.hasData ?
          <NoData /> :
          <ErrorBoundary>{this.props.children}</ErrorBoundary>
        }
      </div>
    );
  }
}

Subsection.propTypes = {
  children: PropTypes.node.isRequired,
  hardcoded: PropTypes.bool,
  hasData: PropTypes.bool,
  help: PropTypes.node,
  hideTitle: PropTypes.bool,
  isMeta: PropTypes.bool,
  level: PropTypes.number,
  title: PropTypes.string,
};

Subsection.defaultProps = {
  hideTitle: false,
};

export default Subsection;
