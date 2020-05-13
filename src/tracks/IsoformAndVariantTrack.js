import * as d3 from "d3";
import {calculateNewTrackPosition, checkSpace, findRange} from '../RenderFunctions';
import {
  generateDelinsPoint,
  generateInsertionPoint,
  generateSnvPoints,
  generateVariantDataBinsAndDataSets,
  getColorsForConsequences,
  getVariantDescriptions,
  getVariantSymbol,
  renderVariantDescriptions,
  getVariantTrackPositions,
} from "../services/VariantService";
import {renderTrackDescription} from "../services/TrackService";
// import {description} from "d3/dist/package";
import {ApolloService} from "../services/ApolloService";
let apolloService = new ApolloService();

// TODO: make configurable and a const / default
let MAX_ROWS = 9;

export default class IsoformAndVariantTrack {

  constructor(viewer, track, height, width, transcriptTypes, variantTypes,showVariantLabel,variantFilter,binRatio,visibleVariants) {
    this.trackData = {};
    this.variantData = {};
    this.viewer = viewer;
    this.width = width;
    this.variantFilter = variantFilter;
    this.height = height;
    this.transcriptTypes = transcriptTypes;
    this.variantTypes = variantTypes;
    this.binRatio = binRatio ;
    this.visibleVariants = visibleVariants ;
    this.showVariantLabel = showVariantLabel!==undefined ? showVariantLabel : true ;
  }

  // Draw our track on the viewer
  // TODO: Potentially seperate this large section of code
  // for both testing/extensibility
  DrawTrack() {
    let isoformData = this.trackData;
    let variantData = this.filterVariantData(this.variantData,this.variantFilter,this.visibleVariants);
    let viewer = this.viewer;
    let width = this.width;
    let showVariantLabel = this.showVariantLabel;
    let visibleVariants = this.visibleVariants;
    let binRatio = this.binRatio;

    let distinctVariants= getVariantTrackPositions(variantData);
    let numVariantTracks=distinctVariants.length;


    let UTR_feats = ["UTR", "five_prime_UTR", "three_prime_UTR"];
    let CDS_feats = ["CDS"];
    let exon_feats = ["exon"];
    let display_feats = this.transcriptTypes;
    let dataRange = findRange(isoformData, display_feats);

    let viewStart = dataRange.fmin;
    let viewEnd = dataRange.fmax;

    // constants
    const EXON_HEIGHT = 10; // will be white / transparent
    const CDS_HEIGHT = 10; // will be colored in
    const ISOFORM_HEIGHT = 40; // height for each isoform
    const GENE_LABEL_HEIGHT = 20 ;
    const MIN_WIDTH = 2;
    const ISOFORM_TITLE_HEIGHT = 0; // height for each isoform
    const UTR_HEIGHT = 10; // this is the height of the isoform running all of the way through
    const VARIANT_HEIGHT = 10; // this is the height of the isoform running all of the way through
    const VARIANT_OFFSET = 20; // this is the height of the isoform running all of the way through
    const TRANSCRIPT_BACKBONE_HEIGHT = 4; // this is the height of the isoform running all of the way through
    const ARROW_HEIGHT = 20;
    const ARROW_WIDTH = 10;
    const ARROW_POINTS = '0,0 0,' + ARROW_HEIGHT + ' ' + ARROW_WIDTH + ',' + ARROW_WIDTH;
    const SNV_HEIGHT = 10;
    const SNV_WIDTH = 10;
    const VARIANT_TRACK_HEIGHT = 40;//Not sure if this needs to be dynamic or not
    const LABEL_PADDING=22.5;

    const insertion_points = (x) => {
      return `${x-(SNV_WIDTH/2.0)},${SNV_HEIGHT} ${x},0 ${x+(SNV_WIDTH/2.0)},${SNV_HEIGHT}`;
    };

    const delins_points = (x) => {
      // const delins_strings = `${x-(snv_width/2.0)},${snv_height} ${x},0 ${x+(snv_width/2.0)},${snv_height}`;
      return `${x-(SNV_WIDTH/2.0)},${SNV_HEIGHT} ${x+(SNV_WIDTH/2.0)},${SNV_HEIGHT} ${x-(SNV_WIDTH/2.0)},${0} ${x+(SNV_WIDTH/2.0)},${0}`;
    };

    let x = d3.scaleLinear()
      .domain([viewStart, viewEnd])
      .range([0, width]);

    //Lets put this here so that the "track" part will give us extra space automagically
    let variantContainer = viewer.append("g").attr("class", "variants track")
      .attr("transform", "translate(0,22.5)");
    //Append Invisible Rect to give space properly if only one track exists.
    //variantContainer.append('rect').style("opacity", 0).attr("height", VARIANT_HEIGHT*numVariantTracks).attr("width",width);

    //need to build a new sortWeight since these can be dynamic
    let sortWeight = {};
    for (let i = 0, len = UTR_feats.length; i < len; i++) {
      sortWeight[UTR_feats[i]] = 200;
    }
    for (let i = 0, len = CDS_feats.length; i < len; i++) {
      sortWeight[CDS_feats[i]] = 1000;
    }
    for (let i = 0, len = exon_feats.length; i < len; i++) {
      sortWeight[exon_feats[i]] = 100;
    }

    let geneList = {};

    isoformData = isoformData.sort(function (a, b) {
      if (a.selected && !b.selected) return -1;
      if (!a.selected && b.selected) return 1;
      return a.name - b.name;
    });

    let heightBuffer = 0 ;

    let tooltipDiv = d3.select("body").append("div")
      .attr("class", "gfc-tooltip")
      .style('visibility', 'visible')
      .style("opacity", 0);

    const closeToolTip = () => {
        tooltipDiv.transition()
          .duration(100)
          .style("opacity", 10)
          .style("visibility","hidden");
    };
    // **************************************
    // Seperate isoform and variant render
    // **************************************
      let variantBins = generateVariantDataBinsAndDataSets(variantData,(viewEnd-viewStart)*binRatio);
      variantBins.forEach(variant => {
        let {type, fmax, fmin} = variant;
        let drawnVariant = true;
        let isPoints = false;
        let viewerWidth = this.width;
        let symbol_string = getVariantSymbol(variant);
        const descriptions = getVariantDescriptions(variant);
        let descriptionHtml = renderVariantDescriptions(descriptions);
        const consequenceColor = getColorsForConsequences(descriptions)[0];
        const width = Math.ceil(x(fmax)-x(fmin)) < MIN_WIDTH ? MIN_WIDTH : Math.ceil(x(fmax)-x(fmin));
        if (type.toLowerCase() === 'deletion') {
          variantContainer.append('rect')
            .attr('class', 'variant-deletion')
            .attr('x', x(fmin))
            .attr('transform', 'translate(0,'+VARIANT_HEIGHT*distinctVariants.indexOf("deletion")+')')
            .attr('z-index', 30)
            .attr('fill', consequenceColor)
            .attr('height', VARIANT_HEIGHT)
            .attr('width', width)
            .on("click", d => {
              renderTooltipDescription(tooltipDiv,descriptionHtml,closeToolTip);
            })
            .on("mouseover", function(d){
              let theVariant = d.variant;
              d3.selectAll(".variant-deletion")
                .filter(function(d){return d.variant === theVariant})
                .style("stroke" , "black");
              d3.select(this.parentNode).raise().selectAll(".variantLabel,.variantLabelBackground")
                .filter(function(d){return d.variant === theVariant})
                .style("opacity", 1);
            })
            .on("mouseout", function(d){
              d3.selectAll(".variant-deletion")
                .style("stroke" , null);
              d3.select(this.parentNode).selectAll(".variantLabel,.variantLabelBackground")
                .style("opacity",0);
            })
            .datum({fmin: fmin, fmax: fmax, variant: symbol_string+fmin});
        } else if (type.toLowerCase() === 'snv' || type.toLowerCase() === 'point_mutation') {
          isPoints = true;
          variantContainer.append('polygon')
            .attr('class', 'variant-SNV')
            .attr('points', generateSnvPoints(x(fmin)))
            .attr('fill', consequenceColor)
            .attr('x', x(fmin))
            .attr('transform', 'translate(0,'+VARIANT_HEIGHT*distinctVariants.indexOf("snv")+')')
            .attr('z-index', 30)
            .on("click", d => {
              renderTooltipDescription(tooltipDiv,descriptionHtml,closeToolTip);
            })
            .on("mouseover", function(d){
              let theVariant = d.variant;
              d3.selectAll(".variant-SNV")
                .filter(function(d){return d.variant === theVariant})
                .style("stroke" , "black");
              d3.select(this.parentNode).raise().selectAll(".variantLabel,.variantLabelBackground")
                .filter(function(d){return d.variant === theVariant})
                .style("opacity", 1);
            })
            .on("mouseout", function(d){
              d3.selectAll(".variant-SNV")
                .style("stroke" , null);
              d3.select(this.parentNode).selectAll(".variantLabel,.variantLabelBackground")
                .style("opacity",0);
            })
            .datum({fmin: fmin, fmax: fmax, variant: symbol_string+fmin});
        } else if (type.toLowerCase() === 'insertion') {
          isPoints = true;
            variantContainer.append('polygon')
              .attr('class', 'variant-insertion')
              .attr('points', generateInsertionPoint(x(fmin)))
              .attr('fill', consequenceColor)
              .attr('x', x(fmin))
              .attr('transform', 'translate(0,'+VARIANT_HEIGHT*distinctVariants.indexOf("insertion")+')')
              .attr('z-index', 30)
              .on("click", d => {
                renderTooltipDescription(tooltipDiv,descriptionHtml,closeToolTip);
              })
              .on("mouseover", function(d){
                let theVariant = d.variant;
                d3.selectAll(".variant-insertion")
                  .filter(function(d){return d.variant === theVariant})
                  .style("stroke" , "black");
                d3.select(this.parentNode).raise().selectAll(".variantLabel,.variantLabelBackground")
                  .filter(function(d){return d.variant === theVariant})
                  .style("opacity", 1);
              })
              .on("mouseout", function(d){
                d3.selectAll(".variant-insertion")
                  .style("stroke" , null);
                d3.select(this.parentNode).selectAll(".variantLabel,.variantLabelBackground")
                  .style("opacity",0);
              })
              .datum({fmin: fmin, fmax: fmax, variant: symbol_string+fmin});
        } else if (type.toLowerCase() === 'delins' || type.toLowerCase() === 'substitution' || type.toLowerCase() === 'indel' || type.toLowerCase() === 'mnv') {
          isPoints=true;
          variantContainer.append('polygon')
            .attr('class', 'variant-delins')
            .attr('points', generateDelinsPoint(x(fmin)))
            .attr('x', x(fmin))
            .attr('transform', 'translate(0,'+VARIANT_HEIGHT*distinctVariants.indexOf("delins")+')')
            .attr('fill', consequenceColor)
            .attr('z-index', 30)
            .on("click", d => {
              renderTooltipDescription(tooltipDiv,descriptionHtml,closeToolTip);
            })
            .on("mouseover", function(d){
              let theVariant = d.variant;
              d3.selectAll(".variant-delins")
                .filter(function(d){return d.variant === theVariant})
                .style("stroke" , "black");
              d3.select(this.parentNode).raise().selectAll(".variantLabel,.variantLabelBackground")
                .filter(function(d){return d.variant === theVariant})
                .style("opacity", 1);
            })
            .on("mouseout", function(d){
              d3.selectAll(".variant-delins")
                .style("stroke" , null);
              d3.select(this.parentNode).selectAll(".variantLabel,.variantLabelBackground")
                .style("opacity",0);
            })
            .datum({fmin: fmin, fmax: fmax, variant: symbol_string+fmin});
        }
        else{
          console.warn("type not found",type,variant);
          drawnVariant = false ;
        }

        if(drawnVariant){
          let label_offset=0;
          if(isPoints){
            label_offset = x(fmin)-SNV_WIDTH/2;
          }else {
            label_offset = x(fmin);}

          const symbol_string_length = symbol_string.length ? symbol_string.length : 1;
          let label_height=VARIANT_HEIGHT*numVariantTracks+LABEL_PADDING;
          let variant_label = variantContainer.append('text')
            .attr('class', 'variantLabel')
            .attr('fill', consequenceColor)
            .attr('opacity', 0)
            .attr('height', ISOFORM_TITLE_HEIGHT)
            .attr("transform", "translate("+label_offset+","+label_height+")")
            .html(symbol_string)
            .on("click", d => {
              renderTooltipDescription(tooltipDiv,descriptionHtml,closeToolTip);
            })
            .datum({fmin: fmin, variant: symbol_string+fmin});

            let symbol_string_width = variant_label.node().getBBox().width;
            if(parseFloat(symbol_string_width+label_offset)>viewerWidth){
              let diff = parseFloat(symbol_string_width+label_offset-viewerWidth);
              label_offset-=diff;
              variant_label.attr("transform", "translate("+label_offset+",35)");
            }
        }
      });

    // Calculate where this track should go and translate it, must be after the variant lables are added
    let newTrackPosition = calculateNewTrackPosition(this.viewer);
    let track = viewer.append("g").attr('transform', 'translate(0,' + newTrackPosition + ')').attr("class", "track");

    let row_count = 0;
    let used_space = [];
    let fmin_display = -1;
    let fmax_display = -1;
    let renderTooltipDescription = this.renderTooltipDescription;
    // **************************************
    // FOR NOW LETS FOCUS ON ONE GENE ISOFORM
    // **************************************
    // let feature = data[0];
    for (let i = 0; i < isoformData.length && row_count < MAX_ROWS; i++) {
      let feature = isoformData[i];
      let featureChildren = feature.children;
      if (featureChildren) {

        let selected = feature.selected;

        //May want to remove this and add an external sort function
        //outside of the render method to put certain features on top.
        featureChildren = featureChildren.sort(function (a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return a - b;
        });


        // For each isoform..
        let warningRendered = false ;
        featureChildren.forEach(function (featureChild) {
          //
          let featureType = featureChild.type;

          if (display_feats.indexOf(featureType) >= 0) {
            //function to assign row based on available space.
            // *** DANGER EDGE CASE ***/
            let current_row = checkSpace(used_space, x(featureChild.fmin), x(featureChild.fmax));
            if (row_count < MAX_ROWS) {
              // An isoform container

              let text_string, text_label;
              let addingGeneLabel = false ;
              if(Object.keys(geneList).indexOf(feature.name)<0) {
                heightBuffer += GENE_LABEL_HEIGHT ;
                addingGeneLabel = true ;
                geneList[feature.name] = 'Green';
              }

              let isoform = track.append("g").attr("class", "isoform")
                .attr("transform", "translate(0," + ((row_count * ISOFORM_HEIGHT) + 10 + heightBuffer) + ")")
              ;

              if(addingGeneLabel){
                text_string = feature.name;
                text_label = isoform.append('text')
                  .attr('class', 'geneLabel')
                  .attr('fill', selected ? 'sandybrown' : 'black')
                  .attr('height', ISOFORM_TITLE_HEIGHT)
                  .attr("transform", "translate(" + x(featureChild.fmin) + `,-${GENE_LABEL_HEIGHT})`)
                  .text(text_string)
                  .on("click", d => {
                    renderTooltipDescription(tooltipDiv,renderTrackDescription(feature),closeToolTip);
                  })
                  .datum({fmin: featureChild.fmin});
              }

              isoform.append("polygon")
                .datum(function () {
                  return {fmin: featureChild.fmin, fmax: featureChild.fmax, strand: feature.strand};
                })
                .attr('class', 'transArrow')
                .attr('points', ARROW_POINTS)
                .attr('transform', function (d) {
                  if (feature.strand > 0) {
                    return 'translate(' + Number(x(d.fmax)) + ',0)';
                  } else {
                    return 'translate(' + Number(x(d.fmin)) + ',' + ARROW_HEIGHT + ') rotate(180)';
                  }
                })
                .on("click", d => {
                  renderTooltipDescription(tooltipDiv,renderTrackDescription(featureChild),closeToolTip);
                })
              ;

              isoform.append('rect')
                .attr('class', 'transcriptBackbone')
                .attr('y', 10 + ISOFORM_TITLE_HEIGHT)
                .attr('height', TRANSCRIPT_BACKBONE_HEIGHT)
                .attr("transform", "translate(" + x(featureChild.fmin) + ",0)")
                .attr('width', x(featureChild.fmax) - x(featureChild.fmin))
                .on("click", d => {
                  renderTooltipDescription(tooltipDiv,renderTrackDescription(featureChild),closeToolTip);
                })
                .datum({fmin: featureChild.fmin, fmax: featureChild.fmax});

              text_string = featureChild.name ;
              text_label = isoform.append('text')
                .attr('class', 'transcriptLabel')
                .attr('fill', selected ? 'sandybrown' : 'gray')
                .attr('opacity', selected ? 1 : 0.5)
                .attr('height', ISOFORM_TITLE_HEIGHT)
                .attr("transform", "translate(" + x(featureChild.fmin) + ",0)")
                .text(text_string)
                .on("click", d => {
                  renderTooltipDescription(tooltipDiv,renderTrackDescription(featureChild),closeToolTip);
                })
                .datum({fmin: featureChild.fmin});

              //Now that the label has been created we can calculate the space that
              //this new element is taking up making sure to add in the width of
              //the box.
              // TODO: this is just an estimate of the length
              let text_width = text_string.length * 2;
              let feat_end;


              // not some instances (as in reactjs?) the bounding box isn't available, so we have to guess
              try {
                text_width = text_label.node().getBBox().width;
              } catch (e) {
                // console.error('Not yet rendered',e)
              }
              //First check to see if label goes past the end
              if (Number(text_width + x(featureChild.fmin)) > width) {
                // console.error(featureChild.name + " goes over the edge");
              }
              if (text_width > x(featureChild.fmax) - x(featureChild.fmin)) {
                feat_end = x(featureChild.fmin) + text_width;
              } else {
                feat_end = x(featureChild.fmax);
              }

              //This is probably not the most efficent way to do this.
              //Making an 2d array... each row is the first array (no zer0)
              //next level is each element taking up space.
              //Also using colons as spacers seems very perl... maybe change that?
              // *** DANGER EDGE CASE ***/
              if (used_space[current_row]) {
                let temp = used_space[current_row];
                temp.push(x(featureChild.fmin) + ":" + feat_end);
                used_space[current_row] = temp;
              } else {
                used_space[current_row] = [x(featureChild.fmin) + ":" + feat_end]
              }

              //Now check on bounds since this feature is displayed
              //The true end of display is converted to bp.
              if (fmin_display < 0 || fmin_display > featureChild.fmin) {
                fmin_display = featureChild.fmin;
              }
              if (fmax_display < 0 || fmax_display < featureChild.fmax) {
                fmax_display = featureChild.fmax;
              }

              // have to sort this so we draw the exons BEFORE the CDS
              if(featureChild.children){

                featureChild.children = featureChild.children.sort(function (a, b) {

                  let sortAValue = sortWeight[a.type];
                  let sortBValue = sortWeight[b.type];

                  if (typeof sortAValue === 'number' && typeof sortBValue === 'number') {
                    return sortAValue - sortBValue;
                  }
                  if (typeof sortAValue === 'number' && typeof sortBValue !== 'number') {
                    return -1;
                  }
                  if (typeof sortAValue !== 'number' && typeof sortBValue === 'number') {
                    return 1;
                  }
                  // NOTE: type not found and weighted
                  return a.type - b.type;
                });

                featureChild.children.forEach(function (innerChild) {
                  let innerType = innerChild.type;


                  let validInnerType = false;
                  if (exon_feats.indexOf(innerType) >= 0) {
                    validInnerType = true;
                    isoform.append('rect')
                      .attr('class', 'exon')
                      .attr('x', x(innerChild.fmin))
                      .attr('transform', 'translate(0,' + (EXON_HEIGHT - TRANSCRIPT_BACKBONE_HEIGHT) + ')')
                      .attr('height', EXON_HEIGHT)
                      .attr('z-index', 10)
                      .attr('width', x(innerChild.fmax) - x(innerChild.fmin))
                      .on("click", d => {
                        renderTooltipDescription(tooltipDiv,renderTrackDescription(featureChild),closeToolTip);
                      })
                      .datum({fmin: innerChild.fmin, fmax: innerChild.fmax});
                  } else if (CDS_feats.indexOf(innerType) >= 0) {
                    validInnerType = true;
                    isoform.append('rect')
                      .attr('class', 'CDS')
                      .attr('x', x(innerChild.fmin))
                      .attr('transform', 'translate(0,' + (CDS_HEIGHT - TRANSCRIPT_BACKBONE_HEIGHT) + ')')
                      .attr('z-index', 20)
                      .attr('height', CDS_HEIGHT)
                      .attr('width', x(innerChild.fmax) - x(innerChild.fmin))
                      .on("click", d => {
                        renderTooltipDescription(tooltipDiv,renderTrackDescription(featureChild),closeToolTip);
                      })
                      .datum({fmin: innerChild.fmin, fmax: innerChild.fmax});
                  } else if (UTR_feats.indexOf(innerType) >= 0) {
                    validInnerType = true;
                    isoform.append('rect')
                      .attr('class', 'UTR')
                      .attr('x', x(innerChild.fmin))
                      .attr('transform', 'translate(0,' + (UTR_HEIGHT - TRANSCRIPT_BACKBONE_HEIGHT) + ')')
                      .attr('z-index', 20)
                      .attr('height', UTR_HEIGHT)
                      .attr('width', x(innerChild.fmax) - x(innerChild.fmin))
                      .on("click", d => {
                        renderTooltipDescription(tooltipDiv,renderTrackDescription(featureChild),closeToolTip);
                      })
                      .datum({fmin: innerChild.fmin, fmax: innerChild.fmax});
                  }
                });
              }
              row_count += 1;

            }
            if (row_count === MAX_ROWS && !warningRendered) {
              // *** DANGER EDGE CASE ***/
              ++current_row;
              warningRendered = true ;
              // let isoform = track.append("g").attr("class", "isoform")
              //     .attr("transform", "translate(0," + ((row_count * isoform_height) + 10) + ")")
              track.append('a')
                .attr('class', 'transcriptLabel')
                .attr('xlink:show', 'new')
                .append('text')
                .attr('x', 10)
                .attr('y', 10)
                .attr("transform", "translate(0," + ((row_count * ISOFORM_HEIGHT) + 20 +heightBuffer ) + ")")
                .attr('fill', 'red')
                .attr('opacity', 1)
                .attr('height', ISOFORM_TITLE_HEIGHT)
                .text('Maximum features displayed.  See full view for more.');
            }
          }
        });
      }
    }


    if (row_count === 0) {
      track.append('text')
        .attr('x', 30)
        .attr('y', ISOFORM_TITLE_HEIGHT + 10)
        .attr('fill', 'orange')
        .attr('opacity', 0.6)
        .text('Overview of non-coding genome features unavailable at this time.');
    }
    // we return the appropriate height function
    return (row_count * ISOFORM_HEIGHT) + heightBuffer + VARIANT_TRACK_HEIGHT;
  }

  filterVariantData(variantData, variantFilter,visibleVariants) {
    if(variantFilter.length===0 && (visibleVariants===undefined || visibleVariants.length===0)) return variantData ;
    try {
      return variantData.filter(v => {
        if(visibleVariants && visibleVariants.length>0){
          try{
            const variantId = v.alleles.values[0].replace(/"/g,"")
            const symbol = v.symbol.values[0].replace(/"/g,"")
            return (
              visibleVariants.indexOf(variantId)>=0 ||
              visibleVariants.indexOf(symbol)>=0
            )
          }
          catch(e){
            console.error('problem extracting symbol',e)
            return true
          }
        }
        const variantName = v.name;
        const variantSymbol = v.symbol.values[0].replace(/\"/g, ""); // has to be filtered
        return variantFilter.indexOf(variantName) >= 0 || variantFilter.indexOf(variantSymbol) >= 0;
      });
    } catch (e) {
      console.warn('problem filtering variant data',variantData,variantFilter,e);
    }
  }

  renderTooltipDescription(tooltipDiv, descriptionHtml,closeFunction) {
    tooltipDiv.transition()
      .duration(200)
      .style("width", 'auto')
      .style("height", 'auto')
      .style("opacity", 1)
      .style('visibility', 'visible');

    tooltipDiv.html(descriptionHtml)
      .style("left", (d3.event.pageX+10) + "px")
      .style("top", (d3.event.pageY +10) + "px")
      .append('button')
      .attr("type","button")
      .text('Close')
      .on('click', () => closeFunction());

    tooltipDiv.append('button')
      .attr("type", 'button')
      .html('&times;')
      .attr('class', "tooltipDivX")
      .on('click' , () => closeFunction());

  }

  async populateTrack(track) {
    await this.getTrackData(track);
    await this.getVariantData(track);
  }

  /* Method for isoformTrack service call */
  async getTrackData(track) {
    let externalLocationString = track["chromosome"] + ':' + track["start"] + '..' + track["end"];
    const isoformUrl = track["isoform_url"];
    const dataUrl = isoformUrl[0] + encodeURI(track["genome"]) + isoformUrl[1] + encodeURI(externalLocationString) + isoformUrl[2];
    this.trackData= await apolloService.fetchDataFromUrl(dataUrl);
  }

  /* Method for isoformTrack service call */
  async getVariantData(track) {
    const externalLocationString = track["chromosome"] + ':' + track["start"] + '..' + track["end"];
    const variantUrl = track["variant_url"];
    const dataUrl = variantUrl[0] + encodeURI(track["genome"]) + variantUrl[1] + encodeURI(externalLocationString) + variantUrl[2];
    this.variantData = await apolloService.fetchDataFromUrl(dataUrl);
  }
}
