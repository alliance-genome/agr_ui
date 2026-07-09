import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';
import CategoryLabel from './categoryLabel.jsx';
import DetailList from './detailList.jsx';
import ResultExplanation from './resultExplanation.jsx';
import { CATEGORIES, GENE_CATEGORY, GO_CATEGORY, NON_HIGHLIGHTED_FIELDS } from '../../constants';
import { Link } from 'react-router-dom';

import SpeciesIcon from '../../components/speciesIcon/index.jsx';
import { getLinkForEntry, stringifyQuery } from '../../lib/searchHelpers.jsx';
import { UncontrolledTooltip } from 'reactstrap';
import hash from 'object-hash';
import SpeciesName from '../../components/SpeciesName.jsx';

const DEFAULT_FIELDS = ['symbol', 'name', 'synonyms', 'sourceHref', 'id', 'type'];

const renderHighlightedValues = (highlight, fields) => {
  const _data = highlight;
  const _fields = Object.keys(_data).filter(
    (d) => (fields || DEFAULT_FIELDS).indexOf(d) < 0 && NON_HIGHLIGHTED_FIELDS.indexOf(d) < 0
  );
  return <DetailList data={_data} fields={_fields} />;
};

const renderHeader = (d) => (
  <div className="row">
    <div className="col-sm-10">
      <h4 className={style.resultLinkLabel}>{getLinkForEntry(d)}</h4>
      {d.species && (
        <span className="ml-3">
          (<SpeciesName dangerouslySetInnerHTML={{ __html: d.species }} />)
        </span>
      )}
    </div>
    <div className="col-sm-2">
      <span className={style.resultCatLabel}>
        <CategoryLabel category={d.category} />
      </span>
    </div>
  </div>
);

const renderDetailFromFields = (d, fields) => <DetailList data={d} fields={fields} />;

const renderMissingTerms = (d) => {
  if (!d.missing || d.missing.length === 0 || d.missing[0] === '') {
    return '';
  }
  return (
    <div className={style.missingTerms}>
      <DetailList data={d} fields={['missing']} />
    </div>
  );
};

const renderRelatedData = (d) => {
  if (!d.relatedData || d.relatedData.length === 0 || d.relatedData[0] === '') {
    return '';
  }

  const _links = d.relatedData.map((x) => {
    const queryParams = {
      category: x.category,
      [x.targetField]: x.sourceName,
    };
    const catMatch = CATEGORIES.find((cat) => cat.name === x.category);
    const label = x.label || (catMatch ? catMatch.displayName : x.category);
    const href = { pathname: '/search', search: stringifyQuery(queryParams) };
    const id = 'X' + hash(x);

    let tip = '';
    if (d.category === GO_CATEGORY && x.category === GENE_CATEGORY) {
      tip = (
        <UncontrolledTooltip delay={{ hide: 150, show: 300 }} placement="top" target={id}>
          Includes direct and child annotations
        </UncontrolledTooltip>
      );
    }

    return (
      <li className="list-inline-item" id={id} key={label}>
        <Link to={href}>
          {label} ({x.count})
        </Link>
        {tip}
      </li>
    );
  });

  return (
    <div className={style.relatedDataLinks}>
      <ul className="list-unstyled list-inline">{_links}</ul>
    </div>
  );
};

const renderEntry = (d, i, fields) => (
  <div className={style.resultContainer} key={`sr${i}`}>
    {renderHeader(d)}
    <SpeciesIcon iconClass={style.resultSpeciesIcon} species={d.speciesKey} />
    {renderDetailFromFields(d, fields)}
    {renderHighlightedValues(d.highlight)}
    {renderRelatedData(d)}
    {renderMissingTerms(d)}
    {d.explanation && <ResultExplanation explanation={d.explanation} score={d.score} />}
    <hr />
  </div>
);

const renderGeneEntry = (d, i) => {
  const fields = CATEGORIES.find((cat) => cat.name === d.category).displayFields;
  return (
    <div className={style.resultContainer} key={`sr${i}`}>
      {renderHeader(d)}
      <SpeciesIcon iconClass={style.resultSpeciesIcon} species={d.speciesKey} />
      {renderDetailFromFields(d, fields)}
      {renderHighlightedValues(d.highlight)}
      {renderRelatedData(d)}
      {renderMissingTerms(d)}
      {d.explanation && <ResultExplanation explanation={d.explanation} score={d.score} />}
      <hr />
    </div>
  );
};

const ResultsList = ({ entries }) => {
  const rows =
    entries?.map((d, i) => {
      if (d.category === GENE_CATEGORY) {
        return renderGeneEntry(d, i);
      } else {
        const catMatch = CATEGORIES.find((cat) => cat.name === d.category);
        const fields = catMatch ? catMatch.displayFields || ['id', 'synonyms'] : ['id', 'synonyms'];
        return renderEntry(d, i, fields);
      }
    }) || [];
  return <div className={style.resultsListParent}>{rows}</div>;
};

ResultsList.propTypes = {
  entries: PropTypes.array,
};

export default ResultsList;
