import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AttributeLabel, AttributeList, AttributeValue } from '../../components/attribute';
import { Link } from 'react-router-dom';
import DataSourceLink from '../../components/dataSourceLink.jsx';
import { ReferencesCellCuration, SourceCell } from '../../components/dataTable';
import CrossReferenceList from '../../components/crossReferenceList.jsx';
import CommaSeparatedList from '../../components/commaSeparatedList.jsx';
import ExternalLink from '../../components/ExternalLink.jsx';
import NoData from '../../components/noData.jsx';
import { buildUrlFromTemplate } from '../../lib/utils.js';
import ApplySpeciesNameFormat from './SpeciesFinderFormatter.jsx';
import styles from './style.module.scss';

const modMap = { FB: 'flybase', MGI: 'mgd', RGI: 'rgd', SGD: 'sgd', WB: 'wormbase', Xenbase: 'xenbase', ZFIN: 'zfin' };
const CommaSeparatedSourceList = ({ sources }) => {
  if (!sources) return null;
  return (
    <CommaSeparatedList listItemClassName={styles.crossRefsListItem}>
      {sources.map((source) => (
        <ExternalLink href={buildUrlFromTemplate(source)} key={`source-${source.curie}`}>
          {source.curie}
        </ExternalLink>
      ))}
    </CommaSeparatedList>
  );
};

const PubSourceLink = ({ ref }) => {
  const publisher = ref.resource_title;
  // this should not need to be done here; talk to Blue Team about fixing these date formats (e.g. "1999.7.30")
  // date_published may be missing entirely (e.g. internal_process_reference)
  const date_pub_fixed = ref.date_published ? ref.date_published.replace(/\b(\d)\b/g, '0$1').replace(/\.+/g, '-') : '';
  if (!publisher && !date_pub_fixed) return <NoData>Not Available</NoData>;
  // date_published may be a full date ("1999-07-30") or year-only ("2018"); only reformat when it parses,
  // otherwise show the raw value (a year-only string produces an Invalid Date that formatToParts throws on)
  const pubDate = new Date(date_pub_fixed + 'T00:00:00'); // must add a time, or Date assumes midnight in Greenwich, which usually (i.e. in the US) means you see the previous day instead
  let dateString = date_pub_fixed;
  if (date_pub_fixed && !isNaN(pubDate.getTime())) {
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const dateParts = new Intl.DateTimeFormat('en-US', dateOptions).formatToParts(pubDate);
    const datePartValues = dateParts.map((p) => p.value);
    dateString = datePartValues[4] + ' ' + datePartValues[0] + ' ' + datePartValues[2];
  }
  const pubVol = ref.volume || '';
  const pubIss = ref.issue_name ? `(${ref.issue_name})` : '';
  const pubRng = ref.page_range || '';
  // extract DOI cross-reference (already enriched with resourceDescriptorPage in index.jsx)
  const doiXref = [...(ref.extXrefs || []), ...(ref.modXrefs || [])].find(
    (xr) => xr.curie && xr.curie.match(/^doi\:/i)
  );
  // build link text string, omitting empty segments so missing fields don't render as "undefined"
  const volIssRng = `${pubVol} ${pubIss}:${pubRng}`.replace(/^\s*:\s*$/, '').trim();
  const pubsrc = [publisher, dateString].filter(Boolean).join('. ') + (volIssRng ? `; ${volIssRng}` : '');
  if (doiXref)
    return (
      <ExternalLink href={buildUrlFromTemplate(doiXref)} key={`source-${doiXref.curie}`}>
        {pubsrc}
      </ExternalLink>
    );
  else return <span>{pubsrc}</span>;
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

  // need to handle category: "correction", because these have no authors and my author map throws an error
  const AuthorList = ({ ref }) => {
    if (!ref.authors /*|| ref.authors === null*/) return <NoData>Not Available</NoData>;
    return (
      <CommaSeparatedList>
        {ref.authors.map((auth) => (
          <span dangerouslySetInnerHTML={{ __html: auth.name }} />
        ))}
      </CommaSeparatedList>
    );
  };

  const authPl = 'Author' + (ref.authors && ref.authors.length === 1 ? '' : 's');

  const ExternalCrossReferences = ({ xrefs }) => {
    if (xrefs.length === 0) return <NoData>Not Available</NoData>;
    return <CommaSeparatedSourceList sources={xrefs} />;
  };
  const MODidentifiers = ({ xrefs }) => {
    if (xrefs.length === 0) return <NoData>Not Available</NoData>;
    return <CommaSeparatedSourceList sources={xrefs} />;
  };

  return (
    <AttributeList>
      {/* <AttributeLabel>Authors</AttributeLabel> */}
      <AttributeLabel>{authPl}</AttributeLabel>
      <AttributeValue>
        <AuthorList ref={ref} />
      </AttributeValue>
      <AttributeLabel>Publication Source</AttributeLabel>
      <AttributeValue>
        {/* <div style={{ display: 'inline-block', backgroundColor: '#fec' }}> */}
        <PubSourceLink ref={ref}></PubSourceLink>
        {/* </div> */}
        <button
          onClick={handleCopy}
          style={{ float: 'right', padding: '0 0.75rem', margin: -1 }}
          className="btn btn-primary"
        >
          {copied ? 'copied to clipboard!' : 'copy citation'}
        </button>
      </AttributeValue>
      <AttributeLabel>Cross References</AttributeLabel>
      <AttributeValue placeholder="None">
        <ExternalCrossReferences xrefs={ref.extXrefs} />
      </AttributeValue>
      <AttributeLabel>MOD Identifier</AttributeLabel>
      <AttributeValue placeholder="None">
        <MODidentifiers xrefs={ref.modXrefs} />
      </AttributeValue>
      <AttributeLabel>Alliance Publication Type</AttributeLabel>
      <AttributeValue>{ref.category ? ref.category.replace(/_/g, ' ') : <NoData>Not Available</NoData>}</AttributeValue>
      <AttributeLabel>AGRKB ID</AttributeLabel>
      <AttributeValue>{ref.curie}</AttributeValue>
    </AttributeList>
  );
};

ReferenceSummary.propTypes = {
  reference: PropTypes.object,
};

export default ReferenceSummary;
