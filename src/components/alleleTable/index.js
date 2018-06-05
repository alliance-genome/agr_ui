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

  render() {

    const alleles = this.props.data;

    let dataSet =[];
    let synonyms = [];

    alleles && alleles.forEach((allele) => {
      let diseaseDocuments = allele.diseaseDocuments;
      synonyms.push(...allele.synonyms);

      let sourceList = [];
      for (let doc of diseaseDocuments) {
        for (let source of doc.sourceList) {
         sourceList.push(source.name);
        }
      }

      let diseaseDocumentName = [];
      for (let doc of diseaseDocuments) {
          diseaseDocumentName.push(doc.name);
      }

      dataSet.push({
        symbol: allele.symbol,
        synonym: synonyms,
        source: sourceList,
        theAssociatedHumanDiseases: diseaseDocumentName,
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
      {
        field: 'source',
        label: 'Source',
        isKey: false,
      },
      {
        field: 'theAssociatedHumanDiseases',
        label: 'Associated Human Disease',
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
