import React, {Component, PropTypes} from 'react';
// import './App.css'
import style from '../style.css';
import {scaleLinear} from 'd3-scale';
import {axisTop} from 'd3-axis';
import {select} from 'd3-selection';


class GenomeFeature extends Component {


  constructor(props) {
    super(props);
    this.MAX_ISOFORMS = 10 ;
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
        console.log(typeof  ids[i]);
        if (typeof ids[i] == 'object') {
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
    let exon_height = 10; // will be white / transparent
    let cds_height = 10; // will be colored in
    let isoform_height = 40; // height for each isoform
    let isoform_view_height = 20; // height for each isoform
    let isoform_title_height = 0; // height for each isoform
    let utr_height = 4; // this is the height of the isoform running all of the way through
    let arrow_height = 20;
    let arrow_width = 10;
    let arrow_points = '0,0 0,' + arrow_height + ' ' + arrow_width + ',' + arrow_width;

    let calculatedHeight = this.props.height;
    if (!this.props.isLoading) {
      let numberIsoforms = this.countIsoforms(this.props.data);
      numberIsoforms = numberIsoforms > this.MAX_ISOFORMS ? this.MAX_ISOFORMS : numberIsoforms;
      calculatedHeight = (numberIsoforms+1) * isoform_height;
    }

    let margin = {top: 8, right: 30, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = calculatedHeight - margin.top - margin.bottom;

    let x = scaleLinear()
      .domain([view_start, view_end])
      .range([0, width]);

    let tickFormat = x.tickFormat(5,'.2s');

    let xAxis = axisTop(x)
      .ticks(10, 's')
      .tickSize(8)
      .tickFormat(tickFormat);

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
      let selected = feature.selected;

      let maxIsoforms = this.MAX_ISOFORMS;
      featureChildren.forEach(function (featureChild) {
        let featureType = featureChild.type;
        if (featureType == 'mRNA' && isoform_count < maxIsoforms) {
          isoform_count += 1;

          viewer.append('polygon')
            .attr('class', 'trans_arrow')
            .attr('points', arrow_points)
            .attr('transform', function () {
              if (feature.strand > 0) {
                return 'translate(' + Number(x(feature.fmax)) + ',' + Number((isoform_view_height / 2.0) - (arrow_height / 2.0) + (isoform_height * isoform_count) + isoform_title_height) + ')';
              }
              else {
                return 'translate(' + Number(x(feature.fmin)) + ',' + Number((isoform_view_height / 2.0) + (arrow_height / 2.0) + (isoform_height * isoform_count) + isoform_title_height) + ') rotate(180)';
              }
            });

          viewer.append('rect')
            .attr('class', style.UTR)
            .attr('x', x(feature.fmin))
            .attr('y', isoform_height * isoform_count + isoform_title_height)
            .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (utr_height / 2.0)) + ')')
            .attr('height', utr_height)
            .attr('width', x(feature.fmax) - x(feature.fmin));

          viewer.append('text')
            .attr('class', style.transcriptLabel)
            .attr('x', x(feature.fmin) + 30)
            .attr('y', isoform_height * isoform_count + isoform_title_height)
            .attr('fill', selected ? 'sandybrown' : 'gray')
            .attr('opacity', selected ? 1 : 0.5)
            .attr('height', isoform_title_height)
            .text(featureChild.name);

          featureChild.children = featureChild.children.sort(function (a, b) {
            if (a.type == 'exon' && b.type != 'exon') {
              return -1;
            }
            else if (a.type == 'CDS' && b.type != 'CDS') {
              return 1;
            }
            else {
              return a - b;
            }
          });

          featureChild.children.forEach(function (innerChild) {
            let innerType = innerChild.type;
            if (innerType == 'exon') {
              viewer.append('rect')
                .attr('class', style.exon)
                .attr('x', x(innerChild.fmin))
                .attr('y', isoform_height * isoform_count + isoform_title_height)
                .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (exon_height / 2.0)) + ')')
                .attr('height', exon_height)
                .attr('z-index', 10)
                .attr('width', x(innerChild.fmax) - x(innerChild.fmin));
            }
            else if (innerType == 'CDS') {
              viewer.append('rect')
                .attr('class', style.CDS)
                .attr('x', x(innerChild.fmin))
                .attr('y', isoform_height * isoform_count + isoform_title_height)
                .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (cds_height / 2.0)) + ')')
                .attr('z-index', 20)
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

GenomeFeature.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  id: PropTypes.string,
};

export default GenomeFeature;

