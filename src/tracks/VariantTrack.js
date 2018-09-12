import * as d3 from "d3"; 
import { ApolloService } from '../services/services';
import d3Tip from "d3-tip";

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
        let triangle = d3.symbol().type(d3.symbolTriangle).size(20);

        // Tooltip
        let tooltip = d3Tip();
        tooltip.attr('class', 'd3-tip').html(function(d) { 
            let tipHtml = '<p><strong>Case Variant Information</strong></p><hr><p>Position: ' + d["position"] + '</p><hr>' + '<p>Mutation: '+ d["ref"] + '>' + d["mutant"]+ '</p>';
            return tipHtml; 
        
        });
        viewer.call(tooltip);

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

        // Create our track container with a simple background
        let track = viewer.append("g").attr('transform', 'translate(0,' + newTrackPosition + ')').attr("class", "track");
        track.append("rect").attr("height", 20).attr("width", width).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)")
        .attr("stroke-width", 0).attr("stroke-opacity", 0);

        // Draw our variants
        track.selectAll("path").data(variants).enter().append("path")
            .attr("d", triangle)
            .attr("class", "case-variant")
            .attr("stroke", "red")
            .attr("fill", "red")
            .attr("transform", function(d) {
                return "translate(" + x(d.position) + "," + 10 + ")";
            }).on('click', tooltip.show).on('mouseout', tooltip.hide);
        
        // Track Label Boxes 
        // TODO: LabelOffset should be based on label size.
        let labelOffset = 75; 
        let trackLabel = viewer.append("g").attr('transform', 'translate(' + -labelOffset +',' + newTrackPosition + ')')
        .attr("class", "track-label");
        trackLabel.append("line").attr("x1", labelOffset).attr("y1", 0).attr("x2", labelOffset).attr("y2", 20).attr("stroke-width", 3)
        .attr("stroke", "#609C9C");
        trackLabel.append("text").text(this.track["label"].toUpperCase()).attr("y", 12);
        
    }

    /* Method to get reference label */
    async getTrackData()
    {
        let apolloService = new ApolloService()
        this.variants =  await apolloService.GetFakeVariants();
    }
}