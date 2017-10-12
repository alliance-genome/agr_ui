import React, {Component, PropTypes} from 'react';
import style from '../style.css';
import {scaleLinear} from 'd3-scale';
import {axisTop} from 'd3-axis';
import {select} from 'd3-selection';


class GenomeFeature extends Component {


  constructor(props) {
    super(props);
    this.maxIsoforms = 10;
    this.isoform_count = 0;
    this.isoform_height = 40; // height for each isoform
    this.isoform_title_height = 0; // height for each isoform
    this.exon_height = 10; // will be white / transparent
    this.cds_height = 10; // will be colored in
    this.isoform_view_height = 20; // height for each isoform
    this.utr_height = 10; // this is the height of the isoform running all of the way through
    this.transcript_backbone_height = 4; // this is the height of the isoform running all of the way through
    this.arrow_height = 20;
    this.arrow_width = 10;
    this.arrow_points = '0,0 0,' + this.arrow_height + ' ' + this.arrow_width + ',' + this.arrow_width;
    this.sortWeight = {
      'exon': 100
      , 'UTR': 200
      , 'five_prime_UTR': 200
      , 'three_prime_UTR': 200
      , 'CDS': 1000
      // , 'intron': 50
    };
  }

  componentDidMount() {
    this.drawGenomeFeature();
  }

  componentDidUpdate() {
    this.redrawGenomeFeature();
  }

  redrawGenomeFeature() {
    // remove the element
    let rootElement = window.document.getElementById(this.props.id);
    let ids = rootElement.childNodes;

    if (ids.length > 0) {
      for (let i in ids) {
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

    let count = 0;
    // gene level
    for (let i in data) {
      let feature = data[i];
      feature.children.forEach(function (geneChild) {
        // isoform level
        if (geneChild.type == 'mRNA') {
          count += 1;
        }
      });
    }
    return count;
  }

  renderGene(featureChild, feature, viewer,x) {

    let featureType = featureChild.type;
    if (featureType == 'mRNA') {
      if (this.isoform_count < this.maxIsoforms) {
        this.isoform_count += 1;

        viewer.append('polygon')
          .attr('class', style.transArrow)
          .attr('points', this.arrow_points)
          .attr('transform', function () {
            if (feature.strand > 0) {
              return 'translate(' + Number(x(featureChild.fmax)) + ',' + Number((this.isoform_view_height / 2.0) - (this.arrow_height / 2.0) + (this.isoform_height * this.isoform_count) + this.isoform_title_height) + ')';
            }
            else {
              return 'translate(' + Number(x(featureChild.fmin)) + ',' + Number((this.isoform_view_height / 2.0) + (this.arrow_height / 2.0) + (this.isoform_height * this.isoform_count) + this.isoform_title_height) + ') rotate(180)';
            }
          });

        viewer.append('rect')
          .attr('class', style.transcriptBackbone)
          .attr('x', x(featureChild.fmin))
          .attr('y', this.isoform_height * this.isoform_count + this.isoform_title_height)
          .attr('transform', 'translate(0,' + ( (this.isoform_view_height / 2.0) - (this.transcript_backbone_height / 2.0)) + ')')
          .attr('height', this.transcript_backbone_height)
          .attr('width', x(featureChild.fmax) - x(featureChild.fmin));

        viewer.append('text')
          .attr('class', style.transcriptLabel)
          .attr('x', x(feature.fmin) + 30)
          .attr('y', this.isoform_height * this.isoform_count + this.isoform_title_height)
          .attr('fill', feature.selected ? 'sandybrown' : 'gray')
          .attr('opacity', feature.selected ? 1 : 0.5)
          .attr('height', this.isoform_title_height)
          .text(featureChild.name);

        // have to sort this so we draw the exons BEFORE the CDS
        featureChild.children = featureChild.children.sort(function (a, b) {

          let sortAValue = this.sortWeight[a.type];
          let sortBValue = this.sortWeight[b.type];

          if (typeof sortAValue == 'number' && typeof sortBValue == 'number') {
            return sortAValue - sortBValue;
          }
          if (typeof sortAValue == 'number' && typeof sortBValue != 'number') {
            return -1;
          }
          if (typeof sortAValue != 'number' && typeof sortBValue == 'number') {
            return 1;
          }
          // NOTE: type not found and weighted
          return a.type - b.type;
        });


        featureChild.children.forEach(function (innerChild) {
          let innerType = innerChild.type;
          if (innerType == 'exon') {
            viewer.append('rect')
              .attr('class', style.exon)
              .attr('x', x(innerChild.fmin))
              .attr('y', this.isoform_height * this.isoform_count + this.isoform_title_height)
              .attr('transform', 'translate(0,' + ( (this.isoform_view_height / 2.0) - (this.exon_height / 2.0)) + ')')
              .attr('height', this.exon_height)
              .attr('z-index', 10)
              .attr('width', x(innerChild.fmax) - x(innerChild.fmin));
          }
          else if (innerType == 'CDS') {
            viewer.append('rect')
              .attr('class', style.CDS)
              .attr('x', x(innerChild.fmin))
              .attr('y', this.isoform_height * this.isoform_count + this.isoform_title_height)
              .attr('transform', 'translate(0,' + ( (this.isoform_view_height / 2.0) - (this.cds_height / 2.0)) + ')')
              .attr('z-index', 20)
              .attr('height', this.cds_height)
              .attr('width', x(innerChild.fmax) - x(innerChild.fmin));
          }
          else if (innerType == 'UTR' || innerType == 'five_prime_UTR' || innerType == 'three_prime_UTR') {
            viewer.append('rect')
              .attr('class', style.UTR)
              .attr('x', x(innerChild.fmin))
              .attr('y', this.isoform_height * this.isoform_count + this.isoform_title_height)
              .attr('transform', 'translate(0,' + ( (this.isoform_view_height / 2.0) - (this.utr_height / 2.0)) + ')')
              .attr('z-index', 20)
              .attr('height', this.utr_height)
              .attr('width', x(innerChild.fmax) - x(innerChild.fmin));
          }
        });
      }
      else if (this.isoform_count == this.maxIsoforms) {
        ++this.isoform_count;
        viewer.append('a')
          .attr('class', style.transcriptLabel)
          .attr('xlink:href', this.props.url)
          .attr('xlink:show', 'new')
          .append('text')
          .attr('x', x(feature.fmin) + 30)
          .attr('y', this.isoform_height * this.isoform_count + this.isoform_title_height)
          .attr('fill', 'red')
          .attr('opacity', 1)
          .attr('height', this.isoform_title_height)
          .text('Maximum features displayed.  See full view for more.');
      }
    }
    return this.isoform_count ;
  }

  drawGenomeFeature() {

    let data = this.props.data;
    let dataRange = this.findRange(data);

    let view_start = dataRange.fmin;
    let view_end = dataRange.fmax;


    let calculatedHeight = this.props.height;
    let numberIsoforms = this.countIsoforms(this.props.data);
    if (numberIsoforms > this.MAX_ISOFORMS) {
      calculatedHeight = (this.MAX_ISOFORMS + 2) * this.isoform_height;
    }
    else {
      calculatedHeight = (numberIsoforms + 1) * this.isoform_height;
    }

    let margin = {top: 8, right: 30, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = calculatedHeight - margin.top - margin.bottom;

    let x = scaleLinear()
      .domain([view_start, view_end])
      .range([0, width]);


    // 9 ticks
    let viewLength = view_end - view_start;
    let resolution = Math.round(30 / Math.log(viewLength));
    let resolutionString = '.' + resolution + 's';
    let tickFormat = x.tickFormat(5, resolutionString);

    let xAxis = axisTop(x)
      .ticks(8, 's')
      .tickSize(8)
      .tickFormat(tickFormat);

    let viewer = select('#' + this.props.id)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    for (let i in data) {

      let feature = data[i];
      let featureChildren = feature.children;
      featureChildren = featureChildren.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return a - b;
      });
      featureChildren.forEach(function (featureChild) {
        let featureType = featureChild.type;
        if (featureType == 'gene') {
          this.renderGene(featureChild, feature, viewer,x);
        }
      });
    }

    if (this.isoform_count == 0) {
      viewer.append('text')
        .attr('x', 30)
        .attr('y', this.isoform_title_height + 10)
        .attr('fill', 'orange')
        .attr('opacity', 0.6)
        // .attr('height', isoform_title_height)
        .text('Overview of non-coding genome features unavailable at this time.');
    }
    else {
      viewer.append('g')
        .attr('class', style.axis)
        .attr('width', width)
        .attr('height', 20)
        .attr('transform', 'translate(0,20)')
        .call(xAxis);
    }
  }


  render() {
    return (
      <div>
        <svg
          className={style.viewer}
          height={this.props.height}
          id={this.props.id}
          width={this.props.width}
        />
      </div>
    );
  }
}

GenomeFeature.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
  width: PropTypes.string,
};

export default GenomeFeature;

