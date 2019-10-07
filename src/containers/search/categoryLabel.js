
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';
import { CATEGORIES } from '../../constants';

class CategoryLabel extends Component {
  getCurrentOption() {
    return CATEGORIES.find(cat => cat.name === this.props.category);
  }

  renderSprite() {
    return <span className={`${style[this.props.category]} ${style.categoryIcon}`}>&#x2B22;</span>;
  }

  render() {
    let current = this.getCurrentOption();
    let label = current ? current.displayName : '';
    let labelNode = this.props.hideLabel ? null : <span className={style.catLabel}> {label}</span>;
    let spriteNode = this.props.hideImage ? null : <span>{this.renderSprite()}</span>;
    return <span>{spriteNode}{labelNode}</span>;
  }
}

CategoryLabel.propTypes = {
  category: PropTypes.string,
  hideImage: PropTypes.bool,
  hideLabel: PropTypes.bool,
};

CategoryLabel.defaultProps = {
  spriteColor: 'black',
};

export default CategoryLabel;
