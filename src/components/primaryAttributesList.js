import React, { Component } from 'react';

import style from './style.css';

class PrimaryAttributesList extends Component {

  render() {
    const { attributes, data, termWidth } = this.props;
    const termColClass = 'col-sm-' + termWidth;
    const definitionColClass = 'col-sm-' + (12 - termWidth);
    const defs = attributes.reduce((a, b, i) => {
      const key = b.field;
      const attr = b.name ? b.name : key;
      let val = data[key];
      if (typeof b.format === 'function') {
        val = b.format(val, data);
      }
      val = val || <i className='text-muted'>Not Available</i>;
      return a.concat([
        <dt className={termColClass} key={`term-${i}`}>{attr}</dt>,
        <dd className={definitionColClass} key={`def-${i}`}>{val}</dd>
      ]);
    }, []);
    return (
      <dl className={`row ${style.primaryAttributesList}`}>
        {defs}
      </dl>
    );
  }
}

PrimaryAttributesList.defaultProps = {
  termWidth: 3,
};

PrimaryAttributesList.propTypes = {
  attributes: React.PropTypes.array,
  data: React.PropTypes.object,
  termWidth: React.PropTypes.number,
};

export default PrimaryAttributesList;
