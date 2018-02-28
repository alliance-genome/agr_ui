import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import style from './style.css';
import CategoryLabel from './categoryLabel';
import DetailList from './detailList';
import ResultExplanation from './resultExplanation';
import { NON_HIGHLIGHTED_FIELDS } from '../../constants';

import SpeciesIcon from '../../components/speciesIcon';

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

  renderHeader(category, link, species) {
    if (species) {
      species = '(' + species + ')';
    }
    return (
      <div>
        <span className={style.resultCatLabel}><CategoryLabel category={category} /></span>
        <div>
          <h4 className={style.resultLinkLabel}>
            {link}
          </h4>
          <span className={style.resultSpeciesLabel} dangerouslySetInnerHTML={{ __html: species }} />
        </div>
      </div>
    );
  }

  renderDetailFromFields(d, fields) {
    return <DetailList data={d} fields={fields} />;
  }

  renderMissingTerms(d) {
    if (!d.missing || d.missing.length === 0) { return ''; }
    return (
      <div className={style.missingTerms}>
        <DetailList data={d} fields={['missing']} />
      </div>
    );
  }

  renderDiseaseEntry(d, i) {
    let fields = ['id', 'definition', 'external_ids'];
    let link = <a dangerouslySetInnerHTML={{ __html: d.display_name }} href={d.href} />;
    return (
      <div className={style.resultContainer} key={`sr${i}`}>
        {this.renderHeader(d.category, link)}
        {this.renderDetailFromFields(d, fields)}
        {this.renderHighlightedValues(d.highlight, fields)}
        {this.renderMissingTerms(d)}
        {d.explanation && <ResultExplanation explanation={d.explanation} score={d.score} />}
        <hr />
      </div>
    );
  }

  renderEntry(d, i, fields) {
    let link = <a dangerouslySetInnerHTML={{ __html: d.display_name }} href={d.href} />;
    return (
      <div className={style.resultContainer} key={`sr${i}`}>
        {this.renderHeader(d.category, link, d.species)}
        <SpeciesIcon iconClass={style.resultSpeciesIcon} species={d.speciesKey} />
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
    let bottomFields = ['biotype'];
    let link = <Link to={`/gene/${d.id}`}><span dangerouslySetInnerHTML={{ __html: d.display_name }} /></Link>;
    return (
      <div className={style.resultContainer} key={`sr${i}`}>
        {this.renderHeader(d.category, link, d.species)}
          <SpeciesIcon iconClass={style.resultSpeciesIcon} species={d.speciesKey} />
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
      } else if (d.category === 'disease') {
        return this.renderDiseaseEntry(d, i);
      } else if (d.category === 'go') {
        return this.renderEntry(d, i, ['id', 'synonyms', 'go_branch']);
      } else if (d.category === 'allele') {
        return this.renderEntry(d, i, ['id','gene', 'synonyms', 'diseases']);
      } else {
        return this.renderEntry(d,i, ['id','synonyms']);
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
