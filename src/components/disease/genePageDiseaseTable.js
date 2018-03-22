import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DiseaseNameCell from './diseaseNameCell';
import ReferenceCell from './referenceCell';
import { LocalDataTable } from '../../components/dataTable';
import ExternalLink from '../../components/externalLink';
import { uniq } from 'lodash.uniq';
import EvidenceCodesCell from './evidenceCodesCell';

class GenePageDiseaseTable extends Component {

  renderGeneticEntity(featureDocument){

    if(featureDocument){
      return (
        <ExternalLink href={featureDocument.modCrossRefFullUrl}>
          <div dangerouslySetInnerHTML={{__html: featureDocument.symbol}} />
        </ExternalLink>
      );
    }
    return '';
  }

  renderGeneticEntityType(featureDocument){
    if(featureDocument){
      return <div>{featureDocument.category}</div>;
    }
    return '';
  }

  renderEvidenceCodes(publications){
    if(publications){
      let returnValue = publications && uniq(publications.map((publication) => {
        return (
          publication.evidenceCodes
        );
      }).reduce((a, b) => a.concat(b)))
      .filter((x, i, a) => a.indexOf(x) == i)
      .sort();

      return returnValue.join(', ');
    }

    return '';
  }

  render() {
    const diseases = this.props.data;
    const filename = this.props.filename;

    let data = [];
    diseases.forEach((disease) => {
      disease.annotations.forEach((annotation) => {

        data.push({
          name: disease.name,
          doId: disease.doId,
          associationType: annotation.associationType.replace(/_/g, ' '),
          entityName: annotation.featureDocument,
          entityCategory: annotation.featureDocument,
          dataProvider: annotation.source.name,
          publications: annotation.publications,
          refs: annotation.publications,
        });
      });
    });
    data.sort((a, b) => {
      return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
    });

    const refsText = (refs) => {
      return refs.map(ref => ref.pubMedId || ref.pubModId || '').join(', ');
    };

    const columns = [
      {
        field: 'name',
        label: 'Disease',
        format: DiseaseNameCell,
        isKey: true,
        sortable: true,
        filterable: true,
      },
      {
        field: 'entityName',
        label: 'Genetic Entity',
        format: this.renderGeneticEntity,
        sortable: true,
        filterable: true,
        asText: (featureDocument) => featureDocument ? featureDocument.symbol : ''
      },
      {
        field: 'entityCategory',
        label: 'Genetic Entity Type',
        format: this.renderGeneticEntityType,
        sortable: true,
        filterable: true,
        asText: (featureDocument) => featureDocument ? featureDocument.category : ''
      },
      {
        field: 'associationType',
        label: 'Association',
        sortable: true,
        filterable: true,
      },
      {
        field: 'publications',
        label: 'Evidence Code',
        format: EvidenceCodesCell,
        asText: EvidenceCodesCell,
        sortable: true,
        filterable: true,
      },
      {
        field: 'dataProvider',
        label: 'Source',
        sortable: true,
        filterable: true,
      },
      {
        field: 'refs',
        label: 'References',
        format: ReferenceCell,
        asText: refsText,
        sortable: true,
        filterable: true,
      }
    ];

    return (
      <LocalDataTable columns={columns} data={data} filename={filename} paginated />
    );
  }
}

GenePageDiseaseTable.propTypes = {
  data: PropTypes.array.isRequired,
  filename: PropTypes.string,
};

export default GenePageDiseaseTable;
