//import {scaleLinear} from "d3-scale";
//import {axisTop} from "d3-axis";
//import {select} from "d3-selection";
//import style from 'App.css';
var d3 = require ("d3");

var DrawGenomeView = function(data){

  //Some of these were in different places
  //Not sure if we want these as constants or not
  let MAX_ROWS = 10;
  let calculatedHeight = 500;
  //console.log(data);
  //data = getDataApollo('1','1000','2000');
  //console.log(data);


  let dataRange = findRange(data);

  let view_start = dataRange.fmin;
  let view_end = dataRange.fmax;
  //console.log(view_start);
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

  //Testing if the countIsoforms function is broked
  //let numberIsoforms =2;
  let numberIsoforms = countIsoforms(data);
  if (numberIsoforms > MAX_ROWS) {
    calculatedHeight = (MAX_ROWS + 2) * isoform_height;
  }
  else {
    calculatedHeight = (numberIsoforms + 1) * isoform_height;
  }
  console.log(numberIsoforms);
  let margin = {top: 8, right: 30, bottom: 30, left: 40},
     width = 960 - margin.left - margin.right,
     height = calculatedHeight - margin.top - margin.bottom;

  let x = d3.scaleLinear()
      .domain([view_start, view_end])
      .range([0, width]);

  // 9 ticks
  let viewLength = view_end - view_start;
  let resolution = Math.round(30 / Math.log(viewLength)) ;
  let resolutionString = '.'+resolution + 's';
  let tickFormat = x.tickFormat(5, resolutionString);

  let xAxis = d3.axisTop(x)
    .ticks(8, 's')
    .tickSize(8)
    .tickFormat(tickFormat);

  let viewer = d3.select('#viewer')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  let row_count =0;
  let used_space = [];
  for (let i in data) {

    let feature = data[i];
    let featureChildren = feature.children;
    if (featureChildren) {

      let selected = feature.selected;

      //do I need this?
      let maxRows = MAX_ROWS;
      //let externalUrl = this.props.url;
      featureChildren = featureChildren.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return a - b;
      });
      featureChildren.forEach(function (featureChild) {
        let featureType = featureChild.type;
        if (featureType == 'mRNA') {
          //function to assign row based on available space.
          let current_row = checkSpace(used_space,featureChild.fmin, featureChild.fmax);
          if (current_row < maxRows) {
            //Will need to remove this... rows not incremented every time now.
            row_count += 1;

            viewer.append('polygon')
              .attr('class', 'transArrow')
              .attr('points', arrow_points)
              .attr('transform', function () {
                if (feature.strand > 0) {
                  return 'translate(' + Number(x(featureChild.fmax)) + ',' + Number((isoform_view_height / 2.0) - (arrow_height / 2.0) + (isoform_height * current_row) + isoform_title_height) + ')';
                }
                else {
                  return 'translate(' + Number(x(featureChild.fmin)) + ',' + Number((isoform_view_height / 2.0) + (arrow_height / 2.0) + (isoform_height * current_row) + isoform_title_height) + ') rotate(180)';
                }
              });

              //This is probably not the most efficent way to do this.
              if (used_space[current_row]){
                let temp = used_space[current_row];
                temp.push(featureChild.fmin+":"+featureChild.fmax);
                used_space[current_row]= temp;
              }
              else {
                used_space[current_row]=[featureChild.fmin+":"+featureChild.fmax]
              }



            viewer.append('rect')
              .attr('class', 'transcriptBackbone')
              .attr('x', x(featureChild.fmin))
              .attr('y', isoform_height * current_row + isoform_title_height)
              .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (transcript_backbone_height / 2.0)) + ')')
              .attr('height', transcript_backbone_height)
              .attr('width', x(featureChild.fmax) - x(featureChild.fmin));

            viewer.append('text')
              .attr('class', 'transcriptLabel')
              .attr('x', x(feature.fmin))
              .attr('y', isoform_height * current_row + isoform_title_height)
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
                  .attr('class', 'exon')
                  .attr('x', x(innerChild.fmin))
                  .attr('y', isoform_height * current_row + isoform_title_height)
                  .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (exon_height / 2.0)) + ')')
                  .attr('height', exon_height)
                  .attr('z-index', 10)
                  .attr('width', x(innerChild.fmax) - x(innerChild.fmin));
              }
              else if (innerType == 'CDS') {
                viewer.append('rect')
                  .attr('class', 'CDS')
                  .attr('x', x(innerChild.fmin))
                  .attr('y', isoform_height * current_row + isoform_title_height)
                  .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (cds_height / 2.0)) + ')')
                  .attr('z-index', 20)
                  .attr('height', cds_height)
                  .attr('width', x(innerChild.fmax) - x(innerChild.fmin));
              }
              else if (innerType == 'UTR' || innerType == 'five_prime_UTR' || innerType == 'three_prime_UTR') {
                viewer.append('rect')
                  .attr('class', 'UTR')
                  .attr('x', x(innerChild.fmin))
                  .attr('y', isoform_height * current_row + isoform_title_height)
                  .attr('transform', 'translate(0,' + ( (isoform_view_height / 2.0) - (utr_height / 2.0)) + ')')
                  .attr('z-index', 20)
                  .attr('height', utr_height)
                  .attr('width', x(innerChild.fmax) - x(innerChild.fmin));
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

    console.log("This happens");
  }
  else {
    viewer.append('g')
      .attr('class', 'axis')
      .attr('width', width)
      .attr('height', 20)
      .attr('transform', 'translate(0,20)')
      .call(xAxis);
  }
  //console.log(used_space);

};

function findRange(data) {
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
};

function countIsoforms(data) {
  let isoform_count = 0;
  // gene level
  for (let i in data) {
    let feature = data[i];
    if(feature.children){
      feature.children.forEach(function (geneChild) {
        // isoform level
        //console.log(geneChild.type);
        //changing this to processed_pseudogene for demo... was mRNA
        if (geneChild.type == 'mRNA') {
          isoform_count += 1;
        }
      });
    }
  }
  return isoform_count;
}

var GenerateGenomeView= function(chr, start, end)
{
  //Clear it first maaang
  var svg = d3.select("#viewer");
  svg.selectAll("*").remove();
  //Right now this is Hardcoded
  let externalLocationString = chr + ':' + start + '..' + end;
  dataUrl ="https://agr-apollo.berkeleybop.io/apollo/track/Homo%20sapiens/All%20Genes/" + encodeURI(externalLocationString) + ".json";
  console.log(dataUrl);
  fetch(dataUrl)
      .then((response) => {
          response.json()
      .then(data => {
              //console.log("In the data function maaaan.");
              //console.log(data);
              DrawGenomeView(data);

          });
  })
  .catch((error) => {
    console.log(error);
  });
  //return data;
}
//Takes in the current entry start/end and the array of used space and assigns a row
function checkSpace(used_space,start,end)
{
  var row;
  var assigned;
  var fits;
  //if empty... this is the first entry... on the first row.

  if(used_space.length==0)
    {row = 1;}
  else{
    //for each row
    for(var i=1; i<used_space.length; i++){
      //for each entry in that row
      console.log(used_space[i].length);
      for(var z=0; z<used_space[i].length; z++){

        var [used_start,used_end] = used_space[i][z].split(':');
        //check for overlap
        if(end<used_start||start>used_end){
          fits=1;
          console.log("yar");
        }
        else {
          fits=0;
          break;
        }
      }
      if(fits){
        assigned=1;
        row=i;
        break;
      }
    }
    //if this is true for 0 rows... use the next row.
    //zero indexed so length is the next one.
    if(!assigned)
      {row =used_space.length;}
  }
  console.log("Put this feature in this row! Start"+start+" End"+end+" row"+row);
  return row;

}
module.exports= GenerateGenomeView;
