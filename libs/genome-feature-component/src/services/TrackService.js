function renderStrand(strand) {
  if(strand===1) return '+';
  if(strand===-1) return '-';
  return strand ;
}

export function renderTrackDescription(feature){
  let returnString = '';
  returnString += `<table class="tooltip-table" style="margin-top: 30px;"><tbody>`;
  if(feature.id.indexOf('http')<0){
    returnString += `<tr><th>Name</th><td>${feature.name} (${feature.id})</td></tr>`;
  }
  else{
    returnString += `<tr><th>Name</th><td>${feature.name}</td></tr>`;
  }
  returnString += `<tr><th>Type</th><td>${feature.type}</td></tr>`;
  returnString += `<tr><th>Source</th><td>${feature.source}</td></tr>`;

  returnString += `<tr><th>Location</th><td>${feature.seqId}:${feature.fmin}..${feature.fmax} (${renderStrand(feature.strand)})</td></tr>`;



  returnString += '</tbody></table>';
  return returnString;
}
export function getJBrowseLink(source,chr,start,end){
  let link = '';
  if(source === 'FlyBase') {link = "https://alliancegenome.org/jbrowse/?data=data%2FDrosophila%20melanogaster&tracks=Variants%2CAll%20Genes&highlight=&loc="+chr+"%3A"+start+".."+end;}
  else if(source === 'MGI'){link = "https://alliancegenome.org/jbrowse/?data=data%2FMus%20musculus&tracks=Variants%2CAll%20Genes&highlight=&loc="+chr+"%3A"+start+".."+end;}
  else if(source === 'WormBase'){link = "https://alliancegenome.org/jbrowse/?data=data%2FCaenorhabditis%20elegans&tracks=Variants%2CAll%20Genes&highlight=&loc="+chr+"%3A"+start+".."+end;}
  else if(source === 'ZFIN'){link = "https://alliancegenome.org/jbrowse/?data=data%2FDanio%20rerio&tracks=Variants%2CAll%20Genes&highlight=&loc="+chr+"%3A"+start+".."+end;}
  else if(source === 'SGD'){link = "https://alliancegenome.org/jbrowse/?data=data%2FSaccharomyces%20cerevisiae&tracks=Variants%2CAll%20Genes&highlight=&loc="+chr+"%3A"+start+".."+end;}
  else if(source === 'RGD'){link = "https://alliancegenome.org/jbrowse/?data=data%2FRattus%20norvegicus&tracks=Variants%2CAll%20Genes&highlight=&loc="+chr+"%3A"+start+".."+end;}
  //else if(source === 'human'){link = "https://stage.alliancegenome.org/jbrowse/?data=data%2FCHomo%20sapiens&tracks=Variants%2CAll%20Genes&highlight=&loc="+chr+"%3A"+start+".."+end;}
  else{
    console.warn("no source found",source);
    return 'Maximum features displayed.  See full view for more.'
  }
  return '<a href="'+link+'">Maximum features displayed.  See full view for more.</a>'
}
