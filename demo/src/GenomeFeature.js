import React, {Component, PropTypes} from 'react';
//import './App.css'
//import fakeImport.something
import {scaleLinear} from "d3-scale";
import {axisTop} from "d3-axis";
import {select} from "d3-selection";
var GenerateGenomeView = require('../../src/GenomeFeature');
//import {GenerateGenomeFeature} from '../../src/GenomeFeature';
//import {GenerateGenomeView} from "../../src/GenomeFeatureNew";

class GenomeFeature extends Component {

    constructor(props) {
        super(props);
        this.state = {
          chr: 5,
          start: 28456815,
          end: 28467256,
          organism: "Mus musculus"
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {
      GenerateGenomeView(this.state.chr,this.state.start,this.state.end,this.state.organism);
      //alert('Your favorite flavor is: ' + this.state.chr);
        event.preventDefault();
      }

    componentDidMount() {
        //this.drawGenomeFeature();
        GenerateGenomeView(this.state.chr,this.state.start,this.state.end,this.state.organism);
        //console.log(this.props.data);

    }

    componentDidUpdate() {
        //this.redrawGenomeFeature();
        //GenerateGenomeView(4,54657928,54740715);



    }

    render() {

        return (
            <div>
              <form onSubmit={this.handleSubmit}>
                Chr <br/>
                <input
                  type="text"
                  name="chr"
                  value={this.state.chr}
                  onChange={this.handleInputChange}/>
                <br/>
                Start <br/>
                <input
                  type="text"
                  name="start"
                  value={this.state.start}
                  onChange={this.handleInputChange}/>
                <br/>
                End <br/>
                <input
                  type="text"
                  name="end"
                  value={this.state.end}
                  onChange={this.handleInputChange}/>
                <br/>
                Organism <br/>
                <input
                    type="text"
                    name="organism"
                    value={this.state.organism}
                    onChange={this.handleInputChange}/>
                  <br/>
                  <input type="submit" value="submit"/>
              </form>
              <svg className="viewer" id="viewer"/>
            </div>
        );
    }
}

GenomeFeature.propTypes = {
    data: PropTypes.array.isRequired,
    height: PropTypes.string,
    width: PropTypes.string,
    id: PropTypes.string,
};

export default GenomeFeature;
