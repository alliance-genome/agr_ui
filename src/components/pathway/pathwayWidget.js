/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HorizontalScroll from '../horizontalScroll';

import { STRINGENCY_HIGH } from '../orthology/constants';
import fetchData from '../../lib/fetchData';

import { withRouter } from 'react-router-dom';

import NoData from '../noData';

import * as cutils from "@geneontology/curie-util-es5";
import ExternalLink from '../ExternalLink';

import gocamLegend from './pathwayLegend.png';

const GO_CONTEXT_LD = "https://raw.githubusercontent.com/prefixcommons/biocontext/master/registry/go_context.jsonld"
const REACTOME_PATHWAY_BROWSER = "https://reactome.org/PathwayBrowser/#/";
const REACTOME_REACTION_BROWSER = "https://reactome.org/content/detail/";
const REACTOME_API_REACTIONS = "https://reactome.org/ContentService/exporter/reaction/";
const ALLIANCE_API_HOMOLOGOUS = "https://www.alliancegenome.org/api/homologs/geneMap?filter.stringency=stringent&geneIdList="


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
      selectedTab: "ReactomePathway",
      cutils : undefined,
      gocams: {
        loaded : undefined,
        list : undefined,
        selected : undefined
      }
    };

    this.pathwayChanged.bind(this);
    this.reactionChanged.bind(this);
  }



  /**
   * Just before the component is mounted
   */
  componentWillMount() {

    this.loadPathwayList();
    this.loadReactionList();
    this.loadGOCAMList();

    // console.log("Current gene id: ", this.props.geneId);
    // let uniprot = this.getUniProtID(this.props.geneId);
    // console.log("Current uniprot: ", uniprot);

    // uniprot.then(data => {
    //   console.log("Uniprot data received : ", data);

    //   // an error occured
    //   if(!data.hasOwnProperty("hits") || data.hits.length == 0 || !data.hits[0].hasOwnProperty("uniprot") || !data.hits[0].uniprot.hasOwnProperty("Swiss-Prot") ) {
    //     this.setState({ uniprot : { loaded : true, error : true, id : undefined } });
    //     this.loadPathwayList();

    //   // uniprot id retrieved
    //   } else {
    //     this.setState({ uniprot : { loaded : true, error : false, id : data.hits[0].uniprot["Swiss-Prot"] } });

    //     this.loadPathwayList();
    //     this.loadReactionList();
    //   }

    // }).catch(err => {
    //   console.error(err);
    //   this.setState({ uniprot : { loaded : true, error : true, id : undefined } });
    // })
  }

  /**
   * Dynamically load the reactome library the first time the component is mount
   * Note: has some issue - current favor method is just to add script to public/index.html for now
   */
  // loadReactomeLibrary() {
  //   const script = document.createElement("script");
  //   script.src = "https://reactome.org/DiagramJs/diagram/diagram.nocache.js";
  //   script.async = true;
  //   script.onload = () => {
  //     console.log("script loaded !!!!!",  Reactome);
  //     this.reactomePathwayDiagram = Reactome.Diagram.create({
  //       "placeHolder": "reactomePathwayHolder",
  //       "width": 1280,
  //       "height": 500
  //     })
  //     this.setState({loading: false});
  //     console.log("LOADED REACTOME: " , this.state);    

  //     if(this.state.reactomePathways.selected && this.reactomePathwayDiagram) {
  //       this.reactomePathwayDiagram.loadDiagram(this.state.reactomePathways.selected);
  //     }
  //   }
  //   document.body.appendChild(script);
  // }

  loadPathwayList() {
    let dbname = this.props.geneId.split(":")[0];
    let dbid = this.props.geneId.split(":")[1];

    // let reactomePathways = this.getReactomePathways(this.state.uniprot.id);
    let reactomePathways = this.getReactomePathways(dbname, dbid);
    reactomePathways.then(pathwaysData => {
      // console.log("load pathway list: ", pathwaysData);
      this.setState({ reactomePathways: { loaded : true, error : false, selected : pathwaysData.length > 0 ? pathwaysData[0].stId : undefined, pathways: pathwaysData }}, () => {
        if(this.state.reactomePathways.selected) {
          this.loadReactomeDiagram(this.state.reactomePathways.selected);
        }
      });
    }).catch(pathwayError => {
      console.log("Couldn't retrieve reactome pathways for ", this.props.geneId);
      this.setState({ reactomePathways: { loaded : true, error : true, selected : undefined, pathways: undefined }})
    });

  }

  loadReactionList() {
    let dbname = this.props.geneId.split(":")[0];
    let dbid = this.props.geneId.split(":")[1];

    // let reactomeReactions = this.getReactomeReactions(this.state.uniprot.id);
    let reactomeReactions = this.getReactomeReactions(dbname, dbid);
    reactomeReactions.then(reactionsData => {
      if(reactionsData.length > 0) {
        this.setState({ reactomeReactions: { loaded : true, error : false, selected : reactionsData[0].stId, src: REACTOME_API_REACTIONS + reactionsData[0].stId + ".svg", reactions: reactionsData }})
      } else {
        this.setState({ reactomeReactions: { loaded : true, error : false, selected : undefined, src: undefined, reactions: reactionsData }})
      }
    }).catch(reactionError => {
      console.log("Couldn't retrieve reactome reactions for ", this.props.geneId);
      this.setState({ reactomeReactions: { loaded : true, error : true, selected : undefined, src: undefined, reactions: undefined }})
    });
  }

  /**
   * This step is required as gene identifiers in GO/GO-CAM are IRIs
   * MOD ID (CURIEs) have to be converted into IRIs using the CurieUtil package
   * From that, it becomes possible to retrieve the GO-CAMs associated through the GO-CAM API
   */
  loadGOCAMList() {
    // console.log("cutils: init ", cutils , " with ", this.props.geneId);
    let gocontext = GO_CONTEXT_LD;
    fetch(gocontext)
    .then(data => {
      return data.json();

    }).then(data => {
      // console.log("cutils: gocontext ", data);
      let map = cutils.parseContext(data);
      let curieUtils = new cutils.CurieUtil(map);
      let iri = curieUtils.getIri(this.props.geneId);
      this.setState({ "cutils" : curieUtils})
      return iri;

    }).then(iri => {

      // This should be a temporary fix, but MGI:MGI: has been a long standing issue that need to be fixed
      // at the server level but also at the dbxrefs.yaml & equivalent e.g. http://identifiers.org/mgi/MGI:88177
      if(iri.includes("mgi") && !iri.includes("MGI:")) {
        iri = iri.replace("/mgi/", "/mgi/MGI:");
      }

      // console.log("cutils: iri ", iri);

      // new query parameter to indicate we want models with at least 2 causal MFs
      let gocams = "https://api.geneontology.xyz/gp/" + encodeURIComponent(iri) + "/models?causalmf=2"
      // console.log("GO-CAM API to list models for ", this.props.geneId , ": ",  gocams);
      fetch(gocams)
      .then(data => {
        return data.json();
      }).then(data => {
        // console.log("cutils: models found ", data);
        let list = data.map(elt => elt.gocam);
        // let item = {...this.state.gocams, list : list, selected : list[0], loaded : true };
        let item = {...this.state.gocams, list : data, selected : list[0], loaded : true };
        this.setState( { "gocams" : item } );

      }).catch(error => {
        console.error(error);
        this.setState( { "gocams" : { list : undefined, selected : undefined, loaded : true }});
      })
    })
  }


  componentDidMount() {    
    // this.loadReactomeLibrary();

    this.setState({loading: false});

    this.selectReactomePathway();
    // if(this.state.reactomePathways.selected) {
    //   this.loadReactomeDiagram(this.state.reactomePathways.selected);
    // }
  }

  /**
   * Convenience function to create pathway diagram if not existing, then load reactome pathway
   * @param {*} pathwayId a valid reactome pathway id
   */
  loadReactomeDiagram(pathwayId) {
    if(!this.reactomePathwayDiagram) {
      (async() => {
        // ensure the Reactome library has been loaded
        while(!Reactome) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        this.reactomePathwayDiagram = Reactome.Diagram.create({
          "placeHolder": "reactomePathwayHolder",
          "width": 1130,
          "height": 600
        })
        this.reactomePathwayDiagram.loadDiagram(pathwayId);
        // console.log("REACTOME PATHWAY: ", this.reactomePathwayDiagram);    
      })()
    } else {
      this.reactomePathwayDiagram.loadDiagram(pathwayId);
      console.log("REACTOME PATHWAY: ", this.reactomePathwayDiagram);
    }
  }


  /**
   * This mapping is using once again mygene.info
   * This could result in some unmapped ID, like for the ribbon, but this is our best bet at the moment
   * @param {*} modID 
   */
  getUniProtID(modID) {
    let query = "http://mygene.info/v3/query?q=" + modID + "&fields=uniprot";
    // console.log("Get Uniprot ID: ", query);
    return fetchData(query);
  }

  /**
   * For a given uniprot ID, returns the list of reactome pathways
   * @param {*} dbId 
   */
  getReactomePathways(dbName = "UniProt", dbId) {
    if(dbName == "WB") { dbName = "Wormbase"}
    if(dbName == "FB") { dbName = "Flybase" }
    let query = "https://reactome.org/ContentService/data/mapping/" + dbName + "/" + dbId + "/pathways"
    // console.log("REACTOME query: ", query);
    return fetchData(query);
  }

  /**
   * For a given uniprot ID, returns the list of reactome reactions
   * @param {*} dbId 
   */
  getReactomeReactions(dbName = "UniProt", dbId) {
    if(dbName == "WB") { dbName = "Wormbase"}
    if(dbName == "FB") { dbName = "Flybase" }
    let query = "https://reactome.org/ContentService/data/mapping/" + dbName + "/" + dbId + "/reactions"
    return fetchData(query);
  }





  /**
   * Called whenever the pathway changes (occurs after a user changes the selected reaction item)
   * @param {*} event 
   */
  pathwayChanged(event) {
    // console.log("pathway changed: ", event , event.target.value);
    let item = {...this.state.reactomePathways, selected : event.target.value};
    this.setState({ reactomePathways: item }, () => {
      // console.log("selected pathway: ", this.state.reactomePathways);
      this.loadReactomeDiagram(this.state.reactomePathways.selected);
    })
  }

  /**
   * Called whenever the reaction changes (occurs after a user changes the selected reaction item)
   * @param {*} event 
   */
  reactionChanged(event) {
    // console.log("reaction changed: ", event , event.target.value);
    let item = {...this.state.reactomeReactions, selected : event.target.value, src: REACTOME_API_REACTIONS + event.target.value + ".svg"};
    this.setState({ reactomeReactions: item}, () => {
      // console.log("selected reaction: ", this.state.reactomeReactions);     
    })
  }

  gocamChanged(event) {
    // console.log("reaction changed: ", event , event.target.value);
    let item = {...this.state.gocams, selected : event.target.value };
    this.setState({ gocams: item}, () => {
      // console.log("selected gocam: ", this.state.gocams);     
    })
  }

  
  selectReactomePathway() {
    this.setState({ selectedTab: "ReactomePathway" });
  }

  selectReactomeReaction() {
    this.setState({ selectedTab: "ReactomeReactions" })
  }

  selectMODPathway() {
    this.setState({ selectedTab: "MODPathways" });

    // The following is to handle the autofocus method on the gocam widget
    // Needs to over 3s or to click on the widget to get wheel focus
    setTimeout(() => {
      let elt = document.getElementById("gocam-1");
      if(elt) {
        elt.setAutoFocus(false);

        elt.addEventListener("click", (e) => {
          elt.setAutoFocus(true);
        })

        let isOvering = false;
        elt.addEventListener("mouseenter", (e) => {
          isOvering = true,
          setTimeout(() => {
            elt.setAutoFocus(true);
          }, 3000)
        })

        elt.addEventListener("mouseleave", (e) => {
          elt.setAutoFocus(false);
          isOvering = false;
        })
      }
    }, 5000)
  }

  isHumanGene() {
    return this.props.geneSpecies.taxonId.includes("9606");
  }

  
  /**
   * Main rendering method
   */
  render() {
    // console.log("state: ", this.state);
    // console.log("props:" , this.props);

    return (      
      <div>

        { this.renderPathwayNavigation() }

        { this.renderReactomePathway() }
        { this.renderReactomeReaction() }
        { this.renderMODPathway() }
        
      </div>
    );
  }

  renderPathwayNavigation() {
    return (
      <nav>
      <div className="nav nav-tabs">
        <button className={(this.state.selectedTab == "ReactomePathway") ? "nav-link active" : "nav-link"} aria-selected="true" onClick={() => this.selectReactomePathway()}>Reactome Pathway ({this.state.reactomePathways.pathways ? this.state.reactomePathways.pathways.length : "0"})</button>
        <button className={(this.state.selectedTab == "ReactomeReactions") ? "nav-link active" : "nav-link"} aria-selected="true" onClick={() => this.selectReactomeReaction()}>Reactome Reactions ({this.state.reactomeReactions.reactions ? this.state.reactomeReactions.reactions.length : "0"})</button>
        <button className={(this.state.selectedTab == "MODPathways") ? "nav-link active" : "nav-link"} aria-selected="true" onClick={() => this.selectMODPathway()}>GO-CAMs ({this.state.gocams.list ? this.state.gocams.list.length : "0"})</button>
      </div>
    </nav>      
    )
  }

  renderReactomePathway() {
    let rpstyles = (this.state.selectedTab && this.state.selectedTab == "ReactomePathway") ? { } : { "display": "none" }

    return (
      <HorizontalScroll className='text-nowrap'>
        <div id="reactomePathway" style={rpstyles}>
            {(this.state.reactomePathways.loaded && !this.state.reactomePathways.error && this.state.reactomePathways.pathways && this.state.reactomePathways.pathways.length > 0) ?
            <div style={{ "padding": "1rem 0.2rem" }}>
                <span style={{ "paddingRight": "1rem"}}>Available pathways: </span>
                <select id="pathwaySelect" value={this.state.reactomePathways.selected} onChange={(evt) => this.pathwayChanged(evt) } style={{ "minWidth": "1130px" }}>
                {this.state.reactomePathways.pathways.map(elt => {
                    return <option value={elt.stId}>{elt.displayName}</option>
                })}
                </select>
            </div>
            : <NoData/> }

            <div id="reactomePathwayHolder" style={{ "max-width": "1280px" }}></div>
            
            {(this.state.reactomePathways.loaded && !this.state.reactomePathways.error && this.state.reactomePathways.pathways.length > 0) ?
            <div>
            <ExternalLink href={REACTOME_PATHWAY_BROWSER + this.state.reactomePathways.selected}>Open in Reactome Pathway</ExternalLink> 
            { !this.isHumanGene() ? <span style={{ "display": "inline-block", "text-align": "right", "width": "80%", "font-style": "italic" }}>Computationally inferred by Orthology</span> : "" }
            </div>
            : "" }

        </div>
      </HorizontalScroll>
    )
  }

  renderReactomeReaction() {
    let rrstyles = (this.state.selectedTab && this.state.selectedTab == "ReactomeReactions") ? { } : { "display": "none" }
    return (
      <HorizontalScroll className='text-nowrap'>
        <div id="reactomeReaction" style={rrstyles}>
            {(this.state.reactomeReactions.loaded && !this.state.reactomeReactions.error && this.state.reactomeReactions.reactions && this.state.reactomeReactions.reactions.length > 0) ?
            <div style={{ "padding": "1rem 0.2rem" }}>
                <span style={{ "paddingRight": "1rem"}}>Available reactions: </span>
                <select id="reactionSelect" value={this.state.reactomeReactions.selected} onChange={(evt) => this.reactionChanged(evt) } style={{ "minWidth": "1130px" }}>
                    {this.state.reactomeReactions.reactions.map(elt => {
                    return <option value={elt.stId}>{elt.displayName}</option>
                    })}
                </select>
            </div>
            : <NoData/> }

            <img id="reactomeReactionHolder" src={this.state.reactomeReactions.src} style={{ "max-width": "1305px" }}/>

            {(this.state.reactomeReactions.loaded && this.state.reactomeReactions.reactions && this.state.reactomeReactions.reactions.length > 0)  ?
            <div>
            <ExternalLink href={REACTOME_REACTION_BROWSER + this.state.reactomeReactions.selected}>Open in Reactome Reaction</ExternalLink>
            { !this.isHumanGene() ? <span style={{ "display": "inline-block", "text-align": "right", "width": "80%", "font-style": "italic" }}>Computationally inferred by Orthology</span> : "" }
            </div>
            : "" }

        </div>
      </HorizontalScroll>
    )
  }

  renderMODPathway() {
    let gocstyles = (this.state.selectedTab && this.state.selectedTab == "MODPathways") ? { } : { "display": "none" }
    return (      
      <HorizontalScroll className='text-nowrap'>
        <div id="modPathway" style={gocstyles}>

            {(this.state.gocams.loaded && this.state.gocams.list && this.state.gocams.list.length > 0) ?
                <div style={{ "padding": "1rem 0.2rem" }}>
                <span style={{ "paddingRight": "1rem"}}>Available GO-CAMs: </span>
                <select id="modPathwaySelect" value={this.state.gocams.selected} onChange={(evt) => this.gocamChanged(evt) } style={{ "minWidth": "1130px" }}>
                    {this.state.gocams.list.map(elt => {
                        return <option value={elt.gocam}>{elt.title}</option>
                    })}
                </select>
                </div>        
            : ""}

            {(this.state.gocams.loaded && this.state.gocams.list && this.state.gocams.list.length > 0 && (this.state.selectedTab && this.state.selectedTab == "MODPathways")) ?  
            <div>
                <wc-gocam-viz 
                    id="gocam-1"
                    repository="prod"
                    gocam-id={this.state.cutils.getCurie(this.state.gocams.selected)}
                    show-go-cam-selector="false"
                    show-has-input="false"
                    show-has-output="false"
                    show-gene-product="true"
                    show-activity="false"
                    show-isolated-activity="true"
                    show-legend="false"
                    style={{ "max-width": "1280px" }}
                ></wc-gocam-viz>
                <img src={gocamLegend} style={{"width" : "600px"}}/>
                </div>
                : <div>
                    <NoData/>
                    <br/><br/>
                    <p>Read more about the <ExternalLink href='http://geneontology.org/docs/gocam-overview/'>GO-CAM Data Model</ExternalLink>.</p>
                </div>
                }

            {(this.state.gocams.loaded && this.state.gocams.list && this.state.gocams.list.length > 0)  ?
            <ExternalLink href={this.state.gocams.selected}>Open in Noctua GO-CAM</ExternalLink> : "" }
        </div>
      </HorizontalScroll>
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
