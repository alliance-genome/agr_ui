import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';
import DetailList from './detailList.jsx';
import { getLinkForEntry, makeFieldDisplayName } from '../../lib/searchHelpers.jsx';
import { DISEASE_CATEGORY, GENE_CATEGORY, GO_CATEGORY, NON_HIGHLIGHTED_FIELDS } from '../../constants';
import SpeciesName from '../../components/SpeciesName.jsx';

const MATCH_LABEL = 'match_by';
const MAX_CHAR = 100;

const getFields = (activeCategory) => {
  let fields;
  switch (activeCategory) {
    case GENE_CATEGORY:
      fields = ['species', 'display_name', 'name', 'synonyms', 'source', 'biotype'];
      break;
    case GO_CATEGORY:
      fields = ['display_name', 'id', 'synonyms', 'go_branch'];
      break;
    case DISEASE_CATEGORY:
      fields = ['display_name', 'id'];
      break;
    default:
      fields = ['display_name', 'synonyms'];
  }
  fields.push(MATCH_LABEL);
  return fields;
};

const renderTruncatedContent = (original) => {
  let value = original || '';
  if (Array.isArray(value)) {
    value = value.join(', ');
  }
  if (value.length > MAX_CHAR) {
    return value.slice(0, MAX_CHAR) + '...';
  }
  return value;
};

const renderHighlight = (highlight) => {
  const _data = highlight;
  const _fields = Object.keys(_data).filter((d) => NON_HIGHLIGHTED_FIELDS.indexOf(d) < 0);
  return <DetailList data={_data} fields={_fields} />;
};

const ResultsTable = ({ activeCategory, entries }) => {
  const fields = getFields(activeCategory);

  const headerNodes = fields.map((d) => {
    let processedName;
    if (activeCategory === GENE_CATEGORY && d === 'display_name') {
      processedName = 'symbol';
    } else if (d === 'display_name') {
      processedName = 'name';
    } else {
      processedName = d;
    }
    return (
      <th className={style.tableHeadCell} key={`srH.${d}`}>
        {makeFieldDisplayName(processedName)}
      </th>
    );
  });

  const rowNodes = entries.map((d, i) => {
    const nodes = fields.map((field) => {
      const _key = `srtc.${i}.${field}`;
      switch (field) {
        case 'display_name':
        case 'symbol':
          return <td key={_key}>{getLinkForEntry(d)}</td>;
        case 'source':
          return (
            <td key={_key}>
              <a dangerouslySetInnerHTML={{ __html: d.id }} href={d.href} target="_new" />
            </td>
          );
        case MATCH_LABEL:
          return <td key={_key}>{renderHighlight(d.highlight, d.homologs)}</td>;
        case 'species':
          return (
            <td key={_key}>
              <SpeciesName dangerouslySetInnerHTML={{ __html: d.species }} />
            </td>
          );
        default:
          return <td dangerouslySetInnerHTML={{ __html: renderTruncatedContent(d[field]) }} key={_key} />;
      }
    });
    return <tr key={`tr${i}`}>{nodes}</tr>;
  });

  const emptyNode = entries.length === 0 ? <p className={style.tableEmpty}>No results</p> : null;
  return (
    <div className={style.tableContainer}>
      <table className="table">
        <thead className="thead-default">
          <tr>{headerNodes}</tr>
        </thead>
        <tbody>{rowNodes}</tbody>
      </table>
      {emptyNode}
    </div>
  );
};

ResultsTable.propTypes = {
  activeCategory: PropTypes.string,
  entries: PropTypes.array,
  query: PropTypes.any,
};

export default ResultsTable;
