import DrawGenomeView from "./DrawViewer";
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
        this._checkConfig(config);
        this.height = height;
        this.width = width;
        this.viewer = this._initViewer(svg_target);
        
        DrawGenomeView(this);
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
        this.tracks = config["tracks"];
        this.locale = config["locale"];
    }

    // Init our viewer
    _initViewer(svg_target)
    {
        console.log("[GFCLog] Initializing for " + svg_target);
        let margin = {top: 8, right: 30, bottom: 30, left: 40};

        this.width = this.width - margin.left - margin.right;
        this.height = this.height - margin.top - margin.bottom;

        d3.select(svg_target).selectAll("*").remove();
        var viewer = d3.select(svg_target)
            .attr('width', this.width + margin.left + margin.right)
            .attr('height', this.height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
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