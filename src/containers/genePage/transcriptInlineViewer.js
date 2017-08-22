/*eslint-disable react/no-set-state */

import React, {Component} from 'react';


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
    // let externalPrefix = 'http://bw.scottcain.net/jbrowse/?data=data%2F';
    // let externalPrefix = 'http://ec2-34-208-22-23.us-west-2.compute.amazonaws.com/jbrowse/overview.html?data=data%2F';
    // let externalPrefix = 'http://localhost/jbrowse/overview.html?data=data%2F';
    let externalPrefix = 'http://jbrowse.alliancegenome.org/jbrowse/overview.html?data=data%2F';
    // let externalPrefix = 'http://ec2-52-43-125-139.us-west-2.compute.amazonaws.com/jbrowse/overview.html?data=data%2F';


    // let visualizationPrefix = 'http://ec2-34-208-22-23.us-west-2.compute.amazonaws.com:8080/?url=';
    // let visualizationPrefix = 'http://dev.alliancegenome.org:8891/?url=';
    // let visualizationPrefix = 'http://localhost:8891/?url=';
    let visualizationPrefix = 'http://jbrowse.alliancegenome.org:8891/?url=';
    // let visualizationPrefix = 'http://ec2-52-43-125-139.us-west-2.compute.amazonaws.com:8891/?url=';

    let delay = 10000;
    let visualizationSuffix = '&format=PNG&delay=' + delay + '&width=800&height=1000&zoom=1&quality=0.7&cors=true';
    // location based data
    let locationString = this.props.chromosome + ':' + this.props.fmin + '..' + this.props.fmax;
    let uniqueLocation = encodeURI(this.props.species) + '&loc=' + encodeURI(locationString);

    let geneSymbolUrl = '&lookupSymbol=' + this.props.geneSymbol;
    let externalJbrowseUrl = externalPrefix + uniqueLocation + '&tracks=All%20Genes&highlight=' + geneSymbolUrl;

    // TODO: move EVERYTHING to the externalJBrowseUrl
    let visualizationUrl = visualizationPrefix + encodeURIComponent(externalJbrowseUrl) + visualizationSuffix;

    return (
      <div id='genomeViewer'>
        <div className='row'>
          <div className='col-sm-8'>
              <dl className='row'>
                <dt className='col-sm-3'>Genome Location</dt>
                <dd className='col-sm-9'><a href={externalJbrowseUrl.replace('overview.html', 'index.html')} rel='noopener noreferrer' target='_blank'> Chr{this.props.chromosome}:{this.props.fmin}...{this.props.fmax} {this.props.assembly} {this.props.strand} </a></dd>
              </dl>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <a href={externalJbrowseUrl.replace('overview.html', 'index.html')} rel='noopener noreferrer' target='_blank' title='Browse Genome'>
              <img
                onError={this.handleImageErrored.bind(this)}
                onLoad={this.handleImageLoaded.bind(this)}
                src={visualizationUrl}
              />
            </a>
          </div>
        </div>
        {this.state.imageStatus === 'loading'
          ? <div>Loading ... <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' /></div>
          : ''
        }
      </div>
    );
  }


}

TranscriptViewer.propTypes = {
  assembly: React.PropTypes.string,
  chromosome: React.PropTypes.string,
  fmax: React.PropTypes.number,
  fmin: React.PropTypes.number,
  geneSymbol: React.PropTypes.string.isRequired,
  species: React.PropTypes.string.isRequired,
  strand: React.PropTypes.string,
};

export default TranscriptViewer;
