import React, {Component} from 'react'
import {render} from 'react-dom'
import App from "../../src/index";
import GenomeFeature from "../../src/GenomeFeature";

class Demo extends Component {
  render() {
    return <div>
      <h1>GenomeFeatureComponent Demo</h1>
      <App/>
      <GenomeFeature/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
