"use strict";

import 'babel-polyfill';
import Drawer from "./Drawer";
import * as d3 from "d3";
import {createLegendBox} from "./services/LegenedService";
import {setHighlights} from './RenderFunctions';

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

    constructor(config, svg_target, width, height) {
        this.tracks = [];
        this.locale = "";
        this.config = {};
        this.svg_target = svg_target;
        this._checkConfig(config);
        this._extendD3();
        this.height = height;
        this.width = width;

        this.viewer = this._initViewer(svg_target);
        this.drawer = new Drawer(this);
        this.drawer.draw();
    }

    generateLegend(){
        return createLegendBox();
    }

    closeModal(){
      const elements = document.getElementsByClassName('gfc-tooltip');
      for( let tooltipDiv of elements){
        tooltipDiv.style.visibility = 'hidden';
      }
    }


    setSelectedAlleles(selectedAlleles,target){
      //remove highlights first
      let svgTarget=d3.select(target);
      let viewer_height= svgTarget.attr('height')-22.5;
      svgTarget.selectAll(".highlight").remove();
      svgTarget.selectAll(".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins")
        .filter(function(d){
          return d.selected;
        })
        .style("stroke" , null)
        .datum(function(d){
          d.selected="false";
          return d;
        });

        setHighlights(selectedAlleles,svgTarget);
    }


    // Check configuration files
    _checkConfig(config) {
        // Ensure we have config type
        // TODO: Make sure we have top label information
        let locale = config["locale"];
        if (locale !== "global" && locale !== "local") {
            throw new Error("No locale found in config. Must be 'global' or 'local'");
        }
        // Ensure we have tracks
        let tracks = config["tracks"];
        if (!tracks || tracks.length === 0) {
            throw new Error("No tracks found. Must be an array of tracks.");
        }

        this._setProperties(config);
    }

    // Create an extension on our d3
    _extendD3(){
        d3.selection.prototype.first = function() {
            return d3.select(
                this.nodes()[0]
            );
        };
        d3.selection.prototype.last = function() {
            return d3.select(
                this.nodes()[this.size() - 1]
            );
        };
    }

    // Set our properties since we know config is valid
    _setProperties(config) {
        this.config = config;
        // console.log('setting config',this.config)
        this.tracks = config["tracks"];
        this.locale = config["locale"];
    }

    // Creating our drawing space.
    _initViewer(svg_target) {
        // console.log("[GFCLog] Initializing for " + svg_target);
        d3.select(svg_target).selectAll("*").remove();
        let viewer = d3.select(svg_target);
        let svgClass = svg_target.replace("#", '');
        let mainViewClass = svgClass + " main-view";

        if (this.locale === "global") {
            let margin = {top: 8, right: 30, bottom: 30, left: 40};
            viewer.attr('width', this.width)
                .attr("height", this.height)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr("class", mainViewClass);
            this.width = this.width - margin.left - margin.right;
            this.height = this.height - margin.top - margin.bottom;

        } else {
            // Different margins for a local view. (Maybe we can make these match at some point)
            let margin = {top: 10, bottom: 10};
            viewer.attr('width', this.width)
                .attr('height', this.height)
                .append('g')
                .attr('class', mainViewClass);
            this.height = this.height - margin.top - margin.bottom;
        }
        let mainViewTarget = svg_target + " .main-view";
        return d3.select(mainViewTarget);
    }

    /*
     Methods to interact with viewer.
    */
    getTracks(defaultTrack) {
        // Return all tracks if a default track
        // is not requested
        if (!defaultTrack) {
            return this.tracks;
        }
        else {
            // For now return the first track as default
            return this.tracks[0];
        }
    }

    // Set our sequence start and sequence end
    setSequence(start, end) {
        this.config["start"] = start;
        this.config["end"] = end;
    }
}

// The use of 'output.library' in webpack config provides
// the variable 'GenomeFeatureViewer' to 'window', so we don't need
// the following anymore:
// window.GenomeFeatureViewer = GenomeFeatureViewer;
