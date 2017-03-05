import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import style from './style.css';
const DEFAULT_LABEL = 'Homologs';
const HIGHLIGHT_EL = 'em';
import { selectQueryParams } from '../../selectors/searchSelectors';

class LogListComponent extends Component {
  renderLabel(raw) {
    if (this.props.rawHighlight) {
      let q = this.props.query;
      let re = new RegExp(q, 'gi');
      let htmlStr = raw.replace(re, `<${HIGHLIGHT_EL}>${q}</${HIGHLIGHT_EL}>`);
      return <span dangerouslySetInnerHTML={{ __html: htmlStr }} />;
    }
    return raw;
  }

  render() {
    let logs = this.props.logs;
    let label = this.props.label;
    if (!logs) return null;
    label = label || DEFAULT_LABEL;
    if (logs.length === 0) return null;
    let nodes = logs.map( (d, i) => {
      let commaNode = (i === logs.length - 1) ? null : ', ';
      let tooltipNode = <Tooltip className='in' id='tooltip-top' placement='top'><i>{d.species}</i> type: {d.relationship_type}</Tooltip>;
      return (
        <span key={'h.' + i}>
          <OverlayTrigger overlay={tooltipNode} placement='top'>
            <a href={d.href} target='_new'>
              {this.renderLabel(d.symbol)}
            </a>
          </OverlayTrigger>
          &nbsp;
          <a className={style.evidenceFootnote} href={d.evidence_href} target='_new'>
            {this.renderLabel(d.evidence_name)}
          </a>
          {commaNode}
        </span>
      );
    });
    return (
      <div className={style.detailContainer}>
        <span className={style.detailLabel}><strong>{label}:</strong> {nodes}</span>
      </div>
    );
  }
}

LogListComponent.propTypes = {
  label: React.PropTypes.string,
  logs: React.PropTypes.array,
  query: React.PropTypes.string,
  rawHighlight: React.PropTypes.string
};

function mapStateToProps(state) {
  let qp = selectQueryParams(state);
  return {
    query: qp.q || ''
  };
}

export default connect(mapStateToProps)(LogListComponent);
