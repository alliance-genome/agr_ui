import React, { useState, useCallback, useMemo } from 'react';
import { DataTable } from '../../components/dataTable';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import ExternalLink from '../../components/ExternalLink.jsx';

const STOCK_API_BASE = import.meta.env.VITE_STOCK_API_BASE ? '/stock-api' : '';

const CENTER_URLS = {
  Bloomington: { order: 'https://bdsc.indiana.edu/Home/Search?presession=true&q=', home: 'https://bdsc.indiana.edu' },
  Kyoto: { order: 'https://kyotofly.kit.jp/cgi-bin/stocks/search_res_det.cgi?DB_NUM=1&STOCK_NO=', home: 'https://kyotofly.kit.jp/cgi-bin/stocks/index.cgi' },
  Vienna: { order: 'http://stockcenter.vdrc.at/control/product/~VIEW_INDEX~0/~VIEW_SIZE~100/~product_id~', home: 'http://stockcenter.vdrc.at/control/main' },
  FlyORF: { order: 'https://www.flyorf.ch/', home: 'https://www.flyorf.ch/' },
  KDRC: { order: 'http://kdrc.kr/', home: 'http://kdrc.kr/' },
  'NIG-Fly': { order: 'https://shigen.nig.ac.jp/fly/nigfly/', home: 'https://shigen.nig.ac.jp/fly/nigfly/' },
  SanDiego: { order: 'https://www.drosophilaspecies.com/', home: 'https://www.drosophilaspecies.com/' },
};

const AlleleStockTable = ({ alleleId }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const cleanId = alleleId ? alleleId.replace(/^FB:/, '') : '';
  const baseUrl = useMemo(() => {
    if (!cleanId || !STOCK_API_BASE) return null;
    let url = `${STOCK_API_BASE}/alleles/${cleanId}/stocks`;
    if (searchQuery) url += `?filter.genotype=${encodeURIComponent(searchQuery)}`;
    return url;
  }, [cleanId, searchQuery]);

  const { data: results, totalRows, ...tableProps } = useDataTableQuery(baseUrl);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
  }, [searchInput]);

  if (!STOCK_API_BASE) return null;

  const columns = [
    {
      dataField: 'collection_short_name',
      text: 'Center',
      formatter: (name) => {
        const info = CENTER_URLS[name];
        return info ? <ExternalLink href={info.home}>{name}</ExternalLink> : name || '';
      },
      headerStyle: { width: '130px' },
      filterable: true,
    },
    {
      dataField: 'stock_number',
      text: 'Stock #',
      formatter: (num, row) => {
        const info = CENTER_URLS[row.collection_short_name];
        const orderUrl = info ? info.order + num : null;
        return orderUrl ? <ExternalLink href={orderUrl}>{num}</ExternalLink> : num;
      },
      headerStyle: { width: '90px' },
    },
    {
      dataField: 'FB_genotype',
      text: 'Genotype',
      filterable: true,
      filterName: 'genotype',
    },
  ];

  return (
    <div>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <input
          type="text"
          placeholder="Search genotypes..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          style={{ padding: '0.35rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.85rem', width: '250px' }}
        />
        <button type="submit" className="btn btn-primary btn-sm">Search</button>
        {searchQuery && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => { setSearchInput(''); setSearchQuery(''); }}
          >
            Clear
          </button>
        )}
      </form>
      <DataTable
        {...tableProps}
        columns={columns}
        data={results}
        keyField="FBst"
        noDataMessage="No stocks available for this allele."
        totalRows={totalRows}
      />
    </div>
  );
};

export default AlleleStockTable;
