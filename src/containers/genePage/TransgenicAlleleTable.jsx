import React from 'react';
import PropTypes from 'prop-types';
import { AlleleCell, DataTable, SpeciesCell } from '../../components/dataTable';
import ConstructLink from '../../components/ConstructLink.jsx';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import CommaSeparatedGeneList from '../allelePage/CommaSeparatedGeneList.jsx';
import RotatedHeaderCell from '../../components/dataTable/RotatedHeaderCell.jsx';
import BooleanLinkCell from '../../components/dataTable/BooleanLinkCell.jsx';
import { getDistinctFieldValue, simplifySpeciesNameSC } from '../../components/dataTable/utils.jsx';
import { compareByFixedOrder, getSpeciesNameCorrected } from '../../lib/utils';
import { SPECIES_NAME_ORDER } from '../../constants';
import SpeciesName from '../../components/SpeciesName.jsx';
import DataSourceLinkCuration from "../../components/dataSourceLinkCuration.jsx";

const constructsRelatedGenesFormatter = (constructRelatedGenes) =>
  constructRelatedGenes.map(({ id, genes }) => (
    <div key={id}>
      <CommaSeparatedGeneList genes={genes} />
    </div>
  ));

const TransgenicAlleleTable = ({ geneId }) => {
  const {
    data: results,
    supplementalData,
    ...tableProps
  } = useDataTableQuery(`/api/gene/${geneId}/transgenic-alleles`);

  const data = results?.map((result) => ({
    ...result,
    construct: result.alleleDocument.transgenicAlleleConstructs.map((transgenicAlleleConstruct) => ({
      id: transgenicAlleleConstruct.construct.id,
      construct: transgenicAlleleConstruct.construct,
    })),
    constructExpressedGene: result.alleleDocument.transgenicAlleleConstructs.map((transgenicAlleleConstruct) => ({
      id: transgenicAlleleConstruct.construct.id,
      genes: transgenicAlleleConstruct.expressedGenes,
    })),
    constructTargetedGene: result.alleleDocument.transgenicAlleleConstructs.map((transgenicAlleleConstruct) => ({
      id: transgenicAlleleConstruct.construct.id,
      genes: transgenicAlleleConstruct.construct.targetGenes,
    })),
    constructRegulatedGene: result.alleleDocument.transgenicAlleleConstructs.map((transgenicAlleleConstruct) => ({
      id: transgenicAlleleConstruct.construct.id,
      genes: transgenicAlleleConstruct.regulatoryGenes,
    })),
  }));

  const columns = [
    {
      dataField: 'alleleDocument.allele.taxon',
      text: 'Species',
      headerNode: (
        <>
          Species
          <br />
          <small className="text-muted text-transform-none">(carrying the transgene)</small>
        </>
      ),
      formatter: (taxon) => <SpeciesName>{simplifySpeciesNameSC(taxon?.name)}</SpeciesName>,
      filterable: getDistinctFieldValue(supplementalData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterFormatter: (taxon) => <SpeciesName>{taxon.name}</SpeciesName>,
      headerStyle: { width: '100px' },
    },
    {
      dataField: 'alleleDocument.allele',
      text: 'Allele symbol',
      formatter: (allele) => <AlleleCell allele={allele} usePeid={true} />,
      headerStyle: { width: '185px' },
      filterable: true,
      filterName: 'allele',
    },
    {
      dataField: 'alleleDocument.transgenicAlleleConstructs',
      text: 'Transgenic construct',
      helpPopupProps: {
        id: 'gene-page--transgenetic-allele-table--transgenic-construct-help',
        children: (
          <span>
            The symbol of the construct (following species specific guidelines). This represents the construct
            independent of the host organism.
          </span>
        ),
      },
      formatter: (constructs) =>
        constructs.map((transgenicAlleleConstruct) => (
          <div className="text-break">
            <div key={transgenicAlleleConstruct.construct.primaryExternalId} className="text-break">
              <DataSourceLinkCuration reference={transgenicAlleleConstruct.construct.dataProviderCrossReference}>
                {transgenicAlleleConstruct.construct?.dataProviderCrossReference?.referencedCurie}
              </DataSourceLinkCuration>
            </div>
          </div>
        )),
      headerStyle: { width: '185px' },
      filterable: true,
      filterName: 'construct',
    },
    {
      dataField: 'constructExpressedGene',
      text: 'Expressed components',
      helpPopupProps: {
        id: 'gene-page--transgenetic-allele-table--expressed-components-help',
        children: (
          <span>
            The genetic elements expressed by the construct. These may be full or partial genes and may include both
            protein coding and non-protein coding genes.
          </span>
        ),
      },
      formatter: constructsRelatedGenesFormatter,
      headerStyle: { width: '130px' },
      filterable: true,
    },
    {
      dataField: 'constructTargetedGene',
      text: 'Knock-down targets',
      helpPopupProps: {
        id: 'gene-page--transgenetic-allele-table--knock-down-targets-help',
        children: (
          <span>
            If the transgenic construct contains elements designed to interfere with expression of another gene, then
            those genes are listed here.
          </span>
        ),
      },
      formatter: constructsRelatedGenesFormatter,
      headerStyle: { width: '120px' },
      filterable: true,
    },
    {
      dataField: 'constructRegulatedGene',
      text: 'Regulatory regions',
      helpPopupProps: {
        id: 'gene-page--transgenetic-allele-table--regulatory-regions-help',
        children: (
          <span>
            The genetic elements driving expression of the other elements in the construct. Examples are: upstream
            activation sequence (UAS), human cytomegalovirus (CMV), and in worm, daf-16.
          </span>
        ),
      },
      formatter: constructsRelatedGenesFormatter,
      headerStyle: { width: '120px' },
      filterable: true,
    },
    {
      dataField: 'hasDisease',
      text: 'Has Disease Annotations',
      formatter: (hasDisease, allele) => (
        <BooleanLinkCell to={`/allele/${allele.id}#disease-associations`} value={hasDisease} />
      ),
      headerNode: <RotatedHeaderCell>Has Disease Annotations</RotatedHeaderCell>,
      headerStyle: {
        width: '50px',
        height: '130px',
      },
      filterable: ['true', 'false'],
      filterFormatter: (val) => (val === 'true' ? 'Yes' : 'No'),
    },
    {
      dataField: 'hasPhenotype',
      text: 'Has Phenotype Annotations',
      formatter: (hasPhenotype, allele) => (
        <BooleanLinkCell to={`/allele/${allele.id}#phenotypes`} value={hasPhenotype} />
      ),
      headerNode: <RotatedHeaderCell>Has Phenotype Annotations</RotatedHeaderCell>,
      headerStyle: {
        width: '115px', // wider because this one is on the end!
        height: '145px',
      },
      filterable: ['true', 'false'],
      filterFormatter: (val) => (val === 'true' ? 'Yes' : 'No'),
    },
  ];

  return (
    <DataTable
      {...tableProps}
      keyField="id"
      columns={columns}
      data={data}
      downloadUrl={`/api/gene/${geneId}/transgenic-alleles/download`}
    />
  );
};

TransgenicAlleleTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default TransgenicAlleleTable;
