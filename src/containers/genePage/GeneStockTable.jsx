import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ExternalLink from '../../components/ExternalLink.jsx';
import NoData from '../../components/noData.jsx';
import LoadingSpinner from '../../components/loadingSpinner.jsx';

const STOCK_API_BASE = import.meta.env.VITE_STOCK_API_BASE || '';

async function fetchStocks(geneId) {
  if (!geneId || !STOCK_API_BASE) return { stocks: [] };
  const url = `${STOCK_API_BASE}/genes/${geneId}/stocks`;
  const resp = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
  if (!resp.ok) return { stocks: [] };
  return resp.json();
}

const GeneStockTable = ({ geneId }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['geneStocks', geneId],
    queryFn: () => fetchStocks(geneId),
    enabled: !!geneId && !!STOCK_API_BASE,
  });

  if (!STOCK_API_BASE) return null;
  if (isLoading) return <LoadingSpinner />;
  if (isError || !data) return null;

  const stocks = data.stocks || [];
  if (!stocks.length) return <NoData>No stocks available for this gene.</NoData>;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Stock Center</th>
            <th>Stock ID</th>
            <th>Stock #</th>
            <th>Genotype</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, idx) => (
            <tr key={`${stock.FBst}-${idx}`}>
              <td>{stock.collection_short_name || ''}</td>
              <td>{stock.FBst || ''}</td>
              <td>{stock.stock_number || ''}</td>
              <td style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {stock.FB_genotype || ''}
              </td>
              <td>
                {stock.order_url ? (
                  <ExternalLink href={stock.order_url}>Order</ExternalLink>
                ) : (
                  ''
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.next_cursor && (
        <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
          Showing first {stocks.length} stocks. More available.
        </div>
      )}
    </div>
  );
};

export default GeneStockTable;
