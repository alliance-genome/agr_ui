import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {getSchemasForData,getHelpSchema,getSearchSchema} from '../lib/structuredDataHelper';

class HeadMetaTags extends Component {


  render() {

    let title = `${this.props.title} | Alliance of Genome Resources`;
    let data = this.props.data;
    let schemas = [];


    // general view
    schemas.push(getHelpSchema());
    schemas.push(getSearchSchema());


    // specify actions
    schemas.push(
    );


    if (data) {
      getSchemasForData(schemas,data);
    }

    return (
      <div>
        <Helmet
          meta={[
            {property: 'og:title', content: {title}}
          ]}
          script={(schemas)}
          title={title}
        />
      </div>
    );
  }
}

HeadMetaTags.propTypes = {
  data: PropTypes.any,
  title: PropTypes.string
};

export default HeadMetaTags;
