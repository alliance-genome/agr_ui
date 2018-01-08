//import React, {Component} from 'react'
import './App.css'
import {scaleLinear} from "d3-scale";
import {axisTop} from "d3-axis";
import {select} from "d3-selection";

export default class App extends Component {


    componentDidMount() {
        this.drawGenomeFeature();
    }

    componentDidUpdate() {
        this.redrawGenomeFeature();
    }

    drawGenomeFeature(){

        let data = this.props.data;

        let view_start = 204920;
        let view_end = 230560;
        let trans_height = 20;
        let line_width = 5;
        let arrow_width = 5;

        let margin = {top: 20, right: 30, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        let x = scaleLinear()
            .domain([view_start, view_end])
            .range([0, width]);

        let xAxis = axisTop(x)
            .ticks(20, 's');

        let viewer = select(".viewer")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        let transcript = viewer.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "container");

        let points = "0,0 0,10 5,5";

        transcript.append("rect")
            .attr("class", "transcript")
            .attr("x", function (d) {
                if (d.strand > 0) {
                    return x(d.fmin);
                }
                else {
                    return x(d.fmin) - arrow_width;
                }
            })
            .attr("y", 30 + trans_height / 2 - line_width / 2)
            .attr("transform", function (d, i) {
                return "translate(0," + 30 * i + ")";
            })
            .attr("height", line_width)
            .attr("width", function (d) {
                return x(d.fmax) - x(d.fmin) + arrow_width;
            })
            .append("polygon")
            .attr("class", "trans_arrow")
            .attr("points", points)
            .attr("x", function (d) {
                return x(d.fmin);
            })
            .attr("y", 30 + trans_height / 2 - line_width / 2)
            .attr("transform", function (d, i) {
                return "translate(0," + 30 * i + ")";
            });


        viewer.selectAll("container")
            .data(data)
            .enter()
            .append("polygon")
            .attr("class", "trans_arrow")
            .attr("points", points)
            .attr("transform", function (d, i) {
                if (d.strand > 0) {
                    return "translate(" + Number(x(d.fmax) + 5) + "," + Number(trans_height/2 - line_width + 30 * i) + ")";
                }
                else {
                    return "translate(" + Number(x(d.fmin) - 5) + "," + Number(trans_height - line_width + 30 * i) + ") rotate(180)";
                }

            });


        for (let i in data) {
            let exons = data[i].children;
            console.log(exons);

            //This is hacky... idk why this works right now but its needed to get to object level.
            //Hello
            exons.forEach(function (item) {
                item.forEach(function (item2) {

                    viewer.append("rect")
                        .attr("class", item2.type)
                        .attr("x", x(item2.fmin))
                        .attr("y", 30)
                        .attr("transform", "translate(0," + 30 * i + ")")
                        .attr("height", trans_height)
                        .attr("width", x(item2.fmax) - x(item2.fmin));
                });
            });
        }


        viewer.append("g")
            .attr("class", "axis")
            .attr("width", width)
            .attr("height", 20)
            .attr("transform", "translate(0,20)")
            .call(xAxis);
    }

    redrawGenomeFeature(){

        this.drawGenomeFeature();
    }

    render() {

        let height = "400px";
        let width = "800px";
        let id = "genome-feature-id";

        return (
            <div>
                <svg  id={id} className="viewer" height={height} width={width}/>
            </div>
        );
    }
}
