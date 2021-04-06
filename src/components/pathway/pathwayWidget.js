/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HorizontalScroll from '../horizontalScroll';

import { STRINGENCY_HIGH } from '../orthology/constants';
import ControlsContainer from '../controlsContainer';
import OrthologPicker from '../OrthologPicker';
import { getOrthologId } from '../orthology';
import fetchData from '../../lib/fetchData';

import LoadingSpinner from '../loadingSpinner';

import { withRouter } from 'react-router-dom';

import NoData from '../noData';


const REACTOME_API_REACTIONS = "https://reactome.org/ContentService/exporter/reaction/";



class PathwayWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,               // if any of the data is still loading
      error: false,                // if any error occured while loading the data or widget
      stringency: STRINGENCY_HIGH,
      uniprot : { loaded : false, error : false, id : undefined },
      reactomePathways: { loaded : false, error : false, selected : undefined, pathways: undefined },
      reactomeReactions: { loaded : false, error : false, selected : undefined, src: undefined, reactions: undefined },
      selectedTab: "ReactomePathway"
    };

    this.pathwayChanged.bind(this);
    this.reactionChanged.bind(this);
  }




  /**
   * Just before the component is mounted
   */
  componentWillMount() {

    console.log("Current gene id: ", this.props.geneId);
    let uniprot = this.getUniProtID(this.props.geneId);
    console.log("Current uniprot: ", uniprot);

    uniprot.then(data => {
      console.log("Uniprot data received : ", data);

      // an error occured
      if(!data.hasOwnProperty("hits") || data.hits.length == 0 || !data.hits[0].hasOwnProperty("uniprot") || !data.hits[0].uniprot.hasOwnProperty("Swiss-Prot") ) {
        this.setState({ uniprot : { loaded : true, error : true, id : undefined } });

      // uniprot id retrieved
      } else {
        this.setState({ uniprot : { loaded : true, error : false, id : data.hits[0].uniprot["Swiss-Prot"] } });

        this.loadPathwayList();
        this.loadReactionList();
      }

    }).catch(err => {
      console.error(err);
      this.setState({ uniprot : { loaded : true, error : true, id : undefined } });
    })
  }


  /**
   * Dynamically load the reactome library the first time the component is mount
   * Note: has some issue - current favor method is just to add script to public/index.html for now
   */
  loadReactomeLibrary() {
    const script = document.createElement("script");
    script.src = "https://reactome.org/DiagramJs/diagram/diagram.nocache.js";
    script.async = true;
    script.onload = () => {
      console.log("script loaded !!!!!",  Reactome);
      this.reactomePathwayDiagram = Reactome.Diagram.create({
        "placeHolder": "reactomePathwayHolder",
        "width": 1280,
        "height": 500
      })
      this.setState({loading: false});
      console.log("LOADED REACTOME: " , this.state);    

      if(this.state.reactomePathways.selected && this.reactomePathwayDiagram) {
        this.reactomePathwayDiagram.loadDiagram(this.state.reactomePathways.selected);
      }
    }
    document.body.appendChild(script);
  }

  loadPathwayList() {
    let reactomePathways = this.getReactomePathways(this.state.uniprot.id);
    reactomePathways.then(pathwaysData => {
      this.setState({ reactomePathways: { loaded : true, error : false, selected : pathwaysData.length > 0 ? pathwaysData[0].stId : undefined, pathways: pathwaysData }}, () => {
        if(this.state.reactomePathways.selected && this.reactomePathwayDiagram) {
          this.reactomePathwayDiagram.loadDiagram(this.state.reactomePathways.selected);
        }
      });
    }).catch(pathwayError => {
      console.error(pathwayError);
      this.setState({ reactomePathways: { loaded : true, error : true, selected : undefined, pathways: undefined }})
    });
  }

  loadReactionList() {
    let reactomeReactions = this.getReactomeReactions(this.state.uniprot.id);
    reactomeReactions.then(reactionsData => {
      if(reactionsData.length > 0) {
        this.setState({ reactomeReactions: { loaded : true, error : false, selected : reactionsData[0].stId, src: REACTOME_API_REACTIONS + reactionsData[0].stId + ".svg", reactions: reactionsData }})
      } else {
        this.setState({ reactomeReactions: { loaded : true, error : false, selected : undefined, src: undefined, reactions: reactionsData }})
      }
    }).catch(reactionError => {
      console.error(reactionError);
      this.setState({ reactomeReactions: { loaded : true, error : true, selected : undefined, src: undefined, reactions: undefined }})
    });
  }

  componentDidMount() {    
    // this.loadReactomeLibrary();

      this.reactomePathwayDiagram = Reactome.Diagram.create({
        "placeHolder": "reactomePathwayHolder",
        "width": 1280,
        "height": 600
      })
      this.setState({loading: false});
      console.log("LOADED REACTOME: " , this.state);    

      if(this.state.reactomePathways.selected && this.reactomePathwayDiagram) {
        this.reactomePathwayDiagram.loadDiagram(this.state.reactomePathways.selected);
      }
  }


  /**
   * This mapping is using once again mygene.info
   * This could result in some unmapped ID, like for the ribbon, but this is our best bet at the moment
   * @param {*} modID 
   */
  getUniProtID(modID) {
    let query = "http://mygene.info/v3/query?q=" + modID + "&fields=uniprot";
    return fetchData(query);
  }

  /**
   * For a given uniprot ID, returns the list of reactome pathways
   * @param {*} uniProtID 
   */
  getReactomePathways(uniProtID) {
    let query = "https://reactome.org/ContentService/data/mapping/UniProt/" + uniProtID + "/pathways"
    return fetchData(query);
  }

  /**
   * For a given uniprot ID, returns the list of reactome reactions
   * @param {*} uniProtID 
   */
  getReactomeReactions(uniProtID) {
    let query = "https://reactome.org/ContentService/data/mapping/UniProt/" + uniProtID + "/reactions"
    return fetchData(query);
  }





  /**
   * Called whenever the pathway changes (occurs after a user changes the selected reaction item)
   * @param {*} event 
   */
  pathwayChanged(event) {
    console.log("pathway changed: ", event , event.target.value);
    let item = {...this.state.reactomePathways, selected : event.target.value};
    this.setState({ reactomePathways: item }, () => {
      console.log("selected pathway: ", this.state.reactomePathways);
      this.reactomePathwayDiagram.loadDiagram(this.state.reactomePathways.selected);
    })
  }

  /**
   * Called whenever the reaction changes (occurs after a user changes the selected reaction item)
   * @param {*} event 
   */
  reactionChanged(event) {
    console.log("reaction changed: ", event , event.target.value);
    let item = {...this.state.reactomeReactions, selected : event.target.value, src: REACTOME_API_REACTIONS + event.target.value + ".svg"};
    this.setState({ reactomeReactions: item}, () => {
      console.log("selected reaction: ", this.state.reactomeReactions);     
    })
  }

  

  
  /**
   * Main rendering method
   */
  render() {
    if(this.state.reactomePathways.loaded && !this.state.reactomePathways.error) {
      console.log("render state: ", this.state);
    }

    
    let rpstyles = (this.state.selectedTab && this.state.selectedTab == "ReactomePathway") ? { } : { "display": "none" }
    let rrstyles = (this.state.selectedTab && this.state.selectedTab == "ReactomeReactions") ? { } : { "display": "none" }

    

    return (
      <div>
        {/* {this.state.loading ? <LoadingSpinner /> : ""} */}

        <nav>
          <div className="nav nav-tabs">
            <button className={(this.state.selectedTab == "ReactomePathway") ? "nav-link active" : "nav-link"} aria-selected="true" onClick={() => this.selectReactomePathway()}>Reactome Pathway ({this.state.reactomePathways.pathways ? this.state.reactomePathways.pathways.length : ""})</button>
            <button className={(this.state.selectedTab == "ReactomeReactions") ? "nav-link active" : "nav-link"} aria-selected="true" onClick={() => this.selectReactomeReaction()}>Reactome Reactions ({this.state.reactomeReactions.reactions ? this.state.reactomeReactions.reactions.length : ""})</button>
            <button disabled className={(this.state.selectedTab == "MODPathways") ? "nav-link active" : "nav-link"} aria-selected="true" onClick={() => this.selectMODPathway()}>GO-CAMs ()</button>
          </div>
        </nav>

        <div>
          { (this.state.selectedTab && this.state.selectedTab == "ReactomePathway") ? this.renderReactomePathway() : "" }
          <div id="reactomePathwayHolder" style={rpstyles}></div>
          { (this.state.selectedTab && this.state.selectedTab == "ReactomeReactions") ? this.renderReactomeReaction() : "" }
          <img id="reactomeReactionHolder" style={rrstyles} src={this.state.reactomeReactions.src}/> 
          { (this.state.selectedTab && this.state.selectedTab == "MODPathways") ? this.renderMODPathway() : "" }
        </div>
        
      </div>
    );
  }

  selectReactomePathway() {
    this.setState({ selectedTab: "ReactomePathway" });
  }

  selectReactomeReaction() {
    this.setState({ selectedTab: "ReactomeReactions" })
  }

  selectMODPathway() {
    this.setState({ selectedTab: "MODPathways" })
  }


  renderReactomePathway() {
    return (
      <div id="reactomePathway">
        {(this.state.reactomePathways.loaded && !this.state.reactomePathways.error) ?
          <div style={{ "padding": "1rem 0.2rem" }}>
            <span style={{ "paddingRight": "1rem"}}>Available pathways: </span>
            <select id="pathwaySelect" value={this.state.reactomePathways.selected} onChange={(evt) => this.pathwayChanged(evt) } style={{ "minWidth": "1130px" }}>
              {this.state.reactomePathways.pathways.map(elt => {
                return <option value={elt.stId}>{elt.displayName}</option>
              })}
            </select>
          </div>
        : "" }

    </div>
    )
  }

  renderReactomeReaction() {
    return (
      <div id="reactomeReaction">
        {(this.state.reactomeReactions.loaded && !this.state.reactomeReactions.error) ?
          <div style={{ "padding": "1rem 0.2rem" }}>
            <span style={{ "paddingRight": "1rem"}}>Available reactions: </span>
            <select id="reactionSelect" value={this.state.reactomeReactions.selected} onChange={(evt) => this.reactionChanged(evt) } style={{ "minWidth": "1120px" }}>
                {this.state.reactomeReactions.reactions.map(elt => {
                  return <option value={elt.stId}>{elt.displayName}</option>
                })}
              </select>
          </div>
          : "" }

      </div>
    )
  }

  renderMODPathway() {
    return (      
      <div id="modPathway">
          <div style={{ "padding": "1rem 0.2rem" }}>
            <span style={{ "paddingRight": "1rem"}}>Available GO-CAMs: </span>
            <select id="modPathwaySelect" value="" onChange={(evt) => "" } style={{ "minWidth": "1113px" }}>
              {/* // TODO */}
            </select>
          </div>
            <wc-gocam-viz 
              id="gocam-1"
              repository="prod"
              gocam-id="gomodel:568b0f9600000284"
              show-go-cam-selector="false"
              show-has-input="false"
              show-has-output="false"
              show-gene-product="true"
              show-activity="false"
              show-isolated-activity="true"
            ></wc-gocam-viz>
      </div>
    )
  }


}

PathwayWidget.propTypes = {
  geneId: PropTypes.string.isRequired,
  geneSpecies: PropTypes.object,
  geneSymbol: PropTypes.string,
  history: PropTypes.object,
};

export default withRouter(PathwayWidget);
