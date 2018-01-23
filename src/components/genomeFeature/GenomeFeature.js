import PropTypes from 'prop-types';
import React, { Component } from 'react';
import style from '../style.css';
import {scaleLinear} from 'd3-scale';
import {axisTop} from 'd3-axis';
import {select} from 'd3-selection';


class GenomeFeature extends Component {


  constructor(props) {
    super(props);
    this.MAX_ISOFORMS = 10;
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

    let isoform_count = 0;
    let transcriptTypes = this.props.transcriptTypes;
    // gene level
    for (let i in data) {
      let feature = data[i];
      if(feature.children){
        feature.children.forEach(function (geneChild) {
          // isoform level
          if (transcriptTypes.indexOf(geneChild.type)>=0) {
            isoform_count += 1;
          }
        });
      }
    }
    return isoform_count;
  }

  drawGenomeFeature() {

    let data = this.props.data;
    let transcriptTypes = this.props.transcriptTypes;
    let dataRange = this.findRange(data);

    let view_start = dataRange.fmin;
    let view_end = dataRange.fmax;
    let exon_height = 10; // will be white / transparent
    let cds_height = 10; // will be colored in
    let isoform_height = 40; // height for each isoform
    let isoform_view_height = 20; // height for each isoform
    let isoform_title_height = 0; // height for each isoform
    let utr_height = 10; // this is the height of the isoform running all of the way through
    let transcript_backbone_height = 4; // this is the height of the isoform running all of the way through
    let arrow_height = 20;
    let arrow_width = 10;
    let arrow_points = '0,0 0,' + arrow_height + ' ' + arrow_width + ',' + arrow_width;
    let sortWeight = {
      'exon': 100
      , 'UTR': 200
      , 'five_prime_UTR': 200
      , 'three_prime_UTR': 200
      , 'CDS': 1000
    // , 'intron': 50
    };
    let calculatedHeight = this.props.height;
    let numberIsoforms = this.countIsoforms(this.props.data);
    if (numberIsoforms > this.MAX_ISOFORMS) {
      calculatedHeight = (this.MAX_ISOFORMS + 2) * isoform_height;
    }
    else {
      calculatedHeight = (numberIsoforms + 1) * isoform_height;
    }

    let margin = {top: 8, right: 30, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = calculatedHeight - margin.top - margin.bottom;

    let x = scaleLinear()
      .domain([view_start, view_end])
      .range([0, width]);


    // 9 ticks
    let viewLength = view_end - view_start;
    let resolution = Math.round(20 / Math.log(viewLength)) ;
    let resolutionString = '.'+resolution + 's';
    let tickFormat = x.tickFormat(5, resolutionString);

    let viewAvg = Math.log((view_end + view_start) / 2.0,10) ;
    let numTicks = 2 + viewAvg / resolution;


    let xAxis = axisTop(x)
      .ticks(numTicks, 's')
      .tickSize(8)
      .tickFormat(tickFormat);

    let viewer = select('#' + this.props.id)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    data = data.sort(function (a, b) {
      if(a.selected && !b.selected ) return -1 ;
      if(!a.selected && b.selected ) return 1 ;
      return a.name - b.name ;
    });

    let isoform_count = 0;
    for (let i in data) {

      let feature = data[i];
      let featureChildren = feature.children;
      if (featureChildren) {

        let selected = feature.selected;

        let maxIsoforms = this.MAX_ISOFORMS;
        let externalUrl = this.props.url;
        featureChildren = featureChildren.sort(function (a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return a - b;
        });
        featureChildren.forEach(function (featureChild) {
          let featureType = featureChild.type;
          if (transcriptTypes.indexOf(featureType)>=0) {
            if (isoform_count < maxIsoforms) {
              isoform_count += 1;

              viewer.append('polygon')
                .attr('class', style.transArrow)
                .attr('points', arrow_points)
                .attr('transform', function () {
                  if (feature.strand > 0) {
                    return 'translate(' + Number(x(featureChild.fmax)) + ',' + Number((isoform_view_height / 2.0) - (arrow_height / 2.0) + (isoform_height * isoform_count) + isoform_title_height) + ')';
                  }
                  else {
                    return 'translate(' + Number(x(featureChild.fmin)) + ',' + Number((isoform_view_height / 2.0) + (arrow_height / 2.0) + (isoform_height * isoform_count) + isoform_title_height) + ') rotate(180)';
                  }
                });

              viewer.append('rect')
                .attr('class', style.transcriptBackbone)
                .attr('x', x(featureChild.fmin))
                .attr('y', isoform_height * isoform_count + isoform_title_height)
                .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (transcript_backbone_height / 2.0)) + ')')
                .attr('height', transcript_backbone_height)
                .attr('width', x(featureChild.fmax) - x(featureChild.fmin));

              viewer.append('text')
                .attr('class', style.transcriptLabel)
                .attr('x', x(feature.fmin) + 30)
                .attr('y', isoform_height * isoform_count + isoform_title_height)
                .attr('fill', selected ? 'sandybrown' : 'gray')
                .attr('opacity', selected ? 1 : 0.5)
                .attr('height', isoform_title_height)
                .text(featureChild.name);

              // have to sort this so we draw the exons BEFORE the CDS
              featureChild.children = featureChild.children.sort(function (a, b) {

                let sortAValue = sortWeight[a.type];
                let sortBValue = sortWeight[b.type];

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
                else if (innerType == 'UTR' || innerType == 'five_prime_UTR' || innerType == 'three_prime_UTR') {
                  viewer.append('rect')
                    .attr('class', style.UTR)
                    .attr('x', x(innerChild.fmin))
                    .attr('y', isoform_height * isoform_count + isoform_title_height)
                    .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (utr_height / 2.0)) + ')')
                    .attr('z-index', 20)
                    .attr('height', utr_height)
                    .attr('width', x(innerChild.fmax) - x(innerChild.fmin));
                }
              });
            }
            else if (isoform_count == maxIsoforms) {
              ++isoform_count;
              viewer.append('a')
                .attr('class', style.transcriptLabel)
                .attr('xlink:href', externalUrl)
                .attr('xlink:show', 'new')
                .append('text')
                .attr('x', x(feature.fmin) + 30)
                .attr('y', isoform_height * isoform_count + isoform_title_height)
                .attr('fill', 'red')
                .attr('opacity', 1)
                .attr('height', isoform_title_height)
                .text('Maximum features displayed.  See full view for more.');
            }
          }
        });
      }
    }

    if (isoform_count == 0) {
      viewer.append('text')
        .attr('x', 30)
        .attr('y', isoform_title_height + 10)
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
  transcriptTypes: PropTypes.array,
  url: PropTypes.string,
  width: PropTypes.string,
};

export default GenomeFeature;

