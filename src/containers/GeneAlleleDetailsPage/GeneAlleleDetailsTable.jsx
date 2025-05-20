import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import {
  AlleleCell,
  BooleanLinkCell,
  DataTable,
  GeneCell,
  VEPTextCell,
} from '../../components/dataTable';
import fetchData from '../../lib/fetchData';
import SynonymList from '../../components/synonymList.jsx';
import NoData from '../../components/noData.jsx';
import VariantJBrowseLink from '../../components/variant/VariantJBrowseLink.jsx';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import { getSingleGenomeLocation, findFminFmax, getTableUrl } from '../../lib/utils';
import VariantsSequenceViewer from '../genePage/VariantsSequenceViewer.jsx';
import ErrorBoundary from '../../components/errorBoundary.jsx';

const getSiftStyle = (sift) => {
  switch (sift && sift.toLowerCase()) {
  case 'tolerated':
    return 'text-success';
  case 'tolerated_low_confidence':
    return 'text-success';
  case 'deleterious_low_confidence':
    return 'text-warning';
  case 'deleterious':
    return 'text-danger';
  default:
    return 'text-muted';
  }
};

const getPolyphenStyle = (polyphen) => {
  switch (polyphen && polyphen.toLowerCase()) {
  case 'benign':
    return 'text-success';
  case 'possibly_damaging':
    return 'text-warning';
  case 'probably_damaging':
    return 'text-danger';
  default:
    return 'text-muted';
  }
};

const GeneAlleleDetailsTable = ({ isLoadingGene, gene, geneId }) => {
  const geneLocation = getSingleGenomeLocation(gene.genomeLocations);
  const baseUrl = `/api/gene/${geneId}/allele-variant-detail`;

  const tableQuery = useDataTableQuery(baseUrl, undefined, {
    sizePerPage: 25,
  }, {}, 300000);
  const { isLoading } = tableQuery;

  const data = tableQuery.data.map((row) => ({
    ...row,
    key: `${row.allele.id}-${row.variant && row.variant.id}-${row.consequence && row.consequence.transcript && row.consequence.transcript.id}`,
  }));
  const columns = [
    {
      text: 'Allele / Variant Symbol',
      dataField: 'allele',
      formatter: (allele) => <AlleleCell allele={allele} />,
      filterable: true,
      filterName: 'symbol',
      headerStyle: {width: '200px'},
    },
    {
      text: 'Allele / Variant Synonyms',
      dataField: 'allele.synonyms',
      formatter: synonyms => <SynonymList synonyms={synonyms} />,
      filterable: true,
      filterName: 'synonyms',
      headerStyle: {width: '200px'},
    },
    {
      text: 'Category',
      dataField: 'allele.category',
      filterable: true,
      filterName: 'alleleCategory',
      headerStyle: {width: '250px'},
    },
    {
      text: 'Has Phenotype',
      dataField: 'allele.hasPhenotype',
      formatter: (hasPhenotype, row) => (
        <BooleanLinkCell
          to={`/allele/${row.allele && row.allele.id}#phenotypes`}
          value={hasPhenotype}
        />
      ),
      filterName: 'hasPhenotype',
      filterable: ['true', 'false'],
      filterFormatter: val => val === 'true' ? 'Yes' : 'No',
      headerStyle: {width: '100px'},
    },
    {
      text: 'Has Disease',
      dataField: 'allele.hasDisease',
      formatter: (hasDisease, row) => (
        <BooleanLinkCell
          to={`/allele/${row.allele && row.allele.id}#disease-associations`}
          value={hasDisease}
        />
      ),
      filterName: 'hasDisease',
      filterable: ['true', 'false'],
      filterFormatter: val => val === 'true' ? 'Yes' : 'No',
      headerStyle: {width: '80px'},
    },
    {
      text: 'Variant HGVS.g name',
      dataField: 'variant',
      formatter: (variant) => variant ? (
        <div className="text-truncate">
          <VariantJBrowseLink
            geneLocation={geneLocation}
            geneSymbol={gene.symbol}
            location={variant.location}
            species={gene.species && gene.species.name}
            type={variant.variantType && variant.variantType.name}
	    taxonid={gene.species && gene.species.taxonId}
          >{variant.displayName}</VariantJBrowseLink>
        </div>
      ) : null,
      headerStyle: {width: '300px'},
      filterable: true,
      filterName: 'hgvsgName',
    },
    {
      text: 'Variant Type',
      dataField: 'variant.variantType.name',
      formatter: VEPTextCell,
      filterable: true,
      filterName: 'variantType',
      headerStyle: {width: '150px'},
    },
    {
      text: 'Sequence feature',
      dataField: 'consequence.transcript.name',
      headerStyle: {width: '250px'},
      filterable: true,
      filterName: 'sequenceFeature',
    },
    {
      text: 'Sequence feature type',
      dataField: 'consequence.sequenceFeatureType',
      formatter: VEPTextCell,
      filterable: true,
      filterName: 'sequenceFeatureType',
      headerStyle: {width: '200px'},
    },
    {
      text: 'Sequence feature associated gene',
      dataField: 'consequence.associatedGene',
      formatter: GeneCell,
      filterable: true,
      filterName: 'associatedGeneSymbol',
      headerStyle: {width: '150px'},
    },
    {
      text: 'Variant Location',
      dataField: 'consequence.location',
      headerStyle: {width: '100px'},
      filterable: true,
      filterName: 'variantLocation',
    },
    {
      text: 'Molecular consequence',
      dataField: 'consequence.molecularConsequences',
      formatter: (molecularConsequences) => (
        <span>{(molecularConsequences || []).join(', ')}</span>
      ),
      filterable: true,
      filterName: 'molecularConsequence',
      headerStyle: {width: '350px'},
    },
    {
      text: 'VEP Impact',
      dataField: 'consequence.impact',
      filterable: true,
      filterName: 'variantImpact',
      headerStyle: {width: '120px'},
    },
    {
      text: 'SIFT prediction',
      dataField: 'consequence.siftPrediction',
      formatter: (siftPrediction) => (
        <span className={getSiftStyle(siftPrediction)}>{siftPrediction && siftPrediction.replace(/_/g, ' ')}</span>
      ),
      filterable: true,
      filterName: 'variantSift',
      headerStyle: {width: '200px'},
    },
    {
      text: 'SIFT score',
      dataField: 'consequence.siftScore',
      formatter: (siftScore, { consequence }) => (
        <span className={getSiftStyle(consequence && consequence.siftPrediction)}>{siftScore}</span>
      ),
      headerStyle: {width: '100px'},
    },
    {
      text: 'PolyPhen prediction',
      dataField: 'consequence.polyphenPrediction',
      formatter: (polyphenPrediction) => (
        <span className={getPolyphenStyle(polyphenPrediction)}>{polyphenPrediction && polyphenPrediction.replace(/_/g, ' ')}</span>
      ),
      filterable: true,
      filterName: 'variantPolyphen',
      headerStyle: {width: '180px'},
    },
    {
      text: 'PolyPhen score',
      dataField: 'consequence.polyphenScore',
      formatter: (polyphenScore, { consequence }) => (
        <span className={getPolyphenStyle(consequence && consequence.polyphenPrediction)}>{polyphenScore}</span>
      ),
      headerStyle: {width: '150px'},
    },
  ];

  const sortOptions = [
    {
      value: 'variantHgvsName',
      label: 'Variant HGVS.g'
    },
    {
      value: 'variant',
      label: 'Allele/variant symbol',
    },
    {
      value: 'variantType',
      label: 'Variant type',
    },
    {
      value: 'molecularConsequence',
      label: 'Molecular consequence',
    },
    {
      value: 'transcript',
      label: 'Transcripts'
    }
  ];

  const [alleleIdsSelected, setAlleleIdsSelected] = useState([]);
  const tableStateAlleleFiltered = useMemo(() => ({
    ...tableQuery.tableState,
    page: 1,
    sizePerPage: 1000,
  }), [tableQuery.tableState]);
  const allelesFiltered = useQuery({
    queryKey: [baseUrl, tableStateAlleleFiltered],
    queryFn: () => {
      const nonHTPCategories = ['allele', 'allele with multiple associated variants', 'allele with one associated variant'];
      return fetchData(
        getTableUrl(`${baseUrl}?filter.alleleCategory=${encodeURIComponent(nonHTPCategories.join('|'))}`, tableStateAlleleFiltered),
        {},
        300000
      );
    }
  });

  const variantsSequenceViewerProps = useMemo(() => {

    const variants = allelesFiltered.data?.results ?
      allelesFiltered.data.results.flatMap(
        row => (row && row.variant) || []
      ) :
      [];
    const variantLocations = variants.map(variant => variant && variant.location);
    const { fmin, fmax } = findFminFmax([geneLocation, ...variantLocations]);

    /*
       Warning!
       The data format here should be agreed upon by the maintainers of the VariantsSequenceViewer.
       Changes might break the VariantsSequenceViewer.
    */
    const formatAllele = (alleleId) => (
      {
        id: alleleId,
      }
    );
    return {
      gene: gene,
      fmin: fmin,
      fmax: fmax,
      hasVariants: isLoading ? undefined : Boolean(variants && variants.length),
      allelesSelected: alleleIdsSelected.map(formatAllele),
      allelesVisible: allelesFiltered.data?.results ? allelesFiltered.data.results.map(({allele}) => formatAllele(allele.id)) : [],
      onAllelesSelect: setAlleleIdsSelected,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, allelesFiltered.data, alleleIdsSelected, setAlleleIdsSelected]);

  const selectRow = useMemo(() => {
    const rowsSelected = data.filter(row => alleleIdsSelected.indexOf(row.allele.id) > -1);
    return ({
      mode: 'checkbox',
      clickToSelect: true,
      hideSelectColumn: true,
      selected: rowsSelected.map(row => row.key),
      onSelect: (row) => {
        const alleleIdRow = row.allele.id;
        setAlleleIdsSelected(alleleIdsSelectedPrev => {
          if (alleleIdsSelectedPrev.includes(alleleIdRow)) {
            const indexAlleleId = alleleIdsSelectedPrev.indexOf(alleleIdRow);
            return [
              ...alleleIdsSelectedPrev.slice(0, indexAlleleId),
              ...alleleIdsSelectedPrev.slice(indexAlleleId + 1)
            ];
          } else {
            return [...alleleIdsSelectedPrev, alleleIdRow];
          }
        });
      },
      style: { backgroundColor: '#ffffd4' },
    });
  }, [data, alleleIdsSelected, setAlleleIdsSelected]);

  return (
    <>
      {isLoading ?
        <div className="mr-3 alert alert-info">
          When the number of alleles and variants is large, this may take <strong>a few minutes</strong> to load.
        </div> :
        null}
      <ErrorBoundary>
        {
          isLoading || isLoadingGene ?
            null :
            variantsSequenceViewerProps.hasVariants ?
              <VariantsSequenceViewer {...variantsSequenceViewerProps} /> :
              <NoData>No mapped variant information available</NoData>
        }
      </ErrorBoundary>
      <hr />
      <ErrorBoundary>
        <DataTable
          {...tableQuery}
          data={data}
          columns={columns}
          downloadUrl={`/api/gene/${geneId}/allele-variant-detail/download`}
          selectRow={selectRow}
          sortOptions={sortOptions}
          keyField='key'
        />
      </ErrorBoundary>
    </>
  );
};

GeneAlleleDetailsTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default GeneAlleleDetailsTable;
