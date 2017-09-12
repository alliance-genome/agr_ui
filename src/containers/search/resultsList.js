import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import style from './style.css';
import genePageStyle from '../genePage/style.css';
import CategoryLabel from './categoryLabel';
import DetailList from './detailList';
import ResultExplanation from './resultExplanation';
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

  renderMissingTerms(d) {
    if (!d.missing || d.missing.length == 0) { return ''; }
    return (
      <div className={style.missingTerms}>
        <DetailList data={d} fields={['missing']} />
      </div>
    );
  }

  renderNonGeneEntry(d, i, fields) {
    let isMakeLowercase = d.category === 'disease';
    let link = <a dangerouslySetInnerHTML={{ __html: d.display_name }} href={d.href} />;
    return (
      <div className={style.resultContainer} key={`sr${i}`}>
        {this.renderHeader(d.category, link, isMakeLowercase)}
        {this.renderDetailFromFields(d, fields)}
        {this.renderHighlightedValues(d.highlight)}
        {this.renderMissingTerms(d)}
        {d.explanation && <ResultExplanation explanation={d.explanation} score={d.score} />}
        <hr />
      </div>
    );
  }

  renderGeneEntry(d, i) {
    let topFields = ['name', 'synonyms'];
    let bottomFields = ['species', 'biotype'];
    const speciesClass = genePageStyle[(d.species || '').replace(' ', '-')];
    let link = <Link to={`/gene/${d.id}`}><span dangerouslySetInnerHTML={{ __html: d.display_name }} /></Link>;
    return (
      <div className={style.resultContainer} key={`sr${i}`}>
        {this.renderHeader(d.category, link)}
          {speciesClass && <div className={`${genePageStyle.speciesIcon} ${speciesClass} ${style.resultSpeciesIcon}`} />}
          {this.renderDetailFromFields(d, topFields)}
          <div className={style.detailContainer}>
            <span className={style.detailLabel}><strong>Source:</strong> </span>
            <span><a className='primary-id' dangerouslySetInnerHTML={{ __html: d.id }} href={d.sourceHref} target='_new' /></span>
          </div>
          {this.renderDetailFromFields(d, bottomFields)}
          {this.renderHighlightedValues(d.highlight)}
          {this.renderMissingTerms(d)}
          {d.explanation && <ResultExplanation explanation={d.explanation} score={d.score} />}
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
  entries: PropTypes.array
};

export default ResultsList;
