import React from 'react';
import { Link } from 'react-router-dom';
import { AlleleCellCuration, SpeciesCell } from '../../../components/dataTable';
import { CollapsibleList } from '../../../components/collapsibleList';
import SynonymListCuration from '../../../components/SynonymListCuration.jsx';
import { getIdentifier } from '../../../components/dataTable/utils.jsx';
import createReferenceTable from './createReferenceTable.jsx';

const baseColumns = [
  {
    dataField: 'species',
    text: 'Species',
    headerStyle: { width: '130px' },
    formatter: (species) => species && <SpeciesCell taxon={species} />,
  },
  {
    dataField: 'allele',
    text: 'Allele/Variant Symbol',
    headerStyle: { width: '185px' },
    formatter: (allele, row) => {
      if (row.alterationType === 'variant') {
        const hgvs = row.variantList?.[0]?.curatedVariantGenomicLocations?.[0]?.hgvs;
        return (
          <div className="text-truncate" title={hgvs}>
            <Link to={`/variant/${hgvs}`}>{hgvs}</Link>
          </div>
        );
      }
      return <AlleleCellCuration identifier={getIdentifier(allele)} allele={allele} />;
    },
  },
  {
    dataField: 'synonyms',
    text: 'Allele Synonyms',
    headerStyle: { width: '165px' },
    formatter: (synonyms) => <SynonymListCuration synonyms={synonyms} />,
  },
  {
    dataField: 'alterationType',
    text: 'Category',
    headerStyle: { width: '160px' },
  },
  {
    dataField: 'variantList',
    text: 'Variant',
    headerStyle: { width: '300px' },
    formatter: (variants) => (
      <div>
        {(variants || []).map((variant) => {
          const hgvs = variant.curatedVariantGenomicLocations?.[0]?.hgvs;
          if (!hgvs) return null;
          return (
            <div
              key={hgvs}
              style={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              title={hgvs}
            >
              <Link to={`/variant/${hgvs}`}>{hgvs}</Link>
            </div>
          );
        })}
      </div>
    ),
  },
  {
    dataField: 'variantType',
    text: 'Variant type',
    headerStyle: { width: '150px' },
    formatter: (_v, row) => (
      <div>
        {(row.variantList || []).map((variant) => {
          const hgvs = variant.curatedVariantGenomicLocations?.[0]?.hgvs;
          return <div key={hgvs}>{variant.variantType?.name?.replace(/_/g, ' ')}</div>;
        })}
      </div>
    ),
  },
  {
    dataField: 'molecularConsequence',
    text: 'Molecular consequence',
    headerStyle: { width: '180px' },
    formatter: (_v, row) => (
      <div>
        {(row.variantList || []).map((variant) => {
          const loc = variant.curatedVariantGenomicLocations?.[0];
          const hgvs = loc?.hgvs;
          const consequences =
            loc?.predictedVariantConsequences?.flatMap((c) => c.vepConsequences?.map((v) => v.name) || []) || [];
          const unique = [...new Set(consequences.map((c) => c.replace(/_/g, ' ')))];
          return (
            <div key={hgvs}>
              <CollapsibleList collapsedSize={1}>{unique}</CollapsibleList>
            </div>
          );
        })}
      </div>
    ),
  },
];

const VARIANT_FIELDS = new Set(['variantList', 'variantType', 'molecularConsequence']);

const columnsForData = (data) => {
  const anyVariants = (data || []).some((row) => (row.variantList || []).length > 0);
  if (anyVariants) return baseColumns;
  return baseColumns.filter((c) => !VARIANT_FIELDS.has(c.dataField));
};

const ReferenceAlleleTable = createReferenceTable({
  displayName: 'ReferenceAlleleTable',
  endpoint: 'alleles',
  columns: columnsForData,
  transform: (row) => ({
    species: row.allele?.taxon,
    allele: row.allele,
    synonyms: row.allele?.alleleSynonyms,
    alterationType: row.alterationType,
    variantList: row.variantList || [],
  }),
});

export default ReferenceAlleleTable;
