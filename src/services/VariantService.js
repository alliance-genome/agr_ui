import {getColorForConsequence} from "./ConsequenceService";

export function getDescriptionDimensions(description){
  const descriptionHeight = Object.keys(description).length;
  const descriptionWidth = Object.entries(description)
    .sort( (a,b) => {
      return b[1].length - a[1].length;
    } )[0][1].length;
  return {descriptionWidth,descriptionHeight};
}

// we have to guard for type
function findVariantBinIndexForPosition(variantBins,variant) {
  let {fmax, fmin, type} = variant;
  return variantBins.findIndex( fb => {
    const relativeMin = fb.fmin;
    const relativeMax = fb.fmax;

    // they can share type so long as neither is a deletion
    if( (type==='deletion' || fb.type ==='deletion') && type !== fb.type ) return false ;

    // if we overlap thAe min edge then take the minimum and whatever the maximum and add
    if(relativeMin <= fmin && relativeMax >= fmin){
      return true ;
    }
    // if we overlap the max edge then take the maximum and whatever the maximum and add
    if(relativeMax <= fmax && relativeMax >= fmax){
      return true ;
    }
    // if both are within the edges then just add it
    if(relativeMin >= fmin && relativeMax <= fmax){
      return true ;
    }

    return false ;
  });
}

// TODO: Delete, this is deprecated
export function generateVariantBins(variantData){
  // create variant bins for overlap over a single isoform
  // initially we do this for all of them, for both position and type
  let variantBins = [];
  variantData.forEach(variant => {
    let consequence = getConsequence(variant);
    let {type, fmax, fmin} = variant;
    // we should ONLY ever find one or zero
    let foundVariantBinIndex = variantBins.findIndex( fb => {
      const relativeMin = fb.fmin;
      const relativeMax = fb.fmax;

      if(fb.type !== type) return false ;
      if(fb.consequence !== consequence ) return false ;

      // if we overlap thAe min edge then take the minimum and whatever the maximum and add
      if(relativeMin <= fmin && relativeMax >= fmin){
        return true ;
      }
      // if we overlap the max edge then take the maximum and whatever the maximum and add
      if(relativeMax <= fmax && relativeMax >= fmax){
        return true ;
      }
      // if both are within the edges then just add it
      if(relativeMin >= fmin && relativeMax <= fmax){
        return true ;
      }

      return false ;
    });

    if(foundVariantBinIndex >=0 ){
      // add variant to this bin and adust the min and max
      let foundBin = variantBins[foundVariantBinIndex];
      const foundMatchingVariantSetIndex = variantBins[foundVariantBinIndex].variantSet ? variantBins[foundVariantBinIndex].variantSet.findIndex( b => b.type === type && b.consequence === consequence) : -1 ;
      if(foundMatchingVariantSetIndex>=0){
        variantBins[foundMatchingVariantSetIndex].variantSet.push(variant);
      }
      else{
        variantBins[foundVariantBinIndex].variantSet = [{
          variants: [variant],
          type,
          consequence,
        }];
      }

      foundBin.variants.push(variant);
      foundBin.fmin = Math.min(fmin,foundBin.fmin);
      foundBin.fmax = Math.max(fmax,foundBin.fmax);
      variantBins[foundVariantBinIndex] = foundBin;
    }
    else{
      const newBin = {
        fmin, fmax, type, consequence,
        variantSet: [{
          variants:[variant],
          type,
          consequence
        }],
        variants: [variant]
      };
      variantBins.push( newBin);
    }
  });
  return variantBins;
}

export function generateVariantDataBinsAndDataSets(variantData){
  let variantBins = [];
  variantData.forEach(variant => {
    let consequence = getConsequence(variant);
    let {type, fmax, fmin} = variant;
    // we should ONLY ever find one or zero

    let foundVariantBinIndex = findVariantBinIndexForPosition(variantBins,variant);

    // if a variant is found within a position bin
    if(foundVariantBinIndex >=0 ){

      // add variant to this bin and adjust the min and max
      let foundBin = variantBins[foundVariantBinIndex];
      const foundMatchingVariantSetIndex = foundBin.variantSet ? foundBin.variantSet.findIndex( b => b.type === type && b.consequence === consequence) : -1 ;
      // TODO:
      // if matching type and consequence, add the variant to the found variant set
      // adjust the bin min and max though
      if(foundMatchingVariantSetIndex>=0){
        let foundFmin = Math.min(foundBin.variantSet[foundMatchingVariantSetIndex].fmin,fmin) ;
        let foundFmax = Math.max(foundBin.variantSet[foundMatchingVariantSetIndex].fmax,fmax) ;
        foundBin.fmin = foundFmin ;
        foundBin.fmax = foundFmax ;
        foundBin.variantSet[foundMatchingVariantSetIndex].fmin = foundFmin ;
        foundBin.variantSet[foundMatchingVariantSetIndex].fmax = foundFmax ;
        foundBin.variantSet[foundMatchingVariantSetIndex].variants.push(variant);
      }
      else{
        let foundMin = Math.min(foundBin.fmin,fmin) ;
        let foundMax = Math.max(foundBin.fmax,fmax) ;

        foundBin.fmin = foundMin;
        foundBin.fmax = foundMax ;
        foundBin.variantSet.push({
          variants: [variant],
          type,
          consequence,
          fmin,
          fmax,
        });
      }

      foundBin.variants.push(variant);
      foundBin.fmin = Math.min(fmin,foundBin.fmin);
      foundBin.fmax = Math.max(fmax,foundBin.fmax);
      variantBins[foundVariantBinIndex] = foundBin;
    }
    else{
      const newBin = {
        fmin, fmax, type, consequence,
        variantSet: [{
          variants:[variant],
          type,
          consequence,
          fmin, fmax,
        }],
        variants: [variant]
      };
      variantBins.push( newBin);
    }
  });
  return variantBins;
}

export function renderVariantDescriptions(descriptions){
  if(descriptions.length===1){
    return renderVariantDescription(descriptions[0]);
  }
  else
  if(descriptions.length>1){
    let stringBuffer = '<ul style="list-style-type: none;">';
    for(let d of descriptions){
      stringBuffer += `<li style="border-bottom: solid 1px black;">${renderVariantDescription(d)}</li>`;
    }

    stringBuffer += '</ul>';
    return stringBuffer;

  }
  else{
    return 'No data available';
  }
}

export function renderVariantDescription(description){
  let {descriptionHeight, descriptionWidth} = getDescriptionDimensions(description);
  let returnString = '';
  const location = description.location ;
  const chromosome = location.split(':')[0];
  const [start,stop] = location.split(':')[1].split('..');
  returnString += `<table class="tooltip-table"><tbody>`;
  returnString += `<tr><th>Symbol</th><td>${description.symbol}</td></tr>`;
  returnString += `<tr><th>Type</th><td>${description.type}</td></tr>`;
  returnString += `<tr><th>Consequence</th><td>${description.consequence }</td></tr>`;
  if(description.impact){
    returnString += `<tr><th>Impact</th><td>${description.impact.length>descriptionWidth ? description.impact.substr(0,descriptionWidth) : description.impact}</td></tr>`;
  }
  returnString += `<tr><th>Length</th><td>${stop-start} bp</td></tr>`;
  if(description.name!==description.symbol){
    returnString += `<tr><th>Name</th><td>${description.name}</td></tr>`;
  }
  if(description.allele_of_genes){
    returnString += `<tr><th>Allele of Genes</th><td>${description.allele_of_genes.length>descriptionWidth ? description.allele_of_genes.substr(0,descriptionWidth) : description.allele_of_genes}</td></tr>`;
  }
  if(description.alleles){
    returnString += `<tr><th>Alleles</th><td>${description.alleles.length>descriptionWidth ? description.alleles.substr(0,descriptionWidth) : description.alleles}</td></tr>`;
  }
  if(description.alternative_alleles){
    returnString += `<tr><th>Alternative Alleles</th><td>${description.alternative_alleles.length>descriptionWidth ? description.alternative_alleles.substr(0,descriptionWidth) : description.alternative_alleles}</td></tr>`;
  }



  returnString += '</tbody></table>';
  return returnString;
}

export function getVariantDescriptions(variant){
  return variant.variants.map( v => {
    let description = getVariantDescription(v)
    description.consequence = description.consequence ? description.consequence : 'UNKNOWN';
    return description;
  })
}

export function mergeConsequenceColors(colors){
  return 'hotpink';
  // return colors.map( d => {
  //   return getColorForConsequence(d.consequence);
  // })
}

export function getColorsForConsequences(descriptions){
  return descriptions.map( d => {
    return getColorForConsequence(d.consequence);
  })
}

export function getConsequence(variant){
  let consequence = 'UNKNOWN';
  if(variant.geneLevelConsequence && variant.geneLevelConsequence.values && variant.geneLevelConsequence.values.length > 0){
    consequence = (Array.isArray(variant.geneLevelConsequence.values) ? variant.geneLevelConsequence.values.join(' ') : variant.geneLevelConsequence.values).replace(/"/g,"");
  }
  return consequence;
}

/**
 * Returns an object
 * @param variant
 * @returns {object}
 */
export function getVariantDescription(variant){
  const variantSymbol = getVariantSymbol(variant);
  // let returnString = `${variantSymbol} ${variant.seqId}:${variant.fmin}..${variant.fmax}`;
  let returnObject = {} ;
  returnObject.symbol=variantSymbol ;
  returnObject.location = `${variant.seqId}:${variant.fmin}..${variant.fmax}`;
  returnObject.consequence =  getConsequence(variant);
  returnObject.type =  variant.type;
  returnObject.name =  variant.name;
  returnObject.description =  variant.description;

  if(variant.allele_of_genes){
    if(variant.allele_of_genes.values && variant.allele_of_genes.values.length>0){
      returnObject.allele_of_genes =  (Array.isArray(variant.allele_of_genes.values) ? variant.allele_of_genes.values.join(' ') : variant.allele_of_genes.values).replace(/"/g,"");
    }
    else{
      returnObject.allele_of_genes =  variant.allele_of_genes;
    }
  }
  if(variant.alleles){
    if(variant.alleles.values &&  variant.alleles.values.length>0){
      returnObject.alleles =  (Array.isArray(variant.alleles.values) ? variant.alleles.values.join(' ') : variant.alleles.values).replace(/"/g,"");
    }
    else{
      returnObject.alleles =  variant.alleles;
    }
  }
  if(variant.alternative_alleles){
    if(variant.alternative_alleles.values  && variant.alternative_alleles.values.length>0){
      returnObject.alternative_alleles =  (Array.isArray(variant.alternative_alleles.values) ? variant.alternative_alleles.values.join(' ') : variant.alternative_alleles.values).replace(/"/g,"")
    }
    else{
      returnObject.alternative_alleles =  variant.alternative_alleles;
    }
  }
  if(variant.impact){
    if(variant.impact.values   && variant.impact.values.length>0){
      returnObject.impact = (Array.isArray(variant.impact.values) ?  variant.impact.values.join(' '): variant.impact.values).replace(/"/g,"")
    }
    else{
      returnObject.impact = variant.impact;
    }
  }

  return returnObject ;
}

export function getVariantSymbol(variant){
  if(variant.variants){
    if(variant.variants.length!==1){
      return variant.variants.length;
    }
    else{
      return getVariantSymbol(variant.variants[0]);
    }
  }
  let symbol = variant.name ;
  if(variant.symbol && !variant.symbol.values){
    symbol = variant.symbol;
  }
  else
  if(variant.symbol && variant.symbol.values && variant.symbol.values.length>0){
    symbol = variant.symbol.values[0];
  }
  // return  (symbol.length>20 ? symbol.substr(0,20) : symbol).replace(/"/g,"");
  symbol = symbol.replace (/<sup>/," ");
  return symbol.replace(/"|<\/sup>/g,"");
}
