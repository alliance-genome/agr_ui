
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.css';
import { CATEGORIES } from '../../constants';

class CategoryLabel extends Component {
  getCurrentOption() {
    let current = CATEGORIES.filter( d => d.name === this.props.category )[0];
    return current;
  }

  renderSprite() {
    let current = this.getCurrentOption();
    let offset = Math.max(0, CATEGORIES.indexOf(current)) - 1;
    let offsetStyle = `-${offset}rem`;
    return <span className={`${this.props.category} ${style.sprite}`} style={{ backgroundPositionY: offsetStyle }} />;
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

export default CategoryLabel;
