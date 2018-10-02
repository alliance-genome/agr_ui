import * as d3 from "d3";
import { ApolloService } from '../services/services';


/*
    The reference sequence label track.
*/
export default class ReferenceTrack { 

    constructor(viewer, track, height, width){
        this.refSeq = "";
        this.viewer = viewer;
        this.width = width;
        this.height = height;
        this.track = track;
    }

    DrawScrollableTrack()
    {
        let viewer = this.viewer;
        let data = this.refSeq;
        let tickSize = 8

        let x = d3.scaleLinear().domain([this.track["start"], this.track["end"] + 1])
        .range(this.track["range"]);

        // Represent our sequence in integers on an x-axis
        let xAxis = d3.axisBottom(x).tickValues( this._getRefTick(this.track["start"] + 1, this.track["end"]) )
        .tickFormat(function(d,i){ return data[i] }).tickSize(8).tickSizeInner(8).tickPadding(6);

        viewer.append('g')
            .attr('class', 'axis x-local-axis track')
            .attr('width', this.track["range"][1])
            .attr('transform', 'translate(0, 10)')
            .call(xAxis);
            
    }

    DrawOverviewTrack(){
        let viewer = this.viewer;
        let view_start = this.track["start"]
        let view_end = this.track["end"];
        let width = this.width;

        let x = d3.scaleLinear()
        .domain([view_start, view_end])
        .range(this.track["range"]);
    
        let viewLength = view_end - view_start;
       // let resolution = Math.round(30 / Math.log(viewLength)) ;
        //let resolutionString = '.'+resolution + 's';
        //let tickFormat = x.tickFormat(5, resolutionString);

       

        let xAxis = d3.axisTop(x)
            .ticks(8, 's')
            .tickSize(8)
            //.tickFormat(5, resolutionString);

        viewer.append('g')
            .attr('class', 'axis track')
            .attr('width', width)
            .attr('height', 20)
            .attr('transform', 'translate(0,20)')
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