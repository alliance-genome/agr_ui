import * as d3 from "d3";
import { ApolloService } from '../services/services';

export default class ReferenceLabel { 

    constructor(viewer, track, height, width){
        this.refSeq = "";
        this.viewer = viewer;
        this.width = width;
        this.height = height;
        this.track = track;
    }

    DrawTrack()
    {
        let viewer = this.viewer;
        let data = this.refSeq;
        let width = this.width;
         let tickSize = 8

        // Our range should scale with the length of our sequence so we always have the same amount of 
        // nucleotides in our view
        // Must take into account the width of the viewer, tick-size, number of nucleotides
        //let range = this._getRange(data.length, tickSize, width)
        //let range = this._getRange(data.length, width);
        let x = d3.scaleLinear().domain([this.track["start"], this.track["end"] + 1])
        .range([100, width]);

        // Represent our sequence in integers on an x-axis
        let xAxis = d3.axisBottom(x).tickValues( this._getRefTick(this.track["start"] + 1, this.track["end"]) )
        .tickFormat(function(d,i){ return data[i] }).tickSize(8).tickSizeInner(8).tickPadding(6);

        viewer.append('g')
            .attr('class', 'axis x-local-axis track')
            .attr('width', width)
            .attr('transform', 'translate(0, 10)')
            .call(xAxis);
            
    }

    /*
        Method that takes start and end and
        creates array of in between values
        that represents our nucleotides
    */
    _getRefTick(start, end){
        let arr = Array(end  - start + 1).fill().map((_, idx) => start + idx)
        return arr;
    }

    /*
        Method to always have our range show the same amount of nucleotides in our view
        NOT FOR USE.
    */
    _getRange(sequenceLength, viewerWidth){
        let desiredScaling = 15.43;
        viewerWidth = viewerWidth - 100

        let spacing =  (viewerWidth / sequenceLength);
        let neededWidth = desiredScaling * (sequenceLength);
        let numTicks  = Math.floor((860 / spacing) + 1);

        console.log("Current scale: " + spacing + " ****** Number of ticks" + numTicks + " ****  Current Width: " + viewerWidth )
        console.log("Width needed to achieve same scale with 50 less nucelotides:" + neededWidth)
        
        return [-643, viewerWidth]
    }


    /* Method to get reference label */
    async getTrackData()
    {
        let track = this.track;
        let apolloService = new ApolloService();
        try{
            this.refSeq = await apolloService.GetLocalSequence("", track["chromosome"], track["start"], track["end"]);
        }catch(err){
            console.error(err);
        }
    }
}