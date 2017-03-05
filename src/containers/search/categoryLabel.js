import React, { Component } from 'react';

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
    return <span>{this.renderSprite()}{labelNode}</span>;
  }
}

CategoryLabel.propTypes = {
  category: React.PropTypes.string,
  hideLabel: React.PropTypes.bool
};

export default CategoryLabel;
