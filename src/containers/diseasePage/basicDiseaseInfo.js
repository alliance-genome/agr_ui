import React, {Component} from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import CollapsibleList from '../../components/collapsibleList';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import ExternalLink from '../../components/externalLink';

class BasicDiseaseInfo extends Component {
  renderTermList(terms) {
    const items = terms && terms
      .map(term => <Link key={term.primaryKey} to={`/disease/${term.primaryKey}`}>{term.name}</Link>);
    return items && <CollapsibleList items={items} />;
  }

  renderSynonymList(items) {
    return items && items.join('; ');
  }

  renderSourceList(sources) {
    return sources && sources.map((source) => {
      return (
        <ExternalLink href={source.url} key={`source-${source.species.displayName}`}>
          {source.species.displayName}
        </ExternalLink>
      );
    }).reduce((a, b) => [a, ', ', b]);
  }

  renderCrossReferenceList(refs) {
    return refs && refs
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((ref) => {
        return (
          <ExternalLink href={ref.crossRefCompleteUrl} key={`ref-${ref.name}`}>
            {ref.name}
          </ExternalLink>
        );
      }).reduce((a, b) => [a, ', ', b]);
  }

  renderDefinition(disease) {
    return (disease.definition || (disease.definitionLinks && disease.definitionLinks.length > 0)) && (
      <div>
        {disease.definition}
        {this.renderDefinitionLinks(disease.definitionLinks)}
      </div>
    );
  }

  renderDefinitionLinks(links) {
    return links && links.map(link => {
      return (
        <div key={link}>
          <ExternalLink href={link}>{link}</ExternalLink>
        </div>
      );
    });
  }

  render() {
    const { disease } = this.props;
    return (
      <AttributeList bsClassName='col-xs-12'>
        <AttributeLabel>Definition</AttributeLabel>
        <AttributeValue>
          {this.renderDefinition(disease)}
        </AttributeValue>

        <AttributeLabel>Synonyms</AttributeLabel>
        <AttributeValue>{this.renderSynonymList(disease.synonyms)}</AttributeValue>

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
  disease: PropTypes.object,
};

export default BasicDiseaseInfo;
