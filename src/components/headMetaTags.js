import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class HeadMetaTags extends Component {
  constructor(props) {
    super(props);

    this.titleCase = this.titleCase.bind(this);
  }

  titleCase(str) {
    return str.toLowerCase().trim().split(' ').map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  render() {

    let title = `${this.props.title ? this.titleCase(this.props.title) : ''} | Alliance of Genome Resources`;

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
  title: PropTypes.string.isRequired,
};

export default HeadMetaTags;
