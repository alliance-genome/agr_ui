import React, {Component} from 'react';
import { Link } from 'react-router';

import CollapsibleList from '../../components/collapsibleList';
import PrimaryAttributesList from '../../components/primaryAttributesList';

class BasicDiseaseInfo extends Component {
  renderTermList(terms) {
    const items = terms && terms
      .map(term => <Link key={term.primaryKey} to={`/disease/${term.primaryKey}`}>{term.name}</Link>);
    return <CollapsibleList items={items} />;
    // return items;
  }

  render() {
    const { disease } = this.props;
    const attributes = [
      {
        field: 'definition',
      },
      {
        field: 'synonyms',
      },
      {
        field: 'external_ids',
        format: ids => ids && ids.join(', '),
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
      }
    ];
    return <PrimaryAttributesList attributes={attributes} data={disease} />;
  }
}

BasicDiseaseInfo.propTypes = {
  disease: React.PropTypes.object,
};

export default BasicDiseaseInfo;
