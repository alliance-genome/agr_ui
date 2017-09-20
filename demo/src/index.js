import React, {Component} from 'react'
import {render} from 'react-dom'
import GenomeFeature from "../../src/GenomeFeature";
// import "whatwg-fetch";


// import {ActivityIndicator, ListView, Text, View} from 'react-native';


class Demo extends Component {

    jbrowseUrl = "http://demo.genomearchitect.org/Apollo-staging/Honeybee/jbrowse/index.html?loc=Group1.1:329115..330633&tracks=Official%20Gene%20Set%20v3.2";
    dataUrl = "http://demo.genomearchitect.org/Apollo-staging/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1/GB42168-RA.json";
    // dataUrl = "http://localhost:8080/apollo/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1/GB42155-RA.json?ignoreCache=true";
    // dataUrl = "http://localhost:8080/apollo/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1/GB42168-RA.json?ignoreCache=true";
    // dataUrl = "http://localhost:8080/apollo/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1:329115..330633.json?ingoreCache=true";


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
        // this.loadData()
    }

    render() {

        let height = "200px";
        let width = "600px";
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
                    <GenomeFeature id={id1} width={width} height={height} data={{loadedData}}/>
                </div>
            )
        }


    }
}

render(<Demo/>, document.querySelector('#demo'))
