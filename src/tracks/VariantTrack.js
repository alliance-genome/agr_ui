import * as d3 from "d3";
import { ApolloService } from '../services/ApolloService';
import d3Tip from "d3-tip";
import {calculateNewTrackPosition} from '../RenderFunctions';

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
        .range(this.track["range"]);
        let triangle = d3.symbol().type(d3.symbolTriangle).size(20);

        // Tooltip configuration
        let tooltip = d3Tip();
        tooltip.attr('class', 'd3-tip').html(function(d) {
            let title = "Case Variant"
            let tipHtml =
            '<table>' +
                '<th colspan="2">' + title.toUpperCase() + '</th>' +
                '<tr><td>Position</td> <td>' +  d["position"] + '</td></tr>' +
                '<tr><td>Mutation</td> <td>' +  d["ref"] + ' > ' + d["mutant"] + '</td></tr>'
            '</table>';
            return tipHtml;

        }).offset([10,0]).direction('s');
        viewer.call(tooltip);

        /*
            Calculate the height and spacing for each track.
            Get the total height of where we are.
            draw new variant track
         */
        let trackHeight = 20;
        let newTrackPosition = calculateNewTrackPosition(this.viewer);

        // Create our track container with a simple background
        let track = viewer.append("g").attr('transform', 'translate(0,' + newTrackPosition + ')').attr("class", "track")
        track.append("rect").attr("height", trackHeight).attr("width", -(this.track["range"][0]) + this.track["range"][1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)")
        .attr("stroke-width", 0).attr("stroke-opacity", 0).attr("transform", "translate(" + this.track["range"][0] +",0)");

        // Draw our variants
        // TODO: Variant color based on type or user defined in config?
        track.selectAll("path").data(variants).enter().append("path")
            .attr("d", triangle)
            .attr("class", "case-variant")
            .attr("stroke", "red")
            .attr("fill", "red")
            .attr("transform", function(d) {
                return "translate(" + x(d.position) + "," + 10 + ")";
            }).on('mouseenter', tooltip.show).on('mouseout', tooltip.hide);

        // Track Label Boxes currently 100px
        let labelOffset = 25;
        let trackLabel = d3.select("#viewer2").append("g").attr('transform', 'translate(' + labelOffset +',' + newTrackPosition + ')')
        .attr("class", "track-label");
        trackLabel.append("line").attr("x1", 75).attr("y1", 0).attr("x2", 75).attr("y2", trackHeight).attr("stroke-width", 3)
        .attr("stroke", "#609C9C");
        trackLabel.append("text").text(this.track["label"].toUpperCase()).attr("y", 12);

    }

    /* Method to get reference label */
    async getTrackData() {
        this.variants =  await new ApolloService().GetFakeVariants();
    }
}
