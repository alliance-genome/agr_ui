import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './style.css';
import CategoryLabel from './categoryLabel';
import DetailList from './detailList';
import { NON_HIGHLIGHTED_FIELDS } from '../../constants';

const DEFAULT_FIELDS = ['symbol', 'name', 'synonyms', 'sourceHref', 'id', 'species', 'type'];

class ResultsList extends Component {
  renderHighlightedValues(highlight) {
    let _data = highlight;
    let _fields = Object.keys(_data).filter( d => {
      return (DEFAULT_FIELDS.indexOf(d) < 0) && (NON_HIGHLIGHTED_FIELDS.indexOf(d) < 0);
    });
    return <DetailList data={_data} fields={_fields} />;
  }

  renderHeader(category, link, isMakeLowercase) {
    let _className = isMakeLowercase ? style.lowercase : null;
    return (
      <div>
        <span className={style.resultCatLabel}><CategoryLabel category={category} /></span>
        <h4 className={_className}>
          {link}
        </h4>
      </div>
    );
  }

  renderDetailFromFields(d, fields) {
    return <DetailList data={d} fields={fields} />;
  }

  renderNonGeneEntry(d, i, fields) {
    let isMakeLowercase = d.category === 'disease';
    let link = <a dangerouslySetInnerHTML={{ __html: d.display_name }} href={d.href} />;
    return (
      <div className={style.resultContainer} key={`sr${i}`}>
        {this.renderHeader(d.category, link, isMakeLowercase)}
        {this.renderDetailFromFields(d, fields)}
        {this.renderHighlightedValues(d.highlight)}
        <hr />
      </div>
    );
  }

  renderGeneEntry(d, i) {
    let topFields = ['name', 'synonyms'];
    let bottomFields = ['species', 'biotype'];
    let link = <Link to={`/gene/${d.id}`}><span dangerouslySetInnerHTML={{ __html: d.display_name }} /></Link>;
    return (
      <div className={style.resultContainer} key={`sr${i}`}>
        {this.renderHeader(d.category, link)}
          {this.renderDetailFromFields(d, topFields)}
          <div className={style.detailContainer}>
            <span className={style.detailLabel}><strong>Source:</strong> </span>
            <span><a dangerouslySetInnerHTML={{ __html: d.id }} href={d.sourceHref} className='primary-id' target='_new' /></span>
          </div>
          {this.renderDetailFromFields(d, bottomFields)}
          {this.renderHighlightedValues(d.highlight)}
        <hr />
      </div>
    );
  }

  renderRows() {
    return this.props.entries.map( (d, i) => {
      if (d.category === 'gene') {
        return this.renderGeneEntry(d, i);
      } else {
        let fieldVals = {
          'disease': ['synonyms', 'omim_id'],
          'go': ['id', 'synonyms', 'go_branch']
        };
        let fields = fieldVals[d.category] || [];
        return this.renderNonGeneEntry(d, i, fields);
      }
    });
  }

  render() {
    return (
      <div>
        {this.renderRows()}
      </div>
    );
  }
}

ResultsList.propTypes = {
  entries: React.PropTypes.array
};

export default ResultsList;
