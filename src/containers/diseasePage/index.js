import React, { Component } from 'react';
import HeadMetaTags from '../../components/headMetaTags';

class DiseasePage extends Component {
  render() {
    const title = this.props.params.diseaseId;
    return (
      <div className='container'>
        <HeadMetaTags title={title} />
        <h1>
          {this.props.params.diseaseId}
          <hr />
        </h1>
        <a href={'http://www.disease-ontology.org/?id=' + this.props.params.diseaseId}>
          {this.props.params.diseaseId}
        </a>
      </div>
    );
  }
}

DiseasePage.propTypes = {
  params: React.PropTypes.object,
};

export default DiseasePage;
