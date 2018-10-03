/*
  Utility functions for tracks. This file is temporary and will be moved to the corresponding
  track util.
*/
import * as d3 from "d3-selection";
//Takes in the current entry start/end and the array of used space and assigns a row
function checkSpace(used_space, start, end)
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
      for(var z=0; z<used_space[i].length; z++){

        var [used_start,used_end] = used_space[i][z].split(':');

        //check for overlap
        if(end<used_start||start>used_end){
          fits=1;
        }
        else {
          fits=0;break;
        }
      }
      if(fits){
        assigned=1;row=i;break;
      }
    }
    //if this is true for 0 rows... use the next row.
    //zero indexed so length is the next one.
    if(!assigned)
      {row =used_space.length;}
  }
  return row;
}

function doResize(fmin_display, fmax_display, viewer, width,newx)
{
  console.log("Do resize.");

  viewer.selectAll("rect.transcriptBackbone")
    .attr("x", function(d){return newx(d.fmin);})
    .attr('width', function(d){return newx(d.fmax) - newx(d.fmin);});

  viewer.selectAll("rect.exon")
    .attr("x", function(d){return newx(d.fmin);})
    .attr('width', function(d){return newx(d.fmax) - newx(d.fmin);});

  viewer.selectAll("rect.CDS")
    .attr("x", function(d){return newx(d.fmin);})
    .attr('width', function(d){return newx(d.fmax) - newx(d.fmin);});

  viewer.selectAll("rect.UTR")
    .attr("x", function(d){return newx(d.fmin);})
    .attr('width', function(d){return newx(d.fmax) - newx(d.fmin);});

  viewer.selectAll("polygon.transArrow")
  .attr('transform', function (d) {
    if (d.strand > 0) {
      return 'translate('+Number(newx(d.fmax))+',' + d.y_val + ')';
    }
    else {
      return 'translate('+Number(newx(d.fmin))+',' + d.y_val + ') rotate(180)';
    }
  });

  // TODO: remove unused?
  var text_label = viewer.selectAll("text.transcriptLabel")
    .attr("x", function(d){
      return Number(newx(d.fmin))
    })
    .attr("class",function(d){
      text_width = this.getBBox().width;
      if((newx(d.fmin)+text_width)>width){
        return "REMOVE";
      }
      else {
        return "transcriptLabel";
      }
    });

    viewer.selectAll("text.REMOVE").remove();
}

//Function to find range
//Now with checkSpace function embedded.
//Will only check rows that make it into the final viz.
//Needs to assign the row as well
//Added check for type.... all types were getting included even if
//we had no intention to display them
function findRange(data, display_feats)
{
    let fmin = -1;
    let fmax = -1;

    for (let d in data) {
      let feature = data[d];
      let featureChildren = feature.children;
      featureChildren.forEach(function (featureChild) {
            if (display_feats.indexOf(featureChild.type)>=0){
              if (fmin < 0 || featureChild.fmin < fmin) {
                fmin = featureChild.fmin;
              }
              if (fmax < 0 || featureChild.fmax > fmax) {
                fmax = featureChild.fmax;
              }
            }
        });//transcript level
      }//gene level

    return {
      fmin: fmin,
      fmax: fmax
    };
}

function countIsoforms(data)
{
    let isoform_count = 0;
    // gene level
    for (let i in data) {
      let feature = data[i];
      if(feature.children){
        feature.children.forEach(function (geneChild) {
          // isoform level
          if (geneChild.type == 'mRNA') {
            isoform_count += 1;
          }
        });
      }
    }
    return isoform_count;
  }

function calculateNewTrackPosition(){
  let nodes = d3.selectAll(".track").nodes();
        let usedHeight = 0;
        let numTracks = 0; //Number of tracks including axis
        nodes.forEach(node => {
                usedHeight += node.getBoundingClientRect().height + 10;
                numTracks++;
        });
    return usedHeight;
}


export { countIsoforms, findRange, checkSpace, doResize,calculateNewTrackPosition  }
