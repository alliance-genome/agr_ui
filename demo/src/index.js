import React, {Component} from 'react'
import {render} from 'react-dom'
import styles from '../../src/App.css'
//import GenomeFeature from "../../src/GenomeFeature";
import GenomeFeature from "./GenomeFeature";
// import "whatwg-fetch";


// import {ActivityIndicator, ListView, Text, View} from 'react-native';


class Demo extends Component {

    jbrowseUrl = "http://demo.genomearchitect.org/Apollo-staging/Honeybee/jbrowse/index.html?loc=Group1.1:329115..330633&tracks=Official%20Gene%20Set%20v3.2";
    //dataUrl = "http://demo.genomearchitect.org/Apollo-staging/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1/GB42168-RA.json";
    //Two features seperate strands
    //dataUrl = "http://demo.genomearchitect.org/Apollo-staging/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.17:97046..328045.json";
    //Mouse
    //dataUrl = 'http://icebox.lbl.gov/Apollo-staging/track/Mouse/GRCm38.81-gene/4:54657928..54740715.json';
    //Human
    dataUrl ="https://agr-apollo.berkeleybop.io/apollo/track/Homo%20sapiens/All%20Genes/4:54657928..54740715.json";
    //4 Features
    //dataUrl = "http://demo.genomearchitect.org/Apollo-staging/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.17:407501..444600.json";
    // dataUrl = "http://localhost:8080/apollo/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1/GB42155-RA.json?ignoreCache=true";
    // dataUrl = "http://localhost:8080/apollo/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1/GB42168-RA.json?ignoreCache=true";
    // dataUrl = "http://localhost:8080/apollo/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1:329115..330633.json?ingoreCache=true";
    //dataUrl = 'https://agr-apollo.berkeleybop.io/apollo/track/' + encodeURI('Homo sapiens') + '/' + 'All Genes' + '/' + encodeURI('4:54657928...54740715') + '.json';
    //Put in the code from the AGR website
    //console.log(dataUrl)
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }

    }

    loadData() {
        this.state.isLoading = true;

        fetch(this.dataUrl)
            .then((response) => {
                response.json().then(data => {
                    this.setState({
                        isLoading: false
                        , loadedData: data
                    });
                    return data;
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }


    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate() {
        // this.testNetwork();
        this.loadData()
    }

    render() {

        let height = "200";
        let width = "600";
        let id1 = "genome-feature-demo-1";

        if (this.state.isLoading) {
           return (
                <div>Loading</div>
            )
        }
        else {
            let loadedData = this.state.loadedData ;
            return (
                <div>
                    <h1>GenomeFeatureComponent Demo</h1>
                    <a href={this.jbrowseUrl}>Link</a>
                    <GenomeFeature id={id1} width={width} height={height} data={loadedData}/>
                </div>
            )
        }


    }
}

render(<Demo/>, document.querySelector('#demo'))
