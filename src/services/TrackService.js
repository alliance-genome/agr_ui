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
