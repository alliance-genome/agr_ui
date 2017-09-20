import React, {Component} from 'react';
import { Link } from 'react-router';

import CollapsibleList from '../../components/collapsibleList';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';

class BasicDiseaseInfo extends Component {
  renderTermList(terms) {
    const items = terms && terms
      .map(term => <Link key={term.primaryKey} to={`/disease/${term.primaryKey}`}>{term.name}</Link>);
    return items && <CollapsibleList items={items} />;
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

  renderCrossReferenceList(refs) {
    return refs && refs.map((ref) => {
      return (
        <a href={ref.crossRefCompleteUrl} key={`ref-${ref.name}`}>
          {ref.name}
        </a>
      );
    }).reduce((a, b) => [a, ', ', b]);
  }

  render() {
    const { disease } = this.props;
    return (
      <AttributeList bsClassName='col-xs-12'>
        <AttributeLabel>Definition</AttributeLabel>
        <AttributeValue>{disease.definition}</AttributeValue>

        <AttributeLabel>Synonyms</AttributeLabel>
        <AttributeValue>{this.renderCommaSeparatedList(disease.synonyms)}</AttributeValue>

        <AttributeLabel>Cross References</AttributeLabel>
        <AttributeValue>{this.renderCrossReferenceList(disease.crossReferences)}</AttributeValue>

        <AttributeLabel>Parent Terms</AttributeLabel>
        <AttributeValue placeholder='None'>{this.renderTermList(disease.parents)}</AttributeValue>

        <AttributeLabel>Child Terms</AttributeLabel>
        <AttributeValue placeholder='None'>{this.renderTermList(disease.children)}</AttributeValue>

        <AttributeLabel>Sources of Associations</AttributeLabel>
        <AttributeValue>{this.renderSourceList(disease.sourceList)}</AttributeValue>
      </AttributeList>
    );
  }
}

BasicDiseaseInfo.propTypes = {
  disease: React.PropTypes.object,
};

export default BasicDiseaseInfo;
