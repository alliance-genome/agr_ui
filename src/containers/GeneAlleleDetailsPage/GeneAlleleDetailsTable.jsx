import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { BooleanLinkCell, DataTable, GeneCell, VEPTextCell } from '../../components/dataTable';
import AlleleCellCuration from '../../components/dataTable/AlleleCellCuration.jsx';
import fetchData from '../../lib/fetchData';
import SynonymList from '../../components/synonymList.jsx';
import NoData from '../../components/noData.jsx';
import VariantJBrowseLink from '../../components/variant/VariantJBrowseLink.jsx';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import { getGenomicLocations, getSingleGenomeLocation, findFminFmax, getTableUrl } from '../../lib/utils';
import VariantsSequenceViewer from '../genePage/VariantsSequenceViewer.jsx';
import ErrorBoundary from '../../components/errorBoundary.jsx';
import { ALLELE_WITH_ONE_VARIANT, ALLELE_WITH_MULTIPLE_VARIANTS } from '../../constants';

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
  const genomeLocations = getGenomicLocations(gene);
  const geneLocation = getSingleGenomeLocation(genomeLocations);
  const baseUrl = `/api/gene/${geneId}/allele-variant-detail`;

  const tableQuery = useDataTableQuery(
    baseUrl,
    undefined,
    {
      sizePerPage: 25,
    },
    {},
    300000
  );
  const { isLoading } = tableQuery;

  const data = tableQuery.data.map((row) => ({
    ...row,
    key: `${row.allele && row.allele.curie}-${row.variant && row.variant.hgvs}-${row.consequence && row.consequence.variantTranscript && row.consequence.variantTranscript.curie}`,
  }));
  const columns = [
    {
      text: 'Allele / Variant Symbol',
      dataField: 'allele',
      formatter: (allele, row) => {
        if (!allele) return null;
        const identifier = allele.modEntityId || allele.curie;
        if (allele.alleleSymbol) {
          return <AlleleCellCuration identifier={identifier} allele={allele} />;
        }
        const hgvs = row.variant && row.variant.hgvs;
        if (hgvs) {
          return <a href={`/variant/${hgvs}`}>{hgvs}</a>;
        }
        return <a href={`/allele/${identifier}`}>{allele.curie || identifier}</a>;
      },
      filterable: true,
      filterName: 'symbol',
      headerStyle: { width: '200px' },
    },
    {
      text: 'Allele / Variant Synonyms',
      dataField: 'allele.alleleSynonyms',
      formatter: (synonyms) => <SynonymList synonyms={synonyms && synonyms.map((s) => s.displayText)} />,
      filterable: true,
      filterName: 'synonyms',
      headerStyle: { width: '200px' },
    },
    {
      text: 'Category',
      dataField: 'category',
      filterable: true,
      filterName: 'alleleCategory',
      headerStyle: { width: '250px' },
    },
    {
      text: 'Has Phenotype',
      dataField: 'allele.hasPhenotype',
      formatter: (hasPhenotype, row) => (
        <BooleanLinkCell
          to={`/allele/${row.allele && (row.allele.modEntityId || row.allele.curie)}#phenotypes`}
          value={hasPhenotype}
        />
      ),
      filterName: 'hasPhenotype',
      filterable: ['true', 'false'],
      filterFormatter: (val) => (val === 'true' ? 'Yes' : 'No'),
      headerStyle: { width: '100px' },
    },
    {
      text: 'Has Disease',
      dataField: 'allele.hasDisease',
      formatter: (hasDisease, row) => (
        <BooleanLinkCell
          to={`/allele/${row.allele && (row.allele.modEntityId || row.allele.curie)}#disease-associations`}
          value={hasDisease}
        />
      ),
      filterName: 'hasDisease',
      filterable: ['true', 'false'],
      filterFormatter: (val) => (val === 'true' ? 'Yes' : 'No'),
      headerStyle: { width: '80px' },
    },
    {
      text: 'Variant HGVS.g name',
      dataField: 'variant',
      formatter: (variant) => {
        if (!variant) return null;
        const variantLocation =
          variant.start != null
            ? {
                start: variant.start,
                end: variant.end,
                chromosome:
                  variant.variantGenomicLocationAssociationObject &&
                  variant.variantGenomicLocationAssociationObject.name,
              }
            : null;
        return (
          <div className="text-truncate">
            <VariantJBrowseLink
              geneLocation={geneLocation}
              geneSymbol={gene.geneSymbol && gene.geneSymbol.displayText}
              location={variantLocation}
              species={gene.taxon && gene.taxon.name}
              type={
                variant.variantAssociationSubject &&
                variant.variantAssociationSubject.variantType &&
                variant.variantAssociationSubject.variantType.name
              }
              taxonid={gene.taxon && gene.taxon.curie}
            >
              {variant.hgvs}
            </VariantJBrowseLink>
          </div>
        );
      },
      headerStyle: { width: '300px' },
      filterable: true,
      filterName: 'hgvsgName',
    },
    {
      text: 'Variant Type',
      dataField: 'variant.variantAssociationSubject.variantType.name',
      formatter: VEPTextCell,
      filterable: true,
      filterName: 'variantType',
      headerStyle: { width: '150px' },
    },
    {
      text: 'Sequence feature',
      dataField: 'consequence.variantTranscript.curie',
      headerStyle: { width: '250px' },
      filterable: true,
      filterName: 'sequenceFeature',
    },
    {
      text: 'Sequence feature type',
      dataField: 'consequence.variantTranscript.transcriptType',
      formatter: (transcriptType) => (transcriptType && transcriptType.name ? transcriptType.name : ''),
      filterable: true,
      filterName: 'sequenceFeatureType',
      headerStyle: { width: '200px' },
    },
    {
      text: 'Sequence feature associated gene',
      dataField: 'consequence.variantTranscript.transcriptGeneAssociations',
      formatter: (associations) => {
        if (!associations || associations.length === 0) return '';
        const gene = associations[0].transcriptGeneAssociationObject;
        if (!gene) return '';
        const symbol = gene.geneSymbol && gene.geneSymbol.displayText;
        return symbol ? (
          <a href={`/gene/${gene.curie}`} dangerouslySetInnerHTML={{ __html: symbol }} />
        ) : (
          gene.curie || ''
        );
      },
      filterable: true,
      filterName: 'associatedGeneSymbol',
      headerStyle: { width: '150px' },
    },
    {
      text: 'Variant Location',
      dataField: 'consequence.intronExonLocation',
      headerStyle: { width: '150px' },
      filterable: true,
      filterName: 'variantLocation',
    },
    {
      text: 'Molecular consequence',
      dataField: 'consequence.vepConsequences',
      formatter: (vepConsequences) => <span>{(vepConsequences || []).map((c) => c.name).join(', ')}</span>,
      filterable: true,
      filterName: 'molecularConsequence',
      headerStyle: { width: '350px' },
    },
    {
      text: 'VEP Impact',
      dataField: 'consequence.vepImpact',
      formatter: (vepImpact) => (vepImpact && vepImpact.name ? vepImpact.name : ''),
      filterable: true,
      filterName: 'variantImpact',
      headerStyle: { width: '120px' },
    },
    {
      text: 'SIFT prediction',
      dataField: 'consequence.siftPrediction',
      formatter: (siftPrediction) => {
        const label = siftPrediction && siftPrediction.name;
        return label ? <span className={getSiftStyle(label)}>{label.replace(/_/g, ' ')}</span> : '';
      },
      filterable: true,
      filterName: 'variantSift',
      headerStyle: { width: '200px' },
    },
    {
      text: 'SIFT score',
      dataField: 'consequence.siftScore',
      formatter: (siftScore, { consequence }) => {
        const label = consequence && consequence.siftPrediction && consequence.siftPrediction.name;
        return siftScore != null ? <span className={getSiftStyle(label)}>{siftScore}</span> : '';
      },
      headerStyle: { width: '100px' },
    },
    {
      text: 'PolyPhen prediction',
      dataField: 'consequence.polyphenPrediction',
      formatter: (polyphenPrediction) => {
        const label = polyphenPrediction && polyphenPrediction.name;
        return label ? <span className={getPolyphenStyle(label)}>{label.replace(/_/g, ' ')}</span> : '';
      },
      filterable: true,
      filterName: 'variantPolyphen',
      headerStyle: { width: '180px' },
    },
    {
      text: 'PolyPhen score',
      dataField: 'consequence.polyphenScore',
      formatter: (polyphenScore, { consequence }) => {
        const label = consequence && consequence.polyphenPrediction && consequence.polyphenPrediction.name;
        return polyphenScore != null ? <span className={getPolyphenStyle(label)}>{polyphenScore}</span> : '';
      },
      headerStyle: { width: '150px' },
    },
  ];

  const sortOptions = [
    {
      value: 'variantHgvsName',
      label: 'Variant HGVS.g',
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
      label: 'Transcripts',
    },
  ];

  const [alleleIdsSelected, setAlleleIdsSelected] = useState([]);
  const tableStateAlleleFiltered = useMemo(
    () => ({
      ...tableQuery.tableState,
      page: 1,
      sizePerPage: 1000,
    }),
    [tableQuery.tableState]
  );
  const allelesFiltered = useQuery({
    queryKey: [baseUrl, tableStateAlleleFiltered],
    queryFn: () => {
      const nonHTPCategories = ['allele', ALLELE_WITH_MULTIPLE_VARIANTS, ALLELE_WITH_ONE_VARIANT];
      return fetchData(
        getTableUrl(
          `${baseUrl}?filter.alleleCategory=${encodeURIComponent(nonHTPCategories.join('|'))}`,
          tableStateAlleleFiltered
        ),
        {},
        300000
      );
    },
  });

  const variantsSequenceViewerProps = useMemo(() => {
    const variants = allelesFiltered.data?.results
      ? allelesFiltered.data.results.flatMap((row) => (row && row.variant) || [])
      : [];
    const variantLocations = variants.map((variant) =>
      variant && variant.start != null
        ? {
            start: variant.start,
            end: variant.end,
            chromosome:
              variant.variantGenomicLocationAssociationObject && variant.variantGenomicLocationAssociationObject.name,
          }
        : null
    );
    const { fmin, fmax } = findFminFmax([geneLocation, ...variantLocations]);

    /*
       Warning!
       The data format here should be agreed upon by the maintainers of the VariantsSequenceViewer.
       Changes might break the VariantsSequenceViewer.
    */
    const formatAllele = (alleleId) => ({
      id: alleleId,
    });
    return {
      gene: gene,
      fmin: fmin,
      fmax: fmax,
      hasVariants: isLoading ? undefined : Boolean(variants && variants.length),
      allelesSelected: alleleIdsSelected.map(formatAllele),
      allelesVisible: allelesFiltered.data?.results
        ? allelesFiltered.data.results.map(({ allele }) => formatAllele(allele && (allele.modEntityId || allele.curie)))
        : [],
      onAllelesSelect: setAlleleIdsSelected,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, allelesFiltered.data, alleleIdsSelected, setAlleleIdsSelected]);

  const selectRow = useMemo(() => {
    const getAlleleId = (allele) => allele && (allele.modEntityId || allele.curie);
    const rowsSelected = data.filter((row) => alleleIdsSelected.indexOf(getAlleleId(row.allele)) > -1);
    return {
      mode: 'checkbox',
      clickToSelect: true,
      hideSelectColumn: true,
      selected: rowsSelected.map((row) => row.key),
      onSelect: (row) => {
        const alleleIdRow = getAlleleId(row.allele);
        setAlleleIdsSelected((alleleIdsSelectedPrev) => {
          if (alleleIdsSelectedPrev.includes(alleleIdRow)) {
            const indexAlleleId = alleleIdsSelectedPrev.indexOf(alleleIdRow);
            return [
              ...alleleIdsSelectedPrev.slice(0, indexAlleleId),
              ...alleleIdsSelectedPrev.slice(indexAlleleId + 1),
            ];
          } else {
            return [...alleleIdsSelectedPrev, alleleIdRow];
          }
        });
      },
      style: { backgroundColor: '#ffffd4' },
    };
  }, [data, alleleIdsSelected, setAlleleIdsSelected]);

  return (
    <>
      {isLoading ? (
        <div className="mr-3 alert alert-info">
          When the number of alleles and variants is large, this may take <strong>a few minutes</strong> to load.
        </div>
      ) : null}
      <ErrorBoundary>
        {isLoading || isLoadingGene ? null : variantsSequenceViewerProps.hasVariants ? (
          <VariantsSequenceViewer {...variantsSequenceViewerProps} />
        ) : (
          <NoData>No mapped variant information available</NoData>
        )}
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
          keyField="key"
        />
      </ErrorBoundary>
    </>
  );
};

GeneAlleleDetailsTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default GeneAlleleDetailsTable;
