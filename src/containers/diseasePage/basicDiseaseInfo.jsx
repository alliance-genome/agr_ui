import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

import style from './style.module.scss';

import { AttributeList, AttributeLabel, AttributeValue } from '../../components/attribute';
import ExternalLink from '../../components/ExternalLink.jsx';
import CrossReferenceList from '../../components/crossReferenceList.jsx';
import CommaSeparatedList from '../../components/commaSeparatedList.jsx';
import { CollapsibleList } from '../../components/collapsibleList';
import { smartAlphaSort } from '../../lib/utils';
import SynonymList from '../../components/synonymList.jsx';
import { formatLink } from './utils';

const renderTermList = (terms) =>
  terms && (
    <CollapsibleList>
      {terms.sort(smartAlphaSort((term) => term.name)).map((term) => (
        <Link key={term.curie} to={`/disease/${term.curie}`}>
          {term.name}
        </Link>
      ))}
    </CollapsibleList>
  );

const renderSourceList = (sources) =>
  sources && (
    <CommaSeparatedList>
      {sources.map((source) => (
        <ExternalLink href={source.url} key={`source-${source.source}`}>
          {source.source}
        </ExternalLink>
      ))}
    </CommaSeparatedList>
  );

const renderDefinitionLinks = (links) =>
  links && (
    <CommaSeparatedList>
      {links.map((link, idx) => {
        const formatedLink = formatLink(link);
        return (
          <span key={link}>
            <ExternalLink href={formatedLink} id={`definition-link-${idx}`}>
              [{idx + 1}]
            </ExternalLink>
            <UncontrolledTooltip
              delay={{ show: 200, hide: 0 }}
              innerClassName={style.urlTooltip}
              placement="bottom"
              target={`definition-link-${idx}`}
            >
              {formatedLink}
            </UncontrolledTooltip>
          </span>
        );
      })}
    </CommaSeparatedList>
  );

const renderDefinition = (disease) =>
  (disease.definition || (disease.definitionUrls && disease.definitionUrls.length > 0)) && (
    <div>
      {disease.definition} {renderDefinitionLinks(disease.definitionUrls)}
    </div>
  );

const transformCrossReferenceLinkUrls = (crossReferenceLinkUrls) => {
  if (!Array.isArray(crossReferenceLinkUrls)) {
    return [];
  }
  return crossReferenceLinkUrls.map(({ referencedCurie, url }) => ({
    crossRefCompleteUrl: url,
    name: referencedCurie,
    displayName: referencedCurie,
  }));
};

const transformSynonyms = (synonyms) => {
  if (!Array.isArray(synonyms)) {
    return [];
  }
  return synonyms.map((item) => item.name);
};

const BasicDiseaseInfo = ({ disease }) => (
  <AttributeList>
    <AttributeLabel>Definition</AttributeLabel>
    <AttributeValue>{renderDefinition(disease.doTerm)}</AttributeValue>

    <AttributeLabel>Synonyms</AttributeLabel>
    <AttributeValue placeholder="None">
      {disease.doTerm.synonyms && <SynonymList synonyms={transformSynonyms(disease.doTerm.synonyms)} />}
    </AttributeValue>

    <AttributeLabel>Cross References</AttributeLabel>
    <AttributeValue>
      {disease.crossReferenceLinkUrls && (
        <CrossReferenceList crossReferences={transformCrossReferenceLinkUrls(disease.crossReferenceLinkUrls)} />
      )}
    </AttributeValue>

    <AttributeLabel>Parent Terms</AttributeLabel>
    <AttributeValue placeholder="None">{renderTermList(disease.parents)}</AttributeValue>

    <AttributeLabel>Child Terms</AttributeLabel>
    <AttributeValue placeholder="None">{renderTermList(disease.children)}</AttributeValue>

    <AttributeLabel>Sources of Associations</AttributeLabel>
    <AttributeValue>{renderSourceList(disease.sourceReferenceLinkUrls)}</AttributeValue>
  </AttributeList>
);

BasicDiseaseInfo.propTypes = {
  disease: PropTypes.object,
};

export default BasicDiseaseInfo;
