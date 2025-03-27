import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

import style from './style.module.scss';

import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import ExternalLink from '../../components/ExternalLink';
import CrossReferenceList from '../../components/crossReferenceList';
import CommaSeparatedList from '../../components/commaSeparatedList';
import { CollapsibleList } from '../../components/collapsibleList';
import { alphaSort } from '../../lib/utils';
import SynonymList from '../../components/synonymList';
import { formatLink } from './utils';

class BasicDiseaseInfo extends Component {
  renderTermList(terms) {
    return terms &&
      <CollapsibleList>
        {terms
          .sort(alphaSort(term => term.name))
          .map(term => <Link key={term.curie} to={`/disease/${term.curie}`}>{term.name}</Link>)
        }
      </CollapsibleList>;
  }

  renderSourceList(sources) {
    return sources &&
      <CommaSeparatedList>
        {
          sources.map((source) => (
            <ExternalLink href={source.url} key={`source-${source.source}`}>
              {source.source}
            </ExternalLink>
          ))
        }
      </CommaSeparatedList>;
  }

  renderDefinition(disease) {
    return (disease.definition || (disease.definitionUrls && disease.definitionUrls.length > 0)) && (
      <div>
        {disease.definition}
        {' '}
        {this.renderDefinitionLinks(disease.definitionUrls)}
      </div>
    );
  }

  

  renderDefinitionLinks(links) {
    return links &&
      <CommaSeparatedList>
        {
          links.map((link, idx) => {
            const formatedLink = formatLink(link);
            return (
              <span key={link}>
                <ExternalLink href={formatedLink} id={`definition-link-${idx}`}>[{idx + 1}]</ExternalLink>
                <UncontrolledTooltip
                  delay={{ show: 200, hide: 0 }}
                  innerClassName={style.urlTooltip}
                  placement='bottom'
                  target={`definition-link-${idx}`}
                >
                  {formatedLink}
                </UncontrolledTooltip>
              </span>
            )
          }
          )
        }
      </CommaSeparatedList>;
  }

  render() {
    const { disease } = this.props;

    const transformCrossReferenceLinkUrls = (crossReferenceLinkUrls) => {
      if (!Array.isArray(crossReferenceLinkUrls)) {
        return [];
      }

      return crossReferenceLinkUrls.map(item => {
        const { referencedCurie, url } = item;
        return {
          crossRefCompleteUrl: url,
          name: referencedCurie,
          displayName: referencedCurie
        };
      });
    };

    const transformSynonyms = (synonyms) => {
      if (!Array.isArray(synonyms)) {
        return [];
      }
      return synonyms.map(item => item.name);
    };

    return (
      <AttributeList>
        <AttributeLabel>Definition</AttributeLabel>
        <AttributeValue>
          {this.renderDefinition(disease.doTerm)}
        </AttributeValue>

        <AttributeLabel>Synonyms</AttributeLabel>
        <AttributeValue placeholder='None'>
          {disease.doTerm.synonyms && <SynonymList synonyms={transformSynonyms(disease.doTerm.synonyms)} />}
        </AttributeValue>

        <AttributeLabel>Cross References</AttributeLabel>
        <AttributeValue>
          {disease.crossReferenceLinkUrls && <CrossReferenceList crossReferences={transformCrossReferenceLinkUrls(disease.crossReferenceLinkUrls)} />}
        </AttributeValue>

        <AttributeLabel>Parent Terms</AttributeLabel>
        <AttributeValue placeholder='None'>{this.renderTermList(disease.parents)}</AttributeValue>

        <AttributeLabel>Child Terms</AttributeLabel>
        <AttributeValue placeholder='None'>{this.renderTermList(disease.children)}</AttributeValue>

        <AttributeLabel>Sources of Associations</AttributeLabel>
        <AttributeValue>{this.renderSourceList(disease.sourceReferenceLinkUrls)}</AttributeValue>
      </AttributeList>
    );
  }
}

BasicDiseaseInfo.propTypes = {
  disease: PropTypes.object,
};

export default BasicDiseaseInfo;
