import React, {Component, PropTypes} from 'react';
// import './App.css'
import us from 'underscore';
// import createPlotlyComponent from 'react-plotlyjs';
// import Plotly from 'plotly.js/dist/plotly-cartesian';
// const PlotlyComponent = createPlotlyComponent(Plotly);



class GenomeFeaturePlotly extends Component {


  constructor(props) {
    super(props);
    this.layout = {};
    this.config = {};
  }

  componentDidMount() {
    this.drawGenomeFeature();
  }

  componentDidUpdate() {
    this.redrawGenomeFeature();
  }

  redrawGenomeFeature() {

    // TODO: remove and re-draw the element
    // alert(this.props.id);
    // let rootElement = window.document.getElementById(this.props.id);
    // let ids = rootElement.getChildren(this.props.id);
    //
    // for(let i in ids ){
    //     window.document.getElementById(ids[i]).remove();
    // }

    this.drawGenomeFeature();
  }

  findRange(data) {
    let fmin = -1;
    let fmax = -1;

    for (let d in data) {
      if (fmin < 0 || data[d].fmin < fmin) {
        fmin = data[d].fmin;
      }
      if (fmax < 0 || data[d].fmax > fmax) {
        fmax = data[d].fmax;
      }
    }


    return {
      fmin: fmin
      , fmax: fmax
    };
  }

  drawGenomeFeature() {

    let testData = { 'name': 'pax6a-001', 'sequence-region': 'chr25', 'start': 14929945, 'end': 14954833, 'ordered-transcripts': [ { 'name': 'pax6a-001', 'start': 14932641, 'end': 14953319, 'type': '.', 'alias': 'ENSDART00000164384', 'data': [ [14932641, 14933678, '.'], [14932641, 14933592, '.'], [14933593, 14933678, '2'], [14933593, 14933595, '0'], [14935057, 14935198, '0'], [14935057, 14935198, '.'], [14935346, 14935458, '2'], [14935346, 14935458, '.'], [14935653, 14935803, '0'], [14935653, 14935803, '.'], [14937543, 14937625, '2'], [14937543, 14937625, '.'], [14938075, 14938233, '2'], [14938075, 14938233, '.'], [14942079, 14942244, '0'], [14942079, 14942244, '.'], [14942525, 14942740, '0'], [14942525, 14942740, '.'], [14942831, 14942872, '0'], [14942831, 14942872, '.'], [14943183, 14943313, '2'], [14943183, 14943313, '.'], [14946104, 14946157, '2'], [14946104, 14946157, '.'], [14948743, 14948755, '0'], [14948743, 14948892, '.'], [14948753, 14948755, '0'], [14948756, 14948892, 'x'], [14952968, 14953319, '.'], [14952968, 14953319, '.'] ] }, { 'name': 'pax6a-002', 'start': 14932641, 'end': 14953294, 'type': '.', 'alias': 'ENSDART00000162485', 'data': [ [14932641, 14933678, '.'], [14932641, 14933592, '.'], [14933593, 14933678, '2'], [14933593, 14933595, '0'], [14935057, 14935198, '0'], [14935057, 14935198, '.'], [14935346, 14935458, '2'], [14935346, 14935458, '.'], [14935653, 14935803, '0'], [14935653, 14935803, '.'], [14937543, 14937625, '2'], [14937543, 14937625, '.'], [14938075, 14938233, '2'], [14938075, 14938233, '.'], [14942079, 14942244, '0'], [14942079, 14942244, '.'], [14942525, 14942740, '0'], [14942525, 14942740, '.'], [14943183, 14943313, '2'], [14943183, 14943313, '.'], [14946104, 14946157, '2'], [14946104, 14946157, '.'], [14948743, 14948755, '0'], [14948743, 14948892, '.'], [14948753, 14948755, '0'], [14948756, 14948892, 'x'], [14952968, 14953294, '.'], [14952968, 14953294, '.'] ] }, { 'name': 'pax6a-005', 'start': 14933331, 'end': 14948963, 'type': '.', 'alias': 'ENSDART00000165774', 'data': [ [14933331, 14933678, '.'], [14933331, 14933592, '.'], [14933593, 14933678, '2'], [14933593, 14933595, '0'], [14935057, 14935198, '0'], [14935057, 14935198, '.'], [14935346, 14935458, '2'], [14935346, 14935458, '.'], [14935653, 14935803, '0'], [14935653, 14935803, '.'], [14937543, 14937625, '2'], [14937543, 14937625, '.'], [14938075, 14938233, '2'], [14938075, 14938233, '.'], [14942079, 14942244, '0'], [14942079, 14942244, '.'], [14942525, 14942740, '0'], [14942525, 14942740, '.'], [14942831, 14942872, '0'], [14942831, 14942872, '.'], [14943183, 14943313, '2'], [14943183, 14943313, '.'], [14945307, 14945330, '2'], [14945307, 14945330, '.'], [14946104, 14946116, '0'], [14946104, 14946157, '.'], [14946114, 14946116, '0'], [14946117, 14946157, 'x'], [14946384, 14946455, '.'], [14946384, 14946455, '.'], [14948743, 14948963, '.'], [14948743, 14948963, '.'] ] }, { 'name': 'pax6a-008', 'start': 14937556, 'end': 14944042, 'type': '.', 'alias': 'ENSDART00000166490', 'data': [ [14937556, 14937625, '2'], [14937556, 14937625, '.'], [14938075, 14938233, '2'], [14938075, 14938233, '.'], [14942079, 14942193, '0'], [14942079, 14942244, '.'], [14942191, 14942193, '0'], [14942194, 14942244, 'x'], [14942525, 14942740, '.'], [14942525, 14942740, '.'], [14943183, 14943313, '.'], [14943183, 14943313, '.'], [14943874, 14944042, '.'], [14943874, 14944042, '.'] ] }, { 'name': 'pax6a-009', 'start': 14937560, 'end': 14943969, 'type': '.', 'alias': 'ENSDART00000159342', 'data': [ [14937560, 14937625, '2'], [14937560, 14937625, '.'], [14938075, 14938233, '2'], [14938075, 14938233, '.'], [14942079, 14942193, '0'], [14942079, 14942244, '.'], [14942191, 14942193, '0'], [14942194, 14942244, 'x'], [14942525, 14942740, '.'], [14942525, 14942740, '.'], [14942831, 14942872, '.'], [14942831, 14942872, '.'], [14943183, 14943313, '.'], [14943183, 14943313, '.'], [14943874, 14943969, '.'], [14943874, 14943969, '.'] ] }, { 'name': 'pax6a-006', 'start': 14938127, 'end': 14948938, 'type': '.', 'alias': 'ENSDART00000161165', 'data': [ [14938127, 14938233, '2'], [14938127, 14938233, '.'], [14942079, 14942193, '0'], [14942079, 14942244, '.'], [14942191, 14942193, '0'], [14942194, 14942244, 'x'], [14942525, 14942740, '.'], [14942525, 14942740, '.'], [14942831, 14942872, '.'], [14942831, 14942872, '.'], [14943183, 14943313, '.'], [14943183, 14943313, '.'], [14945307, 14945328, '.'], [14945307, 14945328, '.'], [14946104, 14946157, '.'], [14946104, 14946157, '.'], [14946384, 14946455, '.'], [14946384, 14946455, '.'], [14948743, 14948938, '.'], [14948743, 14948938, '.'] ] }, { 'name': 'pax6a-007', 'start': 14942525, 'end': 14949040, 'type': '.', 'alias': 'ENSDART00000172538', 'data': [ [14942525, 14942740, '0'], [14942525, 14942740, '.'], [14943183, 14943313, '2'], [14943183, 14943313, '.'], [14946104, 14946157, '2'], [14946104, 14946157, '.'], [14948743, 14948755, '0'], [14948743, 14949040, '.'], [14948753, 14948755, '0'], [14948756, 14949040, 'x'] ] }, { 'name': 'pax6a-003', 'start': 14942663, 'end': 14953349, 'type': '.', 'alias': 'ENSDART00000165632', 'data': [ [14942663, 14942740, '0'], [14942663, 14942740, '.'], [14942831, 14942872, '0'], [14942831, 14942872, '.'], [14943183, 14943313, '2'], [14943183, 14943313, '.'], [14945307, 14945330, '2'], [14945307, 14945330, '.'], [14946104, 14946116, '0'], [14946104, 14946157, '.'], [14946114, 14946116, '0'], [14946117, 14946157, 'x'], [14946384, 14946455, '.'], [14946384, 14946455, '.'], [14948743, 14948892, '.'], [14948743, 14948892, '.'], [14952968, 14953349, '.'], [14952968, 14953349, '.'] ] }, { 'name': 'pax6a-010', 'start': 14943094, 'end': 14943959, 'type': '.', 'alias': 'ENSDART00000169876', 'data': [ [14943094, 14943313, '.'], [14943874, 14943959, '.'] ] }, { 'name': 'pax6a-004', 'start': 14943299, 'end': 14953381, 'type': '.', 'alias': 'ENSDART00000159490', 'data': [ [14943299, 14943313, '2'], [14943299, 14943313, '.'], [14945307, 14945330, '2'], [14945307, 14945330, '.'], [14946104, 14946116, '0'], [14946104, 14946157, '.'], [14946114, 14946116, '0'], [14946117, 14946157, 'x'], [14946384, 14946455, '.'], [14946384, 14946455, '.'], [14948743, 14948892, '.'], [14948743, 14948892, '.'], [14949039, 14949169, '.'], [14949039, 14949169, '.'], [14952968, 14953381, '.'], [14952968, 14953381, '.'] ] } ] };

    // let data = this.props.data ? this.props.data : testData ;
    let data = testData;
    let offset = 10;
    let text_offset = 4;

    // Raw base data lines.
    let traces = [];

    // Raw base data lines.
    let text_traces = {
      // Put labels in 10%.
      x: [],
      y: [],
      text: [],
      //label: 'Labels',
      showlegend: false,
      mode: 'text'
    };

    // Glyphs to appear on data lines.
    let shapes = [];

    us.each(data['ordered-transcripts'], function(transcript, index){

      // Give us the right y-offset for the data.
      let yoff = (data['ordered-transcripts'].length - index) * offset;

      // Add transcript line to the plot.
      let main_line = {
        type: 'line',
        xref: 'x',
        yref: 'y',
        x0: transcript['start'],
        y0: yoff,
        x1: transcript['end'],
        y1: yoff,
        line: {
          color: 'rgb(55, 128, 191)',
          width: 3
        }
      };
      shapes.push(main_line);

      // Add the (hopefully anonymous) segements to the trace.
      let toggle = false;
      us.each(transcript['data'], function(d){

        let a = d[0];
        let b = d[1];
        let t = d[2];

        // Flip.
        if( t === 'x' ){
          toggle = true;
        }

        // Get a better shape.
        let seg_line = {
          type: 'rect',
          x0: a,
          y0: yoff + 2,
          x1: b,
          y1: yoff - 2,
          line: {
            color: 'rgb(55, 128, 191)',
            width: 1
          }
        };
        if( ! toggle ){
          seg_line['fillcolor'] = 'rgba(55, 128, 191, 1.0)';
        }else{
          seg_line['fillcolor'] = 'rgba(255, 255, 255, 1.0)';
        }
        shapes.push(seg_line);
      });

      // Put labels in 10%.
      text_traces['x'].push(transcript['start']);
      text_traces['y'].push(yoff + text_offset);
      // Add text description to the trace.
      text_traces['text'].push(transcript['name']);

    });

    // Put it all together into final bundle for rendering.
    traces.push(text_traces);

    this.layout = {
      title: data['name'] + ' / ' + data['sequence-region'],
      xaxis: {
        range: [data['start'], data['end']],
        zeroline: false,
        side: 'top',
        gridcolor: '#ccc',
        zerolinecolor: '#fff'
      },
      yaxis: {
        range: [0, (data['ordered-transcripts'].length * (offset + 1))],
        showgrid: false,
        showticklabels: false,
      },
      // width: 800,
      // height: 600,
      hovermode: false,
      shapes: shapes
    };

    this.config = {
      showLink: false,
      displayModeBar: true
    };

    // Plotly.newPlot(this.props.id, traces, layout);
  }

  render() {
    return (
        <PlotlyComponent className="viewer" data={this.props.data} layout={this.layout} config={this.config}/>
    );
  }
}

GenomeFeaturePlotly.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  id: PropTypes.string,
};

export default GenomeFeaturePlotly;

