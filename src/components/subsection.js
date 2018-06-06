import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import style from './style.scss';
import { makeId } from '../lib/utils';

import NoData from './noData';

class Subsection extends Component {
  componentDidMount() {
    $(document.body).scrollspy('refresh');
  }

  render() {
    const id = this.props.title && makeId(this.props.title);
    return (
      <div className={style.subsection}>
        <a className={style.target} id={id} />
        {this.props.hardcoded && <span className='tag tag-danger'>Hardcoded Example Data</span>}
        {this.props.title && !this.props.hideTitle && <h3>{this.props.title}</h3>}
        {typeof this.props.hasData !== 'undefined' && !this.props.hasData ? <NoData /> : this.props.children}
      </div>
    );
  }
}

Subsection.propTypes = {
  children: PropTypes.node.isRequired,
  hardcoded: PropTypes.bool,
  hasData: PropTypes.bool,
  hideTitle: PropTypes.bool,
  title: PropTypes.string,
};

Subsection.defaultProps = {
  hideTitle: false,
};

export default Subsection;
