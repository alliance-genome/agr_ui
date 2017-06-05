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

    let styles = {
      makeSpace: {
        display: 'block',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '15px'
      },
      buttonSpace: {
        marginLeft: '15px'
      }
    };

    return (
      <div id='genomeViewer'>
        <div className='row' style={styles.makeSpace}>
          <a className='btn btn-secondary btn-sm col-md-1' href={externalJbrowseUrl.replace('overview.html', 'index.html')} >Browse <i className='fa fa-search' /></a>
          {/*<a className='btn btn-secondary btn-sm' href={externalJbrowseUrl} style={styles.buttonSpace}>Snapshot <i className='fa fa-camera' /> </a>*/}
        </div>
        <div className='row' style={styles.makeSpace}>
          <a href={externalJbrowseUrl.replace('overview.html', 'index.html')} rel='noopener noreferrer' target='_blank' title='Browse Genome'>
            <img
              onError={this.handleImageErrored.bind(this)}
              onLoad={this.handleImageLoaded.bind(this)}
              src={visualizationUrl}
            />
          </a>
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
  chromosome: React.PropTypes.string,
  fmax: React.PropTypes.number,
  fmin: React.PropTypes.number,
  geneSymbol: React.PropTypes.string.isRequired,
  species: React.PropTypes.string.isRequired,
};

export default TranscriptViewer;

