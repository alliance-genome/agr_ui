export function ParseJSONToCSV(data, category) {
  data.map(item => delete item.relatedData);

  let csv = '';
  let row = '';
  //get headers
  for(let idx in data[0]){
    row += idx +  ',';
  }

  row = row.slice(0, -1);
  csv += row + '\r\n';
  // get each row
  for(let i=0; i < data.length; i++){
    row = '';
    for(let idx in data[i]){
      row += '"' + data[i][idx] + '",';
    }
    row.slice(0, row.length - 1);
    csv += row + '\r\n';
  }

  let fileName = 'Alliance_' + category + '_search_results';
  let download_uri = 'data:text/csv;charset=utf-8,' + escape(csv);

  let link = document.createElement('a');
  link.href = download_uri;

  link.style = 'visibility:hidden';
  link.download = fileName + '.csv';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
