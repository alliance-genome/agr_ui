import React, { Component } from 'react';

import mockViewer from './transcript-viewer-full.png';
import style from './style.css';

class TranscriptViewer extends Component {
  render() {
    let jbrowseUrl = 'http://bw.scottcain.net/jbrowse/?data=data%2FDanio%20rerio&loc=25%3A14926862..14955898&tracks=DNA%2CAll%20Genes&highlight=';

    return (
      <div className={style.jbrowse}>
        <a href={jbrowseUrl} rel="noopener noreferrer" target='_blank'>
          <img src={mockViewer} />
        </a>
      </div>
    );
  }
}

TranscriptViewer.propTypes = {
  geneSymbol: React.PropTypes.string.isRequired,
  species: React.PropTypes.string.isRequired,
};

export default TranscriptViewer;
