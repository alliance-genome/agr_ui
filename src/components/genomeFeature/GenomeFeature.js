import React, {Component, PropTypes} from 'react';
// import './App.css'
import {scaleLinear} from 'd3-scale';
import {axisTop} from 'd3-axis';
import {select} from 'd3-selection';


class GenomeFeature extends Component {

  constructor(props) {
    super(props);
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

    let testData = [{ 'strand': 1, 'children': [{'phase': 0, 'strand': 1, 'fmin': 204920, 'type': 'CDS', 'fmax': 205070}, { 'phase': 0, 'strand': 1, 'fmin': 222771, 'type': 'CDS', 'fmax': 222858 }, {'strand': 1, 'fmin': 222858, 'type': 'three_prime_UTR', 'fmax': 223005}, { 'strand': 1, 'fmin': 204920, 'type': 'exon', 'fmax': 205070 }, {'strand': 1, 'fmin': 222771, 'type': 'exon', 'fmax': 223005}], 'name': 'GB42165-RA', 'id': 'http://icebox.lbl.gov/Apollo-staging/track/Honeybee/Official Gene Set v3.2/Group1.1/GB42165-RA.json', 'fmin': 204920, 'type': 'mRNA', 'fmax': 223005 }, { 'strand': -1, 'children': [[{'phase': 0, 'strand': -1, 'fmin': 229546, 'type': 'CDS', 'fmax': 229565}, { 'phase': 2, 'strand': -1, 'fmin': 227354, 'type': 'CDS', 'fmax': 227568 }, {'phase': 1, 'strand': -1, 'fmin': 226993, 'type': 'CDS', 'fmax': 227269}, { 'phase': 1, 'strand': -1, 'fmin': 226643, 'type': 'CDS', 'fmax': 226926 }, {'phase': 0, 'strand': -1, 'fmin': 226442, 'type': 'CDS', 'fmax': 226564}, { 'phase': 1, 'strand': -1, 'fmin': 226132, 'type': 'CDS', 'fmax': 226359 }, {'phase': 2, 'strand': -1, 'fmin': 225990, 'type': 'CDS', 'fmax': 226060}, { 'phase': 1, 'strand': -1, 'fmin': 225857, 'type': 'CDS', 'fmax': 225913 }, {'phase': 2, 'strand': -1, 'fmin': 225685, 'type': 'CDS', 'fmax': 225772}, { 'phase': 2, 'strand': -1, 'fmin': 225387, 'type': 'CDS', 'fmax': 225577 }, {'phase': 1, 'strand': -1, 'fmin': 216954, 'type': 'CDS', 'fmax': 217046}, { 'phase': 2, 'strand': -1, 'fmin': 215398, 'type': 'CDS', 'fmax': 215433 }, {'phase': 0, 'strand': -1, 'fmin': 213731, 'type': 'CDS', 'fmax': 213905}, { 'strand': -1, 'fmin': 230453, 'type': 'five_prime_UTR', 'fmax': 230560 }, {'strand': -1, 'fmin': 229565, 'type': 'five_prime_UTR', 'fmax': 229635}, { 'strand': -1, 'fmin': 212881, 'type': 'three_prime_UTR', 'fmax': 213731 }, {'strand': -1, 'fmin': 212881, 'type': 'exon', 'fmax': 213905}, { 'strand': -1, 'fmin': 215398, 'type': 'exon', 'fmax': 215433 }, {'strand': -1, 'fmin': 216954, 'type': 'exon', 'fmax': 217046}, { 'strand': -1, 'fmin': 225387, 'type': 'exon', 'fmax': 225577 }, {'strand': -1, 'fmin': 225685, 'type': 'exon', 'fmax': 225772}, { 'strand': -1, 'fmin': 225857, 'type': 'exon', 'fmax': 225913 }, {'strand': -1, 'fmin': 225990, 'type': 'exon', 'fmax': 226060}, { 'strand': -1, 'fmin': 226132, 'type': 'exon', 'fmax': 226359 }, {'strand': -1, 'fmin': 226442, 'type': 'exon', 'fmax': 226564}, { 'strand': -1, 'fmin': 226643, 'type': 'exon', 'fmax': 226926 }, {'strand': -1, 'fmin': 226993, 'type': 'exon', 'fmax': 227269}, { 'strand': -1, 'fmin': 227354, 'type': 'exon', 'fmax': 227568 }, {'strand': -1, 'fmin': 229546, 'type': 'exon', 'fmax': 229635}, { 'strand': -1, 'fmin': 230453, 'type': 'exon', 'fmax': 230560 }]], 'name': 'GB42161-RA', 'id': 'http://demo.genomearchitect.org/Apollo2/track/Honeybee/Official Gene Set v3.2/Group1.1/GB42161-RA.json', 'fmin': 212881, 'type': 'mRNA', 'fmax': 230560 }];
    let data = this.props.data ? this.props.data : testData;
    let dataRange = this.findRange(data);

    let view_start = dataRange.fmin;
    let view_end = dataRange.fmax;
    console.log(view_start + ' , ' + view_end);
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

    let viewer = select('#' + this.props.id)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    let transcript = viewer.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'container');

    let points = '0,0 0,10 5,5';

    transcript.append('rect')
      .attr('class', 'transcript')
      .attr('x', function (d) {
        if (d.strand > 0) {
          return x(d.fmin);
        }
        else {
          return x(d.fmin) - arrow_width;
        }
      })
      .attr('y', 30 + trans_height / 2 - line_width / 2)
      .attr('transform', function (d, i) {
        return 'translate(0,' + 30 * i + ')';
      })
      .attr('height', line_width)
      .attr('width', function (d) {
        return x(d.fmax) - x(d.fmin) + arrow_width;
      })
      .append('polygon')
      .attr('class', 'trans_arrow')
      .attr('points', points)
      .attr('x', function (d) {
        return x(d.fmin);
      })
      .attr('y', 30 + trans_height / 2 - line_width / 2)
      .attr('transform', function (d, i) {
        return 'translate(0,' + 30 * i + ')';
      });


    viewer.selectAll('container')
      .data(data)
      .enter()
      .append('polygon')
      .attr('class', 'trans_arrow')
      .attr('points', points)
      .attr('transform', function (d, i) {
        if (d.strand > 0) {
          return 'translate(' + Number(x(d.fmax) + 5) + ',' + Number(20 + trans_height - line_width + 30 * i) + ')';
        }
        else {
          return 'translate(' + Number(x(d.fmin) - 5) + ',' + Number(30 + trans_height - line_width + 30 * i) + ') rotate(180)';
        }
      });


    for (let i in data) {
      let exons = data[i].children;
      console.log(exons);

      //This is hacky... idk why this works right now but its needed to get to object level.
      exons.forEach(function (item2) {
        viewer.append('rect')
          .attr('class', item2.type)
          .attr('x', x(item2.fmin))
          .attr('y', 30)
          .attr('transform', 'translate(0,' + 30 * i + ')')
          .attr('height', trans_height)
          .attr('width', x(item2.fmax) - x(item2.fmin));
      });
    }


    viewer.append('g')
      .attr('class', 'axis')
      .attr('width', width)
      .attr('height', 20)
      .attr('transform', 'translate(0,20)')
      .call(xAxis);
  }

  render() {
    return (
      <div>
        <svg id={this.props.id} className='viewer' height={this.props.height} width={this.props.width}
             data={this.props.data}/>
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

