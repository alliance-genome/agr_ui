import Drawer from "./Drawer";
import * as d3 from "d3";

/*
 * Main viewer.
 * 
 * @Param config: A configuration file full of tracks & metadata
 * @Param svg_target: The id of an svg element
 * @Param height: height of svg
 * @Param width: width of svg
 * 
 *
 */
export default class GenomeFeatureViewer {

    constructor(config, svg_target , height, width)
    {
        this.tracks = [];
        this.locale = "";
        this.config = {};
        this._checkConfig(config);
        this.height = height;
        this.width = width;
        this.viewer = this._initViewer(svg_target);
        this.drawer = new Drawer(this);
        this.drawer.draw();
    }
    
    // Check configuration files
    _checkConfig(config)
    {
        // Ensure we have config type
        // TODO: Make sure we have top label information
        let locale = config["locale"];
        if(locale != "global" && locale != "local"){
            throw new Error("No locale found in config. Must be 'global' or 'local'");
        }
        // Ensure we have tracks
        let tracks = config["tracks"];
        if(!tracks || tracks.length == 0){
            throw new Error("No tracks found. Must be an array of tracks.");
        }

        this._setProperties(config);
    }
    // Set our properties since we know config is valid
    _setProperties(config)
    {
        this.config = config;
        this.tracks = config["tracks"];
        this.locale = config["locale"];
    }

    // Init our viewer
    _initViewer(svg_target)
    {
        console.log("[GFCLog] Initializing for " + svg_target);
        let margin = {top: 10, right: 10, bottom: 10, left: 10};
        let labelOffset = 150;
        let translateX = margin.left;
        this.width = this.width - margin.left - margin.right;
        this.height = this.height - margin.top - margin.bottom;
        // We want labels to the left on the local view.
        if(this.locale == "local"){
            translateX = translateX + labelOffset;
        }
        d3.select(svg_target).selectAll("*").remove();
        var viewer = d3.select(svg_target)
            .attr('width', this.width + margin.left + margin.right)
            .attr('height', this.height + margin.top + margin.bottom)
            .append('g')
            .attr('class', "main-view")
            .attr('transform', 'translate(' + translateX + ',' + margin.top + ')');
        // The ".main-view" we want it to be offset for the label.
        if(this.locale == "local"){
            this.width = this.width - labelOffset;
        }
        return viewer;
    }

    /*
    *
    * Methods for utility
    * 
    */

    getTracks(defaultTrack)
    {
        // Return all tracks if a default track
        // is not requested
        if(!defaultTrack)
        {
            return this.tracks;
        }
        else
        { 
            // For now return the first track as default
            return this.tracks[0];
        }
    }
}