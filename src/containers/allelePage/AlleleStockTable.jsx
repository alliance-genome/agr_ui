import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import ExternalLink from '../../components/ExternalLink.jsx';
import NoData from '../../components/noData.jsx';
import LoadingSpinner from '../../components/loadingSpinner.jsx';

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

function getOrderUrl(center, stockNumber) {
  const info = CENTER_URLS[center];
  if (!info) return null;
  return info.order + stockNumber;
}

async function fetchStocks(entityId, cursor) {
  if (!entityId || !STOCK_API_BASE) return { stocks: [] };
  const cleanId = entityId.replace(/^FB:/, '');
  let url = `${STOCK_API_BASE}/alleles/${cleanId}/stocks?limit=25`;
  if (cursor) url += `&cursor=${encodeURIComponent(cursor)}`;
  const resp = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
  if (!resp.ok) return { stocks: [] };
  return resp.json();
}

const AlleleStockTable = ({ alleleId }) => {
  const [cursor, setCursor] = useState(null);
  const [allStocks, setAllStocks] = useState([]);
  const [page, setPage] = useState(0);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['alleleStocks', alleleId, cursor],
    queryFn: () => fetchStocks(alleleId, cursor),
    enabled: !!alleleId && !!STOCK_API_BASE,
    onSuccess: (newData) => {
      if (cursor) {
        setAllStocks(prev => [...prev, ...(newData.stocks || [])]);
      } else {
        setAllStocks(newData.stocks || []);
      }
    },
  });

  // Handle initial load
  React.useEffect(() => {
    if (data && !cursor) {
      setAllStocks(data.stocks || []);
    } else if (data && cursor) {
      setAllStocks(prev => {
        const existing = new Set(prev.map(s => s.FBst));
        const newItems = (data.stocks || []).filter(s => !existing.has(s.FBst));
        return [...prev, ...newItems];
      });
    }
  }, [data, cursor]);

  const loadMore = useCallback(() => {
    if (data?.next_cursor) {
      setCursor(data.next_cursor);
      setPage(p => p + 1);
    }
  }, [data]);

  if (!STOCK_API_BASE) return null;
  if (isLoading && !allStocks.length) return <LoadingSpinner />;
  if (isError || (!data && !allStocks.length)) return null;

  if (!allStocks.length) return <NoData>No stocks available for this allele.</NoData>;

  return (
    <div>
      <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.25rem' }}>
        {allStocks.length} stock{allStocks.length !== 1 ? 's' : ''} shown
        {data?.next_cursor ? ' (more available)' : ''}
      </div>
      <table className="table table-sm" style={{ fontSize: '0.85rem' }}>
        <thead>
          <tr>
            <th>Center</th>
            <th style={{ textAlign: 'right' }}>Stock #</th>
            <th>Genotype</th>
          </tr>
        </thead>
        <tbody>
          {allStocks.map((stock, idx) => {
            const orderUrl = getOrderUrl(stock.collection_short_name, stock.stock_number);
            const centerInfo = CENTER_URLS[stock.collection_short_name];
            return (
              <tr key={`${stock.FBst}-${idx}`}>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {centerInfo ? (
                    <ExternalLink href={centerInfo.home}>{stock.collection_short_name}</ExternalLink>
                  ) : (
                    stock.collection_short_name || ''
                  )}
                </td>
                <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  {orderUrl ? (
                    <ExternalLink href={orderUrl}>{stock.stock_number}</ExternalLink>
                  ) : (
                    stock.stock_number || ''
                  )}
                </td>
                <td style={{ maxWidth: '500px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {stock.FB_genotype || ''}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {data?.next_cursor && (
        <button
          onClick={loadMore}
          disabled={isFetching}
          style={{
            padding: '0.4rem 1rem',
            fontSize: '0.85rem',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            background: isFetching ? '#f1f5f9' : '#fff',
            cursor: isFetching ? 'wait' : 'pointer',
            color: '#334155',
          }}
        >
          {isFetching ? 'Loading...' : 'Load more stocks'}
        </button>
      )}
    </div>
  );
};

export default AlleleStockTable;
