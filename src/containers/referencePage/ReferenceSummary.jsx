import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AttributeLabel, AttributeList, AttributeValue } from '../../components/attribute';
import { Link } from 'react-router-dom';
import DataSourceLink from '../../components/dataSourceLink.jsx';
import { ReferencesCellCuration, SourceCell } from '../../components/dataTable';
import CrossReferenceList from '../../components/crossReferenceList.jsx';
import CommaSeparatedList from '../../components/commaSeparatedList.jsx';
import ExternalLink from '../../components/ExternalLink.jsx';

const modMap = { FB: 'flybase', MGI: 'mgd', RGI: 'rgd', SGD: 'sgd', WB: 'wormbase', Xenbase: 'xenbase', ZFIN: 'zfin' };
const CommaSeparatedSourceList = ({ sources }) => {
  if (!sources) return null;
  return (
    <CommaSeparatedList>
      {sources.map((source) => (
        <ExternalLink href={source.url} className="text-success" key={`source-${source.curie}`}>
          {source.curie}
        </ExternalLink>
      ))}
    </CommaSeparatedList>
  );
};

const ReferenceSummary = ({ ref }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ref.citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <AttributeList>
      <AttributeLabel>Title</AttributeLabel>
      <AttributeValue>{ref.title}</AttributeValue>
      <AttributeLabel>Authors</AttributeLabel>
      <AttributeValue>
        <CommaSeparatedList>
          {ref.authors.map((auth) => (
            <span dangerouslySetInnerHTML={{ __html: auth.name }} />
          ))}
        </CommaSeparatedList>
      </AttributeValue>
      <AttributeLabel>Publication Source</AttributeLabel>
      <AttributeValue>
        <ExternalLink href={ref.puburl} className="text-success">
          {ref.publisher || '[pub]'}. {ref.date_published}; {ref.volume}({ref.issue_name}):{ref.page_range}
        </ExternalLink>
        <button
          onClick={handleCopy}
          style={{ float: 'right', padding: '0 0.75rem', margin: -1 }}
          className="align-baseline btn btn-primary"
        >
          {copied ? 'copied to clipboard!' : 'copy citation'}
        </button>
      </AttributeValue>
      {/* the code you want for this (to make a button like those in the Sequence Viewer) can be found here:
      https://www.npmjs.com/package/generic-sequence-panel?activeTab=code
      under src/, then components/, then GenericSeqPanel.tsx */}

      {/* <AttributeLabel>Cross References</AttributeLabel>
      <AttributeValue placeholder="None">
        {ref.crossReferenceMap.references && (
          <DataSourceLink reference={reference.crossReferenceMap.references}>Literature</DataSourceLink>
        )}
      </AttributeValue> */}

      {/* <AttributeLabel>Cross References</AttributeLabel>
      <AttributeValue placeholder="None">
        {Object.keys(ref.cross_references).map((xref) => (
          <Link to={ref.cross_references[xref]} key={xref}>
            {xref}:{ref.cross_references[xref]}
          </Link>
        ))}
      </AttributeValue> */}
      <AttributeLabel>Cross References</AttributeLabel>
      <AttributeValue placeholder="None">
        <CommaSeparatedSourceList sources={ref.extXrefs} />
      </AttributeValue>
      <AttributeLabel>MOD Identifier</AttributeLabel>
      <AttributeValue placeholder="None">
        <CommaSeparatedSourceList sources={ref.modXrefs} />
      </AttributeValue>
      <AttributeLabel>Alliance Publication Type</AttributeLabel>
      <AttributeValue>{ref.category.replace(/_/g, ' ')}</AttributeValue>
    </AttributeList>
  );
};

ReferenceSummary.propTypes = {
  reference: PropTypes.object,
};

export default ReferenceSummary;
