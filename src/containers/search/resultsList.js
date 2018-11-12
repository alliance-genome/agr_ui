import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';
import CategoryLabel from './categoryLabel';
import DetailList from './detailList';
import ResultExplanation from './resultExplanation';
import {CATEGORIES, NON_HIGHLIGHTED_FIELDS} from '../../constants';
import { Link } from 'react-router-dom';

import SpeciesIcon from '../../components/speciesIcon';
import { getLinkForEntry } from '../../lib/searchHelpers';
import { stringify } from 'query-string';

const DEFAULT_FIELDS = ['symbol', 'name', 'synonyms', 'sourceHref', 'id', 'type'];

class ResultsList extends Component {
  renderHighlightedValues(highlight, fields) {
    let _data = highlight;
    if (!fields) {
      fields = DEFAULT_FIELDS;
    }
    let _fields = Object.keys(_data).filter( d => {
      return (fields.indexOf(d) < 0) && (NON_HIGHLIGHTED_FIELDS.indexOf(d) < 0);
    });
    return <DetailList data={_data} fields={_fields} />;
  }

  renderHeader(d) {
    return (<div className="row">
      <div className="col-sm-10">
        <h4 className={style.resultLinkLabel}>{getLinkForEntry(d)}</h4>
        {d.species && <span className={style.resultSpeciesLabel} dangerouslySetInnerHTML={{ __html: '(' + d.species + ')' }} />}
      </div>
      <div className="col-sm-2">
        <span className={style.resultCatLabel}>
          <CategoryLabel category={d.category} />
        </span>
      </div>
    </div>);
  }

  renderDetailFromFields(d, fields) {
    return <DetailList data={d} fields={fields}  />;
  }

  renderMissingTerms(d) {
    if (!d.missing || d.missing.length === 0 || d.missing[0] === '') { return ''; }
    return (
      <div className={style.missingTerms}>
        <DetailList data={d} fields={['missing']} />
      </div>
    );
  }

  renderRelatedData(d) {
    if (!d.relatedData || d.relatedData.length === 0 || d.relatedData[0] === '') { return ''; }

    const _links = d.relatedData.map( x => {
      const queryParams = {
        category: x.category,
        [x.targetField]: x.sourceName
      };
      const label = x.label || CATEGORIES.find(cat => cat.name === x.category).displayName;
      const href = {pathname:'/search', search: stringify(queryParams)};

      return <li className='list-inline-item' key={x.category}><Link to={href}>{label} ({x.count})</Link></li>;
    });

    return (
      <div className={style.relatedDataLinks}>
        <ul className='list-unstyled list-inline'>
          {_links}
        </ul>
      </div>
    );
  }

  renderDiseaseEntry(d, i) {
    let fields = ['id', 'definition'];
    return (
      <div className={style.resultContainer} key={`sr${i}`}>
        {this.renderHeader(d)}
        {this.renderDetailFromFields(d, fields)}
        {this.renderHighlightedValues(d.highlight, fields)}
        {this.renderRelatedData(d)}
        {this.renderMissingTerms(d)}
        {d.explanation && <ResultExplanation explanation={d.explanation} score={d.score} />}
        <hr />
      </div>
    );
  }

  renderEntry(d, i, fields) {
    return (
      <div className={style.resultContainer} key={`sr${i}`}>
        {this.renderHeader(d)}
        <SpeciesIcon iconClass={style.resultSpeciesIcon} species={d.speciesKey} />
        {this.renderDetailFromFields(d, fields)}
        {this.renderHighlightedValues(d.highlight)}
        {this.renderRelatedData(d)}
        {this.renderMissingTerms(d)}
        {d.explanation && <ResultExplanation explanation={d.explanation} score={d.score} />}
        <hr />
      </div>
    );
  }

  renderGeneEntry(d, i) {
    let topFields = ['name', 'synonyms'];
    let bottomFields = ['biotype'];
    return (
      <div className={style.resultContainer} key={`sr${i}`}>
        {this.renderHeader(d)}
        <SpeciesIcon iconClass={style.resultSpeciesIcon} species={d.speciesKey} />
        {this.renderDetailFromFields(d, topFields)}
        <div className={style.detailContainer}>
          <span className={style.detailLabel}><strong>Source:</strong> </span>
          <span><a className='primary-id' dangerouslySetInnerHTML={{ __html: d.id }} href={d.sourceHref} target='_new' /></span>
        </div>
        {this.renderDetailFromFields(d, bottomFields)}
        {this.renderHighlightedValues(d.highlight)}
        {this.renderRelatedData(d)}
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
      } else if (d.category === 'disease') {
        return this.renderDiseaseEntry(d, i);
      } else if (d.category === 'go') {
        return this.renderEntry(d, i, ['id', 'collapsible_synonyms', 'go_branch']);
      } else if (d.category === 'allele') {
        return this.renderEntry(d, i, ['id','gene', 'synonyms', 'diseases']);
      } else {
        return this.renderEntry(d,i, ['id','synonyms']);
      }
    });
  }

  render() {
    return (<div className={style.resultsListParent}>
      {this.renderRows()}
    </div>);
  }
}

ResultsList.propTypes = {
  entries: PropTypes.array
};

export default ResultsList;
