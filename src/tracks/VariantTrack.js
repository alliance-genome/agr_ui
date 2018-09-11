import * as d3 from "d3";
import { ApolloService } from '../services/services';

export default class VariantTrack { 

    constructor(viewer, track, height, width){
        this.variants = [];
        this.viewer = viewer;
        this.width = width;
        this.height = height;
        this.track = track;
    }

    DrawTrack()
    {
        /*
            Between tracks should be 10px of padding no matter what the size of the track is.
        */
        let viewer = this.viewer;
        let variants = this.variants;
        let width = this.width;
        let x = d3.scaleLinear()
        .domain([this.track["start"], this.track["end"] + 1])
        .range([0, width]);
        let triangle = d3.symbol().type(d3.symbolDiamond).size(20);

        // Calculate the height and spacing for each track.
        // Get the total height of where we are.
        // draw new variant track
        let nodes = d3.selectAll(".track").nodes();
        let usedHeight = 0;
        var numTracks = 0; //Number of tracks including axis
        nodes.forEach(node => {
                usedHeight += node.getBoundingClientRect().height + 10;
                numTracks++;
        })
        let newTrackPosition = usedHeight;

        let track = viewer.append("g").attr('transform', 'translate(0,' + newTrackPosition + ')').attr("class", "track");
        track.append("rect").attr("height", 20).attr("width", width).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)")
        .attr("stroke-width", 0).attr("stroke-opacity", 0);

        track.selectAll("path").data(variants).enter().append("path")
            .attr("d", triangle)
            .attr("class", "case-variant")
            .attr("stroke", "red")
            .attr("fill", "red")
            .attr("transform", function(d) {
                return "translate(" + x(d.position) + "," + 10 + ")";
            });
        
        // Track Label Boxes 
        let trackLabel = viewer.append("g").attr('transform', 'translate(-125,' + newTrackPosition + ')')
        .attr("class", "track-label");
        trackLabel.append("rect").attr("height", 20).attr("width", 90).attr("fill", "#609C9C").attr("fill-opacity",0.6);
        trackLabel.append("text").attr("font-family", "Courier New").text(this.track["label"]).attr("y", 12).attr("x",2);
        trackLabel.append("rect").attr("height", 5).attr("width", 35).attr("x", 90).attr("y", 8).attr("fill","#609C9C")
        .attr("fill-opacity",0.6);
        
    }

    /* Method to get reference label */
    async getTrackData()
    {
        let apolloService = new ApolloService()
        this.variants =  await apolloService.GetFakeVariants();
    }
}