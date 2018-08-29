import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class HeadMetaTags extends Component {


  render() {

    let title = `${this.props.title} | Alliance of Genome Resources`;
    let data = this.props.data;
    let schema = undefined;
    if (data) {
      schema = {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@link': 'http://www.alliancegenome.org/gene/'+data.primaryId,
          '@type': 'DataSet',
          identifier: data.primaryId,
          name: data.symbol,
        }),
      };
    }

    return (
      <div>
        <Helmet
          meta={[
            {property: 'og:title', content: {title}},
          ]}
          title={title}
        />
        {schema &&
        <Helmet script={[schema]} />
        }
      </div>
    );
  }
}

HeadMetaTags.propTypes = {
  data: PropTypes.any,
  title: PropTypes.string
};

export default HeadMetaTags;
