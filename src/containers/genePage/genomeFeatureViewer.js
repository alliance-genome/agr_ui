/*eslint-disable react/no-set-state */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import GenomeFeatureComponent from 'genomefeaturecomponent';


class GenomeFeatureViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  // handleImageErrored() {
  //   this.setState({imageStatus: 'Error loading transcript preview.'});
  // }
  //
  // handleImageLoaded() {
  //   this.setState({imageStatus: ''});
  // }

  componentDidMount() {
    this.loadData();
    // this.props.dispatch(fetchGene(this.props.params.geneId));
  }

  componentDidUpdate() {
    // if (this.props.params.geneId !== prevProps.params.geneId) {
    //   this.props.dispatch(fetchGene(this.props.params.geneId));
    // }
  }

  loadData() {
    this.setState({isLoading: true});

    fetch(this.dataUrl)
      .then((response) => {
        response.json().then(data => {
          this.setState({
            isLoading: false
            , loadedData: data
          });
          return data;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // let externalPrefix = 'http://bw.scottcain.net/jbrowse/?data=data%2F';
    // let externalPrefix = 'http://ec2-34-208-22-23.us-west-2.compute.amazonaws.com/jbrowse/overview.html?data=data%2F';
    // let externalPrefix = 'http://localhost/jbrowse/overview.html?data=data%2F';
    // let externalPrefix = 'http://jbrowse.alliancegenome.org/jbrowse/overview.html?data=data%2F';

    // jbrowseUrl = "http://demo.genomearchitect.org/Apollo-staging/Honeybee/jbrowse/index.html?loc=Group1.1:329115..330633&tracks=Official%20Gene%20Set%20v3.2";
    // dataUrl = "http://demo.genomearchitect.org/Apollo-staging/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1/GB42168-RA.json";

    let defaultTrackName = 'All Genes';
    let locationString = this.props.chromosome + ':' + this.props.fmin + '..' + this.props.fmax;
    // let serverPrefix = 'http://demo.genomearchitect.org/Apollo-staging/';
    let serverPrefix = 'http://localhost:8080/apollo/';
    let jbrowsePrefix = serverPrefix + encodeURI(this.props.species) + '/jbrowse/index.html?loc=';
    let trackDataPrefix = serverPrefix + 'track/' + encodeURI(this.props.species) + '/' + defaultTrackName + '/' + encodeURI(locationString) + '.json';
    let trackDataWithHighlight = trackDataPrefix + '&name=' + this.props.geneSymbol;


    // let externalPrefix = process.env.JBROWSE_URL + '/jbrowse/overview.html?data=data%2F';
    // let externalPrefix = 'http://ec2-52-43-125-139.us-west-2.compute.amazonaws.com/jbrowse/overview.html?data=data%2F';


    // let visualizationPrefix = 'http://ec2-34-208-22-23.us-west-2.compute.amazonaws.com:8080/?url=';
    // let visualizationPrefix = 'http://dev.alliancegenome.org:8891/?url=';
    // let visualizationPrefix = 'http://localhost:8891/?url=';
    // let visualizationPrefix = process.env.JBROWSE_URL + ':' + process.env.JBROWSE_PORT + '/?url=';
    // let visualizationPrefix = 'http://ec2-52-43-125-139.us-west-2.compute.amazonaws.com:8891/?url=';

    // let delay = 10000;
    // let visualizationSuffix = '&format=PNG&delay=' + delay + '&width=800&height=1000&zoom=1&quality=0.7&cors=true';
    // location based data
    // let uniqueLocation = encodeURI(this.props.species) + '&loc=' + encodeURI(locationString);
    // let uniqueLocation = encodeURI(this.props.species) + '&loc=' + encodeURI(locationString);

    let geneSymbolUrl = '&lookupSymbol=' + this.props.geneSymbol;
    let externalJbrowseUrl = jbrowsePrefix + '&tracks=All%20Genes&highlight=' + geneSymbolUrl;

    // TODO: move EVERYTHING to the externalJBrowseUrl
    // let visualizationUrl = visualizationPrefix + encodeURIComponent(externalJbrowseUrl) + visualizationSuffix;

    return (
      <div id='genomeViewer'>
        <div className='row'>
          <div className='col-sm-8'>
            <dl className='row'>
              <dt className='col-sm-3'>Genome Location</dt>
              <dd className='col-sm-9'><a href={externalJbrowseUrl.replace('overview.html', 'index.html')}
                                          rel='noopener noreferrer' target='_blank'>
                Chr{this.props.chromosome}:{this.props.fmin}...{this.props.fmax} {this.props.assembly} {this.props.strand} </a>
              </dd>
            </dl>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <ul>

              <li>
                <a href={trackDataWithHighlight}>{trackDataWithHighlight}</a>
              </li>
              <li>
                <a href={externalJbrowseUrl}>{externalJbrowseUrl}</a>
              </li>
              <li>
                <a href={externalJbrowseUrl.replace('overview.html', 'index.html')} rel='noopener noreferrer'
                   target='_blank' title='Browse Genome'>
                  Component Goes Here
                  {/*<img*/}
                  {/*onError={this.handleImageErrored.bind(this)}*/}
                  {/*onLoad={this.handleImageLoaded.bind(this)}*/}
                  {/*src={visualizationUrl}*/}
                  {/*/>*/}
                  {/*{this.props.state.isLoading}*/}
                  {/*<GenomeFeatureComponent data={this.props.state.loadedData}*/}
                  {/*height={this.props.data.height}*/}
                  {/*id={this.props.data.id}*/}
                  {/*width={this.props.data.width}*/}
                  {/*/>*/}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
      ;
  }


}

GenomeFeatureViewer.propTypes = {
  assembly: PropTypes.string,
  chromosome: PropTypes.string,
  fmax: PropTypes.number,
  fmin: PropTypes.number,
  geneSymbol: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  strand: PropTypes.string,
};

export default GenomeFeatureViewer;
