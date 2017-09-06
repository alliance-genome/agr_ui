import React, {Component} from 'react';
import PropTypes from 'prop-types';

class GenePageHeader extends Component {
  render() {
    return (
      <h1>
        {this.props.symbol}
        <hr />
      </h1>
    );
  }
}

GenePageHeader.propTypes = {
  symbol: PropTypes.string
};

export default GenePageHeader;
