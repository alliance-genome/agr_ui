import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AttributeList, AttributeLabel, AttributeValue } from '../../components/attribute';
import CrossReferenceList from '../../components/crossReferenceList.jsx';
import SynonymList from '../../components/synonymList.jsx';
import { CollapsibleList } from '../../components/collapsibleList';
import ExternalLink from '../../components/ExternalLink.jsx';
import { smartAlphaSort } from '../../lib/utils';

const TermList = ({ terms }) =>
  terms?.length ? (
    <CollapsibleList>
      {[...terms].sort(smartAlphaSort((term) => term.name)).map((term) => (
        <Link key={term.curie} to={`/anatomy/${term.curie}`}>
          {term.name}
        </Link>
      ))}
    </CollapsibleList>
  ) : null;

TermList.propTypes = {
  terms: PropTypes.array,
};

// CrossReferenceList renders through DataSourceLink, which expects
// { name, displayName, crossRefCompleteUrl }. OLS gives us a curie and
// sometimes a resolver URL; entries without one still render as plain text.
const toCrossReferences = (xrefs) =>
  (xrefs || []).map(({ curie, url }) => ({
    name: curie,
    displayName: curie,
    crossRefCompleteUrl: url,
  }));

const AnatomyBasicInfo = ({ ontology, term, parents, children }) => (
  <AttributeList>
    <AttributeLabel>Definition</AttributeLabel>
    <AttributeValue placeholder="None">{term.definition}</AttributeValue>

    <AttributeLabel>Species</AttributeLabel>
    <AttributeValue placeholder="Not species-specific">{ontology.species && <i>{ontology.species}</i>}</AttributeValue>

    <AttributeLabel>Ontology</AttributeLabel>
    <AttributeValue>
      {ontology.label}
      {ontology.termUrl && (
        <>
          {' '}
          <ExternalLink href={ontology.termUrl(term.curie)}>
            {ontology.mod ? `View at ${ontology.mod}` : 'View source term'}
          </ExternalLink>
        </>
      )}
    </AttributeValue>

    <AttributeLabel>Synonyms</AttributeLabel>
    <AttributeValue placeholder="None">
      {term.synonyms?.length > 0 && <SynonymList synonyms={term.synonyms} />}
    </AttributeValue>

    <AttributeLabel>Parent Terms</AttributeLabel>
    <AttributeValue placeholder="None">{parents?.length > 0 && <TermList terms={parents} />}</AttributeValue>

    <AttributeLabel>Child Terms</AttributeLabel>
    <AttributeValue placeholder="None">{children?.length > 0 && <TermList terms={children} />}</AttributeValue>

    <AttributeLabel>Cross References</AttributeLabel>
    <AttributeValue placeholder="None">
      {term.xrefs?.length > 0 && <CrossReferenceList crossReferences={toCrossReferences(term.xrefs)} />}
    </AttributeValue>
  </AttributeList>
);

AnatomyBasicInfo.propTypes = {
  ontology: PropTypes.object.isRequired,
  term: PropTypes.object.isRequired,
  parents: PropTypes.array,
  children: PropTypes.array,
};

export default AnatomyBasicInfo;
