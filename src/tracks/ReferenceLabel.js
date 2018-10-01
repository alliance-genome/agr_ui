import * as d3 from "d3";
import { ApolloService } from '../services/services';


/*
    The reference sequence label track.
*/
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