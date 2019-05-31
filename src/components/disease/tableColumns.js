/*
* Disease ribbon table columns
* column list: key, species, gene, term, stage, assay, source, reference, genetic-entity, Association, Evidence, BasedOn,
*/

import {
  SpeciesCell,
  GeneCell,
  ReferenceCell,
  DiseaseNameCell,
  EvidenceCodesCell
} from '../dataTable';

let columns = [
  {
    dataField: 'key',
    text: 'key',
    hidden: true,
  },
  {
    dataField: 'species',
    text: 'Species',
    filterable: true,
    headerStyle: {width: '100px'},
    formatter: SpeciesCell,
    hidden: false
  },
  {
    dataField: 'disease',
    text: 'Disease',
    filterable: true,
    headerStyle: {width: '100px'},
    formatter: DiseaseNameCell,
    hidden: true
  },
  {
    dataField: 'geneticEntity',
    text: 'Genetic Entity',
    filterable: true,
    headerStyle: {width: '105px'},
    hidden: true

  },
  {
    dataField: 'evidenceCode',
    text: 'Evidence Code',
    filterable: true,
    headerStyle: {width: '100px'},
    formatter: EvidenceCodesCell,
    hidden: false

  },
  {
    dataField: 'associationType',
    text: 'Association Type',
    formatter: (type) => type.replace(/_/g, ' '),
    filterable: true,
    headerStyle: {width: '100px'},
    hidden: false
  },
  {
    dataField: 'based_on',
    text: 'Based On',
    filterable: true,
    headerStyle: {width: '100px'},
    hidden: false
  },
  {
    dataField: 'gene',
    text: 'Gene',
    formatter: GeneCell,
    filterable: true,
    headerStyle: {width: '75px'},
    hidden: false
  },
  {
    dataField: 'reference',
    text: 'References',
    filterable: true,
    headerStyle: {width: '150px'},
    formatter: ReferenceCell,
    hidden: false
  }

];

const getColumns = (genesData) => {
  genesData = genesData || [];
  columns = columns.map((item) => {
    if (item.dataField == 'gene' || item.dataField == 'species') {
      item.hidden = genesData.length < 2 ? true : false;
    }
    return item;
  });

  return columns;
};

export {
  getColumns
};
