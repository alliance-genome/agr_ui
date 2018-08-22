import {countIsoforms, findRange, checkSpace} from './utils';
import * as d3 from "d3";
// TODO:
// This can be refactored to an isoform track
// if we seperate out the top "global" label
var DrawGenomeView = function(data, svg_target){
  let MAX_ROWS = 10;
  let calculatedHeight = 500;

  let UTR_feats= ["UTR","five_prime_UTR","three_prime_UTR"];
  let CDS_feats= ["CDS"];
  let exon_feats= ["exon"];
  let display_feats=["mRNA"];
  let dataRange = findRange(data,display_feats);

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


  //need to build a new sortWeight since these can be dynamic
  let sortWeight = {};
  for(var i=0,len = UTR_feats.length; i <len; i++){
    sortWeight[UTR_feats[i]]=200;
  }
  for(var i=0,len = CDS_feats.length; i <len; i++){
    sortWeight[CDS_feats[i]]=1000;
  }
  for(var i=0,len = exon_feats.length; i <len; i++){
    sortWeight[exon_feats[i]]=100;
  }

  /*
  let sortWeight = {
    'exon': 100
    , 'UTR': 200
    , 'five_prime_UTR': 200
    , 'three_prime_UTR': 200
    , 'CDS': 1000
    // , 'intron': 50
  };
  */

  //Testing if the countIsoforms function is broked
  //let numberIsoforms =2;
  let numberIsoforms = countIsoforms(data);
  if (numberIsoforms > MAX_ROWS) {
    calculatedHeight = (MAX_ROWS + 2) * isoform_height;
  }
  else {
    calculatedHeight = (numberIsoforms + 1) * isoform_height;
  }

  let margin = {top: 8, right: 30, bottom: 30, left: 40},
     width = 960 - margin.left - margin.right,
     height = calculatedHeight - margin.top - margin.bottom;

  let x = d3.scaleLinear()
      .domain([view_start, view_end])
      .range([0, width]);

  // Clear it first maaang
  let viewer = d3.select(svg_target)
  viewer.selectAll("*").remove();

  viewer.attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  let row_count =0;
  let used_space = [];
  let fmin_display=-1;
  let fmax_display=-1;
  for (let i in data) {
    let feature = data[i];
    console.log(feature);
    let featureChildren = feature.children;
    if (featureChildren) {

      let selected = feature.selected;

      //do I need this?
      let maxRows = MAX_ROWS;
      //let externalUrl = this.props.url;
      //May want to remove this and add an external sort function
      //outside of the render method to put certain features on top.
      featureChildren = featureChildren.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return a - b;
      });
      featureChildren.forEach(function (featureChild) {
        let featureType = featureChild.type;
        if (display_feats.indexOf(featureType)>=0) {

          //function to assign row based on available space.
          let current_row = checkSpace(used_space,x(featureChild.fmin), x(featureChild.fmax));

          if (current_row < maxRows) {
            //Will need to remove this... rows not incremented every time now.
            row_count += 1;

            viewer.append('polygon')
              .datum(function(){
                let y_val;
                if (feature.strand > 0) {
                  y_val = Number((isoform_view_height / 2.0) - (arrow_height / 2.0) + (isoform_height * current_row) + isoform_title_height);
                }
                else {
                  y_val = Number((isoform_view_height / 2.0) + (arrow_height / 2.0) + (isoform_height * current_row) + isoform_title_height);
                }
                return {fmin: featureChild.fmin,fmax: featureChild.fmax,strand:feature.strand,y_val: y_val};
              })
              .attr('class', 'transArrow')
              .attr('points', arrow_points)
              .attr('transform', function (d) {
                if (feature.strand > 0) {
                  return 'translate('+Number(x(d.fmax))+',' + d.y_val + ')';
                }
                else {
                  return 'translate('+Number(x(d.fmin))+',' + d.y_val + ') rotate(180)';
                }
              });

            viewer.append('rect')
              .attr('class', 'transcriptBackbone')
              .attr('x', x(featureChild.fmin))
              .attr('y', isoform_height * current_row + isoform_title_height)
              .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (transcript_backbone_height / 2.0)) + ')')
              .attr('height', transcript_backbone_height)
              .attr('width', x(featureChild.fmax) - x(featureChild.fmin))
              .datum({fmin: featureChild.fmin,fmax: featureChild.fmax});

            var text_label = viewer.append('text')
              .attr('class', 'transcriptLabel')
              .attr('x', x(featureChild.fmin))
              .attr('y', isoform_height * current_row + isoform_title_height)
              .attr('fill', selected ? 'sandybrown' : 'gray')
              .attr('opacity', selected ? 1 : 0.5)
              .attr('height', isoform_title_height)
              .text(featureChild.name)
              .datum({fmin:featureChild.fmin});

              //Now that the label has been created we can calculate the space that
              //this new element is taking up making sure to add in the width of
              //the box.
              var text_width = text_label.node().getBBox().width;
              let bp_end=0;
              //First check to see if label goes past the end
              if (Number(text_width+x(featureChild.fmin))>width){
                console.log(featureChild.name+" goes over the edge");
              }
              let feat_end;
              if(text_width>x(featureChild.fmax)-x(featureChild.fmin)){
                feat_end=x(featureChild.fmin)+text_width;
              }
              else {
                feat_end=x(featureChild.fmax);
              }

              //This is probably not the most efficent way to do this.
              //Making an 2d array... each row is the first array (no zer0)
              //next level is each element taking up space.
              //Also using colons as spacers seems very perl... maybe change that?
              if (used_space[current_row]){
                let temp = used_space[current_row];
                temp.push(x(featureChild.fmin)+":"+feat_end);
                used_space[current_row]= temp;
              }
              else {
                used_space[current_row]=[x(featureChild.fmin)+":"+feat_end]
              }

              //Now check on bounds since this feature is displayed
              //The true end of display is converted to bp.
              if(fmin_display < 0 ||fmin_display > featureChild.fmin){
                fmin_display = featureChild.fmin;
              }
              if(fmax_display<0 || fmax_display < featureChild.fmax){
                fmax_display = featureChild.fmax;
              }

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
              if (exon_feats.indexOf(innerType)>=0) {
                viewer.append('rect')
                  .attr('class', 'exon')
                  .attr('x', x(innerChild.fmin))
                  .attr('y', isoform_height * current_row + isoform_title_height)
                  .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (exon_height / 2.0)) + ')')
                  .attr('height', exon_height)
                  .attr('z-index', 10)
                  .attr('width', x(innerChild.fmax) - x(innerChild.fmin))
                  .datum({fmin: innerChild.fmin,fmax: innerChild.fmax});
              }
              else if (CDS_feats.indexOf(innerType)>=0) {
                viewer.append('rect')
                  .attr('class', 'CDS')
                  .attr('x', x(innerChild.fmin))
                  .attr('y', isoform_height * current_row + isoform_title_height)
                  .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (cds_height / 2.0)) + ')')
                  .attr('z-index', 20)
                  .attr('height', cds_height)
                  .attr('width', x(innerChild.fmax) - x(innerChild.fmin))
                  .datum({fmin: innerChild.fmin,fmax: innerChild.fmax});
              }
              else if (UTR_feats.indexOf(innerType)>=0) {
                viewer.append('rect')
                  .attr('class', 'UTR')
                  .attr('x', x(innerChild.fmin))
                  .attr('y', isoform_height * current_row + isoform_title_height)
                  .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (utr_height / 2.0)) + ')')
                  .attr('z-index', 20)
                  .attr('height', utr_height)
                  .attr('width', x(innerChild.fmax) - x(innerChild.fmin))
                  .datum({fmin: innerChild.fmin,fmax: innerChild.fmax});
              }
            });
          }
          else if (current_row == maxRows) {
            ++current_row;
            viewer.append('a')
              .attr('class', 'transcriptLabel')
              //.attr('xlink:href', externalUrl)
              .attr('xlink:show', 'new')
              .append('text')
              .attr('x', x(feature.fmin) + 30)
              .attr('y', isoform_height * current_row + isoform_title_height)
              .attr('fill', 'red')
              .attr('opacity', 1)
              .attr('height', isoform_title_height)
              .text('Maximum features displayed.  See full view for more.');
          }
        }
      });
    }
  }
  if (row_count == 0) {
  viewer.append('text')
    .attr('x', 30)
    .attr('y', isoform_title_height + 10)
    .attr('fill', 'orange')
    .attr('opacity', 0.6)
    // .attr('height', isoform_title_height)
    .text('Overview of non-coding genome features unavailable at this time.');

  }
  else {

    //Check if resize is necessary
    /*
    if(fmin_display>view_start ||fmax_display < view_end){
        x = d3.scaleLinear()
          .domain([fmin_display, fmax_display])
          .range([0, width]);
        view_start = fmin_display;
        view_end = fmax_display;
      doResize(fmin_display,fmax_display,viewer,width,x);
      console.log(fmin_display,fmax_display);
    }
    */


    // 9 ticks
    let viewLength = view_end - view_start;
    let resolution = Math.round(30 / Math.log(viewLength)) ;
    let resolutionString = '.'+resolution + 's';
    let tickFormat = x.tickFormat(5, resolutionString);

    let xAxis = d3.axisTop(x)
      .ticks(8, 's')
      .tickSize(8)
      .tickFormat(tickFormat);

    viewer.append('g')
      .attr('class', 'axis')
      .attr('width', width)
      .attr('height', 20)
      .attr('transform', 'translate(0,20)')
      .call(xAxis);
  }
}

export default DrawGenomeView;