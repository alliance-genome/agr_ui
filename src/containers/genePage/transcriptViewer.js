import React, {Component} from 'react';

import style from './style.css';


class TranscriptViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {imageStatus: 'loading'};

  }

  handleImageErrored() {
    this.setState({imageStatus: 'Error loading transcript preview.'});
  }

  handleImageLoaded() {
    this.setState({imageStatus: ''});
  }

  render() {
    let jbrowsePrefx = 'http://bw.scottcain.net/jbrowse/?data=data%2F';
    // location based data
    let locationString = this.props.fmin && this.props.fmax ? this.props.chromosome + ':' + this.props.fmin + '..' + this.props.fmax : this.props.geneSymbol;

    let jbrowseUrl = jbrowsePrefx + encodeURI(this.props.species) + '&loc=' + encodeURI(locationString) + '&tracks=DNA%2CAll%20Genes&highlight=';
    let visualizationUrl = 'http://dev.alliancegenome.org:8891/?url=';

    // original URL
    let delay = 5000;
    let pngSuffix = '&format=PNG&delay=' + delay + '&width=600&height=300&zoom=1&quality=0.7';
    let hideControlsSuffix = '&tracklist=0&nav=0&tracklabels=0&fullviewlink=0';


    let finalUrl = visualizationUrl + encodeURIComponent(jbrowseUrl.replace('DNA%2C', '') + hideControlsSuffix) + pngSuffix;
    return (
      <div className={style.jbrowse}>
        <a href={jbrowseUrl} rel="noopener noreferrer" target='_blank'>
          <img
               onError={this.handleImageErrored.bind(this)}
               onLoad={this.handleImageLoaded.bind(this)}
               src={finalUrl}
          />
        </a>
          {this.state.imageStatus === 'loading'
              ?   <div>Loading ... <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /> </div>
            : ''
          }
      </div>
    );
  }
}

TranscriptViewer.propTypes = {
  chromosome: React.PropTypes.string,
  fmax: React.PropTypes.number,
  fmin: React.PropTypes.number,
  geneSymbol: React.PropTypes.string.isRequired,
  species: React.PropTypes.string.isRequired,
};

export default TranscriptViewer;
