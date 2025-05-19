import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';
import DetailList from './detailList.jsx';
import { getLinkForEntry, makeFieldDisplayName } from '../../lib/searchHelpers.jsx';
import { NON_HIGHLIGHTED_FIELDS } from '../../constants';
import SpeciesName from '../../components/SpeciesName.jsx';

const MATCH_LABEL = 'match_by';
const MAX_CHAR = 100;

class ResultsTable extends Component {
  getFields() {
    let fields;
    switch(this.props.activeCategory) {
    case 'gene':
      fields = ['species', 'display_name', 'name', 'synonyms', 'source', 'biotype'];
      break;
    case 'go':
      fields = ['display_name', 'id', 'synonyms', 'go_branch'];
      break;
    case 'disease':
      fields = ['display_name', 'id'];
      break;
    default:
      fields = ['display_name', 'synonyms'];
    }
    fields.push(MATCH_LABEL);
    return fields;
  }

  renderHeader() {
    let fields = this.getFields();
    let nodes = fields.map( (d) => {
      let processedName;
      if (this.props.activeCategory === 'gene' && d === 'display_name') {
        processedName = 'symbol';
      } else if (d === 'display_name') {
        processedName = 'name';
      } else {
        processedName = d;
      }
      return <th className={style.tableHeadCell} key={`srH.${d}`}>{makeFieldDisplayName(processedName)}</th>;
    });
    return (
      <tr>
        {nodes}
      </tr>
    );
  }

  renderTruncatedContent(original) {
    original = original || '';
    if (Array.isArray(original)) {
      original = original.join(', ');
    }
    if (original.length > MAX_CHAR) {
      return original.slice(0, MAX_CHAR) + '...';
    } else {
      return original;
    }
  }

  renderRows() {
    let entries = this.props.entries;
    let fields = this.getFields();
    let rowNodes = entries.map( (d, i) => {
      let nodes = fields.map( (field) => {
        let _key = `srtc.${i}.${field}`;
        switch(field) {
        case 'display_name':
        case 'symbol':
          return <td key={_key}>{getLinkForEntry(d)}</td>;
        case 'source':
          return <td key={_key}><a dangerouslySetInnerHTML={{ __html: d.id }} href={d.href} target='_new' /></td>;
        case MATCH_LABEL:
          return <td key={_key}>{this.renderHighlight(d.highlight, d.homologs)}</td>;
        case 'species':
          return <td key={_key}><SpeciesName dangerouslySetInnerHTML={{ __html: d.species }} /></td>;
        default:
          return <td dangerouslySetInnerHTML={{ __html: this.renderTruncatedContent(d[field]) }} key={_key} />;
        }
      });
      return (
        <tr key={`tr${i}`}>
          {nodes}
        </tr>
      );
    });
    return (
      <tbody>
        {rowNodes}
      </tbody>
    );
  }

  renderHighlight(highlight) {
    let _data = highlight;
    let _fields = Object.keys(_data).filter( d => {
      return (NON_HIGHLIGHTED_FIELDS.indexOf(d) < 0);
    });
    return <DetailList data={_data} fields={_fields} />;
  }

  render() {
    let emptyNode = (this.props.entries.length === 0) ? <p className={style.tableEmpty}>No results</p> : null;
    return (
      <div className={style.tableContainer}>
        <table className='table'>
          <thead className='thead-default'>
            {this.renderHeader()}
          </thead>
          {this.renderRows()}
        </table>
        {emptyNode}
      </div>
    );
  }
}

ResultsTable.propTypes = {
  activeCategory: PropTypes.string,
  entries: PropTypes.array,
  query: PropTypes.any,
};

export default ResultsTable;
