import React, {Component} from 'react';

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
  symbol: React.PropTypes.string
};

export default GenePageHeader;
