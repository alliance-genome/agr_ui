import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

import { AttributeList, AttributeLabel, AttributeValue } from '../../components/attribute';
import ExternalLink from '../../components/ExternalLink.jsx';
import CommaSeparatedList from '../../components/commaSeparatedList.jsx';
import SynonymList from '../../components/synonymList.jsx';
import { formatLink } from '../diseasePage/utils';
import diseasePageStyle from '../diseasePage/style.module.scss';

const transformSynonyms = (synonyms) => {
  if (!Array.isArray(synonyms)) {
    return [];
  }
  return synonyms.map((item) => item.name);
};

const renderDefinitionLinks = (links) =>
  links && (
    <CommaSeparatedList>
      {links.map((link, idx) => {
        const formattedLink = formatLink(link);
        return (
          <span key={link}>
            <ExternalLink href={formattedLink} id={`portal-definition-link-${idx}`}>
              [{idx + 1}]
            </ExternalLink>
            <UncontrolledTooltip
              delay={{ show: 200, hide: 0 }}
              innerClassName={diseasePageStyle.urlTooltip}
              placement="bottom"
              target={`portal-definition-link-${idx}`}
            >
              {formattedLink}
            </UncontrolledTooltip>
          </span>
        );
      })}
    </CommaSeparatedList>
  );

const renderDefinition = (doTerm) =>
  (doTerm.definition || (doTerm.definitionUrls && doTerm.definitionUrls.length > 0)) && (
    <div>
      {doTerm.definition} {renderDefinitionLinks(doTerm.definitionUrls)}
    </div>
  );

const SummarySection = ({ disease }) => {
  const doTerm = disease?.doTerm;
  if (!doTerm) {
    return null;
  }

  return (
    <AttributeList>
      <AttributeLabel>Definition</AttributeLabel>
      <AttributeValue>{renderDefinition(doTerm)}</AttributeValue>

      <AttributeLabel>Synonyms</AttributeLabel>
      <AttributeValue placeholder="None">
        {doTerm.synonyms && <SynonymList synonyms={transformSynonyms(doTerm.synonyms)} />}
      </AttributeValue>
    </AttributeList>
  );
};

SummarySection.propTypes = {
  disease: PropTypes.object,
};

export default SummarySection;
