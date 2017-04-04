import React, {Component} from 'react';
import Helmet from 'react-helmet';

class HeadMetaTags extends Component {
  render() {
    let title =this.props.title;
    return (
      <div>
        <Helmet
          meta={[
            {property: 'og:title', content:{title}},
          ]}
          title={title}
        />
      </div>
    );
  }
}

HeadMetaTags.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default HeadMetaTags;
