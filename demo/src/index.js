import React, {Component} from 'react'
import {render} from 'react-dom'
import App from "../../src/index";
import GenomeFeature from "../../src/GenomeFeature";
import fetchData from "../../src/fetchData";
import axios from 'axios';
// import {ActivityIndicator, ListView, Text, View} from 'react-native';


class Demo extends Component {

    jbrowseUrl = "http://demo.genomearchitect.org/Apollo2/3836/jbrowse/index.html?loc=Group1.1:329115..330633&tracks=Official%20Gene%20Set%20v3.2"
    dataUrl = "http://demo.genomearchitect.org/Apollo2/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1/GB42168-RA.json";

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    loadData(){
        this.state.isLoading = true ;

        fetch(this.dataUrl, {
            method: 'get',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }})
            // .then((response) => response.text())
            // .then((response) => response.json())
            // .then((responseJson) => {
            .then((response) => {
                if (response.ok) {
                    response.json().then(data => {
                        // result.data = data;
                        // result.message = response.statusText;
                        this.setState({
                            isLoading: false
                            , loadedData: data
                        });
                        // return responseData(result);
                        return response.json();
                    });
                } else {
                    // result.message = 'Network response was not ok.';
                    // return responseData(result);
                    return response.json();
                }
                // alert(responseJson);
            })
            .catch((error) => {
                console.log(error);
            });
        // let config = {
        //     headers: {'mode':'no-cors'}
        // };
        // axios.get(this.dataUrl,config.headers)
        //     .then(function(results) {
        //         alert(results);
        //     });
    }

    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate() {
        this.loadData()
    }

    render() {

        let thisData = [{ "strand": 1, "children": [[{"phase": 0, "strand": 1, "fmin": 204920, "type": "CDS", "fmax": 205070}, { "phase": 0, "strand": 1, "fmin": 222771, "type": "CDS", "fmax": 222858 }, {"strand": 1, "fmin": 222858, "type": "three_prime_UTR", "fmax": 223005}, { "strand": 1, "fmin": 204920, "type": "exon", "fmax": 205070 }, {"strand": 1, "fmin": 222771, "type": "exon", "fmax": 223005}]], "name": "GB42165-RA", "id": "http://icebox.lbl.gov/Apollo-staging/track/Honeybee/Official Gene Set v3.2/Group1.1/GB42165-RA.json", "fmin": 204920, "type": "mRNA", "fmax": 223005 }, { "strand": -1, "children": [[{"phase": 0, "strand": -1, "fmin": 229546, "type": "CDS", "fmax": 229565}, { "phase": 2, "strand": -1, "fmin": 227354, "type": "CDS", "fmax": 227568 }, {"phase": 1, "strand": -1, "fmin": 226993, "type": "CDS", "fmax": 227269}, { "phase": 1, "strand": -1, "fmin": 226643, "type": "CDS", "fmax": 226926 }, {"phase": 0, "strand": -1, "fmin": 226442, "type": "CDS", "fmax": 226564}, { "phase": 1, "strand": -1, "fmin": 226132, "type": "CDS", "fmax": 226359 }, {"phase": 2, "strand": -1, "fmin": 225990, "type": "CDS", "fmax": 226060}, { "phase": 1, "strand": -1, "fmin": 225857, "type": "CDS", "fmax": 225913 }, {"phase": 2, "strand": -1, "fmin": 225685, "type": "CDS", "fmax": 225772}, { "phase": 2, "strand": -1, "fmin": 225387, "type": "CDS", "fmax": 225577 }, {"phase": 1, "strand": -1, "fmin": 216954, "type": "CDS", "fmax": 217046}, { "phase": 2, "strand": -1, "fmin": 215398, "type": "CDS", "fmax": 215433 }, {"phase": 0, "strand": -1, "fmin": 213731, "type": "CDS", "fmax": 213905}, { "strand": -1, "fmin": 230453, "type": "five_prime_UTR", "fmax": 230560 }, {"strand": -1, "fmin": 229565, "type": "five_prime_UTR", "fmax": 229635}, { "strand": -1, "fmin": 212881, "type": "three_prime_UTR", "fmax": 213731 }, {"strand": -1, "fmin": 212881, "type": "exon", "fmax": 213905}, { "strand": -1, "fmin": 215398, "type": "exon", "fmax": 215433 }, {"strand": -1, "fmin": 216954, "type": "exon", "fmax": 217046}, { "strand": -1, "fmin": 225387, "type": "exon", "fmax": 225577 }, {"strand": -1, "fmin": 225685, "type": "exon", "fmax": 225772}, { "strand": -1, "fmin": 225857, "type": "exon", "fmax": 225913 }, {"strand": -1, "fmin": 225990, "type": "exon", "fmax": 226060}, { "strand": -1, "fmin": 226132, "type": "exon", "fmax": 226359 }, {"strand": -1, "fmin": 226442, "type": "exon", "fmax": 226564}, { "strand": -1, "fmin": 226643, "type": "exon", "fmax": 226926 }, {"strand": -1, "fmin": 226993, "type": "exon", "fmax": 227269}, { "strand": -1, "fmin": 227354, "type": "exon", "fmax": 227568 }, {"strand": -1, "fmin": 229546, "type": "exon", "fmax": 229635}, { "strand": -1, "fmin": 230453, "type": "exon", "fmax": 230560 }]], "name": "GB42161-RA", "id": "http://demo.genomearchitect.org/Apollo2/track/Honeybee/Official Gene Set v3.2/Group1.1/GB42161-RA.json", "fmin": 212881, "type": "mRNA", "fmax": 230560 }];
        let height = "200px";
        let width = "600px";
        let id1 = "genome-feature-demo-1";

        if (this.state.isLoading) {
            return (
                <div>Loading</div>
            )
        }
        else {
            return (
                <div>
                    <h1>GenomeFeatureComponent Demo</h1>
                    <a href={this.jbrowseUrl}>Link</a>
                    <GenomeFeature id={id1} width={width} height={height} data={{loadedData}}/>
                </div>
            )
        }


    }
}

render(<Demo/>, document.querySelector('#demo'))
