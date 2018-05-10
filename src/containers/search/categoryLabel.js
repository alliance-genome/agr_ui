
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
    const current = this.getCurrentOption();
    const yOffset = Math.max(0, CATEGORIES.indexOf(current)) - 1;
    const yOffsetStyle = `-${yOffset}rem`;
    let xOffset = 0;
    switch (this.props.spriteColor) {
    case 'white':
      xOffset = 1;
      break;
    case 'blue':
      xOffset = 2;
      break;
    }
    const xOffsetStyle = `-${xOffset * 1.15}rem`;
    const positions = {
      backgroundPositionX: xOffsetStyle,
      backgroundPositionY: yOffsetStyle
    };
    return <span className={`${this.props.category} ${style.sprite}`} style={positions} />;
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
  spriteColor: PropTypes.string,
};

CategoryLabel.defaultProps = {
  spriteColor: 'black',
};

export default CategoryLabel;
