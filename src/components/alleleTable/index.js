/* eslint-disable */
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';

class AlleleTable extends Component {
   constructor(props) {
    super(props);
  }

  renderSymbol(symbol){
    return <i dangerouslySetInnerHTML={{ __html: symbol }} />;
  }

  renderSynonym(synonym){
    return '';
  }

  renderDiseaseDocuments(documentArray){
    if(documentArray.length>0){
      return documentArray[0].name;
    }
  }

  renderSourceList(sourceList){
    if(sourceList.length>0){
      return sourceList[0].name;
    }
  }

  render() {

    const alleles = this.props.data;

    let dataSet =[];

    alleles && alleles.forEach((allele) => {
      let diseaseDocuments = allele.diseaseDocuments;
      let sourceList = diseaseDocuments.sourceList;

        dataSet.push({
          symbol: allele.symbol,
          synonym: allele.synonym,
          // sourceList: sourceList,
          diseaseDocuments: diseaseDocuments,
        });
    });

    const columns = [
      {
        field: 'symbol',
        label: 'Symbol',
        format: this.renderSymbol,
        isKey: true,
      },
      {
        field: 'synonym',
        label: 'Synonym',
        format: this.renderSynonym,
        isKey: false,
      },
      // {
      //   field: 'sourceList',
      //   label: 'Source',
      //   format: this.renderSourceList,
      //   isKey: false,
      // },
      {
        field: 'diseaseDocuments',
        label: 'Associated Human Disease',
        format: this.renderDiseaseDocuments,
        isKey: false,
      },
    ];

    return (
      <div>
         <BootstrapTable
           bordered={false}
           columns={columns}
           data={dataSet}
           version='4'
         >
            {
            columns.map((col, idx) =>
              <TableHeaderColumn
                csvFormat={col.asText}
                csvHeader={col.label}
                dataField={col.field}
                dataFormat={col.format}
                dataSort={col.sortable}
                filterValue={col.asText}
                isKey={col.isKey}
                key={idx}
                width={col.width}
              >
                {col.label}
              </TableHeaderColumn>
            )
            }
          </BootstrapTable>
      </div>
    );
  }
}

AlleleTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default AlleleTable;
