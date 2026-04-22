import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ExternalLink from '../../components/ExternalLink.jsx';
import NoData from '../../components/noData.jsx';
import LoadingSpinner from '../../components/loadingSpinner.jsx';

const STOCK_API_BASE = import.meta.env.VITE_STOCK_API_BASE ? '/stock-api' : '';
const PAGE_SIZE = 10;

const CENTER_URLS = {
  Bloomington: { order: 'https://bdsc.indiana.edu/Home/Search?presession=true&q=', home: 'https://bdsc.indiana.edu' },
  Kyoto: { order: 'https://kyotofly.kit.jp/cgi-bin/stocks/search_res_det.cgi?DB_NUM=1&STOCK_NO=', home: 'https://kyotofly.kit.jp/cgi-bin/stocks/index.cgi' },
  Vienna: { order: 'http://stockcenter.vdrc.at/control/product/~VIEW_INDEX~0/~VIEW_SIZE~100/~product_id~', home: 'http://stockcenter.vdrc.at/control/main' },
  FlyORF: { order: 'https://www.flyorf.ch/', home: 'https://www.flyorf.ch/' },
  KDRC: { order: 'http://kdrc.kr/', home: 'http://kdrc.kr/' },
  'NIG-Fly': { order: 'https://shigen.nig.ac.jp/fly/nigfly/', home: 'https://shigen.nig.ac.jp/fly/nigfly/' },
  SanDiego: { order: 'https://www.drosophilaspecies.com/', home: 'https://www.drosophilaspecies.com/' },
};

async function fetchStocks(entityId) {
  if (!entityId || !STOCK_API_BASE) return { results: [], total: 0 };
  const cleanId = entityId.replace(/^FB:/, '');
  const url = `${STOCK_API_BASE}/alleles/${cleanId}/stocks?page=1&limit=500`;
  const resp = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
  if (!resp.ok) return { results: [], total: 0 };
  return resp.json();
}

const AlleleStockTable = ({ alleleId }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['alleleStocks', alleleId],
    queryFn: () => fetchStocks(alleleId),
    enabled: !!alleleId && !!STOCK_API_BASE,
  });

  const filtered = useMemo(() => {
    if (!data?.results) return [];
    if (!search) return data.results;
    const q = search.toLowerCase();
    return data.results.filter(s =>
      (s.FB_genotype || '').toLowerCase().includes(q) ||
      (s.collection_short_name || '').toLowerCase().includes(q) ||
      String(s.stock_number || '').includes(q)
    );
  }, [data, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageStocks = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (!STOCK_API_BASE) return null;
  if (isLoading) return <LoadingSpinner />;
  if (isError || !data) return null;
  if (!data.results?.length) return <NoData>No stocks available for this allele.</NoData>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#666' }}>
          {filtered.length} stock{filtered.length !== 1 ? 's' : ''}
          {search ? ` matching "${search}"` : ''}
          {data.total >= 500 ? ' (showing first 500)' : ''}
        </span>
        <input
          type="text"
          placeholder="Search stocks..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          style={{ padding: '0.3rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.85rem', width: '200px' }}
        />
      </div>
      <table className="table table-sm table-striped table-bordered" style={{ fontSize: '0.85rem' }}>
        <thead>
          <tr>
            <th style={{ width: '130px', padding: '0.5rem 0.75rem' }}>Center</th>
            <th style={{ width: '90px', textAlign: 'right', padding: '0.5rem 0.75rem' }}>Stock #</th>
            <th style={{ padding: '0.5rem 0.75rem' }}>Genotype</th>
          </tr>
        </thead>
        <tbody>
          {pageStocks.map((stock, idx) => {
            const info = CENTER_URLS[stock.collection_short_name];
            const orderUrl = info ? info.order + stock.stock_number : null;
            return (
              <tr key={`${stock.FBst}-${idx}`}>
                <td style={{ padding: '0.4rem 0.75rem' }}>{info ? <ExternalLink href={info.home}>{stock.collection_short_name}</ExternalLink> : stock.collection_short_name}</td>
                <td style={{ textAlign: 'right', padding: '0.4rem 0.75rem' }}>{orderUrl ? <ExternalLink href={orderUrl}>{stock.stock_number}</ExternalLink> : stock.stock_number}</td>
                <td style={{ padding: '0.4rem 0.75rem', maxWidth: '500px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{stock.FB_genotype || ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#888' }}>
            Page {page} of {totalPages}
          </span>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <PageBtn onClick={() => setPage(1)} disabled={page === 1}>{'<<'}</PageBtn>
            <PageBtn onClick={() => setPage(p => p - 1)} disabled={page === 1}>{'<'}</PageBtn>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const p = start + i;
              if (p > totalPages) return null;
              return <PageBtn key={p} onClick={() => setPage(p)} active={p === page}>{p}</PageBtn>;
            })}
            <PageBtn onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>{'>'}</PageBtn>
            <PageBtn onClick={() => setPage(totalPages)} disabled={page === totalPages}>{'>>'}</PageBtn>
          </div>
        </div>
      )}
    </div>
  );
};

const PageBtn = ({ children, onClick, disabled, active }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: '0.2rem 0.5rem',
      fontSize: '0.8rem',
      border: '1px solid ' + (active ? '#4b8ca8' : '#cbd5e1'),
      borderRadius: '3px',
      background: active ? '#4b8ca8' : disabled ? '#f8f9fa' : '#fff',
      color: active ? '#fff' : disabled ? '#aaa' : '#333',
      cursor: disabled ? 'default' : 'pointer',
    }}
  >
    {children}
  </button>
);

export default AlleleStockTable;
