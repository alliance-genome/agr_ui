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
      if(featureChildren){
          featureChildren.forEach(function (featureChild) {
              if (display_feats.indexOf(featureChild.type) >= 0) {
                  if (fmin < 0 || featureChild.fmin < fmin) {
                      fmin = featureChild.fmin;
                  }
                  if (fmax < 0 || featureChild.fmax > fmax) {
                      fmax = featureChild.fmax;
                  }
              }
          });//transcript level
      }//gene level
    }

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

function calculateNewTrackPosition(viewer){
  let viewerClass = viewer.attr('class');
  let classNames = viewerClass.split(' ');
  let viewTrackSelector = "." + classNames[0] + "." + classNames[1] + " .track";
  let nodes = d3.selectAll(viewTrackSelector).nodes();
        let usedHeight = 0;
        let numTracks = 0; //Number of tracks including axis
        nodes.forEach(node => {
                usedHeight += node.getBoundingClientRect().height + 1;
                numTracks++;
        });
    return usedHeight;
}
// Nasty function to get translate values since d3 deprecated.
function getTranslate(transform)
  {
      // Create a dummy g for calculation purposes only. This will never
      // be appended to the DOM and will be discarded once this function
      // returns.
      var g = document.createElementNS("http://www.w3.org/2000/svg", "g");

      // Set the transform attribute to the provided string value.
      g.setAttributeNS(null, "transform", transform);

      // consolidate the SVGTransformList containing all transformations
      // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
      // its SVGMatrix.
      var matrix = g.transform.baseVal.consolidate().matrix;

      // As per definition values e and f are the ones for the translation.
      return [matrix.e, matrix.f];
  }
  function setHighlights(selectedAlleles,svgTarget){
    let viewer_height= svgTarget.node().getBBox().height;
    let highlights=svgTarget.selectAll(".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins")
      .filter(function(d){
        let returnVal=false;
        //TODO This needs to be standardized.  We sometimes get these returned in a comma sperated list
        //and sometimes in an array.
        if(d.alleles){
          let ids=d.alleles[0].replace(/"|\[|\]| /g, "").split(',');
          ids.forEach((val) => {
            if (selectedAlleles.includes(val)){
              returnVal=true;
            }
          })
          d.alleles.forEach((val) => {
            if (selectedAlleles.includes(val)){
              returnVal=true;
            }
          })
        }
        return returnVal;
      })
      .datum(function(d){
        d.selected="true";
        return d;
      })
      .style("stroke" , "black")

      highlights.each(function(){
        let x_val=d3.select(this).attr('x');
        let width_val=d3.select(this).attr('width');
        if(width_val == null){
          width_val = 3;
          x_val = x_val-(width_val/2);
        }
        svgTarget.select(".deletions.track")
        .append('rect')
        .attr("class","highlight")
        .attr("x", x_val)
        .attr("width", width_val)
        .attr("height", viewer_height)
        .attr("fill", 'yellow')
        .attr("opacity", 0.8)
        .lower();
      })
  }


export { countIsoforms, findRange, checkSpace, doResize, calculateNewTrackPosition, getTranslate, setHighlights  }
