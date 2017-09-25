import React, {Component, PropTypes} from 'react';
// import './App.css'
import style from '../style.css';
import {scaleLinear} from 'd3-scale';
import {axisTop} from 'd3-axis';
import {select} from 'd3-selection';


class GenomeFeatureD3 extends Component {

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
    let rootElement = window.document.getElementById(this.props.id);
    let ids = rootElement.childNodes;

    if (ids.length > 0) {
      for (let i in ids) {
        if (typeof ids[i] == Node) {
          rootElement.removeChild(ids[i]);
        }
      }
    }
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

  countIsoforms(data) {

    let isoform_count = 0;
    console.log('count siforms: ' + data);
    // gene level
    for (let i in data) {
      let feature = data[i];
      feature.children.forEach(function (geneChild) {
        console.log(geneChild.type);
        // isoform level
        if (geneChild.type == 'mRNA') {
          isoform_count += 1;
        }
      });
    }
    return isoform_count;
  }

  drawGenomeFeature() {

    let data = this.props.data;
    let dataRange = this.findRange(data);

    let view_start = dataRange.fmin;
    let view_end = dataRange.fmax;
    console.log(view_start + ' , ' + view_end);
    // let utr_height = 20;
    let exon_height = 20; // will be white / transparent
    let cds_height = 40; // will be colored in
    let isoform_height = 60; // height for each isoform
    let utr_height = 5; // this is the height of the isoform running all of the way through
    let line_width = 5;
    // let arrow_width = 5;
    let arrow_points = '0,0 0,10 5,5';
    let buffer_top = 50;

    let calculatedHeight = this.props.height;
    if (!this.props.isLoading) {
      let numberIsoforms = this.countIsoforms(this.props.data);
      console.log(numberIsoforms);
      calculatedHeight = numberIsoforms * 150;
    }
    calculatedHeight += buffer_top;

    let margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = calculatedHeight - margin.top - margin.bottom;

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


    let isoform_count = 0;
    for (let i in data) {

      //This is hacky... idk why this works right now but its needed to get to object level.
      let feature = data[i];
      let featureChildren = feature.children;
      console.log('featureChildren');
      console.log(featureChildren);

      viewer.append('text')
        .attr('class', style.geneLabel)
        .attr('x', x(feature.fmin) + 300)
        .attr('y', isoform_height * isoform_count + 50)
        .attr('dy', '.35em')
        .attr('fill', 'gray')
        .text(feature.name);

      featureChildren.forEach(function (featureChild) {
        let featureType = featureChild.type;
        console.log('feature type: ' + featureType);
        if (featureType == 'mRNA') {
          isoform_count += 1;

          viewer.append('polygon')
            .attr('class', 'trans_arrow')
            .attr('points', arrow_points)
            .attr('transform', function () {
              if (feature.strand > 0) {
                return 'translate(' + Number(x(feature.fmax) + 5) + ',' + Number(20 + utr_height - line_width + isoform_height * isoform_count) + ')';
              }
              else {
                return 'translate(' + Number(x(feature.fmin) - 5) + ',' + Number(30 + utr_height - line_width + isoform_height * isoform_count) + ') rotate(180)';
              }
            });

          viewer.append('rect')
            .attr('class', style.UTR)
            .attr('x', x(feature.fmin))
            .attr('y', isoform_height * isoform_count)
            .attr('transform', 'translate(0,' + 30 * i + ')')
            .attr('height', utr_height)
            .attr('width', x(feature.fmax) - x(feature.fmin));

          viewer.append('text')
            .attr('class', style.transcriptLabel)
            .attr('x', x(feature.fmin) + 30)
            .attr('y', isoform_height * isoform_count)
            .attr('dy', '.35em')
            .text(featureChild.name);


          featureChild.children.forEach(function (innerChild) {
            let innerType = innerChild.type;
            if (innerType == 'exon') {
              viewer.append('rect')
                .attr('class', style.exon)
                .attr('x', x(innerChild.fmin))
                .attr('y', isoform_height * isoform_count)
                .attr('transform', 'translate(0,' + isoform_height * isoform_count + ')')
                .attr('height', exon_height)
                .attr('width', x(innerChild.fmax) - x(innerChild.fmin));
            }
            else if (innerType == 'CDS') {
              viewer.append('rect')
                .attr('class', style.CDS)
                .attr('x', x(innerChild.fmin))
                .attr('y', isoform_height * isoform_count)
                .attr('transform', 'translate(0,' + isoform_height * isoform_count + ')')
                .attr('height', cds_height)
                .attr('width', x(innerChild.fmax) - x(innerChild.fmin));
            }
          });
        }
      });
    }


    viewer.append('g')
      .attr('class', style.axis)
      .attr('width', width)
      .attr('height', 20)
      .attr('transform', 'translate(0,20)')
      .call(xAxis);
  }

  render() {
    return (
      <div>
        <svg id={this.props.id} className={style.viewer} height={this.props.height} width={this.props.width}
             data={this.props.data}/>
      </div>
    );
  }
}

GenomeFeatureD3.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  id: PropTypes.string,
};

export default GenomeFeatureD3;

