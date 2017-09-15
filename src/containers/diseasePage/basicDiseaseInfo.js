import React, {Component} from 'react';
import { Link } from 'react-router';

import CollapsibleList from '../../components/collapsibleList';
import PrimaryAttributesList from '../../components/primaryAttributesList';

class BasicDiseaseInfo extends Component {
  renderTermList(terms) {
    const items = terms && terms
      .map(term => <Link key={term.primaryKey} to={`/disease/${term.primaryKey}`}>{term.name}</Link>);
    return <CollapsibleList items={items} />;
  }

  renderCommaSeparatedList(items) {
    return items && items.join(', ');
  }

  renderSourceList(sources) {
    return sources && sources.map((source) => {
      return (
        <a href={source.url} key={`source-${source.species.displayName}`}>
          {source.species.displayName}
        </a>
      );
    }).reduce((a, b) => [a, ', ', b]);
  }

  render() {
    const { disease } = this.props;
    const attributes = [
      {
        field: 'definition',
      },
      {
        field: 'synonyms',
        format: this.renderCommaSeparatedList,
      },
      {
        field: 'crossReferences',
        format: this.renderCommaSeparatedList,
        name: 'Cross References',
      },
      {
        field: 'parents',
        format: this.renderTermList,
        name: 'Parent Terms',
      },
      {
        field: 'children',
        format: this.renderTermList,
        name: 'Child Terms',
      },
      {
        field: 'sourceList',
        format: this.renderSourceList,
        name: 'Sources of Associations',
      }
    ];
    return <PrimaryAttributesList attributes={attributes} data={disease} />;
  }
}

BasicDiseaseInfo.propTypes = {
  disease: React.PropTypes.object,
};

export default BasicDiseaseInfo;
