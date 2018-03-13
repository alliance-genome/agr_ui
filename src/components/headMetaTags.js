import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class HeadMetaTags extends Component {

  render() {

    let title = `${this.props.title} | Alliance of Genome Resources`;

    return (
      <div>
        <Helmet
          meta={[
            {property: 'og:title', content: {title}},
          ]}
          title={title}
        />
      </div>
    );
  }
}

HeadMetaTags.propTypes = {
  title: PropTypes.string

};

export default HeadMetaTags;
