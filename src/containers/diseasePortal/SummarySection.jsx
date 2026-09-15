import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

import ExternalLink from '../../components/ExternalLink.jsx';
import CommaSeparatedList from '../../components/commaSeparatedList.jsx';
import SynonymList from '../../components/synonymList.jsx';
import { formatLink } from '../diseasePage/utils';
import diseasePageStyle from '../diseasePage/style.module.scss';
import style from './style.module.scss';

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

const SummarySection = ({ disease }) => {
  const doTerm = disease?.doTerm;
  if (!doTerm) {
    return null;
  }

  const { definition, definitionUrls, synonyms } = doTerm;
  const synonymNames = transformSynonyms(synonyms);
  const hasDefinition = definition || (definitionUrls && definitionUrls.length > 0);

  return (
    <div className={style.summary}>
      {hasDefinition && (
        <div className={style.summaryDefinition}>
          <div className={style.summaryLabel}>Definition</div>
          {definition} {renderDefinitionLinks(definitionUrls)}
        </div>
      )}
      {synonymNames.length > 0 && (
        <div className={style.summarySynonyms}>
          <div className={style.summaryLabel}>Synonyms</div>
          <SynonymList synonyms={synonymNames} />
        </div>
      )}
    </div>
  );
};

SummarySection.propTypes = {
  disease: PropTypes.object,
};

export default SummarySection;
